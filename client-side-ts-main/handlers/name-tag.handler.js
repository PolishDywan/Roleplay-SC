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
import * as native from "natives";
import { Player } from "@extensions/player.extensions";
import { MathModule } from "../modules/math.module";
import { TextModule } from "../modules/text.module";
import { UpdateModule } from "../modules/update.module";
import { foundation } from "../decorators/foundation";
import { singleton } from "tsyringe";
let NameTagHandler = class NameTagHandler {
    math;
    text;
    update;
    player;
    constructor(math, text, update, player) {
        this.math = math;
        this.text = text;
        this.update = update;
        this.player = player;
        this.update.add(() => this.tick());
    }
    tick() {
        this.renderNameTags();
    }
    renderNameTags() {
        if (alt.Player.all.length <= 1)
            return;
        const currentPlayers = [...alt.Player.all];
        let count = 0;
        currentPlayers.forEach((target) => {
            if (count >= 30) {
                return;
            }
            const renderData = this.getPlayerOnScreen(target);
            if (!renderData) {
                return;
            }
            count += 1;
            if (target.hasStreamSyncedMeta("FREECAM")) {
                return;
            }
            const characterId = target.getSyncedMeta("ID");
            const rpName = target.getSyncedMeta("CHARACTER_NAME");
            const color = target.getSyncedMeta("NAMECOLOR");
            const isTyping = target.getSyncedMeta("IS_TYPING");
            let finalText = `${color}${rpName} [${characterId}]`;
            if (isTyping) {
                finalText = `${finalText}\n~b~~w~(schreibt)`;
            }
            const scale = 0.4 - renderData.dist * 0.01;
            this.text.drawText3d(finalText, renderData.pos.x, renderData.pos.y, renderData.pos.z + 1.3, scale, 4, 255, 255, 255, 200, true, false);
        });
    }
    getPlayerOnScreen(target) {
        if (target === alt.Player.local) {
            return undefined;
        }
        const onScreen = native.isEntityOnScreen(target.scriptID);
        if (!onScreen) {
            return undefined;
        }
        const dist = this.math.distance(alt.Player.local.pos, target.pos);
        if (dist > 25) {
            return undefined;
        }
        const id = alt.Player.local.scriptID;
        const los = native.hasEntityClearLosToEntity(id, target.scriptID, 17);
        if (!los) {
            return undefined;
        }
        return { name: target.name, dist, pos: target.pos };
    }
};
NameTagHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [MathModule, TextModule, UpdateModule, Player])
], NameTagHandler);
export { NameTagHandler };
//# sourceMappingURL=name-tag.handler.js.map