import {singleton} from "tsyringe";
import {WebView} from "@extensions/web-view.extensions";
import {EventModule} from "../modules/event.module";
import {Player} from "@extensions/player.extensions";
import alt from "alt-client";

@singleton()
export class GuiModule {
    private webview: WebView = undefined;

    constructor(private readonly event: EventModule, private readonly player: Player) {
    }

    public createView(url: string): void {
        this.webview = new WebView(url, true);

        this.webview.on("gui:ready", () => {
            alt.setTimeout(() => {
                this.event.emit("gui:ready");
            }, 100);
        });

    }

    public setUrl(url: string): void {
        this.webview.url = url;
    }

    public focusView(): void {
        this.webview.focus();
    }

    public unfocusView(force: boolean = false): void {
        if (!force) {
            if (this.player.getIsInventoryOpen || this.player.getIsPhoneOpen || this.player.getIsAnyMenuOpen) {
                return;
            }
        }

        this.webview.unfocus();
    }

    public guiEmit(name: string, ...args: any[]): void {
        this.webview.emit(name, ...args)
    }

    public guiOn(name: string, callback: (...args: any[]) => void): void {
        if (!this.webview) {
            return;
        }
        this.webview.on(name, callback);
    }
}