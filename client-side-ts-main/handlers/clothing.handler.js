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
import { foundation } from "../decorators/foundation";
import { EventModule } from "../modules/event.module";
import { ClothingModule } from "../modules/clothing.module";
import { onGui, onServer } from "../decorators/events";
import { CharacterModule } from "../modules/character.module";
import { GuiModule } from "../modules/gui.module";
import { Player } from "@extensions/player.extensions";
import native from "natives";
let ClothingHandler = class ClothingHandler {
    event;
    clothing;
    character;
    player;
    gui;
    oldDrawableId = 0;
    oldTextureId = 0;
    constructor(event, clothing, character, player, gui) {
        this.event = event;
        this.clothing = clothing;
        this.character = character;
        this.player = player;
        this.gui = gui;
    }
    onSetTorsoMenuShow() {
        this.player.blockGameControls(true);
        this.player.showCursor();
        this.gui.focusView();
        this.oldDrawableId = this.character.getCachedCharacter.torso;
        this.oldTextureId = this.character.getCachedCharacter.torsoTexture;
        this.event.emitGui("settorsomenu:show", native.getNumberOfPedDrawableVariations(alt.Player.local.scriptID, 3), this.character.getCachedCharacter.gender);
    }
    onUpdateTorso(drawableId, textureId) {
        this.character.updateTorso(alt.Player.local.scriptID, drawableId, textureId);
        this.event.emitGui("settorsomenu:setmaxtextures", native.getNumberOfPedTextureVariations(alt.Player.local.scriptID, 3, drawableId) - 1);
    }
    onSaveTorso(drawableId, textureId) {
        this.player.blockGameControls(false);
        this.player.hideCursor();
        this.gui.unfocusView();
        this.character.updateTorso(alt.Player.local.scriptID, drawableId, textureId);
        this.event.emitServer("settorsomenu:savetorso", drawableId, textureId);
    }
    onClose() {
        this.player.blockGameControls(false);
        this.player.hideCursor();
        this.gui.unfocusView();
        this.character.updateTorso(alt.Player.local.scriptID, this.oldDrawableId, this.oldTextureId);
    }
};
__decorate([
    onServer("settorsomenu:show"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClothingHandler.prototype, "onSetTorsoMenuShow", null);
__decorate([
    onGui("settorsomenu:updatetorso"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ClothingHandler.prototype, "onUpdateTorso", null);
__decorate([
    onGui("settorsomenu:savetorso"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], ClothingHandler.prototype, "onSaveTorso", null);
__decorate([
    onGui("settorsomenu:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClothingHandler.prototype, "onClose", null);
ClothingHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, ClothingModule, CharacterModule, Player, GuiModule])
], ClothingHandler);
export { ClothingHandler };
//# sourceMappingURL=clothing.handler.js.map