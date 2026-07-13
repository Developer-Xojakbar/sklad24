import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import type { E164Number } from 'libphonenumber-js';

export const getPhoneDigits = (value: string) => value.replace(/\D/g, '');

export const isValidPhone = (value: string | undefined): value is E164Number => {
  if (!value) return false;
  return isValidPhoneNumber(value);
};

export const toPhoneValue = (value: string | null | undefined): E164Number | undefined => {
  if (!value?.trim()) return undefined;

  const normalized = value.startsWith('+') ? value : `+${getPhoneDigits(value)}`;
  const parsed = parsePhoneNumberFromString(normalized);

  if (!parsed?.isValid()) return undefined;

  return parsed.number as E164Number;
};
