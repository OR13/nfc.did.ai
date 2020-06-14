import { card } from '@transmute/tangem-sdk-node';
import { resolver } from '@transmute/did-key.js';
import { instantiateSecp256k1 } from 'bitcoin-ts';
const bs58 = require('bs58');
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

export const resolveFromCard = async (reader: any, pin1: string = '000000') => {
  const response = await card.read(reader, pin1);
  if (response.Signing_Method !== '00') {
    console.warn(
      'Card.Signing_Method must be "00" for use with Linked Data Proofs.'
    );
  }

  const curve = getCurve(response);
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
