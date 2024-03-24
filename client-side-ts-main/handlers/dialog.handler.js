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
import { onGui, onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { DialogModule } from "../modules/dialog.module";
import { LoggerModule } from "../modules/logger.module";
let DialogHandler = class DialogHandler {
    event;
    dialog;
    logger;
    constructor(event, dialog, logger) {
        this.event = event;
        this.dialog = dialog;
        this.logger = logger;
    }
    onCreate(dialog) {
        this.dialog.create(dialog);
    }
    onCloseButtonClicked(serverEvent, clientEvent) {
        this.sendEvents(serverEvent, clientEvent);
        this.dialog.destroy();
    }
    onPrimaryButtonClicked(serverEvent, clientEvent, bankAccountId, inputContent) {
        this.handleButtonClicked(serverEvent, clientEvent, bankAccountId, inputContent);
    }
    onSecondaryButtonClicked(serverEvent, clientEvent, bankAccountId, inputContent) {
        this.handleButtonClicked(serverEvent, clientEvent, bankAccountId, inputContent);
    }
    handleButtonClicked(serverEvent, clientEvent, bankAccountId, inputContent) {
        this.sendEvents(serverEvent, clientEvent, bankAccountId, inputContent);
        this.dialog.destroy();
    }
    sendEvents(serverEvent, clientEvent, bankAccountId = -1, inputContent = "") {
        if (this.dialog.getCurrentDialog.dataJson === "null" || !this.dialog.getCurrentDialog.dataJson) {
            if (this.dialog.getCurrentDialog.hasInputField) {
                if (this.dialog.getCurrentDialog.hasBankAccountSelection) {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent, bankAccountId, inputContent);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent, bankAccountId, inputContent);
                    }
                }
                else {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent, inputContent);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent, inputContent);
                    }
                }
            }
            else {
                if (this.dialog.getCurrentDialog.hasBankAccountSelection) {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent, bankAccountId);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent, bankAccountId);
                    }
                }
                else {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent);
                    }
                }
            }
        }
        else {
            const data = JSON.parse(this.dialog.getCurrentDialog.dataJson);
            if (this.dialog.getCurrentDialog.hasBankAccountSelection) {
                if (this.dialog.getCurrentDialog.hasInputField) {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent, bankAccountId, inputContent, ...data);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent, bankAccountId, inputContent, ...data);
                    }
                }
                else {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent, bankAccountId, ...data);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent, bankAccountId, ...data);
                    }
                }
            }
            else {
                if (this.dialog.getCurrentDialog.hasInputField) {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent, inputContent, ...data);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent, inputContent, ...data);
                    }
                }
                else {
                    if (serverEvent !== null) {
                        this.event.emitServer(serverEvent, ...data);
                    }
                    if (clientEvent !== null) {
                        this.event.emit(clientEvent, ...data);
                    }
                }
            }
        }
    }
};
__decorate([
    onServer("dialog:create"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DialogHandler.prototype, "onCreate", null);
__decorate([
    onGui("dialog:closebuttonclicked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DialogHandler.prototype, "onCloseButtonClicked", null);
__decorate([
    onGui("dialog:primarybuttonclicked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", void 0)
], DialogHandler.prototype, "onPrimaryButtonClicked", null);
__decorate([
    onGui("dialog:secondarybuttonclicked"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", void 0)
], DialogHandler.prototype, "onSecondaryButtonClicked", null);
DialogHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, DialogModule, LoggerModule])
], DialogHandler);
export { DialogHandler };
//# sourceMappingURL=dialog.handler.js.map