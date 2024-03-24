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
import * as alt from "alt-client";
import * as native from "natives";
import { foundation } from "../decorators/foundation";
import { on, onGui, onServer } from "../decorators/events";
import { KeyCodes } from "@enums/keycode.type";
import { ChatModule } from "../modules/chat.module";
import { FreeCamModule } from "../modules/free-cam.module";
import { Player } from "@extensions/player.extensions";
import { EventModule } from "../modules/event.module";
import { LoggerModule } from "../modules/logger.module";
import { RaycastModule } from "../modules/raycast.module";
import { MathModule } from "../modules/math.module";
import { ChatType } from "@enums/chat.type";
let ChatHandler = class ChatHandler {
    event;
    freecam;
    chat;
    player;
    logger;
    raycast;
    math;
    cachedCommands = [];
    constructor(event, freecam, chat, player, logger, raycast, math) {
        this.event = event;
        this.freecam = freecam;
        this.chat = chat;
        this.player = player;
        this.logger = logger;
        this.raycast = raycast;
        this.math = math;
    }
    keydown(key) {
        if (!this.chat.ready || this.player.isInAPrison || !this.player.isSpawnedCharacter)
            return;
        if (key === KeyCodes.T || key === KeyCodes.ENTER) {
            this.chat.openChat();
        }
        if (key === KeyCodes.ESCAPE) {
            if (this.chat.inputActive) {
                this.chat.closeChat(100);
                if (this.freecam.isActive) {
                    this.freecam.unfreeze();
                }
            }
        }
        if (key === KeyCodes.F5) {
            this.chat.toggleChatVisibility();
        }
        if (key === KeyCodes.F4) {
            this.chat.toggleTimestamp();
        }
    }
    setCommands(commands) {
        this.cachedCommands = commands;
        if (this.chat.ready) {
            this.event.emitGui("chat:setcommands", this.cachedCommands);
        }
    }
    onPushMessage(dimension, message, position = null) {
        const currInterior = native.getInteriorFromEntity(alt.Player.local.scriptID);
        const playerPos = alt.Player.local.pos;
        let mumble = false;
        if (dimension !== 0) {
            const dist = this.math.distance(playerPos, position);
            // Check if player is inside an interior and if the message source is 3 meters away.
            if (currInterior !== 0 && dist > 3) {
                const dir = this.math.subVector3(position, playerPos).normalize();
                const result = this.raycast.line(playerPos, dir, dist + 2, 1, alt.Player.local.scriptID);
                // Something is in the way cant read chat.
                if (result.isHit) {
                    mumble = true;
                    // If source is /not/ any screaming or megaphone
                    if (message.chatType !== ChatType.SCREAM && message.chatType !== ChatType.MEGAPHONE && message.chatType !== ChatType.DEP_SCREAM && message.chatType !== ChatType.PHONE_SCREAM && message.chatType !== ChatType.RADIO_SCREAM) {
                        return;
                    }
                }
            }
        }
        if (mumble) {
            const contextArray = message.context.split(" ");
            for (let i = 0; i < Math.floor(contextArray.length * 0.2); i++) {
                contextArray[Math.floor(Math.random() * contextArray.length)] = " <i>**undeutlich**</i> ";
            }
            message.context = contextArray.join(" ");
        }
        // Could be the place to add other addons to the chat message
        // source is drunk or on drunks
        // source is heavly wounded
        // knocked out on ground
        // mouth is covered
        this.chat.sendMessage(message);
    }
    onChatLoaded() {
        this.event.emitGui("chat:setcommands", this.cachedCommands);
        this.chat.ready = true;
        this.chat.chatVisible = true;
    }
    sendMessage(isCommand, message) {
        if (message && message.length > 0) {
            if (isCommand) {
                this.event.emitServer("command:execute", message);
            }
            else {
                this.event.emitServer("chat:sendmessage", message);
            }
        }
        this.chat.closeChat();
        if (this.freecam.isActive) {
            this.freecam.unfreeze();
        }
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatHandler.prototype, "keydown", null);
__decorate([
    onServer("chat:setcommands"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ChatHandler.prototype, "setCommands", null);
__decorate([
    onServer("chat:pushmessage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, alt.Vector3]),
    __metadata("design:returntype", void 0)
], ChatHandler.prototype, "onPushMessage", null);
__decorate([
    onGui("chat:ready"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatHandler.prototype, "onChatLoaded", null);
__decorate([
    onGui("chat:sendmessage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, String]),
    __metadata("design:returntype", void 0)
], ChatHandler.prototype, "sendMessage", null);
ChatHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, FreeCamModule, ChatModule, Player, LoggerModule, RaycastModule, MathModule])
], ChatHandler);
export { ChatHandler };
//# sourceMappingURL=chat.handler.js.map