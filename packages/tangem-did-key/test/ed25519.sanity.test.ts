const { Ed25519KeyPair } = require('crypto-ld');

describe('ed25519.sanity', () => {
  it('card response to did document', async () => {
    const keypair = await Ed25519KeyPair.generate({
      seed: Buffer.from(
        '7052adea8f9823817065456ecad5bf24dcd31a698f7bc9a0b5fc170849af4226',
        'hex'
      ),
    });
    const createVerifyData =
      '65794a68624763694f694a465a45525451534973496d49324e4349365a6d467363325573496d4e79615851694f6c7369596a5930496c31392ee511ffbb92a58dc5c01ebefd6e47ccabb82069ff65ac196c2aca24197b850c6c5db18d6c02aadf5fa707c0f74750dbb149cb5819a1e2faaa5f1a858c01cf0457';
    const raw_transaction = Buffer.from(createVerifyData, 'hex');
    const signer = keypair.signer();
    const signature = await signer.sign({ data: raw_transaction });
    expect(signature.toString('hex')).toBe(
      '1e4aa5d3bd8d30a23a025d9d060bb9c25e58389c468ccbfedd8b60fd66a07a9c57d1039f4b9913e5f63462763ff70ad92b61d9bda3cc12e283918777626f3401'
    );
    const verifier = keypair.verifier();
    const verified = await verifier.verify({
      data: raw_transaction,
      signature,
    });
    expect(verified).toBe(true);
  });
});
