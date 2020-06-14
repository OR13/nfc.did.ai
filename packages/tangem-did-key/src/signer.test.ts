import { NFC } from 'nfc-pcsc';

import { signerFactory } from './signer';

const nfc = new NFC();

it('signer', done => {
  nfc.on('reader', (reader: any) => {
    reader.autoProcessing = false;
    reader.on('card', async () => {
      const signer = signerFactory(reader)();
      const message = Buffer.from('hello world');
      const signatures = await signer.sign({
        data: message,
      });
      console.log(signatures);
      expect(signatures).toBeDefined();
      done();
    });
  });
});
