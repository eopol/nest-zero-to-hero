import FastifyCookie from '@fastify/cookie'
import FastifyMultipart from '@fastify/multipart'
import { FastifyAdapter } from '@nestjs/platform-fastify'

const fastifyApp: FastifyAdapter = new FastifyAdapter({
  trustProxy: true,
  logger: false,
})

fastifyApp.register(FastifyMultipart, {
  limits: {
    fields: 10, // Max number of non-file fields
    fileSize: 1024 * 1024 * 20, // limit size 20M
    files: 10, // Max number of file fields
  },
})

fastifyApp.register(FastifyCookie, {
  secret: 'backend-cookie-secret', // 这个 secret 不太重要，不存鉴权相关，无关紧要
})

fastifyApp.getInstance().addHook('onRequest', (request, reply, done) => {
  const {
    url,
    headers: { origin },
  } = request
  if (!origin)
    request.headers.origin = request.headers.host

    // set undefined origin
  ;(reply as any).setHeader = function (key: string, value: any) {
    return this.raw.setHeader(key, value)
  }
  ;(reply as any).end = function () {
    this.raw.end()
  }
  ;(request as any).res = reply

  // forbidden php
  if (url.endsWith('.php')) {
    reply.raw.statusMessage =
      'Eh. PHP is not support on this machine. Yep, I also think PHP is bestest programming language. But for me it is beyond my reach.'
    return reply.code(418).send()
  }

  // skip favicon request
  if (url.match(/favicon.ico$/) || url.match(/manifest.json$/)) {
    return reply.code(204).send()
  }

  done()
})

export { fastifyApp }
