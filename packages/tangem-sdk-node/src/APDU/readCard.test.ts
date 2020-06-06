import { readCard } from './readCard';
import { NFC } from 'nfc-pcsc';
import { tlvToObject } from '../TLV';

// const logger = console;
const nfc = new NFC();
// logger // optionally you can pass logger

describe('readCard', () => {
  it('readCard', (done: any) => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const response = await readCard(reader, '000000');
        expect(response).toBeDefined();

        let parsed_response = await tlvToObject(response);
        console.log('parsed response: ', parsed_response);
        // console.log(response.toString('hex'));
        done();
      });
    });
  });
});
