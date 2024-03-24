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
import { WebView } from "@extensions/web-view.extensions";
import { LoggerModule } from "./logger.module";
import { EventModule } from "./event.module";
import { Player } from "@extensions/player.extensions";
import alt from "alt-client";
let GuiModule = class GuiModule {
    logger;
    event;
    player;
    webview = undefined;
    constructor(logger, event, player) {
        this.logger = logger;
        this.event = event;
        this.player = player;
    }
    createView(url) {
        this.webview = new WebView(url, true);
        this.webview.on("gui:ready", () => {
            alt.setTimeout(() => {
                this.event.emit("gui:ready");
                this.logger.info("WebViewModule: GUI is ready to use.");
            }, 100);
        });
        this.logger.info("WebViewModule: Create single-instance of south central ui.");
    }
    setUrl(url) {
        this.webview.url = url;
    }
    focusView() {
        this.webview.focus();
    }
    unfocusView(force = false) {
        if (!force) {
            if (this.player.getIsInventoryOpen || this.player.getIsPhoneOpen || this.player.getIsAnyMenuOpen) {
                return;
            }
        }
        this.webview.unfocus();
    }
    guiEmit(name, ...args) {
        this.webview.emit(name, ...args);
    }
    guiOn(name, callback) {
        this.webview.on(name, callback);
    }
};
GuiModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, EventModule, Player])
], GuiModule);
export { GuiModule };
//# sourceMappingURL=gui.module.js.map