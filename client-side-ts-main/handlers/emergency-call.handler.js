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
import { ChatModule } from "../modules/chat.module";
import { ChatType } from "@enums/chat.type";
import { EventModule } from "../modules/event.module";
let EmergencyCallHandler = class EmergencyCallHandler {
    chat;
    event;
    constructor(chat, event) {
        this.chat = chat;
        this.event = event;
    }
    onStartDialog(content) {
        this.chat.sendMessage({
            chatType: ChatType.PHONE_SPEAK,
            color: "#f3f59f",
            context: content,
            afterName: " sagt: ",
            sender: "Dispatch",
            sendetAt: Date.now().toString()
        });
    }
};
__decorate([
    onServer("emergencycall:sendmessage"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmergencyCallHandler.prototype, "onStartDialog", null);
EmergencyCallHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [ChatModule, EventModule])
], EmergencyCallHandler);
export { EmergencyCallHandler };
//# sourceMappingURL=emergency-call.handler.js.map