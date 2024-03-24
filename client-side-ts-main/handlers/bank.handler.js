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
import { onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "../modules/gui.module";
let BankHandler = class BankHandler {
    event;
    gui;
    player;
    constructor(event, gui, player) {
        this.event = event;
        this.gui = gui;
        this.player = player;
    }
    onOpenMenu() {
        this.player.openMenu();
        this.player.freeze();
        this.player.showCursor();
        this.gui.focusView();
        this.event.emitGui("atm:openmenu");
    }
};
__decorate([
    onServer("atm:openmenu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BankHandler.prototype, "onOpenMenu", null);
BankHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, GuiModule, Player])
], BankHandler);
export { BankHandler };
//# sourceMappingURL=bank.handler.js.map