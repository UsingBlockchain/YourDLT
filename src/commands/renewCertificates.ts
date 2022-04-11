/*
 * Copyright 2022 Fernando Boucquez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Command, flags } from '@oclif/command';
import { Account } from 'symbol-sdk';
import { LogType } from '../logger';
import Logger from '../logger/Logger';
import LoggerFactory from '../logger/LoggerFactory';
import { CertificatePair, ConfigAccount } from '../model';
import { BootstrapAccountResolver, BootstrapUtils, CertificateService, CommandUtils, ConfigLoader, Constants, RenewMode } from '../service';

const logger: Logger = LoggerFactory.getLogger(LogType.System);

export default class RenewCertificates extends Command {
    static description = `It renews the SSL certificates of the node regenerating the node.csr.pem files but reusing the current private keys.
The certificates are only regenerated when they are closed to expiration (30 days). If you want to renew anyway, use the --force param.
This command does not change the node private key (yet). This change would require a harvesters.dat migration and relinking the node key.
It's recommended to backup the target folder before running this operation!
`;

    static examples = [`$ yourdlt renewCertificates`];

    static flags = {
        help: CommandUtils.helpFlag,
        target: CommandUtils.targetFlag,
        password: CommandUtils.passwordFlag,
        noPassword: CommandUtils.noPasswordFlag,
        customPreset: flags.string({
            char: 'c',
            description: `This command uses the encrypted addresses.yml to resolve the main and transport private key. If the main and transport privates are only stored in the custom preset, you can provide them using this param. Otherwise, the command may ask for them when required.`,
            required: false,
        }),
        user: flags.string({
            char: 'u',
            description: `User used to run docker images when generating the certificates. "current" means the current user.`,
            default: 'current',
        }),

        force: flags.boolean({
            description: `Renew the certificates even though they are not close to expire.`,
            default: false,
        })
    };

    public async run(): Promise<void> {
        const { flags } = this.parse(RenewCertificates);
        BootstrapUtils.showBanner();
        const password = await CommandUtils.resolvePassword(
            flags.password,
            flags.noPassword,
            CommandUtils.passwordPromptDefaultMessage,
            true,
        );
        const target = flags.target;
        const configLoader = new ConfigLoader();

        const oldPresetData = configLoader.loadExistingPresetData(target, password);
        const presetData = configLoader.createPresetData({
            root: Constants.ROOT_FOLDER,
            customPreset: flags.customPreset,
            password: password,
            oldPresetData,
        });
        const addresses = configLoader.loadExistingAddresses(target, password);
        const networkType = presetData.networkType;
        const accountResolver = new BootstrapAccountResolver(logger);
        const certificateService = new CertificateService(logger, accountResolver, {
            target,
            user: flags.user,
        });
        const certificateUpgraded = (
            await Promise.all(
                (presetData.nodes || []).map((nodePreset, index) => {
                    const nodeAccount = addresses.nodes?.[index];
                    if (!nodeAccount) {
                        throw new Error(`There is not node in addresses at index ${index}`);
                    }
                    function resolveAccount(configAccount: ConfigAccount, providedPrivateKey: string | undefined): CertificatePair {
                        if (providedPrivateKey) {
                            const account = Account.createFromPrivateKey(providedPrivateKey, networkType);
                            if (account.address.plain() == configAccount.address) {
                                return account;
                            }
                        }
                        return configAccount;
                    }
                    const providedCertificates = {
                        main: resolveAccount(nodeAccount.main, nodePreset.mainPrivateKey),
                        transport: resolveAccount(nodeAccount.transport, nodePreset.transportPrivateKey),
                    };
                    return certificateService.run(
                        presetData,
                        nodePreset.name,
                        providedCertificates,
                        flags.force ? RenewMode.ALWAYS : RenewMode.WHEN_REQUIRED,
                    );
                }),
            )
        ).find((f) => f);
        if (certificateUpgraded) {
            logger.warn('');
            logger.warn('Bootstrap has created new SSL certificates. Review the logs!');
            logger.warn('');
        } else {
            logger.info('');
            logger.info('The SSL certificates are up-to-date. There is nothing to upgrade.');
            logger.info('');
        }
    }
}
