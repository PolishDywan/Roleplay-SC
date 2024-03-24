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
import { loadModel } from "../helpers";
import { LoggerModule } from "./logger.module";
import { UpdateModule } from "./update.module";
import { Player } from "@extensions/player.extensions";
import { TextModule } from "./text.module";
import { DateModule } from "./date.module";
let ObjectSyncModule = class ObjectSyncModule {
    logger;
    update;
    player;
    text;
    date;
    objects = new Map();
    constructor(logger, update, player, text, date) {
        this.logger = logger;
        this.update = update;
        this.player = player;
        this.text = text;
        this.date = date;
        this.update.add(() => {
            for (const key in this.objects) {
                const object = this.objects[key];
                if (object.entity !== undefined) {
                    if (this.player.isAduty) {
                        if (object.itemId === -1) {
                            this.text.drawText3dWithDistance(`Erstellt von: ${object.ownerName}\nErstellt um: ${this.date.getDate(object.createdAtJson)}`, object.position.x, object.position.y, object.position.z + 0.5, 0.4, 0, 255, 255, 255, 255, false, true, 5);
                        }
                        else {
                            this.text.drawText3dWithDistance(`ItemId: ${object.itemId}\nErstellt von: ${object.ownerName}\nErstellt um: ${this.date.getDate(object.createdAtJson)}`, object.position.x, object.position.y, object.position.z + 0.5, 0.4, 0, 255, 255, 255, 255, false, true, 5);
                        }
                    }
                }
            }
        });
    }
    add(id, model, name, position, rotation, freeze, onFire, itemId, ownerName, createdAtJson) {
        loadModel(alt.hash(model)).then(() => {
            const entity = native.createObject(native.getHashKey(model), position.x, position.y, position.z, false, false, false);
            this.objects.set(id, {
                id: id,
                model: model,
                name: name,
                entity: entity,
                freeze: freeze,
                position: position,
                rotation: rotation,
                onFire: onFire,
                itemId: itemId,
                ownerName: ownerName,
                createdAtJson: createdAtJson
            });
            this.setFreeze(id, freeze);
            this.setPosition(id, position);
            this.setRotation(id, rotation);
            this.setOnFire(id, onFire);
        });
    }
    restore(id) {
        if (this.objects.has(id)) {
            const obj = this.objects.get(id);
            loadModel(alt.hash(obj.model)).then(() => {
                this.objects.get(id).entity = native.createObject(native.getHashKey(obj.model), obj.position.x, obj.position.y, obj.position.z, false, false, false);
                this.setFreeze(id, obj.freeze);
                this.setPosition(id, obj.position);
                this.setRotation(id, obj.rotation);
                this.setOnFire(id, obj.onFire);
            });
        }
    }
    remove(id) {
        if (this.objects.has(id)) {
            native.deleteObject(this.objects.get(id).entity);
            this.objects.get(id).entity = null;
        }
    }
    clear(id) {
        if (this.objects.has(id)) {
            this.objects.delete(id);
        }
    }
    clearAll() {
        this.objects.forEach((object) => {
            native.deleteObject(object.entity);
        });
        this.objects = new Map();
    }
    setFreeze(id, freeze) {
        if (this.objects.has(id)) {
            native.freezeEntityPosition(this.objects.get(id).entity, freeze);
            this.objects.get(id).freeze = freeze;
        }
    }
    getObject(id) {
        if (this.objects.has(id)) {
            return this.objects.get(id);
        }
    }
    getObjectByEntity(entity) {
        const currentObjects = [...this.objects.values()].filter(obj => obj !== null);
        return currentObjects.find(obj => obj.entity === entity);
    }
    setPosition(id, position) {
        if (this.objects.has(id)) {
            this.objects.get(id).position = position;
            native.setEntityCoords(this.objects.get(id).entity, position.x, position.y, position.z, false, false, false, false);
        }
    }
    setRotation(id, rotation) {
        if (this.objects.has(id)) {
            native.setEntityRotation(this.objects.get(id).entity, rotation.x, rotation.y, rotation.z, 0, true);
            this.objects.get(id).rotation = rotation;
        }
    }
    setOnFire(id, onFire = null) {
        if (this.objects.has(id)) {
            if (onFire) {
                this.objects.get(id).fireEntity = native.startScriptFire(this.objects.get(id).position.x, this.objects.get(id).position.y, this.objects.get(id).position.z, 1, true);
            }
            else {
                if (this.objects.get(id).fireEntity !== undefined) {
                    native.removeScriptFire(this.objects.get(id).fireEntity);
                    this.objects.get(id).fireEntity = null;
                }
            }
            this.objects.get(id).onFire = onFire;
        }
    }
};
ObjectSyncModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule, UpdateModule, Player, TextModule, DateModule])
], ObjectSyncModule);
export { ObjectSyncModule };
//# sourceMappingURL=object-sync.module.js.map