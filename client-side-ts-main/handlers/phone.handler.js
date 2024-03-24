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
import { foundation } from "decorators/foundation";
import { on, onGui, onServer } from "decorators/events";
import { KeyCodes } from "@enums/keycode.type";
import { EventModule } from "modules/event.module";
import { PhoneModule } from "modules/phone.module";
import { GuiModule } from "modules/gui.module";
import { Player } from "@extensions/player.extensions";
import { NotificationModule } from "modules/notification.module";
import { LoggerModule } from "modules/logger.module";
import { BankingPermission } from "@enums/banking.permission";
import { LicenseType } from "@enums/license.type";
import { NotificationTypes } from "@enums/notification.types";
let PhoneHandler = class PhoneHandler {
    event;
    phone;
    gui;
    player;
    notification;
    logger;
    phoneKeyPressedTimes = 0;
    constructor(event, phone, gui, player, notification, logger) {
        this.event = event;
        this.phone = phone;
        this.gui = gui;
        this.player = player;
        this.notification = notification;
        this.logger = logger;
        alt.setInterval(() => {
            if (!this.phone.hasPhone)
                return;
            if (this.phoneKeyPressedTimes > 0) {
                this.phoneKeyPressedTimes--;
            }
        }, 700);
    }
    onKeydown(key) {
        if (!this.phone.hasPhone || this.player.isInAPrison || !this.player.isSpawnedCharacter)
            return;
        if (key === KeyCodes.UP_ARROW) {
            if (this.player.getIsChatting || this.player.getIsAnyMenuOpen || this.player.hasInteractionOpen)
                return;
            this.phoneKeyPressedTimes++;
            if (this.phoneKeyPressedTimes >= 2) {
                this.event.emitServer("phone:requestopen", this.phone.phoneId);
                this.phoneKeyPressedTimes = 0;
            }
            if (this.phone.inCall) {
                this.event.emitGui("phone:setphonedown", false);
            }
            if (this.player.getIsPhoneOpen) {
                this.gui.focusView();
                this.player.showCursor();
                this.player.lockCamera(true);
            }
        }
        if (key === KeyCodes.DOWN_ARROW) {
            if (this.player.getIsPhoneOpen) {
                if (this.phone.inCall) {
                    this.gui.unfocusView(true);
                    this.player.hideCursor(true);
                    this.player.lockCamera(false, true);
                    this.event.emitGui("phone:setphonedown", true);
                    this.notification.sendNotification({
                        type: NotificationTypes.INFO,
                        text: "Mit der Pfeiltaste nach oben kannst du dein Handy wieder fokussieren.",
                    });
                }
                else {
                    this.phone.close();
                }
            }
        }
    }
    onSetup(phone) {
        this.phone.setup(phone);
    }
    onUpdate(phone) {
        if (this.phone.phoneId === phone.id) {
            this.phone.update(phone);
        }
    }
    onRemove() {
        this.phone.remove();
    }
    onOpenPhone(phone) {
        this.phone.setup(phone);
        this.phone.open();
    }
    onClosePhone() {
        this.phone.close();
    }
    onGetCallFrom(displayedName, callOnPhoneId) {
        if (this.phone.phoneId === callOnPhoneId) {
            this.phone.getCallFrom(displayedName);
        }
    }
    onCallNumber(displayedName) {
        this.phone.callNumber(displayedName);
    }
    onCallGotHangup() {
        this.phone.callGotHanguped();
        this.event.emitGui("phone:setphonedown", false);
        this.gui.focusView();
        this.player.showCursor();
        this.player.lockCamera(true);
    }
    onCallGotDenied() {
        this.phone.callGotDenied();
        this.event.emitGui("phone:setphonedown", false);
        this.gui.focusView();
        this.player.showCursor();
        this.player.lockCamera(true);
    }
    onOpenNewChat(oldId, chat) {
        this.phone.openNewChat(oldId, chat);
    }
    onPhoneLoaded() {
        this.phone.ready = true;
        this.phone.sendToUI();
    }
    onCallPhone(phoneNumber) {
        this.event.emitServer("phone:call", phoneNumber, this.phone.phoneNumber);
        this.phone.inCall = true;
        this.notification.sendNotification({
            type: NotificationTypes.INFO,
            text: "Mit der Pfeiltaste nach unten kannst du dein Handy wegpacken und wieder laufen.",
        });
    }
    onUpdateLastUsage(chatId) {
        this.phone.updateLastUsage(chatId);
    }
    onAddChat(chat) {
        this.phone.addChat(chat);
    }
    onDeleteChat(chatId) {
        this.phone.deleteChat(chatId);
    }
    onPushMessage(message) {
        this.phone.pushMessage(message);
    }
    onAddContact(contact) {
        this.phone.addContact(contact);
    }
    onEditContact(contact) {
        this.phone.editContact(contact);
    }
    onRemoveContact(contactId) {
        this.phone.removeContact(contactId);
    }
    onDeniedCall() {
        this.phone.denyCurrentCall();
    }
    onAcceptCall() {
        this.phone.acceptCurrentCall();
    }
    onHangupCall() {
        this.phone.hangupCurrentCall();
    }
    onSelectBackground(id) {
        this.event.emitServer("phone:selectbackground", this.phone.phoneId, id);
    }
    onOpenNotifications() {
        this.event.emitServer("phone:opennotifications", this.phone.phoneId);
    }
    onDeleteNotification(id) {
        this.event.emitServer("phone:deletenotification", this.phone.phoneId, id);
    }
    onPhoneBankCreateAccount(bankAccountId) {
        this.event.emitServer("phonebank:createaccount", this.phone.phoneId, bankAccountId);
    }
    onPhoneBankAddCharacter(bankAccountId, characterName) {
        this.event.emitServer("bank:addcharacteraccess", this.phone.phoneId, bankAccountId, characterName);
    }
    onPhoneBankRemoveAccess(bankAccountId, characterId) {
        this.event.emitServer("bank:removeaccess", this.phone.phoneId, bankAccountId, characterId);
    }
    onPhoneBankAddPermission(bankAccountId, characterId, permission) {
        this.event.emitServer("bank:addpermission", this.phone.phoneId, bankAccountId, characterId, permission);
    }
    onPhoneBankRemovePermission(bankAccountId, characterId, permission) {
        this.event.emitServer("bank:removepermission", this.phone.phoneId, bankAccountId, characterId, permission);
    }
    onPhoneBankDeleteAccount(bankAccountId) {
        this.event.emitServer("bank:deletebankaccount", this.phone.phoneId, bankAccountId);
    }
    onPhoneCompanyCreate(name, bankAccountId, houseId) {
        this.event.emitServer("company:create", this.phone.phoneId, name, bankAccountId, houseId);
    }
    onOrderProducts(amount) {
        this.event.emitServer("delivery:orderproducts", this.phone.phoneId, amount);
    }
    onSelectDelivery(deliveryId) {
        this.event.emitServer("delivery:selectdelivery", this.phone.phoneId, deliveryId);
    }
    onBuyLicenses(companyId, license) {
        this.event.emitServer("company:buylicenses", this.phone.phoneId, companyId, license);
    }
    onSellLicenses(companyId, license) {
        this.event.emitServer("company:selllicenses", this.phone.phoneId, companyId, license);
    }
    onLeaseCompanyCancelContract(companyId, leaseCompanyId) {
        this.event.emitServer("leasecompany:cancelcontract", this.phone.phoneId, companyId, leaseCompanyId);
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onKeydown", null);
__decorate([
    onServer("phone:setup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onSetup", null);
__decorate([
    onServer("phone:update"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onUpdate", null);
__decorate([
    onServer("phone:remove"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onRemove", null);
__decorate([
    onServer("phone:open"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onOpenPhone", null);
__decorate([
    onServer("phone:close"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onClosePhone", null);
__decorate([
    onServer("phone:getcallfrom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onGetCallFrom", null);
__decorate([
    onServer("phone:callnumber"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onCallNumber", null);
__decorate([
    onServer("phone:callgothungup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onCallGotHangup", null);
__decorate([
    onServer("phone:callgotdenied"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onCallGotDenied", null);
__decorate([
    onServer("phone:opennewchat"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onOpenNewChat", null);
__decorate([
    onGui("phone:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneLoaded", null);
__decorate([
    onGui("phone:call"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onCallPhone", null);
__decorate([
    onGui("phone:updatelastusage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onUpdateLastUsage", null);
__decorate([
    onGui("phone:addchat"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onAddChat", null);
__decorate([
    onGui("phone:deletechat"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onDeleteChat", null);
__decorate([
    onGui("phone:pushmessage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPushMessage", null);
__decorate([
    onGui("phone:addcontact"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onAddContact", null);
__decorate([
    onGui("phone:editcontact"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onEditContact", null);
__decorate([
    onGui("phone:removecontact"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onRemoveContact", null);
__decorate([
    onGui("phone:denycall"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onDeniedCall", null);
__decorate([
    onGui("phone:acceptcall"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onAcceptCall", null);
__decorate([
    onGui("phone:hangup"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onHangupCall", null);
__decorate([
    onGui("phone:selectbackground"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onSelectBackground", null);
__decorate([
    onGui("phone:opennotifications"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onOpenNotifications", null);
__decorate([
    onGui("phone:deletenotification"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onDeleteNotification", null);
__decorate([
    onGui("phonebank:createaccount"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneBankCreateAccount", null);
__decorate([
    onGui("phonebank:addcharacteraccess"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneBankAddCharacter", null);
__decorate([
    onGui("phonebank:removeaccess"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneBankRemoveAccess", null);
__decorate([
    onGui("phonebank:addpermission"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneBankAddPermission", null);
__decorate([
    onGui("phonebank:removepermission"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneBankRemovePermission", null);
__decorate([
    onGui("phonebank:deletebankaccount"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneBankDeleteAccount", null);
__decorate([
    onGui("phonecompany:create"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onPhoneCompanyCreate", null);
__decorate([
    onGui("phonedelivery:orderproducts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onOrderProducts", null);
__decorate([
    onGui("phonedelivery:selectdelivery"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onSelectDelivery", null);
__decorate([
    onGui("phonecompany:buylicenses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onBuyLicenses", null);
__decorate([
    onGui("phonecompany:selllicenses"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onSellLicenses", null);
__decorate([
    onGui("phoneleasecompany:cancelcontract"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PhoneHandler.prototype, "onLeaseCompanyCancelContract", null);
PhoneHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, PhoneModule, GuiModule, Player, NotificationModule, LoggerModule])
], PhoneHandler);
export { PhoneHandler };
//# sourceMappingURL=phone.handler.js.map