import { card } from '@transmute/tangem-sdk-node';

export const signerFactory = (
  reader: any,
  pin1: string = '000000',
  pin2: string = '000'
) => {
  return function singer() {
    return {
      async sign({ data }: any) {
        let response: any = await card.read(reader, '000000');
        const message = Buffer.from(
          data.buffer,
          data.byteOffset,
          data.length
        ).toString('hex');
        response = await card.signMessage(
          reader,
          message,
          response.CID,
          pin1,
          pin2
        );
        return new Uint8Array(Buffer.from(response.Wallet_Signature, 'hex'));
      },
    };
  };
};
