import {singleton} from "tsyringe";
import {WebView} from "@extensions/web-view.extensions";
import {LoggerModule} from "./logger.module";
import {EventModule} from "./event.module";
import {Player} from "@extensions/player.extensions";
import alt from "alt-client";

@singleton()
export class GuiModule {
    private webview?: WebView;
    private webViewReadyPromise: Promise<void>;
    private resolveWebViewReady!: () => void; // Ensures initialization.
    private eventQueue: Array<{ name: string, callback: (...args: any[]) => void }> = []; // Queue for event registrations.

    constructor(private readonly logger: LoggerModule, private readonly event: EventModule, private readonly player: Player) {
        // Initialize WebView readiness promise.
        this.webViewReadyPromise = new Promise<void>((resolve) => {
            this.resolveWebViewReady = resolve;
        });
    }

    public createView(url: string): void {
        this.webview = new WebView(url, true);

        this.webview.on("gui:ready", () => {
            alt.setTimeout(() => {
                this.event.emit("gui:ready");
                this.logger.info("WebViewModule: GUI is ready to use.");
                this.resolveWebViewReady(); // WebView is now ready.
                this.processEventQueue(); // Process any queued events.
            }, 100);
        });

        this.logger.info("WebViewModule: Creating single-instance of south central ui.");
    }

    public setUrl(url: string): void {
        if (this.webview) {
            this.webview.url = url;
        } else {
            this.logger.error("WebView nie jest zainicjowany. Nie można ustawić URL.");
        }
    }

    public focusView(): void {
        if (this.webview) {
            this.webview.focus();
        } else {
            this.logger.error("WebView nie jest zainicjowany. Nie można skupić widoku.");
        }
    }

    public unfocusView(force: boolean = false): void {
        if (!this.webview) {
            this.logger.error("WebView nie jest zainicjowany. Nie można odskupić widoku.");
            return;
        }
        
        if (!force) {
            if (this.player.getIsInventoryOpen || this.player.getIsPhoneOpen || this.player.getIsAnyMenuOpen) {
                return;
            }
        }

        this.webview.unfocus();
    }

    public guiEmit(name: string, ...args: any[]): void {
        if (this.webview) {
            this.webview.emit(name, ...args);
        } else {
            this.logger.error(`WebView nie jest zainicjowany. Nie można emitować zdarzenia: ${name}`);
        }
    }

    public guiOn(name: string, callback: (...args: any[]) => void): void {
        if (!this.webview) {
            this.logger.error(`WebView not initialized yet. Queuing event listener for: ${name}`);
            this.eventQueue.push({ name, callback }); // Queue the event.
            return;
        }
    
        this.webview.on(name, callback);
    }

    // Method to process the queued event registrations.
    private processEventQueue(): void {
        while (this.eventQueue.length > 0) {
            const { name, callback } = this.eventQueue.shift()!;
            this.guiOn(name, callback); // Register each queued event.
        }
    }
    
    // Metoda do oczekiwania na gotowość WebView
    public async waitForWebViewReady(): Promise<void> {
        await this.webViewReadyPromise;
    }
}
