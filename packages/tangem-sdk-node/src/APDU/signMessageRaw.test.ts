import { signMessageRaw } from './signMessageRaw';
import { NFC } from 'nfc-pcsc';
import { tlvToObject } from '../TLV';

// const logger = console;
const nfc = new NFC();
// logger // optionally you can pass logger

describe('signMessageRaw', () => {
  it('signMessageRaw', (done: any) => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const message =
          '0000000000000000000000000000000000000000000000000000000000000000';

        const pin1 = '000000';
        const pin2 = '000';
        const response = await signMessageRaw(reader, message, pin1, pin2);
        // expect(response.length).toBe(156);
        const parsed = await tlvToObject(response);
        console.log(JSON.stringify(parsed, null, 2));
        done();
      });
    });
  });
});
