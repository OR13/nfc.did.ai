const hardware = require("@transmute/tangem-did-key");

const { NFC } = require("nfc-pcsc");
const issuer = require("./issuer");

const fastify = require("fastify")({
  logger: true,
});

fastify.register(require("fastify-cors"));

fastify.get("/tangem/resolve", (request, reply) => {
  const nfc = new NFC();
  nfc.on("reader", (reader) => {
    reader.autoProcessing = false;
    reader.on("card", async () => {
      const didDocument = await hardware.resolveFromCard(reader);
      didDocument["@context"][0] = "https://w3id.org/did/v0.11";
      reply.send({
        didDocument,
      });
    });
  });
});

fastify.post("/tangem/issue", (request, reply) => {
  const { credential } = request.body;
  const nfc = new NFC();
  nfc.on("reader", (reader) => {
    reader.autoProcessing = false;
    reader.on("card", async () => {
      console.log({ credential });
      const verifiableCredential = await issuer.issue(reader, credential);
      console.log({ verifiableCredential });
      reply.send({
        verifiableCredential,
      });
    });
  });
});

// Run the server!
fastify.listen(8089, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
