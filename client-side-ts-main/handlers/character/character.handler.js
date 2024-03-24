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
import { CharacterModule } from "../../modules/character.module";
import { on, onGui, onServer } from "../../decorators/events";
import { foundation } from "../../decorators/foundation";
import { Player } from "../../extensions/player.extensions";
import { CameraModule } from "../../modules/camera.module";
import { EventModule } from "../../modules/event.module";
import { GuiModule } from "../../modules/gui.module";
import { WeatherModule } from "../../modules/weather.module";
import { HouseModule } from "../../modules/house.module";
import { LoggerModule } from "../../modules/logger.module";
import { PhoneModule } from "../../modules/phone.module";
import { LoadingSpinnerModule } from "../../modules/loading-spinner.module";
import { KeyCodes } from "@enums/keycode.type";
let CharacterHandler = class CharacterHandler {
    character;
    player;
    camera;
    event;
    gui;
    weather;
    house;
    loading;
    logger;
    phone;
    isMenuOpen = false;
    constructor(character, player, camera, event, gui, weather, house, loading, logger, phone) {
        this.character = character;
        this.player = player;
        this.camera = camera;
        this.event = event;
        this.gui = gui;
        this.weather = weather;
        this.house = house;
        this.loading = loading;
        this.logger = logger;
        this.phone = phone;
    }
    onKeydown(key) {
        if (this.player.isInAPrison || !this.player.isSpawnedCharacter || !this.player.isControlsEnabled) {
            return;
        }
        if (key === KeyCodes.F9) {
            if (this.isMenuOpen || this.player.getIsAnyMenuOpen) {
                this.setMenuState(false);
            }
            else {
                if (this.player.isSpawnedCharacter) {
                    this.event.emitServer("character:requestmenu");
                }
            }
        }
    }
    updateModel(character) {
        this.character.apply(character, alt.Player.local.scriptID);
    }
    spawn(character) {
        this.player.characterId = character.id;
        if (this.player.getIsPhoneOpen) {
            this.phone.close();
        }
        this.player.hideCursor();
        this.player.unfreeze();
        this.player.lockCamera(false, true);
        this.player.setVisible(true);
        this.player.showHud();
        this.player.blockGameControls(false);
        this.player.isSpawnedCharacter = true;
        this.gui.unfocusView();
        this.camera.destroyCamera();
        this.loading.hide();
        this.weather.startSync();
        this.house.updateBlips();
        this.event.emitGui("gui:routeto", "game");
        alt.setTimeout(() => {
            this.player.fadeIn(500);
            this.player.updatePositionInHUD(true);
            this.player.updateHealthInHUD(true);
        }, 600);
        const localPlayer = alt.Player.local;
        native.setPedConfigFlag(localPlayer, 35, false); // Disable Auto Helmet when your on a motorcycle 
        native.setPedConfigFlag(localPlayer, 241, true); // Disable Stopping Engine
        native.setPedConfigFlag(localPlayer, 429, true); // Disable Starting Engine
        native.setPedConfigFlag(localPlayer, 184, true); // Disable Seat Shuffling
        //Disable headshot
        native.setPedSuffersCriticalHits(localPlayer, false);
        native.setAudioFlag("DisableFlightMusic", true);
        alt.setStat("stamina" /* alt.StatName.Stamina */, 100);
        alt.setStat("lung_capacity" /* alt.StatName.LungCapacity */, 100);
        alt.setStat("shooting_ability" /* alt.StatName.Shooting */, 100);
        alt.setStat("flying_ability" /* alt.StatName.Flying */, 100);
    }
    onSync(character) {
        this.event.emitGui("character:sync", character.id);
        this.character.apply(character, alt.Player.local.scriptID);
    }
    onUpdateTorso(torso) {
        this.character.updateTorso(alt.Player.local.scriptID, torso, 0);
    }
    onRequestClose() {
        this.setMenuState(false);
    }
    onShowMenu() {
        this.setMenuState(true);
    }
    setMenuState(state) {
        if (!this.player.isSpawnedCharacter) {
            return;
        }
        if (this.player.getIsAnyMenuOpen && !this.isMenuOpen || this.player.getIsInventoryOpen) {
            return;
        }
        this.isMenuOpen = state;
        if (state) {
            this.player.openMenu();
        }
        else {
            this.player.closeMenu();
        }
        this.player.blockGameControls(this.isMenuOpen);
        if (this.isMenuOpen) {
            this.player.showCursor();
            this.gui.focusView();
        }
        else {
            this.player.hideCursor();
            this.gui.unfocusView();
        }
        this.event.emitGui("charactermenu:toggle", this.isMenuOpen);
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CharacterHandler.prototype, "onKeydown", null);
__decorate([
    onServer("character:apply"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CharacterHandler.prototype, "updateModel", null);
__decorate([
    onServer("character:spawn"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CharacterHandler.prototype, "spawn", null);
__decorate([
    onServer("character:sync"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CharacterHandler.prototype, "onSync", null);
__decorate([
    onServer("character:updatetorso"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CharacterHandler.prototype, "onUpdateTorso", null);
__decorate([
    onGui("charactermenu:requestclose"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterHandler.prototype, "onRequestClose", null);
__decorate([
    onServer("character:showmenu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterHandler.prototype, "onShowMenu", null);
CharacterHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [CharacterModule, Player, CameraModule, EventModule, GuiModule, WeatherModule, HouseModule, LoadingSpinnerModule, LoggerModule, PhoneModule])
], CharacterHandler);
export { CharacterHandler };
//# sourceMappingURL=character.handler.js.map