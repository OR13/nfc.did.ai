import { card } from '@transmute/tangem-sdk-node';
// TODO: fix see https://github.com/transmute-industries/did-key.js/issues/1
// import { resolver } from '@transmute/did-key.js';
import { driver as ed25519_driver } from '@transmute/did-key-ed25519';
import { driver as secp256k1_driver } from '@transmute/did-key-secp256k1';

import { instantiateSecp256k1 } from 'bitcoin-ts';
const bs58 = require('bs58');

const resolver = {
  resolve: (did: string) => {
    if (did.indexOf('did:key:') !== 0) {
      throw new Error('did must be of method did:key.');
    }
    const idchar: any = did.split('did:key:').pop();
    const encodedType = idchar.substring(0, 4);
    switch (encodedType) {
      case 'z6Mk':
        return ed25519_driver.get({ did });
      case 'zQ3s':
        return secp256k1_driver.get({ did });
      default:
        throw new Error('Unknown DID Key type: ' + encodedType);
    }
  },
};

export const getCurve = (response: any) => {
  let curve = Buffer.from(response.Curve_ID, 'hex')
    .toString('utf-8')
    .trim();

  if (curve.indexOf('ed25519') !== -1) {
    curve = 'ed25519';
  }
  if (curve.indexOf('secp256k1') !== -1) {
    curve = 'secp256k1';
  }

  if (['ed25519', 'secp256k1'].indexOf(curve) === -1) {
    console.warn(
      'Card.Curve_ID must be "ed25519" or "secp256k1" for use with did-key.'
    );
  }
  return curve;
};

const getPrefix = (curve: string) => {
  let prefix;

  switch (curve) {
    case 'ed25519':
      prefix = Buffer.from('ed01', 'hex');
      break;
    case 'secp256k1':
      prefix = Buffer.from('e701', 'hex');
      break;
    default:
      throw new Error('did:key does not support: ' + curve);
  }
  return prefix;
};
export const resolveFromCard = async (reader: any, pin1: string = '000000') => {
  const response = await card.read(reader, pin1);
  if (response.Signing_Method !== '00') {
    console.warn(
      'Card.Signing_Method must be "00" for use with Linked Data Proofs.'
    );
  }

  const curve = getCurve(response);
  const prefix = getPrefix(curve);

  let publicKeyHex = response.WALLET_PUBLIC_KEY;
  if (curve === 'secp256k1') {
    const secp256k1 = await instantiateSecp256k1();
    const compressed = secp256k1.compressPublicKey(
      new Uint8Array(Buffer.from(publicKeyHex, 'hex'))
    );
    publicKeyHex = Buffer.from(compressed)
      .toString('hex')
      .toUpperCase();
  }

  let fingerprint = `z${bs58.encode(
    Buffer.concat([prefix, Buffer.from(publicKeyHex, 'hex')])
  )}`;

  const did = `did:key:${fingerprint}`;
  const didDocument: any = await resolver.resolve(did);

  const _publicKeyHex = Buffer.from(
    bs58.decode(didDocument.publicKey[0].publicKeyBase58)
  )
    .toString('hex')
    .toUpperCase();

  if (_publicKeyHex !== publicKeyHex) {
    console.warn('public key does not match card.');
    console.warn('did doc: ', _publicKeyHex);
    console.warn('card   : ', publicKeyHex);
  }
  return didDocument;
};
