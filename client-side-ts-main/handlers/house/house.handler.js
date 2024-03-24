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
import { on, onServer } from "../../decorators/events";
import { TextModule } from "../../modules/text.module";
import { UpdateModule } from "../../modules/update.module";
import { LoggerModule } from "../../modules/logger.module";
import { HouseModule } from "../../modules/house.module";
import { KeyCodes } from "@enums/keycode.type";
import { EventModule } from "../../modules/event.module";
import { MathModule } from "../../modules/math.module";
import { Player } from "../../extensions/player.extensions";
import { BlipModule } from "../../modules/blip.module";
import { LeaseCompanyModule } from "../../modules/group/lease-company.module";
let HouseHandler = class HouseHandler {
    text;
    update;
    logger;
    house;
    event;
    math;
    blip;
    leaseCompany;
    player;
    constructor(text, update, logger, house, event, math, blip, leaseCompany, player) {
        this.text = text;
        this.update = update;
        this.logger = logger;
        this.house = house;
        this.event = event;
        this.math = math;
        this.blip = blip;
        this.leaseCompany = leaseCompany;
        this.player = player;
        this.update.add(() => this.tick());
    }
    onKeydown(key) {
        if (this.player.getIsAnyTextOpen) {
            return;
        }
        if (key === KeyCodes.F) {
            const house = this.house.getHouses.find(h => this.math.distance(new alt.Vector3(h.positionX, h.positionY, h.positionZ), alt.Player.local.pos) <= 1.5);
            const exit = this.house.getInteriors.find(e => this.math.distance(new alt.Vector3(e.x, e.y, e.z), alt.Player.local.pos) <= 1.5);
            if (!alt.Player.local.vehicle && house || !alt.Player.local.vehicle && exit) {
                this.event.emitServer("house:enterexit");
            }
        }
    }
    onAdd(house) {
        this.house.add(house);
        this.house.updateBlips();
    }
    remove(houseId) {
        this.house.remove(houseId);
        this.house.updateBlips();
    }
    async updateHouse(house) {
        await this.house.update(house);
        this.house.updateBlips();
    }
    async sync(houses) {
        await this.house.syncChunk(houses);
        this.house.updateBlips();
    }
    syncExits(interiors) {
        this.house.syncExits(interiors);
    }
    setAduty(state) {
        if (state) {
            this.house.showDebugBlips();
        }
        else {
            this.house.hideDebugBlips();
        }
        this.house.updateBlips();
    }
    onUpdateCharacterHouses(houses) {
        houses.forEach((house) => {
            if (this.house.isLeaseCompany(house)) {
                const leaseCompany = house;
                leaseCompany.typeName = this.leaseCompany.getCompanyTypeName(leaseCompany.leaseCompanyType);
            }
            house.streetName = this.house.getStreet(house.streetDirection, new alt.Vector3(house.positionX, house.positionY, house.positionZ));
        });
        this.event.emitGui("house:updatecharacterhouses", houses);
    }
    tick() {
        this.drawHouseTexts();
    }
    drawHouseTexts() {
        this.house.getHouses.forEach((house) => {
            if (house) {
                if (house.blockedOwnership && !this.player.isAduty) {
                    return;
                }
                const houseNumberText = `Nr. ${house.houseNumber}`;
                const streetText = `${house.streetName}.`;
                let houseTypeText = "Immobilie";
                let lowerText = `${streetText} ${houseNumberText}`;
                let colorText = "~g~";
                if (house.subName.length !== 0) {
                    lowerText = `${streetText} ${house.subName} ${houseNumberText}`;
                }
                if (house.rentable) {
                    houseTypeText = "Mietbare Immobilie";
                }
                if (house.houseType === 1) {
                    const leaseCompany = house;
                    houseTypeText = "Pachtbarer Unternehmenssitz";
                    colorText = "~b~";
                    if (house.subName !== "") {
                        lowerText = `${house.subName} ${this.leaseCompany.getCompanyTypeName(leaseCompany.leaseCompanyType)}`;
                    }
                    else {
                        lowerText = `${this.leaseCompany.getCompanyTypeName(leaseCompany.leaseCompanyType)}`;
                    }
                    const index = this.house.getHouses.indexOf(leaseCompany);
                    this.house.getHouses[index] = leaseCompany;
                }
                let defaultText = `${colorText}${houseTypeText}:\n~w~${lowerText}`;
                if (this.player.isAduty) {
                    defaultText = `${colorText}${houseTypeText} [${house.id}]:\n~w~${lowerText}`;
                }
                if (house.ownerId !== -1 || house.groupOwnerId !== -1) {
                    this.text.drawText3dWithDistance(defaultText, house.positionX, house.positionY, house.positionZ + 1, 0.4, 0, 255, 255, 255, 175, false, true, 2);
                }
                else {
                    if (house.rentable) {
                        this.text.drawText3dWithDistance(`${defaultText}\n${colorText}$${house.price} /renthouse`, house.positionX, house.positionY, house.positionZ + 1, 0.4, 0, 255, 255, 255, 175, false, true, 2);
                    }
                    else {
                        this.text.drawText3dWithDistance(`${defaultText}\n${colorText}$${house.price} /buyhouse`, house.positionX, house.positionY, house.positionZ + 1, 0.4, 0, 255, 255, 255, 175, false, true, 2);
                    }
                }
            }
        });
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseHandler.prototype, "onKeydown", null);
__decorate([
    onServer("houses:add"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HouseHandler.prototype, "onAdd", null);
__decorate([
    onServer("houses:remove"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HouseHandler.prototype, "remove", null);
__decorate([
    onServer("houses:update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HouseHandler.prototype, "updateHouse", null);
__decorate([
    onServer("houses:syncchunk"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], HouseHandler.prototype, "sync", null);
__decorate([
    onServer("houses:syncexits"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], HouseHandler.prototype, "syncExits", null);
__decorate([
    onServer("player:setaduty"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean]),
    __metadata("design:returntype", void 0)
], HouseHandler.prototype, "setAduty", null);
__decorate([
    onServer("house:updatecharacterhouses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], HouseHandler.prototype, "onUpdateCharacterHouses", null);
HouseHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [TextModule, UpdateModule, LoggerModule, HouseModule, EventModule, MathModule, BlipModule, LeaseCompanyModule, Player])
], HouseHandler);
export { HouseHandler };
//# sourceMappingURL=house.handler.js.map