import { NFC } from 'nfc-pcsc';
import { resolveFromCard } from './resolver';

const nfc = new NFC();

it('resolveFromCard', done => {
  nfc.on('reader', (reader: any) => {
    reader.autoProcessing = false;
    reader.on('card', async () => {
      const didDocument: any = await resolveFromCard(reader);
      // console.log(didDocument);
      expect(didDocument.id).toBeDefined();
      await reader.disconnect();
      done();
    });
  });
});
