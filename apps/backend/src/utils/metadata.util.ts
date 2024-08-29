import 'reflect-metadata'
import { SetMetadata } from '@nestjs/common'
import type { CustomDecorator } from '@nestjs/common'

export function setMetadata<K = string, V = any>(
  metadataKey: K,
  metadataValue: V,
): CustomDecorator<K> {
  return SetMetadata(metadataKey, metadataValue)
}

export function getMetadata<K = string, V = object>(
  metadataKey: K,
  metadataValue: V,
): CustomDecorator<K> {
  return Reflect.getMetadata(metadataKey, metadataValue as any)
}
