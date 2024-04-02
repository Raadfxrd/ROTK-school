import { ActionReference, GameObjectReference, GameState } from "@shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    public static styles = css`
        /** Maken van nieuwe grid layout voor nieuwe custom layout **/
        .game {
            margin-top: 20px;
            height: calc(
                100vh - 40px
            ); /** Limiteren van display van website door viewheight - 40px doen, zorgt voor "claustrofobische" retro vibe **/
            width: calc(
                100vw - 40px
            ); /** Limiteren van display van website door viewwidth - 40px doen, zorgt voor "claustrofobische" retro vibe **/
            display: grid;
            grid-template-columns: 0.5fr 1.5fr 0.7fr;
            grid-template-rows: 0.1fr 2fr 0.9fr;
            gap: 20px 20px;
            grid-template-areas:
                "title title ."
                "header header sidebar"
                "buttons buttons sidebar";
        }

        .title {
            text-align: center;
            grid-area: title;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            grid-area: header;
        }

        .header img {
            max-width: 100%;
            max-height: 100%;
            image-rendering: crisp-edges;
            image-resolution: from-image 10dpi;
        }

        .header img:nth-child(n + 2) {
            position: absolute;
        }

        /** Sidebar class voor displayen van text op leukere manier **/
        .sidebar {
            border: 2px solid #c0c0c0;
            background-color: #000;
            padding: 0px 20px 0px 20px;
            color: #fff;
            grid-area: sidebar;
            font-family: var(--font);
            font-size: 1.8rem;
            font-weight: bold;
            letter-spacing: -2px;
            line-height: 1;
        }

        .sidebar p {
            margin: 20px 0px 0px 0px;
        }

        /** Class voor altijd zichtbare buttons **/
        .buttons {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            overflow: auto;
            justify-self: center;
            align-self: start;
            width: 100%;
            grid-area: buttons;
        }

        .button,
        .action-button {
            background-color: #9988ee;
            border-radius: var(--button-radius);
            padding: var(--button-padding);
            cursor: var(--button-cursor);
            user-select: var(--button-user-select);
            display: inline-block;
            margin-bottom: 10px;
            max-height: 1.5rem;
        }

        .button.active,
        .button:hover,
        .action-button:hover {
            background-color: #332c57;
        }

        /** Class voor uitvouwbare buttons **/
        .action-buttons {
            display: none;
            margin-top: 20px;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            animation: fadeInDown 0.5s;
            border-radius: var(--button-radius);
            padding: var(--button-padding);
            cursor: var(--button-cursor);
            user-select: var(--button-user-select);
            width: 100%;
        }

        .action-button {
            background-color: #7f68c1;
            transition: 0.2s;
            margin: 0;
        }

        /** Classes voor definieren of ".action-buttons" links, rechts of gecentreerd moeten zijn **/
        .center,
        .left,
        .right {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .left {
            align-items: flex-start;
            justify-content: flex-start;
        }

        .right {
            align-items: flex-end;
            justify-content: flex-end;
        }

        #healthbar {
            background-color: green;
        }

        .timer-box {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 2.5rem;
        }

        /** Animation keyframes voor ".action-buttons" **/
        @keyframes fadeInDown {
            0% {
                opacity: 0;
                transform: translateY(-90px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /** Animation class voor ".action-buttons" **/
        .fadeInDown {
            animation-name: fadeInDown;
        }
    `;

    @state() private timerSeconds: number = 0;
    @state() private timerMilliseconds: number = 0;
    @state() public speedrunMode: boolean = false;

    private playerHP: number = 100;
    private smaugHP: number = 150;
    private typewriterTimeouts: NodeJS.Timeout[] = [];

    private roomTitle?: string;
    private roomImages?: string[];

    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];
    private selectedActionButton?: ActionReference;
    private selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    // Functie die wordt aangeroepen wanneer het component met het DOM verbindt.
    public connectedCallback(): void {
        super.connectedCallback();

        const savedSpeedrunMode: string | null = localStorage.getItem("speedrunMode");

        if (savedSpeedrunMode !== null) {
            try {
                this.speedrunMode = JSON.parse(savedSpeedrunMode);
            } catch (error) {
                console.error("Error parsing saved speedrun mode state:", error);
            }
        } else {
            this.speedrunMode = false;
        }

        this.startTimer();

        void this.refreshState(); // Asynchroon de huidige spelstaat verversen.
    }

    // Asynchrone functie om de huidige spelstaat te verversen.
    private async refreshState(): Promise<void> {
        const state: GameState = await getState(); // Haalt de huidige spelstaat op.

        this.updateState(state); // Update de componentstaat met de nieuwe spelstaat.
    }

    // Functie om de componentstaat bij te werken gebaseerd op de spelstaat.
    private updateState(state: GameState): void {
        // Stel de component variabelen in gebaseerd op de spelstaat.
        this.roomTitle = state.roomTitle;
        this.roomImages = state.roomImages;
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.gameObjectButtons = state.objects;
        this.playerHP = state.playerHP;
        this.smaugHP = state.smaugHP;

        // Reset geselecteerde acties en objecten.
        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        // Als er tekst is, gebruik de typemachine functie om het te tonen.
        if (state.text) {
            this.typewriterTimeouts.forEach(clearTimeout);
            this.typewriter(state.text);
        }
        this.requestUpdate(); // Verzoek om de component te herrenderen.
    }

    // Functie om een actieknop klik te verwerken.
    private async handleClickAction(button: ActionReference): Promise<void> {
        if (button.needsObject) {
            // Als de actie een object vereist, selecteer dan de actie en reset geselecteerde objecten.
            this.selectedActionButton = button;
            this.selectedGameObjectButtons.clear();
        } else {
            // Voer de actie uit en update de staat als deze verandert.
            const state: any = await performAction(button.alias);

            if (state !== undefined) {
                this.updateState(state);
            }
        }

        this.requestUpdate(); // Verzoek om de component te herrenderen.
    }

    // Functie om een game object knop klik te verwerken.
    private async handleClickObject(button: GameObjectReference): Promise<void> {
        if (!this.selectedActionButton) {
            return; // Als er geen actie geselecteerd is, negeer de klik.
        }

        this.selectedGameObjectButtons.add(button); // Voeg het object toe aan de set van geselecteerde objecten.

        // Voer de geselecteerde actie uit met de geselecteerde objecten.
        const state: GameState | undefined = await performAction(
            this.selectedActionButton.alias,
            Array.from(this.selectedGameObjectButtons, (e) => e.alias)
        );

        // Reset selecties als er 2 of meer objecten geselecteerd zijn.
        if (this.selectedGameObjectButtons.size >= 2) {
            this.selectedActionButton = undefined;
            this.selectedGameObjectButtons.clear();
        }

        if (state !== undefined) {
            this.updateState(state); // Update de staat als deze verandert.
        }

        this.requestUpdate(); // Verzoek om de component te herrenderen.
    }

    private startTimer(): void {}

    private renderTimer(): TemplateResult | typeof nothing {
        if (this.speedrunMode) {
            const minutes: number = Math.floor(this.timerSeconds / 60);
            const seconds: number = Math.floor(this.timerSeconds % 60);
            const milliseconds: number = Math.floor(this.timerMilliseconds);
            return html`${minutes}:${seconds < 10 ? "0" : ""}${seconds}.${milliseconds < 100
                ? "0"
                : ""}${milliseconds < 10 ? "0" : ""}${milliseconds}`;
        } else {
            return nothing; // Render nothing if speedrunMode is false
        }
    }

    public toggleSpeedrunMode(): void {
        this.speedrunMode = !this.speedrunMode;
        this.dispatchEvent(
            new CustomEvent("speedrun-mode-toggled", {
                detail: { speedrunMode: this.speedrunMode },
                bubbles: true,
                composed: true,
            })
        );
    }

    public isSpeedrunModeOn(): boolean {
        return this.speedrunMode;
    }

    // Typemachine functie om tekst te animeren.
    private typewriter(
        text: string[],
        index: number = 0,
        charIndex: number = 0,
        speed: number = this.speedrunMode ? 1 : 20
    ): void {
        if (index < text.length) {
            const line: string = text[index];
            if (charIndex < line.length) {
                // Toon tekst één karakter per keer.
                this.contentText = [...text.slice(0, index), line.slice(0, charIndex + 1)];
                this.requestUpdate();
                this.typewriterTimeouts.push(
                    setTimeout(() => this.typewriter(text, index, charIndex + 1, speed), speed)
                );
            } else {
                // Ga naar de volgende regel als de huidige voltooid is.
                this.typewriterTimeouts.push(
                    setTimeout(() => this.typewriter(text, index + 1, 0, speed), speed)
                );
            }
        }
    }

    // Hoofdrendermethode die de HTML-structuur van het component genereert.
    protected render(): TemplateResult {
        // Bouwt de HTML op met de gedefinieerde subrendermethodes voor verschillende delen van de UI.
        return html`
            <div class="game">
                <div class="title">${this.renderTitle()}</div>
                <!-- Toont de titel van de kamer -->
                <div class="header">${this.renderHeader()}</div>
                <!-- Toont afbeeldingen van de kamer -->
                <div class="sidebar">${this.renderSidebar()}</div>
                <!-- Toont de inhoudstekst van de kamer -->
                <div class="buttons">${this.renderFooter()}</div>
                <!-- Toont de actie- en objectknoppen -->
                <div>
                    HP:${this.playerHP}<progress id="healthbar" max="100" value=${this.playerHP}></progress>
                    <div>
                        <progress
                            class="smaugHPbar"
                            style="display: none"
                            max="150"
                            value=${this.smaugHP}
                        ></progress>
                    </div>
                </div>
                <div class="timer-box">${this.renderTimer()}</div>
            </div>
        `;
    }

    // Genereert de titel van de kamer.
    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`${this.roomTitle}`; // Geeft de kamer titel weer als deze bestaat.
        }

        return html`${nothing}`; // Geeft niets weer als er geen titel is.
    }

    // Genereert de header met kamer afbeeldingen.
    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            // Genereert een lijst van afbeeldingselementen voor elke kamer afbeelding.
            return html` ${this.roomImages?.map((url) => html`<img src="/assets/img/${url}" />`)} `;
        }

        return html`${nothing}`; // Geeft niets weer als er geen afbeeldingen zijn.
    }

    // Genereert de zijbalk met inhoudstekst.
    private renderSidebar(): TemplateResult {
        // Genereert een paragraaf voor elk stuk inhoudstekst.
        return html`${this.contentText?.map((text) => html`<p>${text}</p>`)} `;
    }

    // Genereert de footer met actieknoppen.
    private renderFooter(): TemplateResult {
        return html`
            ${this.actionButtons?.map(
                // Genereert een link-element voor elke actieknop.
                (button) => html`<a
                    class="button ${this.selectedActionButton === button ? "active" : ""}"
                    @click=${(): void => void this.handleClickAction(button)}
                    >${button.label}</a
                >`
            )}
            ${this.selectedActionButton ? this.renderActionButtons() : nothing}
            <!-- Toont extra actieknoppen als er een actie geselecteerd is -->
        `;
    }

    // Genereert extra actieknoppen gerelateerd aan geselecteerde acties.
    private renderActionButtons(): TemplateResult {
        return html`
            <div class="action-buttons ${this.selectedActionButton ? "fadeInDown center" : ""}">
                ${this.gameObjectButtons
                    // Filtert en toont alleen de knoppen die overeenkomen met de geselecteerde actie.
                    ?.filter((button) => button.actions.includes(this.selectedActionButton!.alias))
                    .map(
                        (button) => html`<a
                            class="action-button ${this.selectedGameObjectButtons.has(button)
                                ? "active"
                                : ""}"
                            @click=${(): void => void this.handleClickObject(button)}
                            >${button.name}</a
                        >`
                    )}
            </div>
        `;
    }
}
