import { read, hashThenSignMessage } from '.';
import { NFC } from 'nfc-pcsc';

const nfc = new NFC();

describe('card', () => {
  it('read and sign', (done: any) => {
    nfc.on('reader', (reader: any) => {
      reader.autoProcessing = false;
      reader.on('card', async () => {
        const createVerifyData =
          '65794a68624763694f694a465a45525451534973496d49324e4349365a6d467363325573496d4e79615851694f6c7369596a5930496c31392ee511ffbb92a58dc5c01ebefd6e47ccabb82069ff65ac196c2aca24197b850c6c5db18d6c02aadf5fa707c0f74750dbb149cb5819a1e2faaa5f1a858c01cf0457';
        const pin1 = '000000';
        const pin2 = '000';
        const hashAlg = 'sha-512';
        let response = await read(reader, pin1);
        expect(response.CID).toBeDefined();
        response = await hashThenSignMessage(
          reader,
          createVerifyData,
          pin1,
          pin2,
          hashAlg
        );
        console.log(response);
        expect(response.Wallet_Signature).toBeDefined();
        done();
      });
    });
  });
});
