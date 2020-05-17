import { resolveFromCard } from './index';

describe.skip('resolveFromCard', () => {
  it('resolveFromCard', async () => {
    const didDocument: any = await resolveFromCard();
    expect(didDocument.id).toBeDefined();
  });
});
