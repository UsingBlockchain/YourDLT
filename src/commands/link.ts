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
import { BootstrapService, BootstrapUtils, LinkService } from '../service';
import { AnnounceService } from '../service/AnnounceService';
import { CommandUtils } from '../service/CommandUtils';

export default class Link extends Command {
    static description = `It announces VRF and Voting Link transactions to the network for each node with 'Peer' or 'Voting' roles. This command finalizes the node registration to an existing network.`;

    static examples = [`$ yourdlt link`, `$ echo "$MY_ENV_VAR_PASSWORD" | yourdlt link --unlink --useKnownRestGateways`];

    static flags = {
        help: CommandUtils.helpFlag,
        target: CommandUtils.targetFlag,
        unlink: flags.boolean({
            description: 'Perform "Unlink" transactions unlinking the voting and VRF keys from the node signer account',
            default: LinkService.defaultParams.unlink,
        }),
        ...AnnounceService.flags,
    };

    public async run(): Promise<void> {
        const { flags } = this.parse(Link);
        BootstrapUtils.showBanner();
        flags.password = await CommandUtils.resolvePassword(
            flags.password,
            flags.noPassword,
            CommandUtils.passwordPromptDefaultMessage,
            true,
        );
        return new BootstrapService(this.config.root).link(flags);
    }
}
