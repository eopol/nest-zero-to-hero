import { objectToString } from './is'

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message)
}

export const isSupport = (callback: () => unknown) => {
  return Boolean(callback())
}

// export function noop() {}

export function getTypeName(v: any) {
  if (v === null) return 'null'
  const type = objectToString.call(v).slice(8, -1).toLowerCase()
  return typeof v === 'object' || typeof v === 'function' ? type : typeof v
}
