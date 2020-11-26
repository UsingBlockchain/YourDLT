`yourdlt link`
==============

It announces VRF and Voting Link transactions to the network for each node with 'Peer' or 'Voting' roles. This command finalizes the node registration to an existing network.

* [`yourdlt link`](#yourdlt-link)

## `yourdlt link`

```
USAGE
  $ yourdlt link

OPTIONS
  -h, --help           It shows the help of this command.
  -t, --target=target  [default: target] The target folder where the symbol-bootstrap network is generated
  -u, --url=url        [default: http://localhost:3000] the network url
  --maxFee=maxFee      [default: 100000] the max fee used when announcing
  --unlink             Perform "Unlink" transactions unlinking the voting and VRF keys from the node signer account

EXAMPLE
  $ symbol-bootstrap link
```

_See code: [src/commands/link.ts](https://github.com/usingblockchain/yourdlt/blob/v0.3.0/src/commands/link.ts)_
