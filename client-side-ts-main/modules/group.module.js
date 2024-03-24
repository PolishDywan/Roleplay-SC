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
let GroupModule = class GroupModule {
    allGroups;
    groups;
    company;
    faction;
    constructor() {
    }
    get getAllGroups() {
        return this.allGroups;
    }
    get getGroups() {
        return this.groups;
    }
    get getCompany() {
        return this.company;
    }
    get getFaction() {
        return this.faction;
    }
    setup(allGroups, groups, company, faction) {
        this.allGroups = allGroups;
        this.groups = groups;
        this.company = company;
        this.faction = faction;
    }
};
GroupModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [])
], GroupModule);
export { GroupModule };
//# sourceMappingURL=group.module.js.map