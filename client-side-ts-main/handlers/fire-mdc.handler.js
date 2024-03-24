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
import { foundation } from "../decorators/foundation";
import { onServer } from "../decorators/events";
import alt from "alt-client";
import { EventModule } from "../modules/event.module";
import { HouseModule } from "../modules/house.module";
let FireMdcHandler = class FireMdcHandler {
    event;
    house;
    constructor(event, house) {
        this.event = event;
        this.house = house;
    }
    onOpenPatientRecord(character, houses, phoneNumbers, medicalHistory, allergies) {
        houses.forEach((house) => {
            house.streetName = this.house.getStreet(house.streetDirection, new alt.Vector3(house.positionX, house.positionY, house.positionZ));
        });
        this.event.emitGui("firemdc:openpatientrecord", character, houses, phoneNumbers, medicalHistory, allergies);
    }
};
__decorate([
    onServer("firemdc:openpatientrecord"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Array, Array, Array]),
    __metadata("design:returntype", void 0)
], FireMdcHandler.prototype, "onOpenPatientRecord", null);
FireMdcHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, HouseModule])
], FireMdcHandler);
export { FireMdcHandler };
//# sourceMappingURL=fire-mdc.handler.js.map