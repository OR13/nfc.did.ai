import { card } from '@transmute/tangem-sdk-node';

const { keyToDidDoc } = require('did-method-key').driver();
const { Ed25519KeyPair } = require('crypto-ld');
const bs58 = require('bs58');

export const resolveFromCard = async (reader: any, pin1: string = '000000') => {
  const response = await card.read(reader, pin1);
  // console.log(response);
  let publicKey = Buffer.from(response.WALLET_PUBLIC_KEY, 'hex');
  const key = new Ed25519KeyPair({
    publicKeyBase58: bs58.encode(publicKey),
  });
  const didDocument = keyToDidDoc(key);
  return didDocument;
};

export const signWithCard = async (
  reader: any,
  message: string,
  pin1: string = '000000',
  pin2: string = '000'
) => {
  const response = await card.signMessage(reader, message, pin1, pin2);
  return response.Wallet_Signature;
};
