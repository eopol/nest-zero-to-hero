"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
async function bootstrap() {
    const replServer = await (0, _core.repl)(_appmodule.AppModule);
    replServer.setupHistory('.repl_history', (err)=>{
        if (err) console.error(err);
    });
}
bootstrap();

//# sourceMappingURL=repl.js.map