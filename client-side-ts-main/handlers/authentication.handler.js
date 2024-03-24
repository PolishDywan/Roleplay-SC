var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as alt from "alt-client";
import { GuiModule } from "../modules/gui.module";
import { singleton } from "tsyringe";
import { EventModule } from "../modules/event.module";
import { on } from "../decorators/events";
import { foundation } from "../decorators/foundation";
import { Player } from "@extensions/player.extensions";
let AuthenticationHandler = class AuthenticationHandler {
    player;
    event;
    gui;
    constructor(player, event, gui) {
        this.player = player;
        this.event = event;
        this.gui = gui;
    }
    async guiIsReady() {
        // Discord offline
        if (alt.Discord.currentUser === null) {
            this.player.fadeIn(500);
            this.event.emitGui("gui:routeto", "offline");
            return;
        }
        try {
            const token = await alt.Discord.requestOAuth2Token("621370292345765900");
            this.gui.focusView();
            this.player.showCursor();
            this.event.emitServer("auth:requestlogin", alt.Discord.currentUser.id, token);
        }
        catch {
            this.player.fadeIn(500);
            this.event.emitGui("gui:routeto", "offline");
        }
    }
};
__decorate([
    on("gui:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthenticationHandler.prototype, "guiIsReady", null);
AuthenticationHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [Player, EventModule, GuiModule])
], AuthenticationHandler);
export { AuthenticationHandler };
//# sourceMappingURL=authentication.handler.js.map