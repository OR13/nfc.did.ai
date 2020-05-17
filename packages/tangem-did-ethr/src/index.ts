import { NFC } from 'nfc-pcsc';

import { readCard, tlvToObject } from '@transmute/tangem-sdk-node';
import fetch from 'node-fetch';
import publicKeyToAddress from 'ethereum-public-key-to-address';
import { hexToBin } from 'bitcoin-ts';

const nfc = new NFC();
// const logger = console;
// logger // optionally you can pass logger

const getJson = async (url: string) => {
  let response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    method: 'get',
  });
  // console.log(response);
  return response.json();
};

export const resolveFromCard = async () => {
  return new Promise(resolve => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const response = await readCard(reader, '000000');
        let card = await tlvToObject(response);
        let uncompressedPublicKey = card.WALLET_PUBLIC_KEY;
        let ethereumAddress = publicKeyToAddress(
          Buffer.from(hexToBin(uncompressedPublicKey))
        );
        const resolverUrl = `https://uniresolver.io/1.0/identifiers/did:ethr:${ethereumAddress}`;
        const { didDocument } = await getJson(resolverUrl);
        resolve(didDocument);
      });
    });
  });
};
