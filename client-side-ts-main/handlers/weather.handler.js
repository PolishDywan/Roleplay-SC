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
import alt from "alt-client";
import native from "natives";
import { WeatherModule } from "../modules/weather.module";
let WeatherHandler = class WeatherHandler {
    weather;
    interval;
    constructor(weather) {
        this.weather = weather;
    }
    onUpdateWeather(secondsForTransition) {
        const currentWeather = alt.getSyncedMeta("Weather");
        if (this.weather.oldWeather === currentWeather) {
            return;
        }
        const weatherString = this.weather.weatherNameMap.get(currentWeather);
        const oldWeatherHash = native.getHashKey(this.weather.weatherNameMap.get(this.weather.oldWeather));
        const currentWeatherHash = native.getHashKey(weatherString);
        if (this.interval !== undefined) {
            alt.clearInterval(this.interval);
        }
        let percentage = 0;
        this.interval = alt.setInterval(() => {
            percentage++;
            if (percentage < 100) {
                native.setCurrWeatherState(oldWeatherHash, currentWeatherHash, (percentage / 100));
            }
            else {
                alt.clearInterval(this.interval);
                this.weather.oldWeather = currentWeather;
            }
        }, (secondsForTransition * 10));
        if (weatherString === "XMAS") {
            native.useSnowWheelVfxWhenUnsheltered(true);
            native.useSnowFootVfxWhenUnsheltered(true);
        }
        else {
            native.useSnowWheelVfxWhenUnsheltered(false);
            native.useSnowFootVfxWhenUnsheltered(false);
        }
    }
};
__decorate([
    onServer("weather:updateweather"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WeatherHandler.prototype, "onUpdateWeather", null);
WeatherHandler = __decorate([
    foundation(),
    singleton(),
    __metadata("design:paramtypes", [WeatherModule])
], WeatherHandler);
export { WeatherHandler };
//# sourceMappingURL=weather.handler.js.map