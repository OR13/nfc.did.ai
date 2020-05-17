import { NFC } from 'nfc-pcsc';

import { readCard, tlvToObject } from '@transmute/tangem-sdk-node';

const { keyToDidDoc } = require('did-method-key').driver();
const { Ed25519KeyPair } = require('crypto-ld');
const bs58 = require('bs58');

const nfc = new NFC();
// const logger = console;
// logger // optionally you can pass logger

export const resolveFromCard = async () => {
  return new Promise(resolve => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const response = await readCard(reader, '000000');
        let card = await tlvToObject(response);
        let publicKey = Buffer.from(card.WALLET_PUBLIC_KEY, 'hex');
        const key = new Ed25519KeyPair({
          publicKeyBase58: bs58.encode(publicKey),
        });
        const didDocument = keyToDidDoc(key);
        resolve(didDocument);
      });
    });
  });
};
