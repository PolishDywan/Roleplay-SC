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
import * as native from "natives";
import { singleton } from "tsyringe";
import { LoggerModule } from "../../modules/logger.module";
import { CharacterModule } from "../../modules/character.module";
import { CameraModule } from "../../modules/camera.module";
import { EventModule } from "../../modules/event.module";
import { Player } from "../../extensions/player.extensions";
import { on, onGui, onServer } from "../../decorators/events";
import { foundation } from "../../decorators/foundation";
import { LoadingSpinnerModule } from "../../modules/loading-spinner.module";
import { GenderType } from "@enums/gender.type";
import { loadModel } from "../../helpers";
import { GuiModule } from "../../modules/gui.module";
import { UpdateModule } from "../../modules/update.module";
let CharacterSelectorHandler = class CharacterSelectorHandler {
    event;
    logger;
    character;
    camera;
    player;
    loading;
    gui;
    update;
    pedId;
    characterDatas = [];
    lastSelectedCharacterId;
    constructor(event, logger, character, camera, player, loading, gui, update) {
        this.event = event;
        this.logger = logger;
        this.character = character;
        this.camera = camera;
        this.player = player;
        this.loading = loading;
        this.gui = gui;
        this.update = update;
    }
    async openCharSelector(characterDatas, lastSelectedCharacterId) {
        this.characterDatas = characterDatas;
        this.player.showCursor();
        this.player.isSpawnedCharacter = false;
        this.player.hideRadarAndHud(true);
        this.player.blockGameControls(true);
        this.createCamera();
        this.lastSelectedCharacterId = lastSelectedCharacterId;
        if (this.characterDatas.length !== 0 && this.lastSelectedCharacterId !== undefined) {
            const lastCharacterData = this.characterDatas.find(cc => cc.character.id === this.lastSelectedCharacterId);
            if (lastCharacterData) {
                await this.loadPed(lastCharacterData);
            }
        }
        this.event.emitGui("gui:routeto", "charselector");
        this.loading.show("Lade Charakterauswahl...");
        alt.setTimeout(() => {
            this.player.fadeIn(500);
            this.player.unblurScreen(500);
            this.loading.hide();
            this.gui.focusView();
        }, 700);
    }
    onClose() {
        this.resetCharacter();
    }
    onUpdateCharacters(characterDatas, lastSelectedCharacterId) {
        this.characterDatas = characterDatas;
        this.lastSelectedCharacterId = lastSelectedCharacterId;
        if (this.characterDatas.length !== 0 && this.lastSelectedCharacterId !== undefined) {
            const lastCharacterData = this.characterDatas.find(cc => cc.character.id === this.lastSelectedCharacterId);
            if (lastCharacterData) {
                this.loadPed(lastCharacterData);
            }
        }
        else {
            this.resetCharacter();
        }
        this.event.emitGui("charselector:setup", this.characterDatas.map(c => c.character), this.lastSelectedCharacterId);
    }
    onCharSelectorLoaded() {
        this.event.emitGui("charselector:setup", this.characterDatas.map(c => c.character), this.lastSelectedCharacterId);
    }
    resetCharacter() {
        if (this.pedId !== undefined) {
            native.deletePed(this.pedId);
            this.pedId = undefined;
        }
    }
    async selectCharacter(id) {
        await this.loadPed(this.characterDatas.find(c => c.character.id === id));
    }
    onPlay(id) {
        this.player.fadeOut(500);
        alt.setTimeout(() => {
            this.event.emitServer("charselector:play", id);
        }, 600);
    }
    onNewChar() {
        this.player.fadeOut(500);
        alt.setTimeout(() => {
            this.event.emitServer("charcreator:requestnewchar");
        }, 700);
    }
    createCamera() {
        const pos = new alt.Vector3(402.7, -998.15, -98.18);
        const rot = new alt.Vector3(-26.96, 0, -3.85);
        this.camera.createCamera(pos, rot);
    }
    async loadPed(characterData) {
        this.onClose();
        let modelId = 0;
        if (characterData.character.gender === GenderType.MALE) {
            modelId = 1885233650;
        }
        if (characterData.character.gender === GenderType.FEMALE) {
            modelId = 2627665880;
        }
        await loadModel(modelId);
        this.pedId = native.createPed(2, modelId, 402.7121, -996.778, -100, 180, false, false);
        this.character.apply(characterData.character, this.pedId);
        if (characterData.clothings) {
            this.character.updateClothes(characterData.clothings, this.pedId, characterData.character.gender);
        }
    }
};
__decorate([
    onServer("charselector:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", Promise)
], CharacterSelectorHandler.prototype, "openCharSelector", null);
__decorate([
    onServer("charselector:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterSelectorHandler.prototype, "onClose", null);
__decorate([
    onServer("charselector:update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Number]),
    __metadata("design:returntype", void 0)
], CharacterSelectorHandler.prototype, "onUpdateCharacters", null);
__decorate([
    onGui("charselector:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterSelectorHandler.prototype, "onCharSelectorLoaded", null);
__decorate([
    onGui("charselector:reset"),
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterSelectorHandler.prototype, "resetCharacter", null);
__decorate([
    onGui("charselector:select"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharacterSelectorHandler.prototype, "selectCharacter", null);
__decorate([
    onGui("charselector:play"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CharacterSelectorHandler.prototype, "onPlay", null);
__decorate([
    onGui("charselector:newchar"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterSelectorHandler.prototype, "onNewChar", null);
CharacterSelectorHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule, CharacterModule, CameraModule, Player, LoadingSpinnerModule, GuiModule, UpdateModule])
], CharacterSelectorHandler);
export { CharacterSelectorHandler };
//# sourceMappingURL=character-selector.handler.js.map