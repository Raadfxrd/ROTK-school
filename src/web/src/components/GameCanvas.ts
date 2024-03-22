import { ActionReference, GameObjectReference, GameState } from "@shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    private playerHP: number = 100;

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

    private roomTitle?: string;
    private roomImages?: string[];
    private contentText?: string[];
    private actionButtons?: ActionReference[];
    private gameObjectButtons?: GameObjectReference[];

    private selectedActionButton?: ActionReference;
    private selectedGameObjectButtons: Set<GameObjectReference> = new Set<GameObjectReference>();

    public connectedCallback(): void {
        super.connectedCallback();

        void this.refreshState();
    }

    private async refreshState(): Promise<void> {
        const state: GameState = await getState();

        this.updateState(state);
    }

    private updateState(state: GameState): void {
        this.roomTitle = state.roomTitle;
        this.roomImages = state.roomImages;
        this.contentText = state.text;
        this.actionButtons = state.actions;
        this.gameObjectButtons = state.objects;
        this.playerHP = state.playerHP;

        this.selectedActionButton = undefined;
        this.selectedGameObjectButtons.clear();

        this.requestUpdate();
    }

    private async handleClickAction(button: ActionReference): Promise<void> {
        if (button.needsObject) {
            this.selectedActionButton = button;
            this.selectedGameObjectButtons.clear();
        } else {
            const state: any = await performAction(button.alias);

            if (state !== undefined) {
                this.updateState(state);
            }
        }

        this.requestUpdate();
    }

    private async handleClickObject(button: GameObjectReference): Promise<void> {
        if (!this.selectedActionButton) {
            return;
        }

        this.selectedGameObjectButtons.add(button);

        const state: GameState | undefined = await performAction(
            this.selectedActionButton.alias,
            Array.from(this.selectedGameObjectButtons, (e) => e.alias)
        );

        if (this.selectedGameObjectButtons.size >= 2) {
            this.selectedActionButton = undefined;
            this.selectedGameObjectButtons.clear();
        }

        if (state !== undefined) {
            this.updateState(state);
        }

        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
            <div class="game">
                <div class="title">${this.renderTitle()}</div>
                <div class="header">${this.renderHeader()}</div>
                <div class="sidebar">${this.renderSidebar()}</div>
                <div class="buttons">${this.renderFooter()}</div>
                <div>
                    HP:${this.playerHP}<progress id="healthbar" max="100" value=${this.playerHP}></progress>
                </div>
            </div>
        `;
    }

    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`${this.roomTitle}`;
        }

        return html`${nothing}`;
    }

    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            return html` ${this.roomImages?.map((url) => html`<img src="/assets/img/${url}" />`)} `;
        }

        return html`${nothing}`;
    }

    private renderSidebar(): TemplateResult {
        return html`${this.contentText?.map((text) => html`<p>${text}</p>`)} `;
    }

    private renderFooter(): TemplateResult {
        return html`
            ${this.actionButtons?.map(
                (button) => html`<a
                    class="button ${this.selectedActionButton === button ? "active" : ""}"
                    @click=${(): void => void this.handleClickAction(button)}
                    >${button.label}</a
                >`
            )}
            ${this.selectedActionButton ? this.renderActionButtons() : nothing}
        `;
    }

    private renderActionButtons(): TemplateResult {
        return html`
            <div class="action-buttons ${this.selectedActionButton ? "fadeInDown center" : ""}">
                <!-- Verander de center hier voor juiste uitlijning -->
                ${this.gameObjectButtons
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
