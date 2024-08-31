import { ApiProperty } from '@nestjs/swagger'

import {
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MESSAGE,
} from '../../constants'

export interface IBaseResponse<T = any> {
  success?: boolean
  code?: number
  message?: string
  data?: T
}

export class BaseResponse<T = any> {
  @ApiProperty({ type: 'boolean', default: true })
  success: boolean

  @ApiProperty({ type: 'number', default: RESPONSE_SUCCESS_CODE })
  code: number

  @ApiProperty({ type: 'string', default: RESPONSE_SUCCESS_MESSAGE })
  message: string

  @ApiProperty({ type: 'object' })
  data?: T

  constructor({ code, message, success, data }: IBaseResponse<T>) {
    this.code = code ?? RESPONSE_SUCCESS_CODE
    this.message = message ?? RESPONSE_SUCCESS_MESSAGE
    this.success = success ?? true

    if (data) this.data = data
  }
}
