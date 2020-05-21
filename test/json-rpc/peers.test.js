const ethers = require('ethers');
const { kami1, kami2, kami3, consoleLog } = require('../test-configs');
const assert = require('assert');
const KAMI_3_URL = `http://localhost:${kami3.config.JSON_RPC_PORT}/`;

const kamiWalletAddresses = [
  kami1.keystore.address,
  kami2.keystore.address,
  kami3.keystore.address,
];

describe('Peers', () => {
  it('should list some peers and recognize them', async () => {
    const response = await ethers.utils.fetchJson(
      KAMI_3_URL,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'kami_listPeers',
        params: [],
        id: null,
      })
    );

    // console.log(response.result);

    const nullPeers = response.result.filter(
      (peer) => peer.walletAddress === null
    );

    assert.strictEqual(
      nullPeers.length,
      0,
      "there shouldn't be any null peers"
    );

    response.result
      .filter((peer) => peer.walletAddress !== null)
      .forEach((peer) => {
        assert.ok(
          kamiWalletAddresses.includes(peer.walletAddress.slice(2)),
          'peer is not recognized correctly properly'
        );
      });
  });
});
