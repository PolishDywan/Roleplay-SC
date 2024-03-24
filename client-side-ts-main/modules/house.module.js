var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as native from "natives";
import * as alt from "alt-client";
import { singleton } from "tsyringe";
import { LoggerModule } from "./logger.module";
import { Player } from "@extensions/player.extensions";
import { BlipModule } from "./blip.module";
import { LeaseCompanyModule } from "./group/lease-company.module";
let HouseModule = class HouseModule {
    logger;
    blip;
    leaseCompany;
    player;
    adutyHouseBlips = [];
    leaseCompanyBlips = [];
    ownedHouseBlips = [];
    houses = [];
    interiors = [];
    constructor(logger, blip, leaseCompany, player) {
        this.logger = logger;
        this.blip = blip;
        this.leaseCompany = leaseCompany;
        this.player = player;
    }
    get getHouses() {
        return this.houses;
    }
    get getInteriors() {
        return this.interiors;
    }
    add(house) {
        house.streetName = this.getStreet(house.streetDirection, new alt.Vector3(house.positionX, house.positionY, house.positionZ));
        this.houses.push(house);
    }
    remove(houseId) {
        this.houses = this.houses.filter(h => h.id !== houseId);
    }
    async update(house) {
        this.updateHouse(house);
    }
    async syncChunk(houses) {
        for (const house of houses) {
            house.streetName = this.getStreet(house.streetDirection, new alt.Vector3(house.positionX, house.positionY, house.positionZ));
        }
        this.houses = this.houses.concat(houses);
    }
    syncExits(positions) {
        this.interiors = positions;
    }
    getStreet(direction, pos) {
        const [_, street, crossingStreet] = native.getStreetNameAtCoord(pos.x, pos.y, pos.z, 0, 0);
        if (direction === 1) {
            return native.getStreetNameFromHashKey(street);
        }
        if (direction === 2) {
            return native.getStreetNameFromHashKey(crossingStreet);
        }
    }
    updateBlips() {
        if (this.player.isAduty) {
            this.hideDebugBlips();
            this.showDebugBlips();
        }
        this.hideOwnerIcon();
        this.showOwnerIcon();
        this.hideLeaseCompanyBlips();
        this.showLeaseCompanyBlips();
    }
    showOwnerIcon() {
        this.houses.filter(h => h.houseType === 0 && h.ownerId === this.player.characterId)
            .forEach((house) => {
            this.ownedHouseBlips.push(this.blip.createBlip(new alt.Vector3(house.positionX, house.positionY, house.positionZ), 2, 40, "Deine Immobilie", false));
        });
    }
    showDebugBlips() {
        this.houses.filter(h => h.houseType === 0).forEach((house) => {
            this.adutyHouseBlips.push(this.blip.createBlip(new alt.Vector3(house.positionX, house.positionY, house.positionZ), 2, 40, "Immobilie", false));
        });
    }
    showLeaseCompanyBlips() {
        this.houses.filter(h => h.houseType === 1).forEach((house) => {
            let sprite = this.leaseCompany.getCompanyTypeBlip(house.leaseCompanyType);
            const color = house.playerDuty ? 2 : 4;
            this.leaseCompanyBlips.push(this.blip.createBlip(new alt.Vector3(house.positionX, house.positionY, house.positionZ), color, sprite, "", false));
        });
    }
    hideOwnerIcon() {
        this.ownedHouseBlips.forEach((houseBlip) => {
            this.blip.destroyBlip(houseBlip);
        });
    }
    hideDebugBlips() {
        this.adutyHouseBlips.forEach((houseBlip) => {
            this.blip.destroyBlip(houseBlip);
        });
    }
    hideLeaseCompanyBlips() {
        this.leaseCompanyBlips.forEach((houseBlip) => {
            this.blip.destroyBlip(houseBlip);
        });
    }
    isHouse(house) {
        return house.houseType === 0;
    }
    isLeaseCompany(house) {
        return house.houseType === 1;
    }
    updateHouse(house) {
        const savedHouse = this.houses.find(h => h.id === house.id);
        if (!savedHouse) {
            return;
        }
        house.streetName = this.getStreet(house.streetDirection, new alt.Vector3(house.positionX, house.positionY, house.positionZ));
        const index = this.houses.indexOf(savedHouse);
        this.houses[index] = house;
    }
};
HouseModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, BlipModule, LeaseCompanyModule, Player])
], HouseModule);
export { HouseModule };
//# sourceMappingURL=house.module.js.map