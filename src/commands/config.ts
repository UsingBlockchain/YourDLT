/*
 * Copyright 2020 NEM.
 * Copyright 2021-present Using Blockchain Ltd, All rights reserved.
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
import { BootstrapAccountResolver, BootstrapService, BootstrapUtils, CommandUtils, ConfigService, Preset } from '../service';
import { LogType } from '../logger';
import Logger from '../logger/Logger';
import LoggerFactory from '../logger/LoggerFactory';

const logger: Logger = LoggerFactory.getLogger(LogType.System);

export default class Config extends Command {
    static description = 'Command used to set up the configuration files and the nemesis block for the current network';

    static examples = [
        `$ yourdlt config -p bootstrap`,
        `$ yourdlt config -p testnet -a dual --password 1234`,
        `$ echo "$MY_ENV_VAR_PASSWORD" | yourdlt config -p testnet -a dual`,
    ];

    //@typescript-eslint/explicit-module-boundary-types
    static resolveFlags = (required: boolean) => ({
        help: CommandUtils.helpFlag,
        target: CommandUtils.targetFlag,
        password: CommandUtils.passwordFlag,
        noPassword: CommandUtils.noPasswordFlag,
        preset: flags.enum({
            char: 'p',
            description: `The network preset, can be provided via custom preset or cli parameter. ${
                required ? '' : 'If not provided, the value is resolved from the target/preset.yml file.'
            }`,
            options: Object.keys(Preset).map((v) => v as Preset),
            default: ConfigService.defaultParams.preset,
            required: required,
        }),
        assembly: flags.string({
            char: 'a',
            description: `The assembly, example "dual" for testnet. ${
                required ? '' : 'If not provided, the value is resolved from the target/preset.yml file.'
            }`,
            required: required,
        }),

        customPreset: flags.string({
            char: 'c',
            description: `External preset file. Values in this file will override the provided presets`,
            required: required,
        }),
        reset: flags.boolean({
            char: 'r',
            description: 'It resets the configuration generating a new one',
            default: ConfigService.defaultParams.reset,
        }),

        upgrade: flags.boolean({
            description: `It regenerates the configuration reusing the previous keys. Use this flag when upgrading the version of bootstrap to keep your node up to date without dropping the local data. The original preset (-t), assembly (-a), and custom preset (-c) must be used. Backup the target folder before upgrading.`,
            default: ConfigService.defaultParams.reset,
        }),

        report: flags.boolean({
            description: 'It generates reStructuredText (.rst) reports describing the configuration of each node.',
            default: ConfigService.defaultParams.report,
        }),

        user: flags.string({
            char: 'u',
            description: `User used to run docker images when creating configuration files like certificates or nemesis block. "${BootstrapUtils.CURRENT_USER}" means the current user.`,
            default: BootstrapUtils.CURRENT_USER,
        }),
    });

    static flags = Config.resolveFlags(false);

    public async run(): Promise<void> {
        const { flags } = this.parse(Config);
        BootstrapUtils.showBanner();
        flags.password = await CommandUtils.resolvePassword(
            flags.password,
            flags.noPassword,
            CommandUtils.passwordPromptDefaultMessage,
            true,
        );
        const accountResolver = new BootstrapAccountResolver(logger);
        await new BootstrapService(this.config.root).config({
            ...flags,
            accountResolver,
        });
    }
}
