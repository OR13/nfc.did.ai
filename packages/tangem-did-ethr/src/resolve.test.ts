import { tlvToObject } from '@transmute/tangem-sdk-node';
import fetch from 'node-fetch';

import { instantiateSecp256k1, hexToBin } from 'bitcoin-ts';
import publicKeyToAddress from 'ethereum-public-key-to-address';

const cardReadResponse =
  '0108bb03000000000004200754414e47454d00020102800a322e3330642053444b00034104892f342438b951c9c85a487c65d06cc3f252d5cd6dc50ef2635dbfec110ff9af26b6d8f66f5d0ab04756257eab9dbd1f54bbbd7e4d5851dd326b977c4a5894910a04040e7e310c678102ffff8a0100820407e40511830b54414e47454d2053444b0084010aa000a100a202000086409a433a0b0d75f506842e154287aad0711ff37aebe8f3919af14c4938ef0d3399f14c97a1be61f3a2f91ce380a12fc644d81243e05870e769a99a421a800e034d3041045f16bd1d2eafe463e62a335a09e6b2bbcbd04452526885cb679fc4d27af1bd22f553c7deefb54fd3d4f361d14e6dc3f11b7d4ea183250a60720ebdf9e110cd26050a736563703235366b31000804000f423f070100604104808b1274377fc81e63d23ffa4117f6b966abd80f726ccee5df9282e6f006aeff2cff96de64049ed5f8ab55faeaa423bd24495a47c400fe8feffda21b31a76e856204000f423f6304000000000f01009000';

const getJson = async (url: string) =>
  fetch(url, {
    headers: {
      Accept: 'application/ld+json',
    },
    method: 'get',
  }).then((data: any) => data.json());

describe('resolve from read card', () => {
  let card: any = {};
  it('parse card response', async () => {
    card = await tlvToObject(Buffer.from(cardReadResponse, 'hex'));
    expect(card.CID).toBe('BB03000000000004');
    let curve = Buffer.from(card.Curve_ID, 'hex').toString();
    // some string comparison sadness in here...
    expect(curve.indexOf('secp256k1')).toBe(0);
  });

  it('convert WALLET_PUBLIC_KEY to compressed public key', async () => {
    const secp256k1 = await instantiateSecp256k1();
    let uncompressedPublicKey = card.WALLET_PUBLIC_KEY;
    const compressedPublicKey = secp256k1.compressPublicKey(
      hexToBin(uncompressedPublicKey)
    );
    expect(Buffer.from(compressedPublicKey).toString('hex')).toBe(
      '03808b1274377fc81e63d23ffa4117f6b966abd80f726ccee5df9282e6f006aeff'
    );
  });

  let ethereumAddress: string;
  it('convert WALLET_PUBLIC_KEY to ethereum address', async () => {
    let uncompressedPublicKey = card.WALLET_PUBLIC_KEY;
    ethereumAddress = publicKeyToAddress(
      Buffer.from(hexToBin(uncompressedPublicKey))
    );
    expect(ethereumAddress).toBe('0xa0F6A32A3123ed1785d0b72fDCE2638eE5b23205');
  });

  it('resolve did:ethr from universal resolver', async () => {
    const { didDocument } = await getJson(
      `https://uniresolver.io/1.0/identifiers/did:ethr:${ethereumAddress}`
    );
    expect(didDocument.id).toBe(
      'did:ethr:0xa0F6A32A3123ed1785d0b72fDCE2638eE5b23205'
    );
    expect(didDocument.publicKey[0].type).toBe('Secp256k1VerificationKey2018');
  });
});
