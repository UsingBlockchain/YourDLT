# YourDLT Connect

Tool that lets you connect to existing YourDLT and/or Symbol distributed ledger networks.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)

# Requirements

- [Node 10+](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)
- [Docker 19.03.13](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose 1.27.4](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)

Validate your environment by running:

```
node -v
docker -v
docker-compose -v
```

Make sure that your user can run docker without sudo:

```
docker run hello-world
```

If you see an error like:

```
Got permission denied while trying to connect to the Docker daemon socket at unix:///var/run/docker.sock
```

Please follow this [guide](https://www.digitalocean.com/community/questions/how-to-fix-docker-got-permission-denied-while-trying-to-connect-to-the-docker-daemon-socket).

## Usage

### Installing the software

- Using the NPM registry

```
$ npm i -g yourdlt
```

- OR Using a source code archive (e.g. `yourdlt-1.0.0.tgz`)

```bash
# We recommend to put the node files in `/opt/dhealth`
$ cd /opt/dhealth

# Uncompress the archive
$ tar xvzf yourdlt-1.0.0.tgz
$ mv package yourdlt

# Make it available globally
$ cd yourdlt && npm i
$ ln -s bin/run yourdlt
$ alias yourdlt='/opt/dhealth/yourdlt/yourdlt'

# You can now use yourdlt
```

### Check your setup

Use the `-v` flag to print the `yourdlt` version.

```bash
$ yourdlt -v
yourdlt/0.5.0 linux-x64 node-v14.16.0
```

### Setup your node

```
$ yourdlt config -p bootstrap|mainnet|testnet|dhealth -t node -a peer|api|dual
```

In the above, make sure to pick a network preset that is either `mainnet` for Symbol Mainnet, `testnet` for Symbol Testnet or `dhealth` for DHealth Public Network. Also choose one of the assemblies with the following descripions:

- `peer`: Harvesting node
- `api`: REST-enabled node (API)
- `dual`: Full node (peer, voter, api)

Following console output is an example after a successful **yourdlt config** execution:

```
$ yourdlt config -p dhealth -t node -a dual
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
2021-03-24T01:52:26.914Z warn     For linking, you can use symbol-bootstrap link command, the symbol cli, or the symbol desktop wallet. 
2021-03-24T01:52:26.914Z warn     The voting public key is stored in the target`s addresses.yml for reference
2021-03-24T01:52:26.937Z info     Deleting folder dual-node/nemesis/seed
2021-03-24T01:52:27.213Z info     Configuration generated.
```

### Setup your device

```
$ yourdlt compose -t node
```

In the above make sure to replace `node` by the folder name you created using the *config* command just before. If you copy/pasted the command name from above, you can leave `node` here.

Following console output is an example after a successful **yourdlt compose** execution:

```
$ yourdlt compose -t node
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

```
$ yourdlt run -t -d node
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

## Donations / Pot de vin

Donations can also be made with cryptocurrencies and will be used for running the project!

    NEM      (XEM):     NB72EM6TTSX72O47T3GQFL345AB5WYKIDODKPPYW
    Symbol   (XYM):     NDQALDK4XWLOUYKPE7RDEWUI25YNRQ7VCGXMPCI
    Ethereum (ETH):     0x7a846fd5Daa4b904caF7C59f866bb906153305D2
    Bitcoin  (BTC):     3EVqgUqYFRYbf9RjhyjBgKXcEwAQxhaf6o

## Sponsor us

| Platform | Sponsor Link |
| --- | --- |
| Paypal | [https://paypal.me/usingblockchainltd](https://paypal.me/usingblockchainltd) |
| Patreon | [https://patreon.com/usingblockchainltd](https://patreon.com/usingblockchainltd) |
| Github | [https://github.com/sponsors/UsingBlockchain](https://github.com/sponsors/UsingBlockchain) |

## License

Copyright 2020-present Using Blockchain Ltd, All rights reserved.

Licensed under the [Apache License 2.0](LICENSE)
