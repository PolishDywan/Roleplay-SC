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
import { EventModule } from "../modules/event.module";
import { LoggerModule } from "../modules/logger.module";
import { AccountModule } from "../modules/account.module";
let AccountHandler = class AccountHandler {
    event;
    account;
    logger;
    constructor(event, account, logger) {
        this.event = event;
        this.account = account;
        this.logger = logger;
    }
    onSync(account) {
        this.account.setup(account);
        this.event.emitGui("account:sync", account);
    }
    onSetPermission(permission) {
        this.account.getAccount.permission = permission;
        this.event.emitGui("account:sync", this.account.getAccount);
    }
};
__decorate([
    onServer("account:sync"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AccountHandler.prototype, "onSync", null);
__decorate([
    onServer("account:setpermissions"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccountHandler.prototype, "onSetPermission", null);
AccountHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, AccountModule, LoggerModule])
], AccountHandler);
export { AccountHandler };
//# sourceMappingURL=account.handler.js.map