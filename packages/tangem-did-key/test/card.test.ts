import { NFC } from 'nfc-pcsc';

import { resolveFromCard, signWithCard } from '../src';

const nfc = new NFC();
// const logger = console;
// logger // optionally you can pass logger

jest.setTimeout(10 * 1000);
describe('card', () => {
  let reader: any;

  beforeAll(done => {
    nfc.on('reader', (_reader: any) => {
      reader = _reader;
      _reader.autoProcessing = false;
      _reader.on('card', async () => {
        done();
      });
    });
  });

  afterAll(async () => {
    await reader.disconnect();
  });

  it('resolveFromCard', async () => {
    const didDocument: any = await resolveFromCard(reader);
    expect(didDocument.id).toBeDefined();
  });
  it('signWithCard', async () => {
    const createVerifyData =
      '65794a68624763694f694a465a45525451534973496d49324e4349365a6d467363325573496d4e79615851694f6c7369596a5930496c31392ee511ffbb92a58dc5c01ebefd6e47ccabb82069ff65ac196c2aca24197b850c6c5db18d6c02aadf5fa707c0f74750dbb149cb5819a1e2faaa5f1a858c01cf0457';
    const pin1 = '000000';
    const pin2 = '000';
    const hashAlg = 'sha-512';
    const signature: any = await signWithCard(
      reader,
      createVerifyData,
      pin1,
      pin2,
      hashAlg
    );
    expect(signature).toBeDefined();
  });
});
