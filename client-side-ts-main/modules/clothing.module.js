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
import { LoggerModule } from "./logger.module";
import native from "natives";
let ClothingModule = class ClothingModule {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    isClothingItem(name) {
        switch (name) {
            case "CLOTHING_HAT":
            case "CLOTHING_GLASSES":
            case "CLOTHING_EARS":
            case "CLOTHING_MASK":
            case "CLOTHING_TOP":
            case "CLOTHING_UNDERSHIRT":
            case "CLOTHING_ACCESSORIES":
            case "CLOTHING_WATCH":
            case "CLOTHING_BRACELET":
            case "CLOTHING_PANTS":
            case "CLOTHING_BACKPACK":
            case "CLOTHING_BODY_ARMOR":
            case "CLOTHING_SHOES":
                return true;
            default:
                this.logger.warning("ClothingModule: " + name + " ist kein Kleidungsitem.");
                return false;
        }
    }
    isClothingItemAProp(name) {
        switch (name) {
            case "CLOTHING_HAT":
            case "CLOTHING_GLASSES":
            case "CLOTHING_EARS":
            case "CLOTHING_WATCH":
            case "CLOTHING_BRACELET":
                return true;
            default:
                return false;
        }
    }
    getMaxDrawableVariations(pedId) {
        return {
            maxHat: native.getNumberOfPedPropDrawableVariations(pedId, 0),
            maxGlasses: native.getNumberOfPedPropDrawableVariations(pedId, 1),
            maxEars: native.getNumberOfPedPropDrawableVariations(pedId, 2),
            maxWatches: native.getNumberOfPedPropDrawableVariations(pedId, 6),
            maxBracelets: native.getNumberOfPedPropDrawableVariations(pedId, 7),
            maxMask: native.getNumberOfPedDrawableVariations(pedId, 1),
            maxTorsos: native.getNumberOfPedDrawableVariations(pedId, 3),
            maxTops: native.getNumberOfPedDrawableVariations(pedId, 11),
            maxBodyArmors: native.getNumberOfPedDrawableVariations(pedId, 9),
            maxBackPacks: native.getNumberOfPedDrawableVariations(pedId, 5),
            maxUnderShirts: native.getNumberOfPedDrawableVariations(pedId, 8),
            maxAccessories: native.getNumberOfPedDrawableVariations(pedId, 7),
            maxPants: native.getNumberOfPedDrawableVariations(pedId, 4),
            maxShoes: native.getNumberOfPedDrawableVariations(pedId, 6)
        };
    }
    getMaxTextureVariations(pedId, clothes) {
        return {
            maxHat: native.getNumberOfPedPropTextureVariations(pedId, 0, clothes.hat !== null ? clothes.hat.drawableId : -1) - 1,
            maxGlasses: native.getNumberOfPedPropTextureVariations(pedId, 1, clothes.glasses !== null ? clothes.glasses.drawableId : -1) - 1,
            maxEars: native.getNumberOfPedPropTextureVariations(pedId, 2, clothes.ears !== null ? clothes.ears.drawableId : -1) - 1,
            maxWatches: native.getNumberOfPedPropTextureVariations(pedId, 6, clothes.watch !== null ? clothes.watch.drawableId : -1) - 1,
            maxBracelets: native.getNumberOfPedPropTextureVariations(pedId, 7, clothes.bracelets !== null ? clothes.bracelets.drawableId : -1) - 1,
            maxMask: native.getNumberOfPedTextureVariations(pedId, 1, clothes.mask !== null ? clothes.mask.drawableId : -1) - 1,
            maxTorsos: native.getNumberOfPedTextureVariations(pedId, 3, clothes.torso !== null ? clothes.torso.drawableId : -1) - 1,
            maxTops: native.getNumberOfPedTextureVariations(pedId, 11, clothes.top !== null ? clothes.top.drawableId : -1) - 1,
            maxBodyArmors: native.getNumberOfPedTextureVariations(pedId, 9, clothes.bodyArmor !== null ? clothes.bodyArmor.drawableId : -1) - 1,
            maxBackPacks: native.getNumberOfPedTextureVariations(pedId, 5, clothes.backPack !== null ? clothes.backPack.drawableId : -1) - 1,
            maxUnderShirts: native.getNumberOfPedTextureVariations(pedId, 8, clothes.underShirt !== null ? clothes.underShirt.drawableId : -1) - 1,
            maxAccessories: native.getNumberOfPedTextureVariations(pedId, 7, clothes.accessories !== null ? clothes.accessories.drawableId : -1) - 1,
            maxPants: native.getNumberOfPedTextureVariations(pedId, 4, clothes.pants !== null ? clothes.pants.drawableId : -1) - 1,
            maxShoes: native.getNumberOfPedTextureVariations(pedId, 6, clothes.shoes !== null ? clothes.shoes.drawableId : -1) - 1
        };
    }
    getClothCategoryPrice(catalogItemName, compId) {
        let price = 0;
        if (this.isClothingItemAProp(catalogItemName)) {
            switch (compId) {
                case 0:
                    price = 100;
                    break;
                case 1:
                    price = 100;
                    break;
                case 2:
                    price = 500;
                    break;
                case 6:
                    price = 500;
                    break;
                case 7:
                    price = 500;
                    break;
            }
        }
        else {
            switch (compId) {
                case 1:
                    price = 50;
                    break;
                case 4:
                    price = 50;
                    break;
                case 5:
                    price = 100;
                    break;
                case 6:
                    price = 50;
                    break;
                case 7:
                    price = 250;
                    break;
                case 8:
                    price = 25;
                    break;
                case 9:
                    price = 150;
                    break;
                case 10:
                    price = 25;
                    break;
                case 11:
                    price = 50;
                    break;
            }
        }
        return price;
    }
};
ClothingModule = __decorate([
    singleton(),
    __metadata("design:paramtypes", [LoggerModule])
], ClothingModule);
export { ClothingModule };
//# sourceMappingURL=clothing.module.js.map