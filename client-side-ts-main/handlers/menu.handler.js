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
import { onGui } from "../decorators/events";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "../modules/gui.module";
let MenuHandler = class MenuHandler {
    player;
    gui;
    constructor(player, gui) {
        this.player = player;
        this.gui = gui;
    }
    onClose() {
        this.player.closeMenu();
        this.player.unfreeze();
        this.player.hideCursor();
        this.gui.unfocusView();
    }
};
__decorate([
    onGui("menu:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenuHandler.prototype, "onClose", null);
MenuHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [Player, GuiModule])
], MenuHandler);
export { MenuHandler };
//# sourceMappingURL=menu.handler.js.map