var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { singleton } from "tsyringe";
import { foundation } from "../decorators/foundation";
import { GuiModule } from "../modules/gui.module";
import { on, onGui, onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
let WebviewHandler = class WebviewHandler {
    gui;
    event;
    constructor(gui, event) {
        this.gui = gui;
        this.event = event;
    }
    create(url) {
        this.gui.createView(url);
    }
    onListen(name, callback) {
        this.gui.guiOn(name, callback);
    }
    onEmitToServer(name, ...args) {
        this.event.emitServer(name, ...args);
    }
    onEmit(name, ...args) {
        this.gui.guiEmit(name, ...args);
    }
};
__decorate([
    onServer("webview:create"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WebviewHandler.prototype, "create", null);
__decorate([
    on("webview:on"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function]),
    __metadata("design:returntype", void 0)
], WebviewHandler.prototype, "onListen", null);
__decorate([
    onGui("webview:emitserver"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebviewHandler.prototype, "onEmitToServer", null);
__decorate([
    onServer("webview:emit"),
    on("webview:emit"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WebviewHandler.prototype, "onEmit", null);
WebviewHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [GuiModule, EventModule])
], WebviewHandler);
export { WebviewHandler };
//# sourceMappingURL=webview.handler.js.map