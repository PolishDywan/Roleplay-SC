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
import { onGui, onServer } from "../decorators/events";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "../modules/gui.module";
import { FactionType } from "@enums/faction.type";
import { EventModule } from "../modules/event.module";
import { LoggerModule } from "../modules/logger.module";
let MdcHandler = class MdcHandler {
    player;
    gui;
    event;
    logger;
    constructor(player, gui, event, logger) {
        this.player = player;
        this.gui = gui;
        this.event = event;
        this.logger = logger;
    }
    onOpen(factionType, canLogin, characterName, rankName) {
        this.player.openMenu();
        this.player.setIsAnyTextFieldFocused = true;
        this.player.showCursor();
        this.player.blurScreen(250);
        this.gui.focusView();
        this.event.emitGui("mdc:open", factionType, canLogin, characterName, rankName);
    }
    onClose() {
        this.player.closeMenu();
        this.player.setIsAnyTextFieldFocused = false;
        this.player.hideCursor();
        this.player.unblurScreen(250);
        this.gui.unfocusView();
        this.event.emitGui("mdc:close");
    }
};
__decorate([
    onServer("mdc:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Boolean, String, String]),
    __metadata("design:returntype", void 0)
], MdcHandler.prototype, "onOpen", null);
__decorate([
    onGui("mdc:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MdcHandler.prototype, "onClose", null);
MdcHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [Player, GuiModule, EventModule, LoggerModule])
], MdcHandler);
export { MdcHandler };
//# sourceMappingURL=mdc.handler.js.map