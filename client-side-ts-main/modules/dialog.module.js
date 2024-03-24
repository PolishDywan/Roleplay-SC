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
import { EventModule } from "./event.module";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "./gui.module";
let DialogModule = class DialogModule {
    event;
    gui;
    player;
    prevCursorVisibilityState;
    currentDialog;
    constructor(event, gui, player) {
        this.event = event;
        this.gui = gui;
        this.player = player;
    }
    get getCurrentDialog() {
        return this.currentDialog;
    }
    create(dialog) {
        this.player.openMenu();
        this.prevCursorVisibilityState = this.player.getIsCursorVisible;
        this.player.showCursor();
        this.gui.focusView();
        this.currentDialog = dialog;
        if (dialog.freezeGameControls) {
            this.player.blockGameControls(true);
        }
        this.event.emitGui("dialog:create", dialog);
    }
    destroy() {
        this.player.closeMenu();
        if (!this.prevCursorVisibilityState) {
            this.player.hideCursor();
            this.gui.unfocusView();
        }
        if (this.currentDialog.freezeGameControls) {
            this.player.blockGameControls(false);
        }
        this.currentDialog = undefined;
        this.event.emitGui("dialog:destroy");
    }
};
DialogModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, GuiModule, Player])
], DialogModule);
export { DialogModule };
//# sourceMappingURL=dialog.module.js.map