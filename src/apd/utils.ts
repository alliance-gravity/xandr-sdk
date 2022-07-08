import { parse } from 'tldjs';

export function deduceLocationtype (key: string): number {
  const ip = '(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])';
  const ipAddress = new RegExp(`^${ip}$`);
  const ipRange = new RegExp(`^${ip},${ip}$`);
  if (ipAddress.test(key) || ipRange.test(key))
    return 0;

  const countryCode = /^([A-Z]{2})(:[A-Z]{2})?$/;
  if (countryCode.test(key))
    return 1;
  
  const openCodeLocation = /^([0-9A-Z]){8}\+([0-9A-Z])*$|^([0-9A-Z]){4}\+([0-9A-Z])*(,)?.*$/;
  if (openCodeLocation.test(key))
    return 2;
  
  const postalCode = /^(\d){5}(-\d{4})?$/;
  if (postalCode.test(key))
    return 3;

  const deviceId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (deviceId.test(key))
    return 5;
  
  throw new Error(`"${key}" does not match any keytype. Check its syntax or provide a keytype`);
}

export function deduceUrlType (url: string): boolean {
  const partialUrl = /^[-a-zA-Z0-9@:%_+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(\/([-a-zA-Z0-9()@:%_+.~#?&=])+){0,3}\/?$/;
  if (partialUrl.test(url))
    return true;
  
  const fullUrl = /^[-a-zA-Z0-9@:%_+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&=/]*)?$/;
  if (fullUrl.test(url))
    return false;

  throw new Error(`"${url}" does not match any url type`);
}

export function sanitizeUrlFormat (url: string): string {
  const p = parse(url);
  if (p.domain === null) {
    return url;
  }
  return url.slice(url.lastIndexOf(p.domain));
}