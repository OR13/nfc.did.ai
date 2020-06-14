# @transmute/tangem-did-key

Built using [@transmute/did-key.js](https://github.com/transmute-industries/did-key.js).

### Resolve

```ts
import { NFC } from 'nfc-pcsc';
import { resolveFromCard } from '@transmute/tangem-did-key';

const nfc = new NFC();

nfc.on('reader', (reader: any) => {
  reader.autoProcessing = false;
  reader.on('card', async () => {
    const didDocument: any = await resolveFromCard(reader);
  });
});
```

#### Example Ed25519 Personalized Card

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    {
      "@base": "did:key:z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq"
    }
  ],
  "id": "did:key:z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq",
  "publicKey": [
    {
      "id": "#z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq",
      "type": "Ed25519VerificationKey2018",
      "controller": "did:key:z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq",
      "publicKeyBase58": "Hvo3cmQsvSWCJr8Z4KyLhJ4JiDL147RfbrZ4a6UefLiT"
    }
  ],
  "authentication": ["#z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq"],
  "assertionMethod": ["#z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq"],
  "capabilityDelegation": ["#z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq"],
  "capabilityInvocation": ["#z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq"],
  "keyAgreement": [
    {
      "id": "#z6LScNdbAWuu53LjUpjhANNs59spWkWV6sPaH9dHSjgLoiJF",
      "type": "X25519KeyAgreementKey2019",
      "controller": "did:key:z6MkwP46D1fKFyzfRLyFjtwBYPcJXnbrTzg2HsTzQNSfaZVq",
      "publicKeyBase58": "hTReD72yaczPSMvdirukZfLfbyNQGDRQAubxH2p6LXV"
    }
  ]
}
```

#### Example Secp256k1 Personalized Card

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1",
    {
      "@base": "did:key:zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok"
    }
  ],
  "id": "did:key:zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok",
  "publicKey": [
    {
      "id": "#zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok",
      "type": "EcdsaSecp256k1VerificationKey2019",
      "controller": "did:key:zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok",
      "publicKeyBase58": "23LjJ1VwkQh3S15T1LXDL9KfBZXKfsGRJTgk3ZwSZpdx2"
    }
  ],
  "authentication": ["#zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok"],
  "assertionMethod": ["#zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok"],
  "capabilityDelegation": [
    "#zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok"
  ],
  "capabilityInvocation": ["#zQ3shoHtJreRDjLGKFB8Ric6Nxv2dDHWe9pTqPcVqsH7h37ok"]
}
```

### Sign

```ts
import { NFC } from 'nfc-pcsc';
import { signer } from '@transmute/tangem-did-key'

const nfc = new NFC();

nfc.on('reader', (reader: any) => {
  reader.autoProcessing = false;
  reader.on('card', async () => {
    const _signer = signer(reader);
    const message = Buffer.from('hello world')
    const signature: Buffer = await _signer.sign({
      data: message
    })
  });
});
```