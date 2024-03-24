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
import { EventModule } from "../modules/event.module";
import { KeyCodes } from "@enums/keycode.type";
import { on, onGui, onServer } from "../decorators/events";
import { Player } from "@extensions/player.extensions";
import { InventoryModule } from "../modules/inventory.module";
import { FreeCamModule } from "../modules/free-cam.module";
import { GuiModule } from "../modules/gui.module";
import { UpdateModule } from "../modules/update.module";
import alt from "alt-client";
import { MathModule } from "../modules/math.module";
import { LoggerModule } from "../modules/logger.module";
import { InventoryType } from "@enums/inventory.type";
let InventoryHandler = class InventoryHandler {
    event;
    player;
    inventory;
    freecam;
    gui;
    update;
    math;
    logger;
    ready = false;
    tickId;
    openPosition;
    constructor(event, player, inventory, freecam, gui, update, math, logger) {
        this.event = event;
        this.player = player;
        this.inventory = inventory;
        this.freecam = freecam;
        this.gui = gui;
        this.update = update;
        this.math = math;
        this.logger = logger;
    }
    onKeydown(key) {
        if (!this.ready || this.player.getIsAnyTextOpen)
            return;
        if (key === KeyCodes.I) {
            if (!this.player.getIsInventoryOpen) {
                this.inventory.open();
            }
            else {
                this.event.emitServer("inventory:requestclose");
            }
        }
        if (key === KeyCodes.ESCAPE) {
            if (this.player.getIsChatting) {
                return;
            }
            if (!this.player.getIsInventoryOpen)
                return;
            this.event.emitServer("inventory:requestclose");
        }
    }
    onInventoryOpen(inventories) {
        this.player.lockCamera(true);
        this.player.blockESC(true);
        this.player.setIsInventoryOpen = true;
        this.player.showCursor();
        this.gui.focusView();
        this.event.emitGui("inventory:toggleui", true);
        if (inventories.some(i => i.inventoryType === InventoryType.GROUP_MEMBER || i.inventoryType === InventoryType.VEHICLE || i.inventoryType === InventoryType.FRISK)) {
            this.openPosition = alt.Player.local.pos;
            this.tickId = this.update.add(() => this.tick());
        }
        this.onInventoryUpdate(inventories);
    }
    onInventoryUpdate(inventories) {
        this.inventory.setup(inventories);
        if (this.ready) {
            this.event.emitGui("inventory:setup", this.inventory.inventories);
        }
    }
    onInventoryLoaded() {
        this.ready = true;
        this.event.emitGui("inventory:setup", this.inventory.inventories);
    }
    onSplitItem(itemId, amountToSplit) {
        this.inventory.splitItem(itemId, amountToSplit);
    }
    onNoteItem(itemId, note) {
        this.event.emitServer("inventory:noteitem", itemId, note);
    }
    onRenameItem(itemId, newName) {
        this.event.emitServer("inventory:renameitem", itemId, newName);
    }
    onGiveItemToCharacter(characterId, itemId) {
        this.inventory.giveItemToCharacter(characterId, itemId);
    }
    onSwapItem(draggedItemId, droppedItemId) {
        this.inventory.swapItem(draggedItemId, droppedItemId);
    }
    onSwitchItem(invId, itemId) {
        this.inventory.switchItem(invId, itemId);
    }
    onItemPlace(itemId) {
        this.inventory.placeItem(itemId);
    }
    onClose() {
        this.inventory.close();
        if (this.tickId !== undefined) {
            this.update.remove(this.tickId);
            this.tickId = undefined;
        }
    }
    tick() {
        if (this.math.distance(alt.Player.local.pos, this.openPosition) > 0.5) {
            this.event.emitServer("inventory:requestclose");
        }
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onKeydown", null);
__decorate([
    onServer("inventory:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onInventoryOpen", null);
__decorate([
    onServer("inventory:update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onInventoryUpdate", null);
__decorate([
    onGui("inventory:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onInventoryLoaded", null);
__decorate([
    onGui("inventory:splititem"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onSplitItem", null);
__decorate([
    onGui("inventory:noteitem"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onNoteItem", null);
__decorate([
    onGui("inventory:renameitem"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onRenameItem", null);
__decorate([
    onGui("item:giveitemtocharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onGiveItemToCharacter", null);
__decorate([
    onGui("inventory:swapitem"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onSwapItem", null);
__decorate([
    onGui("inventory:switchitem"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onSwitchItem", null);
__decorate([
    onGui("item:placeonground"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onItemPlace", null);
__decorate([
    onServer("inventory:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InventoryHandler.prototype, "onClose", null);
InventoryHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player, InventoryModule, FreeCamModule, GuiModule, UpdateModule, MathModule, LoggerModule])
], InventoryHandler);
export { InventoryHandler };
//# sourceMappingURL=inventory.handler.js.map