import { readCard } from '../APDU/readCard';
import { signMessageHash } from '../APDU/signMessageHash';
import { signMessageRaw } from '../APDU/signMessageRaw';
import { tlvToObject } from '../TLV';

export const read = async (reader: any, pin1: string) => {
  const res = await readCard(reader, pin1);
  const parsed = await tlvToObject(res);
  return parsed;
};

export const signMessage = async (
  reader: any,
  message: string,
  pin1: string = '000000',
  pin2: string = '000'
) => {
  const res = await signMessageRaw(reader, message, pin1, pin2);
  const parsed = await tlvToObject(res);
  return parsed;
};

export const hashThenSignMessage = async (
  reader: any,
  message: string,
  pin1: string = '000000',
  pin2: string = '000',
  hashAlg: string = 'sha-512'
) => {
  const res = await signMessageHash(reader, message, pin1, pin2, hashAlg);
  const parsed = await tlvToObject(res);
  return parsed;
};
