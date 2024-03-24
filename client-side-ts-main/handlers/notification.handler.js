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
import { onGui, onServer } from "../decorators/events";
import { foundation } from "../decorators/foundation";
import { NotificationModule } from "../modules/notification.module";
import { NotificationTypes } from "@enums/notification.types";
let NotificationHandler = class NotificationHandler {
    notification;
    constructor(notification) {
        this.notification = notification;
    }
    sendNotification(notification) {
        this.notification.sendNotification(notification);
    }
    guiError(errorMessage) {
        const notification = {
            type: NotificationTypes.ERROR, text: errorMessage,
        };
        this.notification.sendNotification(notification);
    }
};
__decorate([
    onServer("notification:send"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationHandler.prototype, "sendNotification", null);
__decorate([
    onGui("notification:error"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificationHandler.prototype, "guiError", null);
NotificationHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [NotificationModule])
], NotificationHandler);
export { NotificationHandler };
//# sourceMappingURL=notification.handler.js.map