var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { KeyCodes } from "@enums/keycode.type";
import { foundation } from "../decorators/foundation";
import { singleton } from "tsyringe";
import { on, onServer } from "../decorators/events";
import { GuiModule } from "../modules/gui.module";
import { LoggerModule } from "../modules/logger.module";
let PlayersListHandler = class PlayersListHandler {
    event;
    player;
    gui;
    logger;
    isMenuOpen = false;
    constructor(event, player, gui, logger) {
        this.event = event;
        this.player = player;
        this.gui = gui;
        this.logger = logger;
    }
    onKeydown(key) {
        if (!this.player.isSpawnedCharacter) {
            return;
        }
        if (key === KeyCodes.O) {
            if (this.isMenuOpen) {
                this.setMenuState(false);
            }
            else {
                if (this.player.getIsAnyTextOpen) {
                    return;
                }
                this.event.emitServer("playerslist:requestmenu");
            }
        }
    }
    onShowMenu(players) {
        this.setMenuState(true, players);
    }
    setMenuState(state, players = []) {
        if (this.player.getIsAnyMenuOpen && !this.isMenuOpen) {
            return;
        }
        this.isMenuOpen = state;
        if (state) {
            this.player.openMenu();
        }
        else {
            this.player.closeMenu();
        }
        this.player.blockGameControls(this.isMenuOpen);
        if (this.isMenuOpen) {
            this.player.showCursor();
            this.gui.focusView();
        }
        else {
            this.player.hideCursor();
            this.gui.unfocusView();
        }
        this.event.emitGui("playerslist:toggle", this.isMenuOpen, players);
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayersListHandler.prototype, "onKeydown", null);
__decorate([
    onServer("playerslist:show"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PlayersListHandler.prototype, "onShowMenu", null);
PlayersListHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player, GuiModule, LoggerModule])
], PlayersListHandler);
export { PlayersListHandler };
//# sourceMappingURL=players-list.handler.js.map