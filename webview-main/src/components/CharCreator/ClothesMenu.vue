<template>
    <div class='clothes-menu'>
        <h4>Kleidung</h4>
        <div class='row'>
            <div class='col-6'>
                <clothing-menu ref='hatMenu' title='Kopfbedeckung' v-on:update-clothing='updateHat($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='glassesMenu' title='Brillen' v-on:update-clothing='updateGlasses($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='earsMenu' title='Ohren' v-on:update-clothing='updateEars($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='masksMenu' title='Masken' v-on:update-clothing='updateMasks($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='topMenu' title='Oberteil' v-on:update-clothing='updateTop($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='backpackMenu' title='Rucksack' v-on:update-clothing='updateBackpack($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='torsoMenu' title='Torso' v-on:update-clothing='updateTorso($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='undershirtMenu' title='Unterhemden' v-on:update-clothing='updateUndershirt($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='accessoriesMenu' title='Zubehör' v-on:update-clothing='updateAccessories($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='watchMenu' title='Uhren' v-on:update-clothing='updateWatch($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='braceletsMenu' title='Armbänder' v-on:update-clothing='updateBracelets($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='pantsMenu' title='Hosen' v-on:update-clothing='updateLeg($event)' />
            </div>
            <div class='col-6'>
                <clothing-menu ref='shoesMenu' title='Schuhe' v-on:update-clothing='updateShoes($event)' />
            </div>
        </div>
        <div class='alert alert-warning'>
            <p>
                Einige Kleidungsstücke kann GTA nicht laden, wählt bitte nur Kleidungsstücke aus welche geladen werden und keine Schachbrett-Muster Texture haben. Achte bitte auch darauf das keine Haut durch deine Kleidung schaut oder gar Körperteile fehlen. Es kann später als Trolling geahndet werden. </p>
        </div>
    </div>
</template>

<script lang='ts'>
import ClothingMenu from "./Menus/ClothingMenu.vue";
import {Options, Vue} from "vue-class-component";
import {Ref} from "vue-property-decorator";
import alt from "@/scripts/services/alt.service";
import {ClothesInterface} from "@/scripts/interfaces/character/clothes.interface";
import {MaxDrawablesTexturesInterface} from "@/scripts/interfaces/character/max-drawable-textures.interface";
import {MaxDrawablesInterface} from "@/scripts/interfaces/character/max-drawables.interface";
import {GenderType} from "@/scripts/enums/gender.type";
import {ClothingInterface} from "@/scripts/interfaces/character/clothing.interface";

@Options({
    components: {
        ClothingMenu,
    },
})
export default class ClothesMenu extends Vue {
    @Ref() public readonly hatMenu!: ClothingMenu;
    @Ref() public readonly glassesMenu!: ClothingMenu;
    @Ref() public readonly earsMenu!: ClothingMenu;
    @Ref() public readonly watchMenu!: ClothingMenu;
    @Ref() public readonly braceletsMenu!: ClothingMenu;
    @Ref() public readonly masksMenu!: ClothingMenu;
    @Ref() public readonly topMenu!: ClothingMenu;
    @Ref() public readonly backpackMenu!: ClothingMenu;
    @Ref() public readonly torsoMenu!: ClothingMenu;
    @Ref() public readonly undershirtMenu!: ClothingMenu;
    @Ref() public readonly accessoriesMenu!: ClothingMenu;
    @Ref() public readonly pantsMenu!: ClothingMenu;
    @Ref() public readonly shoesMenu!: ClothingMenu;

    public clothes: ClothesInterface = {
        accessories: undefined,
        backPack: undefined,
        bodyArmor: undefined,
        bracelets: undefined,
        ears: undefined,
        glasses: undefined,
        hat: undefined,
        mask: undefined,
        pants: undefined,
        shoes: undefined,
        top: undefined,
        torso: undefined,
        underShirt: undefined,
        watch: undefined,
    };

    public mounted(): void {
        alt.on("clothesmenu:setmaxtexturevariation",
            (maxTextures: MaxDrawablesTexturesInterface) => this.setMaxDrawablesTextures(maxTextures));
    }

    public unmounted(): void {
        alt.off("clothesmenu:setmaxtexturevariation");
    }

    public setGender(maxDrawables: MaxDrawablesInterface, gender: GenderType): void {
        this.hatMenu?.setup(maxDrawables.maxHat, gender);
        this.glassesMenu?.setup(maxDrawables.maxGlasses, gender);
        this.earsMenu?.setup(maxDrawables.maxEars, gender);
        this.watchMenu?.setup(maxDrawables.maxWatches, gender);
        this.braceletsMenu?.setup(maxDrawables.maxBracelets, gender);
        this.masksMenu?.setup(maxDrawables.maxMask, gender);
        this.torsoMenu?.setup(maxDrawables.maxTorsos, gender);
        this.topMenu?.setup(maxDrawables.maxTops, gender);
        this.backpackMenu?.setup(maxDrawables.maxBackPacks, gender);
        this.undershirtMenu?.setup(maxDrawables.maxUnderShirts, gender);
        this.accessoriesMenu?.setup(maxDrawables.maxAccessories, gender);
        this.pantsMenu?.setup(maxDrawables.maxPants, gender);
        this.shoesMenu?.setup(maxDrawables.maxShoes, gender);
    }

    public checkValidation(): boolean {
        if (!this.hatMenu?.isValid()) {
            return false;
        }
        if (!this.glassesMenu?.isValid()) {
            return false;
        }
        if (!this.earsMenu?.isValid()) {
            return false;
        }
        if (!this.watchMenu?.isValid()) {
            return false;
        }
        if (!this.braceletsMenu?.isValid()) {
            return false;
        }
        if (!this.masksMenu?.isValid()) {
            return false;
        }
        if (!this.torsoMenu?.isValid()) {
            return false;
        }
        if (!this.topMenu?.isValid()) {
            return false;
        }
        if (!this.backpackMenu?.isValid()) {
            return false;
        }
        if (!this.undershirtMenu?.isValid()) {
            return false;
        }
        if (!this.accessoriesMenu?.isValid()) {
            return false;
        }
        if (!this.pantsMenu?.isValid()) {
            return false;
        }

        return this.shoesMenu?.isValid();
    }

    public setMaxDrawablesTextures(maxTextures: MaxDrawablesTexturesInterface): void {
        this.hatMenu?.setMaxTextures(maxTextures.maxHat);
        this.glassesMenu?.setMaxTextures(maxTextures.maxGlasses);
        this.earsMenu?.setMaxTextures(maxTextures.maxEars);
        this.watchMenu?.setMaxTextures(maxTextures.maxWatches);
        this.braceletsMenu?.setMaxTextures(maxTextures.maxBracelets);
        this.masksMenu?.setMaxTextures(maxTextures.maxMask);
        this.torsoMenu?.setMaxTextures(maxTextures.maxTorsos);
        this.topMenu?.setMaxTextures(maxTextures.maxTops);
        this.backpackMenu?.setMaxTextures(maxTextures.maxBackPacks);
        this.undershirtMenu?.setMaxTextures(maxTextures.maxUnderShirts);
        this.accessoriesMenu?.setMaxTextures(maxTextures.maxAccessories);
        this.pantsMenu?.setMaxTextures(maxTextures.maxPants);
        this.shoesMenu?.setMaxTextures(maxTextures.maxShoes);
    }

    public updateHat(clothing: ClothingInterface) {
        this.clothes.hat = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateGlasses(clothing: ClothingInterface) {
        this.clothes.glasses = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateEars(clothing: ClothingInterface) {
        this.clothes.ears = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateWatch(clothing: ClothingInterface) {
        this.clothes.watch = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateBracelets(clothing: ClothingInterface) {
        this.clothes.bracelets = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateMasks(clothing: ClothingInterface) {
        this.clothes.mask = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateTop(clothing: ClothingInterface) {
        this.clothes.top = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateBackpack(clothing: ClothingInterface) {
        this.clothes.backPack = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateTorso(clothing: ClothingInterface) {
        this.clothes.torso = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateUndershirt(clothing: ClothingInterface) {
        this.clothes.underShirt = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateAccessories(clothing: ClothingInterface) {
        this.clothes.accessories = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateLeg(clothing: ClothingInterface) {
        this.clothes.pants = clothing;

        this.$emit("update-clothes", this.clothes);
    }

    public updateShoes(clothing: ClothingInterface) {
        this.clothes.shoes = clothing;

        this.$emit("update-clothes", this.clothes);
    }
}
</script>

<style scoped>
.clothes-menu {
    padding: 1vw;
    height: 100%;
    overflow: auto;
}
</style>
