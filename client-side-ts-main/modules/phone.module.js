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
import { EventModule } from "./event.module";
import { Player } from "@extensions/player.extensions";
import { LoggerModule } from "./logger.module";
import { InputType } from "@enums/input.type";
import { UpdateModule } from "./update.module";
import { NotificationModule } from "./notification.module";
import { GuiModule } from "./gui.module";
import { NotificationTypes } from "@enums/notification.types";
let PhoneModule = class PhoneModule {
    event;
    player;
    gui;
    logger;
    updater;
    notification;
    phoneId;
    phoneNumber;
    hasPhone = false;
    ready = false;
    inCall = false;
    updateId;
    phone;
    constructor(event, player, gui, logger, updater, notification) {
        this.event = event;
        this.player = player;
        this.gui = gui;
        this.logger = logger;
        this.updater = updater;
        this.notification = notification;
    }
    setup(phone) {
        this.phoneId = phone.id;
        this.phoneNumber = phone.phoneNumber;
        this.phone = phone;
        this.hasPhone = true;
        if (this.ready) {
            this.sendToUI();
        }
    }
    update(phone) {
        this.phone = phone;
        if (this.ready) {
            this.sendToUI();
        }
    }
    sendToUI() {
        this.event.emitGui("phone:setup", this.phone);
    }
    remove() {
        this.close();
        this.hasPhone = false;
        this.event.emitGui("phone:reset");
    }
    open() {
        if (this.player.getIsPhoneOpen && this.hasPhone)
            return;
        this.updateId = this.updater.add(() => this.toggleActions());
        this.player.setIsPhoneOpen = true;
        this.player.showCursor();
        this.player.lockCamera(true);
        this.player.blockESC(true);
        this.gui.focusView();
        native.setPlayerCanDoDriveBy(alt.Player.local.scriptID, false);
        this.event.emitGui("phone:toggle", true);
    }
    close() {
        if (!this.player.getIsPhoneOpen && this.hasPhone)
            return;
        alt.setTimeout(() => {
            this.updater.remove(this.updateId);
        }, 100);
        this.player.setIsPhoneOpen = false;
        this.player.setIsAnyTextFieldFocused = false;
        this.player.lockCamera(false);
        this.player.blockGameControls(false);
        this.player.hideCursor();
        this.player.blockESC(false);
        this.gui.unfocusView();
        native.setPlayerCanDoDriveBy(alt.Player.local.scriptID, true);
        this.event.emitGui("phone:toggle", false);
    }
    getCallFrom(displayedName) {
        this.event.emitGui("phone:getcallfrom", displayedName);
    }
    callNumber(displayedName) {
        this.event.emitGui("phone:setupcall", displayedName);
    }
    updateLastUsage(chatId) {
        this.event.emitServer("phone:updatelastusage", this.phoneId, chatId);
    }
    openNewChat(oldId, chat) {
        this.event.emitGui("phone:opennewchat", oldId, chat);
    }
    addChat(chat) {
        this.event.emitServer("phone:addchat", this.phoneId, JSON.stringify(chat));
    }
    deleteChat(chatId) {
        this.event.emitServer("phone:deletechat", chatId);
    }
    pushMessage(message) {
        this.event.emitServer("phone:pushmessage", this.phoneId, message.chatId, message.context);
    }
    addContact(contact) {
        this.event.emitServer("phone:addcontact", this.phoneId, JSON.stringify(contact));
    }
    editContact(contact) {
        this.event.emitServer("phone:editcontact", this.phoneId, JSON.stringify(contact));
    }
    removeContact(contactId) {
        this.event.emitServer("phone:removecontact", this.phoneId, contactId);
    }
    denyCurrentCall() {
        this.event.emitServer("phone:denycall");
    }
    acceptCurrentCall() {
        this.event.emitServer("phone:acceptcall", this.phoneId);
        this.inCall = true;
        this.notification.sendNotification({
            type: NotificationTypes.INFO,
            text: "Mit der Pfeiltaste nach unten kannst du dein Handy wegpacken und wieder laufen.",
        });
    }
    hangupCurrentCall() {
        this.event.emitServer("phone:hangup");
        this.inCall = false;
    }
    callGotHanguped() {
        this.event.emitGui("phone:callgothungup");
        this.inCall = false;
    }
    callGotDenied() {
        this.event.emitGui("phone:callgotdenied");
        this.inCall = false;
    }
    toggleActions() {
        native.disableControlAction(0, InputType.LOOK_LR, true);
        native.disableControlAction(0, InputType.LOOK_UD, true);
        native.disableControlAction(0, InputType.SCRIPT_RIGHT_AXIS_X, true);
        native.disableControlAction(0, InputType.SCRIPT_RIGHT_AXIS_Y, true);
        native.disableControlAction(0, InputType.WEAPON_WHEEL_NEXT, true);
        native.disableControlAction(0, InputType.WEAPON_WHEEL_PREV, true);
        native.disableControlAction(0, InputType.SELECT_NEXT_WEAPON, true);
        native.disableControlAction(0, InputType.SELECT_PREV_WEAPON, true);
        native.disableControlAction(0, InputType.SELECT_WEAPON, true);
        native.disableControlAction(0, InputType.NEXT_WEAPON, true);
        native.disableControlAction(0, InputType.PREV_WEAPON, true);
        native.disableControlAction(0, InputType.AIM, true);
        native.disableControlAction(0, InputType.ATTACK, true);
        native.disableControlAction(0, InputType.ATTACK2, true);
        native.disableControlAction(0, InputType.MELEE_ATTACK1, true);
        native.disableControlAction(0, InputType.MELEE_ATTACK2, true);
        native.disableControlAction(0, InputType.MELEE_ATTACK_LIGHT, true);
        native.disableControlAction(0, InputType.MELEE_ATTACK_HEAVY, true);
        native.disableControlAction(0, InputType.MELEE_ATTACK_ALTERNATE, true);
        native.disableControlAction(0, InputType.RADIO_WHEEL_LR, true);
        native.disableControlAction(0, InputType.RADIO_WHEEL_UD, true);
        native.disableControlAction(0, InputType.VEH_NEXT_RADIO, true);
        native.disableControlAction(0, InputType.VEH_PREV_RADIO, true);
        native.disableControlAction(0, InputType.VEH_RADIO_WHEEL, true);
        native.disableControlAction(0, InputType.VEH_SELECT_NEXT_WEAPON, true);
        native.disableControlAction(0, InputType.VEH_SELECT_PREV_WEAPON, true);
    }
};
PhoneModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player, GuiModule, LoggerModule, UpdateModule, NotificationModule])
], PhoneModule);
export { PhoneModule };
//# sourceMappingURL=phone.module.js.map