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

import { Command } from '@oclif/command';
import { BootstrapAccountResolver, BootstrapService, BootstrapUtils, Constants } from '../service';
import { CommandUtils } from '../service/CommandUtils';
import Clean from './clean';
import Compose from './compose';
import Config from './config';
import Run from './run';
import { LogType } from '../logger';
import Logger from '../logger/Logger';
import LoggerFactory from '../logger/LoggerFactory';

const logger: Logger = LoggerFactory.getLogger(LogType.System);

export default class Start extends Command {
    static description = 'Single command that aggregates config, compose and run in one line!';

    static examples = [
        `$ yourdlt start`,
        `$ yourdlt start -p bootstrap`,
        `$ yourdlt start -p testnet -a dual`,
        `$ yourdlt start -p testnet -a dual --password 1234`,
        `$ echo "$MY_ENV_VAR_PASSWORD" | yourdlt start -p testnet -a dual`,
    ];

    static flags = { ...Compose.flags, ...Run.flags, ...Clean.flags, ...Config.flags };

    public async run(): Promise<void> {
        const { flags } = this.parse(Start);
        BootstrapUtils.showBanner();
        flags.password = await CommandUtils.resolvePassword(
            flags.password,
            flags.noPassword,
            CommandUtils.passwordPromptDefaultMessage,
            true,
        );

        const workingDir = Constants.defaultWorkingDir;
        const accountResolver = new BootstrapAccountResolver(logger);
        await new BootstrapService(this.config.root).start({
            ...flags,
            accountResolver,
        });
    }
}
