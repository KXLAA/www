export function keysOf<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj) as Array<keyof T>;
}
