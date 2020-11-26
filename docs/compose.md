`yourdlt compose`
=================

It generates the `docker-compose.yml` file from the configured network.

* [`yourdlt compose`](#yourdlt-compose)

## `yourdlt compose`

```
USAGE
  $ yourdlt compose

OPTIONS
  -h, --help           It shows the help of this command.
  -r, --reset          It resets the configuration generating a new one
  -t, --target=target  [default: target] The target folder where the symbol-bootstrap network is generated

  -u, --user=user      [default: current] User used to run the services in the docker-compose.yml file. "current" means
                       the current user.

EXAMPLE
  $ symbol-bootstrap compose
```

_See code: [src/commands/compose.ts](https://github.com/usingblockchain/yourdlt/blob/v0.3.0/src/commands/compose.ts)_
