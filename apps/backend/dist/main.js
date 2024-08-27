"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _adapters = require("./framework/adapters");
const _appmodule = require("./app.module");
const _packagejson = require("../package.json");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule, _adapters.fastifyApp, {
        bufferLogs: true,
        snapshot: true
    });
    await app.listen(3000, '0.0.0.0');
    console.log(`🚀 [App: ${_packagejson.name}] running on: ${await app.getUrl()}`);
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(()=>app.close());
    }
}
bootstrap();

//# sourceMappingURL=main.js.map