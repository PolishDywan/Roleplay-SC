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
import { foundation } from "../../decorators/foundation";
import { LoggerModule } from "../../modules/logger.module";
import { on, onGui, onServer } from "../../decorators/events";
import { Player } from "../../extensions/player.extensions";
import { GuiModule } from "../../modules/gui.module";
import { EventModule } from "../../modules/event.module";
import alt from "alt-client";
import { loadModel } from "../../helpers";
import native from "natives";
import { CameraModule } from "../../modules/camera.module";
import { CharacterModule } from "../../modules/character.module";
import { UpdateModule } from "../../modules/update.module";
import { ClothingModule } from "../../modules/clothing.module";
import { GenderType } from "@enums/gender.type";
let ClothingStoreHandler = class ClothingStoreHandler {
    logger;
    player;
    gui;
    event;
    camera;
    character;
    update;
    clothing;
    everyTickRef;
    pedId;
    newClothes = undefined;
    constructor(logger, player, gui, event, camera, character, update, clothing) {
        this.logger = logger;
        this.player = player;
        this.gui = gui;
        this.event = event;
        this.camera = camera;
        this.character = character;
        this.update = update;
        this.clothing = clothing;
    }
    async onStartChangeClothes(character) {
        if (!this.player.getIsInInterior) {
            return;
        }
        this.newClothes = undefined;
        this.player.openMenu();
        this.player.freeze();
        this.player.showCursor();
        this.player.lockCamera(true);
        this.player.setVisible(false);
        this.player.blockGameControls(true);
        this.gui.focusView();
        await this.loadPed(character);
        this.createCamera();
        this.event.emitGui("gui:routeto", "clothingstore");
    }
    onReset() {
        native.deletePed(this.pedId);
    }
    onGetCharacter() {
        this.event.emitGui("clothingstore:setcharacter", this.clothing.getMaxDrawableVariations(this.pedId), this.character.getCachedCharacter.gender);
    }
    onUpdateCharacter(clothes) {
        this.newClothes = clothes;
        this.event.emitGui("clothesmenu:setmaxtexturevariation", this.clothing.getMaxTextureVariations(this.pedId, clothes));
        this.character.updateClothes(clothes, this.pedId, this.character.getCachedCharacter.gender);
    }
    onRotateCharacter(dir) {
        this.update.remove(this.everyTickRef);
        this.everyTickRef = this.update.add(() => this.tick(dir));
    }
    onRotateStop() {
        this.update.remove(this.everyTickRef);
    }
    onClose() {
        this.event.emitServer("clothingstore:cancel");
        this.close();
    }
    onRequestBuy() {
        if (this.newClothes === undefined) {
            return;
        }
        this.event.emitServer("clothingstore:requestitems", JSON.stringify(this.newClothes));
        this.close();
    }
    close() {
        this.onReset();
        this.player.closeMenu();
        this.player.unfreeze();
        this.player.hideCursor();
        this.player.lockCamera(false);
        this.player.setVisible(true);
        this.player.blockGameControls(false);
        this.gui.unfocusView();
        native.deletePed(this.pedId);
        this.camera.destroyCamera();
        this.event.emitGui("gui:routeto", "game");
    }
    createCamera() {
        const pos = new alt.Vector3(71.12921, -1388.6207, 29.395094);
        const rot = new alt.Vector3(-2.91335, 0, 0);
        this.camera.createCamera(pos, rot);
    }
    async loadPed(character) {
        let modelId = 0;
        if (character.gender === GenderType.MALE) {
            await loadModel(1885233650);
            modelId = 1885233650;
        }
        if (character.gender === GenderType.FEMALE) {
            await loadModel(2627665880);
            modelId = 2627665880;
        }
        this.pedId = native.createPed(2, modelId, 71.1033, -1387.0286, 28.364136, 178.58267, false, false);
        this.character.apply(character, this.pedId);
    }
    tick(dir) {
        let heading = native.getEntityHeading(this.pedId);
        const newHeading = (heading += dir);
        native.setEntityHeading(this.pedId, newHeading);
    }
};
__decorate([
    onServer("clothingstore:startchangeclothes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClothingStoreHandler.prototype, "onStartChangeClothes", null);
__decorate([
    onServer("clothingstore:reset"),
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClothingStoreHandler.prototype, "onReset", null);
__decorate([
    onGui("clothingstore:getcharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClothingStoreHandler.prototype, "onGetCharacter", null);
__decorate([
    onGui("clothingstore:updatechar"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ClothingStoreHandler.prototype, "onUpdateCharacter", null);
__decorate([
    onGui("clothingstore:rotatecharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ClothingStoreHandler.prototype, "onRotateCharacter", null);
__decorate([
    onGui("clothingstore:rotatestop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClothingStoreHandler.prototype, "onRotateStop", null);
__decorate([
    onGui("clothingstore:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClothingStoreHandler.prototype, "onClose", null);
__decorate([
    onGui("clothingstore:requestbuy"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClothingStoreHandler.prototype, "onRequestBuy", null);
ClothingStoreHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, Player, GuiModule, EventModule, CameraModule, CharacterModule, UpdateModule, ClothingModule])
], ClothingStoreHandler);
export { ClothingStoreHandler };
//# sourceMappingURL=clothing-store.handler.js.map