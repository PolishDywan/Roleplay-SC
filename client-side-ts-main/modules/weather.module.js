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
import { singleton } from "tsyringe";
import { EventModule } from "./event.module";
import { WeatherType } from "@enums/weather.type";
import { LoggerModule } from "./logger.module";
let WeatherModule = class WeatherModule {
    event;
    logger;
    weatherNameMap = new Map([[WeatherType.CLEAR, "CLEAR"], [WeatherType.EXTRA_SUNNY, "EXTRASUNNY"], [WeatherType.CLOUDS, "CLOUDS"], [WeatherType.OVERCAST, "OVERCAST"], [WeatherType.RAIN, "RAIN"], [WeatherType.CLEARING, "CLEARING"], [WeatherType.THUNDER, "THUNDER"], [WeatherType.SMOKG, "SMOG"], [WeatherType.XMAS, "XMAS"],]);
    oldWeather;
    constructor(event, logger) {
        this.event = event;
        this.logger = logger;
    }
    startSync() {
        native.setWeatherTypeNowPersist(this.weatherNameMap.get(alt.getSyncedMeta("Weather")));
        alt.setMsPerGameMinute(60000);
        let date = new Date();
        native.setClockTime(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }
};
WeatherModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [EventModule, LoggerModule])
], WeatherModule);
export { WeatherModule };
//# sourceMappingURL=weather.module.js.map