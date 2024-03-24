<template>
    <div class='appearance-menu'>
        <h5>{{ title }}</h5>
        <div class='menu'>
            <div class='left'>
                <button class='btn btn-primary' type='button' @click='onPreviousButtonClicked()'>
                    <font-awesome-icon icon='caret-left' />
                </button>
            </div>

            <p v-if='appearance.value !== clearNumber && names'>
                {{ names[appearance.value] }} ({{ appearance.value }}) </p>
            <p v-if='appearance.value === clearNumber && clearNumber === 0 && names'>
                {{ names[appearance.value] }} </p>
            <p v-if='appearance.value !== clearNumber && !names'>
                {{ appearance.value }} </p>
            <p v-if='appearance.value === clearNumber && clearNumber === 0 && !names'>
                {{ appearance.value }} </p>
            <p v-if='appearance.value === clearNumber && clearNumber !== 0'>Keine</p>

            <div>
                <button v-if='hasOpacity || colors !== null' class='icon-button' type='button' @click='toggleMenu()'>
                    <font-awesome-icon class='text-white' icon='cog' />
                </button>
                <button ref='clearButton' :hidden='appearance.value === clearNumber' class='icon-button' type='button'>
                    <font-awesome-icon class='text-white' icon='trash' />
                </button>
            </div>
            <div class='right'>
                <button class='btn btn-primary' type='button' @click='onNextButtonClicked()'>
                    <font-awesome-icon icon='caret-right' />
                </button>
            </div>
        </div>

        <div :hidden='currentMenuIndex !== menuIndex' class='sub-menu'>
            <div v-if='colors !== null' class='colorBox'>
                <div v-for='(color, index) in colors' :key='index'>
                    <button class='icon-button' type='button' @click='selectPrimaryColor(index)'>
                        <font-awesome-icon icon='circle' v-bind:style="{
                color: 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')',
              }" />
                    </button>
                </div>
            </div>

            <div v-if='hasSecondaryColor' style='padding-top: 1vw'>
                <p class='text-white-50'>Haarspitzen Farbe</p>
                <div class='colorBox'>
                    <div v-for='(color, index) in colors' :key='index'>
                        <button class='icon-button' type='button' @click='selectSecondaryColor(index)'>
                            <font-awesome-icon icon='circle' v-bind:style="{
                  color:
                    'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')',
                }" />
                        </button>
                    </div>
                </div>
            </div>

            <div v-if='hasOpacity'>
                <input v-model='opacityString' class='form-range' max='1' min='0' step='0.01' type='range' @input='updateOpacity()' />
                <div style='margin: unset'>
                    <p class='float-start'>Deckkraft</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import {Vue} from "vue-class-component";
import {Prop, Ref} from "vue-property-decorator";
import {ColorInterface} from "@/scripts/interfaces/color.interface";
import {AppearanceInterface} from "@/scripts/interfaces/character/appearance.interface";

export default class AppearanceMenu extends Vue {
    @Prop() public readonly title!: string;
    @Prop() public readonly colors!: ColorInterface[];
    @Prop() public readonly menuIndex!: number;
    @Prop() public readonly names!: string[];
    @Prop() public readonly maxElements!: number;
    @Prop() public readonly currentMenuIndex!: number;
    @Prop() public readonly clearNumber!: number;
    @Prop() public readonly hasOpacity!: number;
    @Prop() public readonly hasSecondaryColor!: number;
    @Ref() public readonly clearButton!: HTMLButtonElement;

    public opacityString: string = "0.5";

    public appearance: AppearanceInterface = {
        value: this.clearNumber, opacity: 1, primaryColor: 0, secondaryColor: 0,
    };

    public mounted(): void {
        this.clearButton.addEventListener("click", () => this.clear());
    }

    public unmounted(): void {
        this.clearButton.removeEventListener("click", () => this.clear());
    }

    public setAppearance(existingAppearance: AppearanceInterface): void {
        this.appearance.value = existingAppearance.value;
        this.appearance.opacity = existingAppearance.opacity;
        this.appearance.primaryColor = existingAppearance.primaryColor;
        this.appearance.secondaryColor = existingAppearance.secondaryColor;
    }

    public onPreviousButtonClicked(): void {
        this.appearance.value--;

        // For max values look intro the description of https://natives.altv.mp/#/0x48F44967FA05CC1E
        if (this.appearance.value < 0 || this.appearance.value > this.maxElements) this.appearance.value = this.maxElements;

        this.$emit("update-appearance", this.appearance);
    }

    public onNextButtonClicked(): void {
        this.appearance.value++;

        //https://natives.altv.mp/#/0x48F44967FA05CC1E
        if (this.appearance.value > this.maxElements) this.appearance.value = 0;

        this.$emit("update-appearance", this.appearance);
    }

    public toggleMenu(): void {
        this.$emit("request-menu", this.menuIndex);
    }

    public clear(): void {
        this.appearance = {
            value: this.clearNumber, opacity: 1, primaryColor: 0, secondaryColor: 0,
        };

        this.$emit("update-appearance", this.appearance);
        this.$emit("request-menu", -1);
    }

    public selectPrimaryColor(index: number): void {
        this.appearance.primaryColor = index;
        this.$emit("update-appearance", this.appearance);
    }

    public selectSecondaryColor(index: number): void {
        this.appearance.secondaryColor = index;
        this.$emit("update-appearance", this.appearance);
    }

    public updateOpacity(): void {
        this.appearance.opacity = Number.parseFloat(this.opacityString);
        this.$emit("update-appearance", this.appearance);
    }
}
</script>

<style scoped>
.appearance-menu {
    padding-bottom: 2vw;
}

.menu {
    display: flex;
    justify-content: center;
    position: relative;
}

.sub-menu {
    padding-top: 1.25vw;
}

.left {
    position: absolute;
    left: 0;
}

.right {
    position: absolute;
    right: 0;
}

.icon-button {
    font-size: 0.7vw;
}

.colorBox {
    display: flex;
    flex-wrap: wrap;
}

.colorBox .icon-button {
    font-size: 1vw;
}
</style>
