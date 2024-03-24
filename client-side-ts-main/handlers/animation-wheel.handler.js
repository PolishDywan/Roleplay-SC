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
import { on, onGui, onServer } from "../decorators/events";
import { EventModule } from "../modules/event.module";
import { AnimationModule } from "../modules/animation.module";
import { KeyCodes } from "@enums/keycode.type";
import { Player } from "@extensions/player.extensions";
import { GuiModule } from "../modules/gui.module";
import { FreeCamModule } from "../modules/free-cam.module";
import { DeathState } from "@enums/death.state";
import { METAKEY_STREAM_SYNC } from "data/custom-player-stream-synced-meta.interface";
import alt from "alt-client";
let AnimationWheelHandler = class AnimationWheelHandler {
    event;
    animation;
    player;
    gui;
    freecam;
    isMenuOpen = false;
    playerAnimations = [];
    constructor(event, animation, player, gui, freecam) {
        this.event = event;
        this.animation = animation;
        this.player = player;
        this.gui = gui;
        this.freecam = freecam;
    }
    onKeydown(key) {
        if (key === KeyCodes.U) {
            if (this.isMenuOpen) {
                this.setMenuState(false);
            }
            else {
                const deathState = alt.Player.local.getStreamSyncedMeta(METAKEY_STREAM_SYNC.DEATH_STATE);
                if (this.player.getIsAnyMenuOpen || this.player.isInAPrison || !this.player.isSpawnedCharacter || this.freecam.isActive || this.player.getIsChatting || this.player.getIsAnyTextOpen || this.player.hasInteractionOpen || deathState === DeathState.DEAD) {
                    return;
                }
                this.event.emitServer("animationswheel:requestmenu");
            }
        }
    }
    onShowAnimationWheel(animations) {
        this.playerAnimations = animations;
        this.setMenuState(true);
    }
    async onRequestAnim(animationId) {
        const animation = this.playerAnimations.find(pa => pa.id === animationId);
        const loaded = await this.animation.load(animation.dictionary);
        if (loaded) {
            const options = {
                flag: animation.flags
            };
            this.animation.play(animation.dictionary, animation.clip, options);
        }
        this.setMenuState(false);
    }
    onAnimationWheelClear() {
        this.animation.clear();
        this.setMenuState(false);
    }
    setMenuState(state) {
        this.isMenuOpen = state;
        if (state) {
            this.player.openMenu();
        }
        else {
            this.player.closeMenu();
        }
        this.player.blockGameControls(this.isMenuOpen);
        if (this.isMenuOpen) {
            this.player.showCursor();
            this.gui.focusView();
            this.event.emitGui("animationwheel:setanimations", this.playerAnimations);
        }
        else {
            this.player.hideCursor();
            this.gui.unfocusView();
        }
        this.event.emitGui("animationwheel:toggle", this.isMenuOpen);
    }
};
__decorate([
    on("keydown"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AnimationWheelHandler.prototype, "onKeydown", null);
__decorate([
    onServer("animationwheel:showmenu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], AnimationWheelHandler.prototype, "onShowAnimationWheel", null);
__decorate([
    onGui("animationwheel:requestanim"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AnimationWheelHandler.prototype, "onRequestAnim", null);
__decorate([
    onGui("animationwheel:stopanim"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimationWheelHandler.prototype, "onAnimationWheelClear", null);
AnimationWheelHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [EventModule, AnimationModule, Player, GuiModule, FreeCamModule])
], AnimationWheelHandler);
export { AnimationWheelHandler };
//# sourceMappingURL=animation-wheel.handler.js.map