var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as native from "natives";
import * as alt from "alt-client";
import { singleton } from "tsyringe";
import { EventModule } from "./event.module";
import { FreeCamModule } from "./free-cam.module";
import { Player } from "@extensions/player.extensions";
import { UpdateModule } from "./update.module";
import { InputType } from "@enums/input.type";
import { GuiModule } from "./gui.module";
let ChatModule = class ChatModule {
    event;
    freecam;
    player;
    gui;
    update;
    ready = false;
    inputActive = false;
    chatVisible = false;
    showTimestamp = false;
    updateId;
    constructor(event, freecam, player, gui, update) {
        this.event = event;
        this.freecam = freecam;
        this.player = player;
        this.gui = gui;
        this.update = update;
    }
    openChat() {
        if (!this.chatVisible || this.inputActive || this.player.getIsAnyTextOpen || this.player.getIsAnyTextOpen)
            return;
        if (this.freecam.isActive) {
            this.freecam.freeze();
        }
        this.player.showCursor();
        this.player.blockESC(true);
        this.gui.focusView();
        this.setChatInput(true);
    }
    closeChat(delay = 0) {
        if (!this.chatVisible)
            return;
        this.player.blockESC(false);
        this.setChatInput(false, delay);
    }
    sendMessage(message) {
        this.event.emitGui("chat:pushmessage", message);
    }
    toggleChatVisibility() {
        this.chatVisible = !this.chatVisible;
        this.event.emitGui("chat:togglevisibility", this.chatVisible);
    }
    toggleTimestamp() {
        this.showTimestamp = !this.showTimestamp;
        this.event.emitGui("chat:toggletimestamp", this.showTimestamp);
    }
    setChatInput(state, delay = 0) {
        this.player.setIsChatting = state;
        this.inputActive = state;
        if (state) {
            if (!this.updateId) {
                this.updateId = this.update.add(() => this.toggleActions(false));
            }
            this.player.blockGameControls(true);
        }
        else {
            alt.setTimeout(() => {
                if (!this.player.getIsInventoryOpen && !this.player.getIsPhoneOpen) {
                    this.player.hideCursor();
                    this.gui.unfocusView();
                }
                this.update.remove(this.updateId);
                this.updateId = null;
                this.player.blockGameControls(false);
                this.toggleActions(true);
            }, delay);
        }
        this.event.emitGui("chat:toggleinput", this.inputActive);
    }
    toggleActions(allowed) {
        native.disableControlAction(0, InputType.ENTER, allowed);
        native.disableControlAction(0, InputType.VEH_EXIT, allowed);
    }
};
ChatModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, FreeCamModule, Player, GuiModule, UpdateModule])
], ChatModule);
export { ChatModule };
//# sourceMappingURL=chat.module.js.map