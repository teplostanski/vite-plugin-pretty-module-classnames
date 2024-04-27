import { createHash } from "crypto";

export function getHash(input: string): string {
  return createHash('sha256').update(input).digest('hex').slice(0, 5);
}