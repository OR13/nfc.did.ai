import { read, signMessage } from '.';
import { NFC } from 'nfc-pcsc';

const nfc = new NFC();

describe('card', () => {
  it('read and sign', (done: any) => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const message = Buffer.from('hello world').toString('hex');
        const pin1 = '000000';
        const pin2 = '000';
        let response = await read(reader, pin1);
        expect(response.CID).toBeDefined();
        response = await signMessage(reader, message, response.CID, pin1, pin2);
        expect(response.Wallet_Signature).toBeDefined();
        done();
      });
    });
  });
});
