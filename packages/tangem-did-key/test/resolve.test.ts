
import { tlvToObject } from '@transmute/tangem-sdk-node'

// const { Ed25519KeyPair } = require('crypto-ld')

// const multibase = require('multibase')

const ed25519CardResponse =
  '0108bb03000000000004200754414e47454d00020101800a332e3035642053444b00034104458ce37ee02635196894b7dd3f48317153cd6819f4e833e19d6393b93bfdba8ecbd0e1859ebc1d96696423fefc808975f0c4bf7eb40afaa2d63f1f542a23b6090a04040e7e310c678102ffff8a0100820407e40511830b54414e47454d2053444b0084010aa000a100a20200008640cfac14a6c4b52730d1f399a213444d93e2cdecba7d70d70984d34e953c4fee8665a5f117f3975c524c838de546bd6400b9d3792f5057d5096199c04e5e3148803041045f16bd1d2eafe463e62a335a09e6b2bbcbd04452526885cb679fc4d27af1bd22f553c7deefb54fd3d4f361d14e6dc3f11b7d4ea183250a60720ebdf9e110cd26050865643235353139000804000f423f0701000f01009000';

describe('resolve', () => {
  let card: any = {};
  it('works', async () => {
    card = await tlvToObject(Buffer.from(ed25519CardResponse, 'hex'));
    let curve = Buffer.from(card.Curve_ID, 'hex').toString()
    expect(curve.indexOf('ed25519')).toBe(0)
    let publicKey = Buffer.from(card.CARD_PUBLIC_KEY, 'hex')
    console.log(publicKey.toString('hex'))
    // const encodedBuf = multibase.encode('base58btc', publicKey)
    // // Ed25519KeyPair.from
    // console.log(encodedBuf.toString())
    // expect(sum(1, 1)).toEqual(2);
  });
});
