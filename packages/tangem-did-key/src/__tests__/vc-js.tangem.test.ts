import { NFC } from 'nfc-pcsc';

import { resolveFromCard, signerFactory } from '..';

import documentLoader from '../documentLoader';

const jsigs = require('jsonld-signatures');
const { Ed25519KeyPair } = require('crypto-ld');
const vc = require('vc-js');

const { Ed25519Signature2018 } = jsigs.suites;
const nfc = new NFC();

const credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1',
  ],
  id: 'http://example.gov/credentials/3732',
  type: ['VerifiableCredential', 'UniversityDegreeCredential'],
  issuer: 'did:example:123',
  issuanceDate: '2020-03-10T04:24:12.164Z',
  credentialSubject: {
    id: 'did:example:456',
    degree: {
      type: 'BachelorDegree',
      name: 'Bachelor of Science and Arts',
    },
  },
};

jest.setTimeout(10 * 1000);
describe('vc-js-sanity', () => {
  let key: any;
  let suite: any;
  let verifiableCredential: any;
  let verifiablePresentation: any;

  let reader: any;

  beforeAll(done => {
    nfc.on('reader', (_reader: any) => {
      reader = _reader;
      _reader.autoProcessing = false;
      _reader.on('card', async () => {
        const didDocument: any = await resolveFromCard(reader);
        key = await Ed25519KeyPair.from(didDocument.publicKey[0]);
        // this is required when the did document uses `@base`
        key.id = key.controller + key.id;
        expect(key.publicKeyBase58).toBeDefined();
        expect(key.privateKeyBase58).toBeUndefined();
        key.signer = signerFactory(reader);
        suite = new Ed25519Signature2018({
          key,
          date: '2019-12-11T03:50:55Z',
        });

        credential.issuer = key.controller;
        done();
      });
    });
  });

  afterAll(async () => {
    await reader.disconnect();
  });

  it('issue', async () => {
    verifiableCredential = await vc.issue({
      credential: { ...credential },
      suite,
      documentLoader,
    });
    expect(verifiableCredential.proof).toBeDefined();
  });

  it('createPresentation & signPresentation', async () => {
    const id = 'ebc6f1c2';
    const holder = key.id;
    const presentation = vc.createPresentation({
      verifiableCredential,
      id,
      holder,
    });
    expect(presentation.type).toEqual(['VerifiablePresentation']);
    verifiablePresentation = await vc.signPresentation({
      presentation,
      suite,
      challenge: '123',
      documentLoader,
    });
    expect(verifiablePresentation.proof).toBeDefined();
  });

  it('verify', async () => {
    const result = await vc.verify({
      presentation: verifiablePresentation,
      challenge: '123',
      suite,
      documentLoader,
    });
    // console.log(JSON.stringify(result, null, 2))
    expect(result.verified).toBe(true);
  });
});
