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
import { foundation } from "../../decorators/foundation";
import { LoggerModule } from "../../modules/logger.module";
import { onServer } from "../../decorators/events";
import { Player } from "../../extensions/player.extensions";
import { GuiModule } from "../../modules/gui.module";
import { EventModule } from "../../modules/event.module";
import { NotificationModule } from "../../modules/notification.module";
let AmmunationHandler = class AmmunationHandler {
    logger;
    notification;
    player;
    gui;
    event;
    constructor(logger, notification, player, gui, event) {
        this.logger = logger;
        this.notification = notification;
        this.player = player;
        this.gui = gui;
        this.event = event;
    }
    onOpenMenu(buyableItems) {
        if (!this.player.getIsInInterior) {
            return;
        }
        this.player.openMenu();
        this.player.freeze();
        this.player.showCursor();
        this.gui.focusView();
        this.event.emitGui("ammunation:openmenu", buyableItems);
    }
};
__decorate([
    onServer("ammunation:openmenu"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], AmmunationHandler.prototype, "onOpenMenu", null);
AmmunationHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, NotificationModule, Player, GuiModule, EventModule])
], AmmunationHandler);
export { AmmunationHandler };
//# sourceMappingURL=ammunation.handler.js.map