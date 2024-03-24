var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PedSyncModule_1;
import * as alt from "alt-client";
import * as native from "natives";
import { singleton } from "tsyringe";
import { loadModel } from "../helpers";
import { LoggerModule } from "./logger.module";
import { CharacterModule } from "./character.module";
let PedSyncModule = PedSyncModule_1 = class PedSyncModule {
    logger;
    character;
    peds = [];
    constructor(logger, character) {
        this.logger = logger;
        this.character = character;
    }
    static makePedStupid(entity) {
        native.setEntityAsMissionEntity(entity, true, false); // make sure its not despawned by game engine
        native.setBlockingOfNonTemporaryEvents(entity, true); // make sure ped doesnt flee etc only do what its told
        native.setPedCanBeTargetted(entity, false);
        native.setPedCanBeKnockedOffVehicle(entity, 1);
        native.setPedCanBeDraggedOut(entity, false);
        native.setPedSuffersCriticalHits(entity, false);
        native.setPedDropsWeaponsWhenDead(entity, false);
        native.setPedDiesInstantlyInWater(entity, false);
        native.setPedCanRagdoll(entity, false);
        native.setPedDiesWhenInjured(entity, false);
        native.taskSetBlockingOfNonTemporaryEvents(entity, true);
        native.setPedFleeAttributes(entity, 0, false);
        native.setPedConfigFlag(entity, 32, false); // ped cannot fly thru windscreen
        native.setPedConfigFlag(entity, 281, true); // ped no writhe
        native.setPedGetOutUpsideDownVehicle(entity, false);
        native.setPedCanEvasiveDive(entity, false);
        native.freezeEntityPosition(entity, true);
        native.setEntityInvincible(entity, true);
    }
    add(id, model, position, heading, vehicle, seat, characterModel) {
        const hash = alt.hash(model);
        loadModel(hash).then(() => {
            if (vehicle !== null) {
                alt.setTimeout(() => {
                    const entity = native.createPedInsideVehicle(vehicle.scriptID, 0, hash, seat, false, false);
                    PedSyncModule_1.makePedStupid(entity);
                    this.peds[id] = {
                        id: id,
                        model: model,
                        entity: entity,
                        position: position,
                        heading: heading,
                        vehicle: vehicle,
                        seat: seat,
                    };
                }, 100);
            }
            else {
                const entity = native.createPed(0, hash, position.x, position.y, position.z, heading, false, false);
                PedSyncModule_1.makePedStupid(entity);
                this.peds[id] = {
                    id: id,
                    model: model,
                    entity: entity,
                    position: position,
                    heading: heading,
                    vehicle: vehicle,
                    seat: seat,
                };
            }
            if (characterModel !== null) {
                this.character.apply(characterModel, this.peds[id].entity);
            }
        });
    }
    restore(id) {
        if (this.peds.hasOwnProperty(id)) {
            const ped = this.peds[id];
            const hash = alt.hash(ped.model);
            loadModel(hash).then(() => {
                if (ped.vehicle !== null) {
                    alt.setTimeout(() => {
                        this.peds[id].entity = native.createPedInsideVehicle(ped.vehicle.scriptID, 0, hash, ped.seat, false, false);
                        PedSyncModule_1.makePedStupid(this.peds[id].entity);
                    }, 100);
                }
                else {
                    this.peds[id].entity = native.createPed(0, hash, ped.position.x, ped.position.y, ped.position.z, ped.heading, false, false);
                    PedSyncModule_1.makePedStupid(this.peds[id].entity);
                }
                if (ped.characterModel !== undefined) {
                    this.character.apply(ped.characterModel, ped.entity);
                }
            });
        }
    }
    remove(id) {
        if (this.peds.hasOwnProperty(id)) {
            native.deletePed(this.peds[id].entity);
            this.peds[id].entity = null;
        }
    }
    clear(id) {
        if (this.peds.hasOwnProperty(id)) {
            delete this.peds[id];
        }
    }
    clearAll() {
        this.peds.forEach((ped) => {
            native.deletePed(ped.entity);
        });
        this.peds = [];
    }
    setHeading(id, heading) {
        if (this.peds.hasOwnProperty(id)) {
            this.peds[id].heading = heading;
            native.setEntityHeading(this.peds[id].entity, heading);
        }
    }
    setPosition(id, position) {
        if (this.peds.hasOwnProperty(id)) {
            this.peds[id].position = position;
            native.setEntityCoords(this.peds[id].entity, position.x, position.y, position.z, false, false, false, false);
        }
    }
};
PedSyncModule = PedSyncModule_1 = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, CharacterModule])
], PedSyncModule);
export { PedSyncModule };
//# sourceMappingURL=ped-sync.module.js.map