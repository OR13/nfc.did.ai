import { resolveFromCard } from './index';

describe('resolveFromCard', () => {
  it('resolveFromCard', async () => {
    const didDocument: any = await resolveFromCard();
    console.log(didDocument);
    expect(didDocument.id).toBeDefined();
  });
});
