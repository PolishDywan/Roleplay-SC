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
import { LeaseCompanyType } from "@enums/lease-company.type";
let LeaseCompanyModule = class LeaseCompanyModule {
    constructor() {
    }
    getCompanyTypeName(type) {
        switch (type) {
            case LeaseCompanyType.SUPERMARKET:
                return "Supermarkt";
            case LeaseCompanyType.CLOTHING_STORE:
                return "Kleidungsladen";
            case LeaseCompanyType.HAIR_STUDIO:
                return "Haarsalon";
            case LeaseCompanyType.TATTOO_STUDIO:
                return "Tattoostudio";
            case LeaseCompanyType.AMMUNATION:
                return "Waffenladen";
            case LeaseCompanyType.GAS_STATION:
                return "Tankstelle";
        }
    }
    getCompanyTypeBlip(type) {
        switch (type) {
            case LeaseCompanyType.SUPERMARKET:
                return 52;
            case LeaseCompanyType.CLOTHING_STORE:
                return 73;
            case LeaseCompanyType.HAIR_STUDIO:
                return 71;
            case LeaseCompanyType.TATTOO_STUDIO:
                return 75;
            case LeaseCompanyType.AMMUNATION:
                return 110;
            case LeaseCompanyType.GAS_STATION:
                return 361;
        }
    }
};
LeaseCompanyModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], LeaseCompanyModule);
export { LeaseCompanyModule };
//# sourceMappingURL=lease-company.module.js.map