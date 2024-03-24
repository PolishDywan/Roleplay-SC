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
import { injectable } from "tsyringe";
import { Player } from "../../extensions/player.extensions";
import { foundation } from "../../decorators/foundation";
import { on, onGui, onServer } from "../../decorators/events";
import { loadModel, UID } from "../../helpers";
import { DialogType } from "@enums/dialog.type";
import { CameraModule } from "../../modules/camera.module";
import { CharacterModule } from "../../modules/character.module";
import { EventModule } from "../../modules/event.module";
import { UpdateModule } from "../../modules/update.module";
import { LoggerModule } from "../../modules/logger.module";
import { LoadingSpinnerModule } from "../../modules/loading-spinner.module";
import { CharCreatorModule } from "../../modules/char-creator.module";
import { DialogModule } from "../../modules/dialog.module";
import { ClothingModule } from "../../modules/clothing.module";
import { CharacterCreatorPurchaseType } from "@enums/character-creator-purchase.type";
import { GenderType } from "@enums/gender.type";
import { GuiModule } from "modules/gui.module";
let CharacterCreatorHandler = class CharacterCreatorHandler {
    camera;
    character;
    player;
    event;
    update;
    logger;
    loading;
    charCreator;
    dialog;
    gui;
    clothing;
    pedId;
    everyTickRef;
    isNewCharacter = false;
    isTutorial = false;
    setNudeMode = false;
    camPortrait = {
        pos: new alt.Vector3(403.16586, -998.3614, -98.53971), rot: new alt.Vector3(-14.409467, 4.2688686, 28.610905)
    };
    camFace = {
        pos: new alt.Vector3(402.86017, -997.1442, -98.344), rot: new alt.Vector3(1.4960656, -0, 16.131594)
    };
    camTorso = {
        pos: new alt.Vector3(402.92615, -997.37085, -98.78486), rot: new alt.Vector3(1.4960656, 0, 16.131594)
    };
    camPants = {
        pos: new alt.Vector3(402.92615, -997.37085, -99.574425), rot: new alt.Vector3(1.4960656, 0, 16.131594)
    };
    camFeets = {
        pos: new alt.Vector3(402.92615, -997.37085, -99.67937), rot: new alt.Vector3(-19.803135, 4.268868, 15.383445)
    };
    characterPos = new alt.Vector3(402.857, -996.672, -100);
    lastIndex = 0;
    constructor(camera, character, player, event, update, logger, loading, charCreator, dialog, gui, clothing) {
        this.camera = camera;
        this.character = character;
        this.player = player;
        this.event = event;
        this.update = update;
        this.logger = logger;
        this.loading = loading;
        this.charCreator = charCreator;
        this.dialog = dialog;
        this.gui = gui;
        this.clothing = clothing;
    }
    async onOpen(character, isTutorial, moneyToSouthCentralPointsValue, baseCharacterCosts, phonePointsPrice) {
        this.isTutorial = isTutorial;
        if (this.isTutorial) {
            // this.dialog.create({
            //     Type: DialogTypes.ONE_BUTTON_DIALOG,
            //     Title: "Dein erster Charakter",
            //     Description: "Da du zum ersten Mal diese Charaktererstellung nutzt, werden wir dir mit ein paar Tipps zur Seite stehen! Wir freuen uns auf deine Kreativität.",
            //     HasBankAccountSelection: false,
            //     FreezeGameControls: false,
            //     PrimaryButton: "Okay",
            // });
            // TODO: Implement the tutorial tips for character creation.
        }
        native.setClockTime(12, 0, 0);
        this.createCamera();
        const mHash = native.getHashKey("mp_m_freemode_01");
        const fHash = native.getHashKey("mp_f_freemode_01");
        await loadModel(mHash);
        await loadModel(fHash);
        this.isNewCharacter = (character != null);
        this.pedId = native.createPed(2, mHash, this.characterPos.x, this.characterPos.y, this.characterPos.z, 180, false, false);
        this.charCreator.setup(character, moneyToSouthCentralPointsValue, phonePointsPrice);
        this.charCreator.addPurchase({
            id: UID(),
            type: CharacterCreatorPurchaseType.CHARACTER,
            name: "Neuen Charakter",
            description: "Einen neuen Charakter erstellt",
            southCentralPoints: baseCharacterCosts,
            removeable: false,
            orderedVehicle: null
        });
        this.character.apply(character, this.pedId);
        this.event.emitGui("gui:routeto", "charcreator");
        this.loading.show("Lade Charaktererstellung...");
        alt.setTimeout(() => {
            this.player.fadeIn(500);
            this.player.unblurScreen(250);
            this.loading.hide();
        }, 1500);
    }
    onResetCamera() {
        this.createCamera();
        this.onChangeCamPos(this.lastIndex, 0);
    }
    onReset() {
        native.deletePed(this.pedId);
        this.loading.hide();
    }
    onCantFinishedCreation() {
        this.player.fadeIn(250);
        this.loading.hide();
        this.event.emitGui("charcreator:resetissaving");
    }
    onRemovePurchaseOrder(purchaseOrder) {
        if (!purchaseOrder.removeable) {
            return;
        }
        this.charCreator.removePurchase(purchaseOrder);
    }
    onRequestClose() {
        this.dialog.create({
            type: DialogType.TWO_BUTTON_DIALOG,
            title: "Charakter Erstellung verlassen",
            description: "Bist du dir sicher das du die Charakter Erstellung verlassen möchtest? Dein aktueller Charakter würde nicht gespeichert werden!",
            hasBankAccountSelection: false,
            hasInputField: false,
            freezeGameControls: false,
            primaryButton: "Ja",
            secondaryButton: "Nein",
            primaryButtonClientEvent: "charcreator:close",
        });
    }
    onClose() {
        native.deletePed(this.pedId);
        this.player.fadeOut(500);
        alt.setTimeout(() => {
            this.event.emitServer("charcreator:close");
            this.event.emitGui("charcreator:reset");
        }, 700);
    }
    onGetCharacter() {
        this.event.emitGui("charcreator:setcharacter", this.character.getCachedCharacter, this.clothing.getMaxDrawableVariations(this.pedId), this.isNewCharacter);
    }
    onChangeCamPos(index, time = 850) {
        let pos;
        let rot;
        this.lastIndex = index;
        switch (index) {
            case 0:
                pos = this.camPortrait.pos;
                rot = this.camPortrait.rot;
                break;
            case 1:
                pos = this.camFace.pos;
                rot = this.camFace.rot;
                break;
            case 2:
                pos = this.camTorso.pos;
                rot = this.camTorso.rot;
                break;
            case 3:
                pos = this.camPants.pos;
                rot = this.camPants.rot;
                break;
            case 4:
                pos = this.camFeets.pos;
                rot = this.camFeets.rot;
                break;
            default:
                pos = this.camPortrait.pos;
                rot = this.camPortrait.rot;
                break;
        }
        this.camera.moveCamera(pos, rot, time);
        alt.setTimeout(() => {
            this.event.emitGui("charcreator:resetcamerabuttons");
        }, time + 10);
    }
    onRotateCharacter(dir) {
        this.update.remove(this.everyTickRef);
        this.everyTickRef = this.update.add(() => this.tick(dir));
    }
    onRotateStop() {
        this.update.remove(this.everyTickRef);
    }
    onUpdateData(data) {
        if (data.character.gender !== this.charCreator.getCharacterData.character.gender) {
            this.switchGender(data.character);
        }
        this.charCreator.updateData(data);
        this.updateCharacter(data.character, data.clothes);
        this.event.emitGui("clothesmenu:setmaxtexturevariation", this.clothing.getMaxTextureVariations(this.pedId, data.clothes));
    }
    onSetNude() {
        this.setNudeMode = true;
        this.character.setNude(this.pedId, this.charCreator.getCharacterData.character.gender);
    }
    onLoadClothes() {
        this.setNudeMode = false;
        this.character.updateClothes(this.charCreator.getCharacterData.clothes, this.pedId, this.charCreator.getCharacterData.character.gender);
    }
    onRequestBuyCharacter() {
        this.dialog.create({
            type: DialogType.TWO_BUTTON_DIALOG,
            title: "Charakter kaufen",
            description: "Bist du dir sicher das du diesen Charakter so kaufen möchtest? Du kannst später einige Dinge nicht mehr anpassen! Beachte das du in allen Tabs oben was einstellen kannst, bist du dir sicher das du den Charakter so erstellen möchtest?",
            hasBankAccountSelection: false,
            hasInputField: false,
            freezeGameControls: false,
            primaryButton: "Ja",
            secondaryButton: "Nein",
            primaryButtonClientEvent: "charcreator:buycharacter",
            secondaryButtonClientEvent: "charcreator:cantfinishedcreation",
            closeButtonClientEvent: "charcreator:cantfinishedcreation"
        });
    }
    onBuyCharacter() {
        this.player.fadeOut(500);
        this.loading.show("Transaktion wird bearbeitet...");
        alt.setTimeout(() => {
            this.event.emitServer("charcreator:createcharacter", JSON.stringify(this.charCreator.getCharacterData));
        }, 600);
    }
    createCamera() {
        this.camera.createCamera(this.camPortrait.pos, this.camPortrait.rot);
    }
    tick(dir) {
        let heading = native.getEntityHeading(this.pedId);
        const newHeading = (heading += dir);
        native.setEntityHeading(this.pedId, newHeading);
    }
    switchGender(char) {
        native.deletePed(this.pedId);
        if (char.gender == GenderType.MALE) {
            this.pedId = native.createPed(2, 1885233650, this.characterPos.x, this.characterPos.y, this.characterPos.z, 180, false, false);
        }
        else if (char.gender == GenderType.FEMALE) {
            this.pedId = native.createPed(2, -1667301416, this.characterPos.x, this.characterPos.y, this.characterPos.z, 180, false, false);
        }
        char.father = 0;
        char.mother = 21;
        char.similarity = (char.gender === GenderType.MALE) ? 0 : 1;
        char.skinSimilarity = (char.gender === GenderType.MALE) ? 0 : 1;
        char.appearances.hair = 0;
        this.event.emitGui("charcreator:setgender", char.gender, this.clothing.getMaxDrawableVariations(this.pedId));
    }
    updateCharacter(character, clothes) {
        this.charCreator.resetTypePurchaseOrders(CharacterCreatorPurchaseType.CLOTHINGS);
        // Save the torso extra because its not a cloth item.
        if (clothes.torso) {
            character.torso = clothes.torso.drawableId;
            character.torsoTexture = clothes.torso.textureId;
        }
        this.character.apply(character, this.pedId);
        this.character.updateClothes(clothes, this.pedId, character.gender);
    }
};
__decorate([
    onServer("charcreator:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CharacterCreatorHandler.prototype, "onOpen", null);
__decorate([
    onServer("charcreator:resetcamera"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onResetCamera", null);
__decorate([
    onServer("charcreator:reset"),
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onReset", null);
__decorate([
    onServer("charcreator:cantfinishedcreation"),
    on("charcreator:cantfinishedcreation"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onCantFinishedCreation", null);
__decorate([
    onGui("charcreator:removepurchaseorder"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onRemovePurchaseOrder", null);
__decorate([
    onGui("charcreator:requestclose"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onRequestClose", null);
__decorate([
    on("charcreator:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onClose", null);
__decorate([
    onGui("charcreator:getcharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onGetCharacter", null);
__decorate([
    onGui("charcreator:setcamerapos"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onChangeCamPos", null);
__decorate([
    onGui("charcreator:rotatecharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onRotateCharacter", null);
__decorate([
    onGui("charcreator:rotatestop"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onRotateStop", null);
__decorate([
    onGui("charcreator:updatedata"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onUpdateData", null);
__decorate([
    onGui("charcreator:setnude"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onSetNude", null);
__decorate([
    onGui("charcreator:loadclothes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onLoadClothes", null);
__decorate([
    onGui("charcreator:requestbuycharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onRequestBuyCharacter", null);
__decorate([
    on("charcreator:buycharacter"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreatorHandler.prototype, "onBuyCharacter", null);
CharacterCreatorHandler = __decorate([
    foundation(),
    injectable(),
    __metadata("design:paramtypes", [CameraModule, CharacterModule, Player, EventModule, UpdateModule, LoggerModule, LoadingSpinnerModule, CharCreatorModule, DialogModule, GuiModule, ClothingModule])
], CharacterCreatorHandler);
export { CharacterCreatorHandler };
//# sourceMappingURL=character-creator.handler.js.map