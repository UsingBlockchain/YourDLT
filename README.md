<p align="center"><img src="https://yourdlt.tools/logo-yourdlt-192x192.png" width="250"></p>

# YourDLT: Distributed Ledgers for You.

[![npm-badge][npm-badge]][npm-url]
[![size-badge][size-badge]][npm-url]
[![dl-badge][dl-badge]][npm-url]

Tool that lets you connect to existing YourDLT and/or Symbol distributed ledger networks.

This tool suite is powered by [Using Blockchain Ltd](https://using-blockchain.org), [UBC Digital Magazine](https://ubc.digital), [dHealth Network](https://dhealth.network) and [Symbol from NEM](https://symbolplatform.com).

Note that we originally forked the [nemtech/symbol-bootstrap](https://github.com/nemtech/symbol-bootstrap) repository to provide with more presets and network configurations. Using Blockchain Ltd does *not* own the blockchain networks to which this tool lets you connect.

- [Requirements](#requirements)
- [Public Networks](#public-networks)
- [Usage](#usage)
- [Sponsor Us](#sponsor-us)
- [Disclaimer](#disclaimer)
- [Licensing](#license)

## Requirements

- [Node 12+](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- [Docker 19.03.13](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose 1.27.4](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

Validate your environment by running:

```bash
node -v
docker -v
docker-compose -v
```

Make sure that your user can run docker without sudo:

```bash
docker run hello-world
```

## Public Networks

This tool is compatible with multiple blockchain projects which are listed below:

| Name | Preset Name | Link |
| --- | --- | --- |
| dHealth Public Network | `dhealth` | [dHealth Public Network](https://dhealth.network) |
| dHealth Test Network | `dhealthTestnet` | [dHealth Test Network](https://dhealth.network) |
| Symbol from NEM | `mainnet` | [Symbol from NEM](https://symbolplatform.com) |
| Symbol Testnet | `testnet` | [Symbol from NEM](https://symbolplatform.com) |
| Custom private network | `bootstrap` | [Catapult](https://github.com/nemtech/catapult-server) |

Select one of the networks in the list above before you go on to setup your node.

## Usage

### Installing the software

```bash
$ npm i -g yourdlt
```

### Check your setup

Use the `-v` flag to print the `yourdlt` version.

```bash
$ yourdlt -v
yourdlt/1.3.1 linux-x64 node-v14.16.0
```

### Customize the node

You can customize your node with a custom preset configuration, let's for example `touch ~/node_config.yml`.

Put the following in this configuration file we just created, and replace `your-awesome-node` by the friendly name you want to set to your node:

```bash
nodes:
  -
    host: ''
    friendlyName: 'your-awesome-node'
```

:white_check_mark: If you already have a domain name _DNS mapped_ to your server IP, you can specify it as the `host` of your node. This is optional and in case it is left empty, your node will be identified by its' IP address instead.

Useful configuration items among others:

- `beneficiaryAddress`: Define a _beneficiary address_ which will receive parts of the harvested fees on the node.
- `mainPrivateKey`: Caution here, please only use this option if you want to use a specific account for this node.
- `remotePrivateKey`: Caution here, please only use this option if you already linked your main account to a specific remote account.
- `vrfPrivateKey`: Caution here, please only use this option if you already linked your main account to a specific VRF account.
- `maxUnlockedAccounts`: Define the _number of harvesting slots_ that are available for remote harvesting.
- `enableDelegatedHarvestersAutoDetection`: Define whether you want to allow _persistent_ delegated harvesting.
- `enableAutoHarvesting`: Define whether you want your node to automatically start harvesting or not.

:warning: If you put sensitive information in this file, please remind yourself to *remove it* after the node is configured and is ready to be run. We will make sure to point out at which point you can *clean* the custom configuration preset.

### Setup your node

After you customized the node experience, you can now actually prepare the configuration of your network node. First we'll need to pick a so-called *network preset*, a *target* folder, an *assembly* and optionally specify a *custom configuration preset*.

```bash
$ yourdlt config -p bootstrap|mainnet|testnet|dhealth -t node -a peer|api|dual -c ~/node_config.yml
```

In the above, make sure to pick a network preset that is either `mainnet` for Symbol Mainnet, `testnet` for Symbol Testnet or `dhealth` for DHealth Public Network. Also choose one of the assemblies with the following descripions:

- `peer`: Harvesting node (Creates blocks)
- `api`: REST-enabled node (Relays information through an API)
- `dual`: Full node (Creates blocks and relays information)

Following console output is an example after a successful **yourdlt config** execution:

```bash
$ yourdlt config -p dhealth -t node -a dual -c ~/node_config.yml
 __   __                    ____   _    _____ 
 \ \ / /___   _   _  _ __  |  _ \ | |  |_   _|
  \ V // _ \ | | | || '__| | | | || |    | |  
   | || (_) || |_| || |    | |_| || |___ | |  
   |_| \___/  \__,_||_|    |____/ |_____||_|  
                                              
? Enter password to use to encrypt and decrypt custom presets, addresses.yml, and preset.yml files. When providing a password, private keys will be encrypte
d. Keep this password in a secure place! ******
2021-03-24T01:51:52.069Z info     Password has been provided
2021-03-24T01:51:52.097Z info     Generating config from preset dhealth
2021-03-24T01:51:52.098Z info     Assembly preset dual
2021-03-24T01:51:52.178Z info     Generating Main account...
2021-03-24T01:51:52.198Z info     Generating Transport account...
2021-03-24T01:51:52.206Z info     Generating Remote account...
2021-03-24T01:51:52.216Z info     Generating VRF account...
2021-03-24T01:51:52.239Z info     User for docker resolved: 501:20
2021-03-24T01:51:52.239Z info     Running image using Exec: symbolplatform/symbol-server:tools-gcc-1.0.0.0 bash createNodeCertificates.sh
2021-03-24T01:52:24.647Z info     Certificate for node node created
2021-03-24T01:52:24.657Z info     Generating node server configuration
2021-03-24T01:52:24.817Z info     Generating broker broker configuration
2021-03-24T01:52:24.896Z info     Running image using Exec: symbolplatform/symbol-server:tools-gcc-1.0.0.0 /usr/catapult/bin/catapult.tools.votingkey --secret=HIDDEN_KEY --startEpoch=1 --endEpoch=360 --output=/votingKeys/private_key_tree1.dat
2021-03-24T01:52:26.914Z warn     A new Voting File for the node node has been regenerated! 
2021-03-24T01:52:26.914Z warn     Remember to send a Voting Key Link transaction from main NAHLG4HPLLFFM7F3WTMFXTW7RTSTYKFR7REQSLY using the Voting Public Key 9B8CACAD44534D4DB830BB18CDA34CD43E034EA1AAA942B5D6BE463B144E5CA4
2021-03-24T01:52:26.914Z warn     For linking, you can use yourdlt link command, the symbol cli, or the symbol desktop wallet. 
2021-03-24T01:52:26.914Z warn     The voting public key is stored in the target`s addresses.yml for reference
2021-03-24T01:52:26.937Z info     Deleting folder dual-node/nemesis/seed
2021-03-24T01:52:27.213Z info     Configuration generated.
```

### Setup your device

```
$ yourdlt compose -t node -c ~/node_config.yml
```

In the above make sure to replace `node` by the folder name you created using the *config* command just before. If you copy/pasted the command name from above, you can leave `node` here.

Following console output is an example after a successful **yourdlt compose** execution:

```bash
$ yourdlt compose -t node -c ~/node_config.yml
 __   __                    ____   _    _____ 
 \ \ / /___   _   _  _ __  |  _ \ | |  |_   _|
  \ V // _ \ | | | || '__| | | | || |    | |  
   | || (_) || |_| || |    | |_| || |___ | |  
   |_| \___/  \__,_||_|    |____/ |_____||_|  
                                              
? Enter password to use to encrypt and decrypt custom presets, addresses.yml, and preset.yml files. When providing a password, private keys will be encrypte
d. Keep this password in a secure place! *******
2021-03-24T02:03:17.656Z info     Password has been provided
2021-03-24T02:03:17.739Z info     User for docker resolved: 501:20
2021-03-24T02:03:17.740Z info     Creating docker-compose.yml from last used profile.
2021-03-24T02:03:17.748Z info     The docker-compose.yml file created /.../node/docker/docker-compose.yml

```

### Start your node

Note that in the following command, we use the `-d` command line argument to denote a *detached* execution, this starts the node *in a background process*. To get information about your node, please use `docker ps` after running the following command: 

```bash
$ yourdlt run -t node -d -c ~/node_config.yml
 __   __                    ____   _    _____ 
 \ \ / /___   _   _  _ __  |  _ \ | |  |_   _|
  \ V // _ \ | | | || '__| | | | || |    | |  
   | || (_) || |_| || |    | |_| || |___ | |  
   |_| \___/  \__,_||_|    |____/ |_____||_|  
                                              
2021-03-24T02:05:51.950Z info     Spawn command: docker-compose -f node/docker/docker-compose.yml up --remove-orphans
Creating network "docker_default" with the default driver
Pulling db (mongo:4.4.3-bionic)...
4.4.3-bionic: Pulling from library/mongo
Pulling broker (symbolplatform/symbol-server:gcc-1.0.0.0)...
gcc-1.0.0.0: Pulling from symbolplatform/symbol-server
Pulling rest-gateway (symbolplatform/symbol-rest:2.3.5)...
2.3.5: Pulling from symbolplatform/symbol-rest
```

## Sponsor us

| Platform | Sponsor Link |
| --- | --- |
| Paypal | [https://paypal.me/usingblockchainltd](https://paypal.me/usingblockchainltd) |
| Patreon | [https://patreon.com/usingblockchainltd](https://patreon.com/usingblockchainltd) |
| Github | [https://github.com/sponsors/UsingBlockchain](https://github.com/sponsors/UsingBlockchain) |
| :coffee: :coffee: :coffee: | [https://www.buymeacoffee.com/UBCDigital](https://www.buymeacoffee.com/UBCDigital) |

## Disclaimer

  *The author of this package cannot be held responsible for any loss of money or any malintentioned usage forms of this package. Please use this package with caution.*

  *Our software contains links to the websites of third parties (“external links”). As the content of these websites is not under our control, we cannot assume any liability for such external content. In all cases, the provider of information of the linked websites is liable for the content and accuracy of the information provided. At the point in time when the links were placed, no infringements of the law were recognisable to us..*

## License

Copyright 2020 NEM.
Copyright 2021-present [Using Blockchain Ltd][ref-ltd], All rights reserved.

Licensed under the [Apache License 2.0](LICENSE)

[ref-ltd]: https://using-blockchain.org
[npm-url]: https://www.npmjs.com/package/yourdlt
[npm-badge]: https://img.shields.io/npm/v/yourdlt
[size-badge]: https://img.shields.io/bundlephobia/min/yourdlt
[dl-badge]: https://img.shields.io/npm/dt/yourdlt
