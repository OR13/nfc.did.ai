import { resolveFromCard } from '../src/index';

describe.skip('resolveFromCard', () => {
  it('resolveFromCard', async () => {
    const didDocument: any = await resolveFromCard();
    expect(didDocument.id).toBe(
      'did:key:z6MkjgXCkjGMKMp9f6p6F17KyRGR2z4U1dP5ER7mSheY5H53'
    );
  });
});
