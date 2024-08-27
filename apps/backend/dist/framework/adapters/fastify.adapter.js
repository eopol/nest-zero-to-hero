"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fastifyApp", {
    enumerable: true,
    get: function() {
        return fastifyApp;
    }
});
const _cookie = /*#__PURE__*/ _interop_require_default(require("@fastify/cookie"));
const _multipart = /*#__PURE__*/ _interop_require_default(require("@fastify/multipart"));
const _platformfastify = require("@nestjs/platform-fastify");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const fastifyApp = new _platformfastify.FastifyAdapter({
    trustProxy: true,
    logger: false
});
fastifyApp.register(_multipart.default, {
    limits: {
        fields: 10,
        fileSize: 1024 * 1024 * 20,
        files: 10
    }
});
fastifyApp.register(_cookie.default, {
    secret: 'backend-cookie-secret'
});
fastifyApp.getInstance().addHook('onRequest', (request, reply, done)=>{
    const { url, headers: { origin } } = request;
    if (!origin) request.headers.origin = request.headers.host;
    // set undefined origin
    reply.setHeader = function(key, value) {
        return this.raw.setHeader(key, value);
    };
    reply.end = function() {
        this.raw.end();
    };
    request.res = reply;
    // forbidden php
    if (url.endsWith('.php')) {
        reply.raw.statusMessage = 'Eh. PHP is not support on this machine. Yep, I also think PHP is bestest programming language. But for me it is beyond my reach.';
        return reply.code(418).send();
    }
    // skip favicon request
    if (url.match(/favicon.ico$/) || url.match(/manifest.json$/)) {
        return reply.code(204).send();
    }
    done();
});

//# sourceMappingURL=fastify.adapter.js.map