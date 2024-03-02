import { ActionReference, GameObjectReference, GameState } from "@shared/types";
import { LitElement, TemplateResult, css, html, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { getState, performAction } from "../services/routeService";

@customElement("game-canvas")
export class GameCanvas extends LitElement {
    public static styles = css`
        .game {
            height: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto 1fr auto;
            grid-column-gap: 0px;
            grid-row-gap: 0px;
        }

        .title {
            text-align: center;
            margin-top: 10px;
        }

        .header {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
            position: relative;
            margin-top: 10px;
        }

        .header img {
            width: 90%;
            height: auto;
            image-rendering: pixelated;
        }

        .header img:nth-child(n + 2) {
            position: absolute;
        }

        .content {
            flex-grow: 1;
            overflow: auto;
            margin-top: 10px;
            padding: 0 10px;
        }

        .content p {
            margin: 0 0 10px 0;
        }

        .content p:last-of-type {
            margin: 0;
        }

        .buttons {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            overflow: auto;
            margin-top: 10px;
        }

        .button {
            background-color: #9988ee;
            border-radius: 2px;
            padding: 20px 20px;
            margin-bottom: 10px;
            text-transform: uppercase;
            cursor: pointer;
            display: inline-block;
            user-select: none;
        }

        .button.active,
        .button:hover,
        .action-button:hover {
            background-color: #332c57;
        }

        .action-buttons {
            display: none;
            margin-top: 20px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            -webkit-animation-duration: 0.5s;
            animation-duration: 0.5s;
        }

        .action-button {
            background-color: #b07dc9;
            transition-duration: 0.2s;
            border-radius: 2px;
            padding: 20px 20px;
            margin: 0 0 10px 10px;
            text-transform: uppercase;
            cursor: pointer;
            display: inline-block;
            user-select: none;
        }

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
        @-webkit-keyframes fadeInDown {
            0% {
                opacity: 0;
                -webkit-transform: translateY(-90px);
            }
            100% {
                opacity: 1;
                -webkit-transform: translateY(0);
            }
        }
        .fadeInDown {
            -webkit-animation-name: fadeInDown;
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
                ${this.renderTitle()} ${this.renderHeader()} ${this.renderContent()} ${this.renderFooter()}
            </div>
        `;
    }

    private renderTitle(): TemplateResult {
        if (this.roomTitle) {
            return html`<div class="title">${this.roomTitle}</div>`;
        }

        return html`${nothing}`;
    }

    private renderHeader(): TemplateResult {
        if (this.roomImages && this.roomImages.length > 0) {
            return html`
                <div class="header">
                    ${this.roomImages?.map((url) => html`<img src="/assets/img/rooms/${url}.png" />`)}
                </div>
            `;
        }

        return html`${nothing}`;
    }

    private renderContent(): TemplateResult {
        return html`<div class="content">${this.contentText?.map((text) => html`<p>${text}</p>`)}</div>`;
    }

    private renderFooter(): TemplateResult {
        return html`
            <div class="buttons">
                ${this.actionButtons?.map(
                    (button) => html`<a
                        class="button ${this.selectedActionButton === button ? "active" : ""}"
                        @click=${(): void => void this.handleClickAction(button)}
                        >${button.label}</a
                    >`
                )}
            </div>
            ${this.selectedActionButton ? this.renderActionButtons() : nothing}
        `;
    }

    private renderActionButtons(): TemplateResult {
        return html`
            <div class="action-buttons ${this.selectedActionButton ? "fadeInDown" : ""}">
                ${this.gameObjectButtons?.map(
                    (button) => html`<a
                        class="action-button ${this.selectedGameObjectButtons.has(button) ? "active" : ""}"
                        @click=${(): void => void this.handleClickObject(button)}
                        >${button.name}</a
                    >`
                )}
            </div>
        `;
    }
}
