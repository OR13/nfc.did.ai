import { NFC } from 'nfc-pcsc';

import { resolveFromCard, signWithCard } from '../src';

import documentLoader from '../src/documentLoader';

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
  const pin1 = '000000';
  const pin2 = '000';
  const hashAlg = 'sha-512';

  beforeAll(done => {
    nfc.on('reader', (_reader: any) => {
      reader = _reader;
      _reader.autoProcessing = false;
      _reader.on('card', async () => {
        const didDocument: any = await resolveFromCard(reader);
        key = await Ed25519KeyPair.from(didDocument.publicKey[0]);
        expect(key.publicKeyBase58).toBeDefined();
        expect(key.privateKeyBase58).toBeUndefined();

        const signer = () => {
          return {
            async sign({ data }: any) {
              const createVerifyData = Buffer.from(
                data.buffer,
                data.byteOffset,
                data.length
              ).toString('hex');
              // raw credential...
              // expect(createVerifyData).toBe(
              //   '65794a68624763694f694a465a45525451534973496d49324e4349365a6d467363325573496d4e79615851694f6c7369596a5930496c31392ee511ffbb92a58dc5c01ebefd6e47ccabb82069ff65ac196c2aca24197b850c6c5db18d6c02aadf5fa707c0f74750dbb149cb5819a1e2faaa5f1a858c01cf0457'
              // );
              const signature = await signWithCard(
                reader,
                createVerifyData,
                pin1,
                pin2,
                hashAlg
              );
              return new Uint8Array(Buffer.from(signature, 'hex'));
            },
          };
        };
        key.signer = signer;

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
    expect(result.verified).toBe(true);
  });
});
