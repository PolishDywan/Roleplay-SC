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
import { on, onGui, onServer } from "../decorators/events";
import { Player } from "@extensions/player.extensions";
import { LoggerModule } from "../modules/logger.module";
import { EventModule } from "../modules/event.module";
import { KeyCodes } from "@enums/keycode.type";
import { InteractModule } from "../modules/interact.module";
import { ContextModule } from "../modules/context.module";
let ContextMenuHandler = class ContextMenuHandler {
    interact;
    player;
    logger;
    event;
    contextMenu;
    constructor(interact, player, logger, event, contextMenu) {
        this.interact = interact;
        this.player = player;
        this.logger = logger;
        this.event = event;
        this.contextMenu = contextMenu;
    }
    onKeydown(key) {
        if (key === KeyCodes.ALT) {
            if (this.player.isInAPrison || !this.player.isSpawnedCharacter || !this.player.isControlsEnabled || this.player.hasInteractionOpen) {
                this.logger.info("this.player.isInAPrison: " + this.player.isInAPrison);
                this.logger.info("this.player.isSpawnedCharacter: " + this.player.isSpawnedCharacter);
                this.logger.info("this.player.isControlsEnabled: " + this.player.isControlsEnabled);
                this.logger.info("this.player.hasInteractionOpen: " + this.player.hasInteractionOpen);
                return;
            }
            this.interact.startInteract();
        }
    }
    keyup(key) {
        if (this.player.isInAPrison || !this.player.isSpawnedCharacter || !this.player.isControlsEnabled) {
            return;
        }
        if (key === KeyCodes.ALT) {
            if (this.player.hasInteractionOpen) {
                this.interact.stopInteraction();
            }
        }
    }
    onOpen(title, actions) {
        this.contextMenu.open(title, actions);
    }
    onSelectAction(action) {
        this.event.emitServer(action.event, action.customData);
        this.contextMenu.close();
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContextMenuHandler.prototype, "onKeydown", null);
__decorate([
    on("keyup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContextMenuHandler.prototype, "keyup", null);
__decorate([
    onServer("contextmenu:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", void 0)
], ContextMenuHandler.prototype, "onOpen", null);
__decorate([
    onGui("contextmenu:selectaction"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ContextMenuHandler.prototype, "onSelectAction", null);
ContextMenuHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [InteractModule, Player, LoggerModule, EventModule, ContextModule])
], ContextMenuHandler);
export { ContextMenuHandler };
//# sourceMappingURL=context-menu.handler.js.map