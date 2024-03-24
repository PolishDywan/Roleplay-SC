var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as alt from "alt-client";
import * as native from "natives";
import { singleton } from "tsyringe";
import { LoadingSpinnerType } from "@enums/loadingspinner.type";
let LoadingSpinnerModule = class LoadingSpinnerModule {
    get isActive() {
        return native.busyspinnerIsOn();
    }
    show(loadingText = null, spinnerType = LoadingSpinnerType.REGULAR_CLOCKWISE) {
        this.hide();
        if (loadingText == null) {
            native.beginTextCommandBusyspinnerOn("");
        }
        else {
            native.beginTextCommandBusyspinnerOn("STRING");
            native.addTextComponentSubstringPlayerName(loadingText);
        }
        native.endTextCommandBusyspinnerOn(spinnerType);
    }
    hide() {
        if (this.isActive) {
            const int = alt.setInterval(() => {
                if (native.busyspinnerIsDisplaying()) {
                    native.busyspinnerOff();
                    alt.clearInterval(int);
                }
            }, 1);
        }
    }
};
LoadingSpinnerModule = __decorate([
    singleton()
], LoadingSpinnerModule);
export { LoadingSpinnerModule };
//# sourceMappingURL=loading-spinner.module.js.map