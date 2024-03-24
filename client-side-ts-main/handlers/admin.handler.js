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
import { on, onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "../modules/gui.module";
import { AccountModule } from "../modules/account.module";
import { KeyCodes } from "@enums/keycode.type";
let AdminHandler = class AdminHandler {
    event;
    player;
    gui;
    account;
    isMenuOpen = false;
    constructor(event, player, gui, account) {
        this.event = event;
        this.player = player;
        this.gui = gui;
        this.account = account;
    }
    onKeydown(key) {
        if (this.player.isInAPrison || !this.player.isSpawnedCharacter || !this.player.isControlsEnabled) {
            return;
        }
        if (key === KeyCodes.F11) {
            if (this.isMenuOpen || this.player.getIsAnyMenuOpen) {
                this.setMenuState(false);
            }
            else {
                this.event.emitServer("admin:requestmenu");
            }
        }
    }
    onShowMenu() {
        this.setMenuState(true);
    }
    setMenuState(state) {
        if (!this.player.isSpawnedCharacter) {
            return;
        }
        if (this.player.getIsAnyMenuOpen && !this.isMenuOpen || this.player.getIsInventoryOpen) {
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
        this.event.emitGui("adminmenu:toggle", this.isMenuOpen);
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AdminHandler.prototype, "onKeydown", null);
__decorate([
    onServer("admin:showmenu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminHandler.prototype, "onShowMenu", null);
AdminHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player, GuiModule, AccountModule])
], AdminHandler);
export { AdminHandler };
//# sourceMappingURL=admin.handler.js.map