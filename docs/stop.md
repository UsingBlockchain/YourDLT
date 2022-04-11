`yourdlt stop`
==============

It stops the docker-compose network if running (yourdlt started with --detached). This is just a wrapper for the `docker-compose down` bash call.

* [`yourdlt stop`](#yourdlt-stop)

## `yourdlt stop`

```
USAGE
  $ yourdlt stop

OPTIONS
  -h, --help           It shows the help of this command.
  -t, --target=target  [default: target] The target folder where the symbol-bootstrap network is generated

EXAMPLE
  $ yourdlt stop
```

_See code: [src/commands/stop.ts](https://github.com/usingblockchain/yourdlt/blob/v1.4.1/src/commands/stop.ts)_
