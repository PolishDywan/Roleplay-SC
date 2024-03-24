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
import { InputType } from "@enums/input.type";
import { Player } from "@extensions/player.extensions";
import { UpdateModule } from "./update.module";
import { MathModule } from "./math.module";
import { CameraModule } from "./camera.module";
import { GuiModule } from "./gui.module";
let ContextModule = class ContextModule {
    event;
    player;
    update;
    math;
    camera;
    gui;
    lastX;
    lastY;
    everyTickRef;
    endPoint;
    isOpen;
    constructor(event, player, update, math, camera, gui) {
        this.event = event;
        this.player = player;
        this.update = update;
        this.math = math;
        this.camera = camera;
        this.gui = gui;
    }
    get getIsOpen() {
        return this.isOpen;
    }
    open(title, actions, useLastPos = false, onCenter = false) {
        const [_, width, height] = native.getActualScreenResolution(0, 0);
        if (!useLastPos) {
            this.lastX = width * native.getControlNormal(0, InputType.CURSOR_X);
            this.lastY = height * native.getControlNormal(0, InputType.CURSOR_Y);
        }
        if (onCenter) {
            const [_, x, y] = native.getActualScreenResolution(0, 0);
            const pos = new alt.Vector3(x * 0.5, y * 0.5, 0);
            this.lastX = pos.x;
            this.lastY = pos.y;
        }
        const contextMenu = {
            title: title, x: this.lastX, y: this.lastY, actions: actions
        };
        this.isOpen = true;
        this.event.emitGui("contextmenu:setup", contextMenu);
    }
    close() {
        if (this.everyTickRef) {
            this.update.remove(this.everyTickRef);
            this.everyTickRef = null;
        }
        this.endPoint = undefined;
        this.player.hideCursor();
        this.gui.unfocusView();
        this.isOpen = false;
        this.event.emitGui("contextmenu:close");
    }
};
ContextModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, Player, UpdateModule, MathModule, CameraModule, GuiModule])
], ContextModule);
export { ContextModule };
//# sourceMappingURL=context.module.js.map