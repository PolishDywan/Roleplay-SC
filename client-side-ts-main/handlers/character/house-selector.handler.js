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
import { foundation } from "../../decorators/foundation";
import { EventModule } from "../../modules/event.module";
import { CameraModule } from "../../modules/camera.module";
import { LoggerModule } from "../../modules/logger.module";
import { NotificationModule } from "../../modules/notification.module";
import { on, onGui, onServer } from "../../decorators/events";
import { Vector3 } from "../../extensions/vector3.extensions";
import { MathModule } from "../../modules/math.module";
import { HouseModule } from "../../modules/house.module";
import { CharCreatorModule } from "../../modules/char-creator.module";
import { CharacterCreatorPurchaseType } from "@enums/character-creator-purchase.type";
import { UID } from "../../helpers";
import { NotificationTypes } from "@enums/notification.types";
let HouseSelectorHandler = class HouseSelectorHandler {
    camera;
    notification;
    logger;
    event;
    math;
    house;
    charCreator;
    houses;
    currentIndex = 0;
    currentHouseId = -1;
    currentHouseIndex = -1;
    stayedOnBuyedHouse = false;
    cameraState = 0;
    helicopterCamInt = 0;
    constructor(camera, notification, logger, event, math, house, charCreator) {
        this.camera = camera;
        this.notification = notification;
        this.logger = logger;
        this.event = event;
        this.math = math;
        this.house = house;
        this.charCreator = charCreator;
    }
    onReset() {
        this.currentIndex = 0;
        this.currentHouseId = -1;
        this.currentHouseIndex = -1;
        this.cameraState = 0;
        if (this.helicopterCamInt) {
            alt.clearInterval(this.helicopterCamInt);
            this.helicopterCamInt = null;
        }
        this.camera.destroyCamera();
    }
    onOpen(maxPoints) {
        this.houses = this.house.getHouses.filter(h => h.southCentralPoints <= maxPoints && h.ownerId === -1 && h.houseType === 0);
        this.selectHouse(this.houses[this.currentIndex]);
    }
    onUpdate(houses) {
        // When the current house is no longer in the list of available houses.
        const currentHouse = houses.find(h => h.id == this.currentHouseId);
        if (currentHouse.ownerId && currentHouse.id !== this.currentHouseId) {
            this.notification.sendNotification({
                type: NotificationTypes.ERROR,
                text: "Diese Immobilie wurde gerade gekauft, tut uns leid. Die Auswahl an Immobilien wird in Echtzeit kalkuliert."
            });
            this.stayedOnBuyedHouse = true;
            this.event.emitGui("houseselector:block", true);
        }
        else {
            if (this.stayedOnBuyedHouse) {
                this.notification.sendNotification({
                    type: NotificationTypes.INFO, text: "Diese Immobilie wurde wieder auf dem Markt freigegeben."
                });
                this.event.emitGui("houseselector:block", false);
            }
        }
        this.houses = houses;
    }
    onSelect(houseId) {
        this.currentHouseIndex = this.houses.findIndex(h => h.id === houseId);
        this.currentHouseId = houseId;
        const houseData = this.houses.find(h => h.id === houseId);
        this.stayedOnBuyedHouse = false;
        this.charCreator.resetTypePurchaseOrders(CharacterCreatorPurchaseType.HOUSE);
        this.charCreator.addPurchase({
            id: UID(),
            type: CharacterCreatorPurchaseType.HOUSE,
            name: `${houseData.streetName} ${houseData.subName} ${houseData.houseNumber}`,
            description: "Eine Immobilie",
            southCentralPoints: houseData.southCentralPoints,
            removeable: true,
            orderedVehicle: null
        });
        this.event.emitGui("houseselector:select", houseData);
    }
    onClose() {
        if (this.helicopterCamInt) {
            alt.clearInterval(this.helicopterCamInt);
            this.helicopterCamInt = null;
        }
        this.stayedOnBuyedHouse = false;
    }
    onChange(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) {
            this.currentIndex = this.houses.length - 1;
        }
        if (this.currentIndex > this.houses.length - 1) {
            this.currentIndex = 0;
        }
        this.selectHouse(this.houses[this.currentIndex]);
    }
    onTrySelect(houseId) {
        this.event.emitServer("houseselector:tryselect", houseId);
    }
    onShow() {
        this.selectHouse(this.houses[this.currentHouseIndex]);
    }
    onRemove() {
        this.charCreator.resetTypePurchaseOrders(CharacterCreatorPurchaseType.HOUSE);
        this.event.emitServer("houseselector:unselect");
        this.event.emitGui("houseselector:select", null);
    }
    onChangeCamera(state) {
        this.cameraState = state;
        const houseData = this.houses.find(h => h.id === this.currentHouseId);
        this.selectHouse(houseData);
    }
    selectHouse(houseData) {
        const doorPos = new alt.Vector3(houseData.positionX, houseData.positionY, houseData.positionZ + 1);
        const rot = new alt.Vector3(this.math.radToDeg(houseData.roll), this.math.radToDeg(houseData.pitch), this.math.radToDeg(houseData.yaw));
        const dir = this.math.rotationToDirection(rot);
        const camPos = new alt.Vector3((dir.x * 3) + houseData.positionX, (dir.y * 3) + houseData.positionY, houseData.positionZ + 2);
        this.updateCamera(camPos, doorPos);
        this.currentHouseId = houseData.id;
        this.stayedOnBuyedHouse = false;
        this.updateInfo(houseData);
    }
    updateCamera(camPos, doorPos) {
        if (this.helicopterCamInt) {
            alt.clearInterval(this.helicopterCamInt);
            this.helicopterCamInt = null;
        }
        if (this.cameraState === 0) {
            this.createDoorCam(camPos, doorPos);
        }
        else if (this.cameraState === 1) {
            this.createHelicopterCam(doorPos);
        }
    }
    createDoorCam(camPos, doorPos) {
        this.camera.createCamera(camPos, new Vector3(0, 0, 0));
        this.camera.pointAt(doorPos);
    }
    createHelicopterCam(doorPos) {
        let angle = 0;
        const p = this.math.getPointAtPoint(doorPos, 30, angle);
        this.camera.createCamera(new Vector3(p.x, p.y, doorPos.z + 15), new Vector3(0, 0, 0));
        this.camera.pointAt(new Vector3(doorPos.x, doorPos.y, doorPos.z - 3));
        this.helicopterCamInt = alt.setInterval(() => {
            const p = this.math.getPointAtPoint(doorPos, 30, angle);
            this.camera.setPos(new Vector3(p.x, p.y, doorPos.z + 15));
            this.camera.pointAt(new Vector3(doorPos.x, doorPos.y, doorPos.z - 3));
            angle += 0.0009;
        }, 10);
    }
    updateInfo(houseData) {
        houseData.streetName = this.house.getStreet(houseData.streetDirection, new alt.Vector3(houseData.positionX, houseData.positionY, houseData.positionZ));
        this.event.emitGui("houseselector:sethouseinfo", houseData);
    }
};
__decorate([
    onServer("houseselector:reset"),
    on("disconnect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onReset", null);
__decorate([
    onServer("houseselector:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onOpen", null);
__decorate([
    onServer("houseselector:updatechunk"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onUpdate", null);
__decorate([
    onServer("houseselector:select"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onSelect", null);
__decorate([
    onGui("houseselector:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onClose", null);
__decorate([
    onGui("houseselector:change"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onChange", null);
__decorate([
    onGui("houseselector:tryselect"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onTrySelect", null);
__decorate([
    onGui("houseselector:show"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onShow", null);
__decorate([
    onGui("houseselector:remove"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onRemove", null);
__decorate([
    onGui("houseselector:changecamera"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseSelectorHandler.prototype, "onChangeCamera", null);
HouseSelectorHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [CameraModule, NotificationModule, LoggerModule, EventModule, MathModule, HouseModule, CharCreatorModule])
], HouseSelectorHandler);
export { HouseSelectorHandler };
//# sourceMappingURL=house-selector.handler.js.map