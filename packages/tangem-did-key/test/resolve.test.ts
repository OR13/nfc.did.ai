import { tlvToObject } from '@transmute/tangem-sdk-node';
const { keyToDidDoc } = require('did-method-key').driver();
const { Ed25519KeyPair } = require('crypto-ld');
const bs58 = require('bs58');
const cardResponse =
  '0108bb03000000000004200754414e47454d00020102800a332e3035642053444b000341046d13c377493dcbe49b0aec3afd7b1ac066f85576fad0abe35692b1a44b278031b26847bd74caba5d9cd59a0573f9a95a1746375b99f4e699428b1983fb2f65c20a04040e7e310c678102ffff8a0100820407e40511830b54414e47454d2053444b0084010aa000a100a20200008640b70a33d72cf5dc6028c6e06bee628458c7db942b2e415110e0cf794bf53aa7d6680793bab756d9d8e69d4baf9a9a636a2a33041fe5d0f2c6e4daf94800b1f02a3041045f16bd1d2eafe463e62a335a09e6b2bbcbd04452526885cb679fc4d27af1bd22f553c7deefb54fd3d4f361d14e6dc3f11b7d4ea183250a60720ebdf9e110cd26050865643235353139000804000f423f07010060204db01fd516f69414da254583393acb664f009e1d8abd693d97457b496028015a6204000f423f6304000000000f01009000';
describe('resolve', () => {
  let card: any = {};
  it('card response to did document', async () => {
    card = await tlvToObject(Buffer.from(cardResponse, 'hex'));
    let curve = Buffer.from(card.Curve_ID, 'hex').toString();
    expect(curve.indexOf('ed25519')).toBe(0);
    // console.log(card)
    let publicKey = Buffer.from(card.WALLET_PUBLIC_KEY, 'hex');
    // const encodedBuf = multibase.encode('base58btc', publicKey)
    const key = new Ed25519KeyPair({
      publicKeyBase58: bs58.encode(publicKey),
    });
    const didDocument = keyToDidDoc(key);
    expect(didDocument.id).toBe(
      'did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53'
    );
    expect(didDocument.keyAgreement).toBeDefined();
  });
});
