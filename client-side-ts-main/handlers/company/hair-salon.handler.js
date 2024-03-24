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
let HairSalonHandler = class HairSalonHandler {
    logger;
    player;
    gui;
    event;
    camera;
    character;
    update;
    everyTickRef;
    pedId;
    newAppearances;
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
        this.player.hideRadarAndHud();
        this.player.setVisible(false);
        this.player.blockGameControls(true);
        this.gui.focusView();
        await this.loadPed(character);
        this.createCamera();
        this.event.emitGui("gui:routeto", "hairsalon");
    }
    onReset() {
        native.deletePed(this.pedId);
    }
    onGetCharacter() {
        this.event.emitGui("hairsalon:setcharacter", this.character.getCachedCharacter);
    }
    onUpdateCharacter(appearances) {
        this.newAppearances = appearances;
        this.character.updateAppearance(appearances, this.character.getCachedCharacter.gender, this.pedId);
    }
    onRotateCharacter(dir) {
        this.update.remove(this.everyTickRef);
        this.everyTickRef = this.update.add(() => this.tick(dir));
    }
    onRotateStop() {
        this.update.remove(this.everyTickRef);
    }
    onClose() {
        this.event.emitServer("hairsalon:cancel");
        this.close();
    }
    onBuy() {
        this.event.emitServer("hairsalon:requestbuydialog", JSON.stringify(this.newAppearances));
        this.close();
    }
    close() {
        this.onReset();
        this.player.closeMenu();
        this.player.unfreeze();
        this.player.hideCursor();
        this.player.lockCamera(false);
        this.player.showRadarAndHud();
        this.player.setVisible(true);
        this.player.blockGameControls(false);
        this.gui.unfocusView();
        native.deletePed(this.pedId);
        this.camera.destroyCamera();
        this.event.emitGui("gui:routeto", "game");
    }
    createCamera() {
        const pos = new alt.Vector3(139.14793, -1708.0115, 29.952124);
        const rot = new alt.Vector3(-1, 0, -128.81789);
        this.camera.createCamera(pos, rot, 55);
    }
    async loadPed(character) {
        let modelId = 0;
        if (character.gender === GenderType.MALE) {
            modelId = 1885233650;
        }
        if (character.gender === GenderType.FEMALE) {
            modelId = 2627665880;
        }
        await loadModel(modelId);
        this.pedId = native.createPed(2, modelId, 139.76703, -1708.5758, 28.313599, 35, false, false);
        this.character.apply(character, this.pedId);
    }
    tick(dir) {
        let heading = native.getEntityHeading(this.pedId);
        const newHeading = (heading += dir);
        native.setEntityHeading(this.pedId, newHeading);
    }
};
__decorate([
    onServer("hairsalon:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HairSalonHandler.prototype, "onOpen", null);
__decorate([
    onServer("hairsalon:reset"),
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HairSalonHandler.prototype, "onReset", null);
__decorate([
    onGui("hairsalon:getcharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HairSalonHandler.prototype, "onGetCharacter", null);
__decorate([
    onGui("hairsalon:updatechar"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HairSalonHandler.prototype, "onUpdateCharacter", null);
__decorate([
    onGui("hairsalon:rotatecharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HairSalonHandler.prototype, "onRotateCharacter", null);
__decorate([
    onGui("hairsalon:rotatestop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HairSalonHandler.prototype, "onRotateStop", null);
__decorate([
    onGui("hairsalon:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HairSalonHandler.prototype, "onClose", null);
__decorate([
    onGui("hairsalon:buy"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HairSalonHandler.prototype, "onBuy", null);
HairSalonHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, Player, GuiModule, EventModule, CameraModule, CharacterModule, UpdateModule])
], HairSalonHandler);
export { HairSalonHandler };
//# sourceMappingURL=hair-salon.handler.js.map