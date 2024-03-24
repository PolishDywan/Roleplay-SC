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
import { foundation } from "../decorators/foundation";
import { onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
let VehicleCatalogHandler = class VehicleCatalogHandler {
    event;
    constructor(event) {
        this.event = event;
    }
    onGetCatalogVeh(catalogVehicle) {
        if (alt.Player.local.vehicle == null) {
            return;
        }
        const vehicleName = native.getDisplayNameFromVehicleModel(alt.Player.local.vehicle.model);
        const classNumber = native.getVehicleClassFromName(alt.Player.local.vehicle.model);
        const localName = native.getFilenameForAudioConversation(vehicleName);
        const vehicle = catalogVehicle;
        vehicle.model = vehicle.model == "" ? vehicleName.toLowerCase() : vehicle.model;
        vehicle.displayName = localName;
        vehicle.displayClass = this.getClassName(classNumber);
        this.event.emitServer("vehiclecatalog:saveveh", JSON.stringify(vehicle));
    }
    getClassName(classId) {
        switch (classId) {
            case 0:
                return "Compact";
            case 1:
                return "Sedan";
            case 2:
                return "SUV";
            case 3:
                return "Coupe";
            case 4:
                return "Muscle";
            case 5:
                return "Sport Classic";
            case 6:
                return "Sport";
            case 7:
                return "Super";
            case 8:
                return "Motorrad";
            case 9:
                return "Off-Road";
            case 10:
                return "Industrial";
            case 11:
                return "Utility";
            case 12:
                return "Vans";
            case 13:
                return "Fahrrad";
            case 14:
                return "Boot";
            case 15:
                return "Helikopter";
            case 16:
                return "Flugzeug";
            case 17:
                return "Module";
            case 18:
                return "Einsatzfahrzeug";
            case 19:
                return "Military";
            case 20:
                return "Commercial";
            case 21:
                return "Zug";
            default:
                break;
        }
    }
};
__decorate([
    onServer("vehiclecatalog:getcatalogveh"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VehicleCatalogHandler.prototype, "onGetCatalogVeh", null);
VehicleCatalogHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule])
], VehicleCatalogHandler);
export { VehicleCatalogHandler };
//# sourceMappingURL=vehicle-catalog.handler.js.map