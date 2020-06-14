import documentLoader from '../documentLoader';

const jsigs = require('jsonld-signatures');
const { Ed25519KeyPair } = require('crypto-ld');
const vc = require('vc-js');
const { keyToDidDoc } = require('did-method-key').driver();

const { Ed25519Signature2018 } = jsigs.suites;

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

  beforeAll(async () => {
    key = await Ed25519KeyPair.generate({
      seed: Buffer.from(
        '7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226',
        'hex'
      ),
    });

    const didDocument = keyToDidDoc(key);
    key.id = didDocument.publicKey[0].id;
    key.controller = didDocument.publicKey[0].controller;
    credential.issuer = key.controller;

    suite = new Ed25519Signature2018({
      key,
      date: '2019-12-11T03:50:55Z',
    });
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
