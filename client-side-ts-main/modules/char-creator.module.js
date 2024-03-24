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
import { EventModule } from "./event.module";
import { LoggerModule } from "./logger.module";
import { ClothingModule } from "./clothing.module";
import { CharacterCreatorPurchaseType } from "@enums/character-creator-purchase.type";
import { UID } from "helpers";
let CharCreatorModule = class CharCreatorModule {
    event;
    logger;
    clothing;
    characterCreatorData;
    MONEY_TO_SOUTH_CENTRAL_POINTS_VALUE = 0;
    PHONE_POINTS_PRICE = 0;
    constructor(event, logger, clothing) {
        this.event = event;
        this.logger = logger;
        this.clothing = clothing;
    }
    get getCharacterData() {
        return this.characterCreatorData;
    }
    setup(character, moneyToSouthCentralPointsValue, phonePointsPrice) {
        this.characterCreatorData = {
            character: character,
            clothes: {
                accessories: undefined,
                backPack: undefined,
                bodyArmor: undefined,
                bracelets: undefined,
                ears: undefined,
                glasses: undefined,
                hat: undefined,
                mask: undefined,
                pants: undefined,
                shoes: undefined,
                top: undefined,
                torso: undefined,
                underShirt: undefined,
                watch: undefined,
            },
            startMoney: 0,
            hasPhone: false,
            isRegistered: false,
            hasDrivingLicense: false,
            purchaseOrders: [],
            spawnId: 0
        };
        this.MONEY_TO_SOUTH_CENTRAL_POINTS_VALUE = moneyToSouthCentralPointsValue;
        this.PHONE_POINTS_PRICE = phonePointsPrice;
    }
    orderVehicleLimit() {
        return (this.characterCreatorData.purchaseOrders.filter(po => po.type === CharacterCreatorPurchaseType.VEHICLE).length > 1);
    }
    addPurchase(purchase) {
        this.characterCreatorData.purchaseOrders.push(purchase);
        this.event.emitGui("charcreator:updatepurchaseorders", this.characterCreatorData.purchaseOrders);
    }
    removePurchase(purchaseOrder) {
        this.characterCreatorData.purchaseOrders = this.characterCreatorData.purchaseOrders.filter(po => po.id !== purchaseOrder.id);
        this.event.emitGui("charcreator:updatepurchaseorders", this.characterCreatorData.purchaseOrders);
        switch (purchaseOrder.type) {
            case CharacterCreatorPurchaseType.HOUSE:
                this.event.emitServer("houseselector:unselect");
                this.event.emitGui("houseselector:select", null);
                break;
        }
    }
    resetTypePurchaseOrders(type) {
        this.characterCreatorData.purchaseOrders = this.characterCreatorData.purchaseOrders.filter(po => po.type !== type);
        this.event.emitGui("charcreator:updatepurchaseorders", this.characterCreatorData.purchaseOrders);
    }
    setSpawn(id) {
        this.characterCreatorData.spawnId = id;
    }
    updateData(data) {
        this.characterCreatorData.character = data.character;
        this.characterCreatorData.clothes = data.clothes;
        this.characterCreatorData.hasPhone = data.hasPhone;
        this.characterCreatorData.isRegistered = data.isRegistered;
        this.characterCreatorData.hasDrivingLicense = data.hasDrivingLicense;
        this.resetTypePurchaseOrders(CharacterCreatorPurchaseType.MONEY);
        this.resetTypePurchaseOrders(CharacterCreatorPurchaseType.ITEM);
        if (data.startMoney > 0) {
            this.addPurchase({
                id: UID(),
                type: CharacterCreatorPurchaseType.MONEY,
                name: `$${data.startMoney} Startgeld`,
                description: "Geld im Inventar des Charakters",
                southCentralPoints: Number.parseInt((data.startMoney * this.MONEY_TO_SOUTH_CENTRAL_POINTS_VALUE).toFixed(0)),
                removeable: false,
                orderedVehicle: null
            });
        }
        if (data.hasPhone) {
            this.addPurchase({
                id: UID(),
                type: CharacterCreatorPurchaseType.ITEM,
                name: `Handy`,
                description: "Item im Inventar des Charakters",
                southCentralPoints: Number.parseInt((this.PHONE_POINTS_PRICE).toFixed(0)),
                removeable: false,
                orderedVehicle: null
            });
        }
    }
};
CharCreatorModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule, ClothingModule])
], CharCreatorModule);
export { CharCreatorModule };
//# sourceMappingURL=char-creator.module.js.map