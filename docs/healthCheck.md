`yourdlt healthCheck`
=====================

It checks if the services created with docker compose are up and running.

This command checks:
- Whether the docker containers are running.
- Whether the services' exposed ports are listening.
- Whether the rest gateways' /node/health are OK.

The health check process handles 'repeat' and custom 'openPort' services.

* [`yourdlt healthCheck`](#yourdlt-healthcheck)

## `yourdlt healthCheck`

```
USAGE
  $ yourdlt healthCheck

OPTIONS
  -h, --help           It shows the help of this command.
  -t, --target=target  [default: target] The target folder where the symbol-bootstrap network is generated

DESCRIPTION
  This command checks:
  - Whether the docker containers are running.
  - Whether the services' exposed ports are listening.
  - Whether the rest gateways' /node/health are OK.

  The health check process handles 'repeat' and custom 'openPort' services.

EXAMPLE
  $ yourdlt healthCheck
```

_See code: [src/commands/healthCheck.ts](https://github.com/usingblockchain/yourdlt/blob/v1.3.0/src/commands/healthCheck.ts)_
