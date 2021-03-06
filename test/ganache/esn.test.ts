import assert from 'assert';
import { ethers } from 'ethers';
import { Address } from '../../src/utils/bytes';

import { kami1, kami2, kami3, getProvider } from '../test-configs';
global.providerESN = getProvider(kami1.config.ESN_URL);

const validatorAddressArray = [
  '0x' + kami1.keystore.address,
  '0x' + kami2.keystore.address,
  '0x' + kami3.keystore.address,
];

export const EsnSetup = () =>
  describe('ESN Setup', () => {
    it('check if ESN ganache server is initiated', async () => {
      await new Promise(async (resolve, reject) => {
        while (true) {
          try {
            await global.providerESN.getNetwork();
            break;
          } catch (error) {
            console.log('waiting for ganache to start...');
            global.providerESN = getProvider(kami1.config.ESN_URL);
          }
          await new Promise((res) => setTimeout(res, 1000));
        }
        resolve();
      });
    });

    it('initiate ganache and generates a bunch of demo accounts', async () => {
      const accounts = await global.providerESN.listAccounts();
      global.accountsESN = accounts.map((address) => new Address(address));

      assert.ok(
        global.accountsESN.length >= 2,
        'atleast 2 accounts should be present in the array'
      );
    });

    it('create some blocks for generating merkle root', async () => {
      const signer = global.providerESN.getSigner(global.accountsESN[0].hex());

      for (let i = 0; i < 10; i++) {
        await global.providerETH.send('miner_stop', []);
        for (let j = 0; j < 3; j++) {
          await signer.sendTransaction({
            to: validatorAddressArray[i % 3],
            value: ethers.utils.parseEther('1'),
          });
        }
        await global.providerETH.send('miner_start', []);
      }
    });
  });
