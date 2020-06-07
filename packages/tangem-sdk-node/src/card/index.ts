import { readCard } from '../APDU/readCard';
import { signRaw } from '../APDU/signRaw';
import { tlvToObject } from '../TLV';

export const read = async (reader: any, pin1: string) => {
  const res = await readCard(reader, pin1);
  const parsed = await tlvToObject(res);
  return parsed;
};

export const sign = async (
  reader: any,
  createVerifyData: string,
  pin1: string = '000000',
  pin2: string = '000',
  hashAlg: string = 'sha-512'
) => {
  const res = await signRaw(reader, createVerifyData, pin1, pin2, hashAlg);
  const parsed = await tlvToObject(res);
  return parsed;
};
