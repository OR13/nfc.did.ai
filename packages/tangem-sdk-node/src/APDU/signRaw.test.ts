import { signRaw } from './signRaw';
import { NFC } from 'nfc-pcsc';

// const logger = console;
const nfc = new NFC();
// logger // optionally you can pass logger

describe('signRaw', () => {
  it('signRaw', (done: any) => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const response = await signRaw(reader, '000000');
        expect(response).toBeDefined();
        console.log(response.toString('hex'));
        done();
      });
    });
  });
});
