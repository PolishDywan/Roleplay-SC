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
import { singleton } from "tsyringe";
import { EventModule } from "./event.module";
import { UpdateModule } from "./update.module";
import { Player } from "@extensions/player.extensions";
import { LoggerModule } from "./logger.module";
import { getGroundZ } from "../helpers";
import { MathModule } from "./math.module";
import { NotificationModule } from "./notification.module";
import { GuiModule } from "./gui.module";
import { FreeCamModule } from "./free-cam.module";
let InventoryModule = class InventoryModule {
    event;
    update;
    gui;
    player;
    logger;
    math;
    notification;
    freecam;
    inventories = [];
    blocked = false;
    constructor(event, update, gui, player, logger, math, notification, freecam) {
        this.event = event;
        this.update = update;
        this.gui = gui;
        this.player = player;
        this.logger = logger;
        this.math = math;
        this.notification = notification;
        this.freecam = freecam;
    }
    setup(inventories) {
        this.inventories = inventories;
    }
    open() {
        if (this.player.getIsAnyMenuOpen || this.player.isInAPrison || !this.player.isSpawnedCharacter || this.freecam.isActive || this.player.isInvBlocked || this.player.getIsAnyTextOpen) {
            return;
        }
        this.event.emitServer("inventory:request");
    }
    close() {
        if (!this.player.getIsInventoryOpen || this.blocked)
            return;
        this.player.setIsInventoryOpen = false;
        this.gui.unfocusView();
        this.player.hideCursor();
        this.player.lockCamera(false);
        this.player.blockGameControls(false);
        this.blocked = false;
        this.event.emitGui("inventory:toggleui", false);
        alt.setTimeout(() => {
            this.player.blockESC(false);
        }, 100);
    }
    splitItem(itemId, amountToSplit) {
        this.event.emitServer("inventory:splititem", itemId, amountToSplit);
    }
    giveItemToCharacter(characterId, itemId) {
        this.event.emitServer("item:giveitemtocharacter", characterId, itemId);
    }
    swapItem(draggingItemId, droppedItemId) {
        this.event.emitServer("inventory:swapitem", draggingItemId, droppedItemId);
    }
    switchItem(invId, itemId) {
        this.event.emitServer("inventory:switchitem", invId, itemId);
    }
    placeItem(itemId) {
        const local = alt.Player.local;
        const frontPos = this.math.getEntityFrontPosition(local.scriptID, 0.5);
        const pos = new alt.Vector3(frontPos.x, frontPos.y, local.pos.z - 1);
        const z = getGroundZ(pos.x, pos.y, pos.z, 10);
        const itemPosition = new alt.Vector3(pos.x, pos.y, z);
        if (this.math.distance(alt.Player.local.pos, itemPosition) > 2) {
            return;
        }
        const inventoryDrop = {
            itemId: itemId, position: itemPosition
        };
        this.event.emitServer("placeableitem:place", JSON.stringify(inventoryDrop));
    }
};
InventoryModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, UpdateModule, GuiModule, Player, LoggerModule, MathModule, NotificationModule, FreeCamModule])
], InventoryModule);
export { InventoryModule };
//# sourceMappingURL=inventory.module.js.map