const hardware = require("@transmute/tangem-did-key");

const { resolveFromCard, signerFactory } = hardware;

const jsigs = require("jsonld-signatures");
const { Ed25519KeyPair } = require("crypto-ld");
const vc = require("vc-js");

const documentLoader = require("./documentLoader");

const { Ed25519Signature2018 } = jsigs.suites;

const issue = async (reader, credential) => {
  const didDocument = await resolveFromCard(reader);
  key = await Ed25519KeyPair.from(didDocument.publicKey[0]);
  // this is required when the did document uses `@base`
  key.id = key.controller + key.id;
  key.signer = signerFactory(reader);
  suite = new Ed25519Signature2018({
    key,
    date: "2019-12-11T03:50:55Z",
  });

  credential.issuer = key.controller;

  verifiableCredential = await vc.issue({
    credential: { ...credential },
    suite,
    documentLoader,
  });
  return verifiableCredential;
};

module.exports = { issue };
