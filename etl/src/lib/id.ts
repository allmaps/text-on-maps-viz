import { sha1 } from 'js-sha1'

export function generateId(str: string) {
  return sha1.hex(str).slice(0, 16)
}

export function generateRandomId() {
  return generateId(crypto.randomUUID())
}

export function generateChecksum(value: any) {
  return generateId(JSON.stringify(value))
}
