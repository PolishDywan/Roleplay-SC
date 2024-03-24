var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import alt from "alt-client";
import native from "natives";
import { singleton } from "tsyringe";
import { foundation } from "../../decorators/foundation";
import { LoggerModule } from "../../modules/logger.module";
import { on, onGui, onServer } from "../../decorators/events";
import { Player } from "../../extensions/player.extensions";
import { GuiModule } from "../../modules/gui.module";
import { EventModule } from "../../modules/event.module";
import { CameraModule } from "../../modules/camera.module";
import { loadModel } from "../../helpers";
import { CharacterModule } from "../../modules/character.module";
import { UpdateModule } from "../../modules/update.module";
import { GenderType } from "@enums/gender.type";
let TattooStudioHandler = class TattooStudioHandler {
    logger;
    player;
    gui;
    event;
    camera;
    character;
    update;
    everyTickRef;
    pedId;
    newTattoos;
    constructor(logger, player, gui, event, camera, character, update) {
        this.logger = logger;
        this.player = player;
        this.gui = gui;
        this.event = event;
        this.camera = camera;
        this.character = character;
        this.update = update;
    }
    async onOpen(character) {
        this.player.openMenu();
        this.player.freeze();
        this.player.showCursor();
        this.player.lockCamera(true);
        this.player.setVisible(false);
        this.player.hideRadarAndHud();
        this.player.blockGameControls(true);
        this.gui.focusView();
        await this.loadPed(character);
        this.createCamera();
        this.event.emitGui("gui:routeto", "tattoostudio");
    }
    onReset() {
        native.deletePed(this.pedId);
    }
    onGetCharacter() {
        this.event.emitGui("tattoostudio:setcharacter", this.character.getCachedCharacter);
    }
    onUpdateCharacter(tattoos) {
        this.newTattoos = tattoos;
        this.character.updateAppearance(this.character.getCachedCharacter.appearances, this.character.getCachedCharacter.gender, this.pedId);
        this.character.updateTattoos(tattoos, this.pedId);
    }
    onRotateCharacter(dir) {
        this.update.remove(this.everyTickRef);
        this.everyTickRef = this.update.add(() => this.tick(dir));
    }
    onRotateStop() {
        this.update.remove(this.everyTickRef);
    }
    onClose() {
        this.event.emitServer("tattoostudio:cancel");
        this.close();
    }
    onBuy() {
        this.event.emitServer("tattoostudio:requestbuydialog", JSON.stringify(this.newTattoos));
        this.close();
    }
    close() {
        this.onReset();
        this.player.closeMenu();
        this.player.unfreeze();
        this.player.hideCursor();
        this.player.lockCamera(false);
        this.player.setVisible(true);
        this.player.showRadarAndHud();
        this.player.blockGameControls(false);
        this.gui.unfocusView();
        native.deletePed(this.pedId);
        this.camera.destroyCamera();
        this.event.emitGui("gui:routeto", "game");
    }
    createCamera() {
        const pos = new alt.Vector3(1321.6317, -1652.8184, 52.647587);
        const rot = new alt.Vector3(-15.74, 0, -158.44);
        this.camera.createCamera(pos, rot, 60);
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
        this.pedId = native.createPed(2, modelId, 1321.7935, -1654.6022, 51.26306, 0, false, false);
        this.character.apply(character, this.pedId);
    }
    tick(dir) {
        let heading = native.getEntityHeading(this.pedId);
        const newHeading = (heading += dir);
        native.setEntityHeading(this.pedId, newHeading);
    }
};
__decorate([
    onServer("tattoostudio:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TattooStudioHandler.prototype, "onOpen", null);
__decorate([
    onServer("tattoostudio:reset"),
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TattooStudioHandler.prototype, "onReset", null);
__decorate([
    onGui("tattoostudio:getcharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TattooStudioHandler.prototype, "onGetCharacter", null);
__decorate([
    onGui("tattoostudio:updatechar"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TattooStudioHandler.prototype, "onUpdateCharacter", null);
__decorate([
    onGui("tattoostudio:rotatecharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TattooStudioHandler.prototype, "onRotateCharacter", null);
__decorate([
    onGui("tattoostudio:rotatestop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TattooStudioHandler.prototype, "onRotateStop", null);
__decorate([
    onGui("tattoostudio:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TattooStudioHandler.prototype, "onClose", null);
__decorate([
    onGui("tattoostudio:buy"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TattooStudioHandler.prototype, "onBuy", null);
TattooStudioHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, Player, GuiModule, EventModule, CameraModule, CharacterModule, UpdateModule])
], TattooStudioHandler);
export { TattooStudioHandler };
//# sourceMappingURL=tattoo-studio.handler.js.map