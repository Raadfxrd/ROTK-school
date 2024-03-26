import { LitElement, PropertyValues, TemplateResult, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { GameCanvas } from "./GameCanvas";

@customElement("start-screen")
export class StartScreen extends LitElement {
    public static styles = css`
        .start {
            margin-top: 20px;
            height: calc(
                100% - 30px
            ); /** Limiteren van display van website door viewheight - 40px doen, zorgt voor "claustrofobische" retro vibe **/
            width: calc(100% - 20px);
            display: grid;
            grid-template-columns: 1.1fr 1fr 2.4fr;
            grid-template-rows: 1fr 1fr 1fr;
            gap: 0px 0px;
        }

        .start-buttons {
            overflow: hidden;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
            grid-area: 2 / 3 / 3 / 3;
        }

        .start-buttons {
            overflow: hidden;
            content: "";
            -webkit-animation: imgSlideInFromRight 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
            animation: imgSlideInFromRight 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .button {
            background-color: #7f68c1;
            border-radius: var(--button-radius);
            padding: var(--button-padding);
            cursor: var(--button-cursor);
            user-select: var(--button-user-select);
            display: inline-block;
            margin-bottom: 20px;
            max-height: 1.5rem;
            width: calc(30% - 10px);
        }

        .button:hover,
        .back-button:hover {
            background-color: #332c57;
            transition: background-color 0.3s;
        }

        .back-button {
            background-color: #7f68c1;
            border-radius: var(--button-radius);
            padding: var(--button-padding);
            cursor: var(--button-cursor);
            user-select: var(--button-user-select);
            display: inline-block;
            margin-top: 20px;
            position: absolute;
            bottom: 20px;
        }

        .made-by {
            overflow: hidden;
            content: "";
            -webkit-animation: imgSlideInFromRight 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
            animation: imgSlideInFromRight 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
            height: 60px;
            width: 101%;
            align-self: flex-end;
            text-align: center;
            grid-area: 3 / 3 / 4 / 4;
        }

        .start {
            overflow: hidden;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-size: calc(100vh - 40px) calc(100vh - 40px);
            background-repeat: no-repeat;
            background-position-x: 3%;
            background-position-y: 100%;
        }

        .start:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            background-image: url("/assets/img/rooms/ROTK.png");
            background-size: calc(100vh - 40px) calc(100vh - 40px);
            background-repeat: no-repeat;
            background-position-x: 3%;
            background-position-y: 100%;
            -webkit-animation: imgSlideInFromLeft 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
            animation: imgSlideInFromLeft 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .how-to-play {
            background-color: #7f68c1;
            border-radius: var(--button-radius);
            padding: var(--button-padding);
            cursor: var(--button-cursor);
        }

        .instructions-sidebar {
            border: 2px solid #c0c0c0;
            background-color: #000;
            padding: 20px;
            color: #fff;
            font-size: 1.8rem;
            letter-spacing: -2px;
            line-height: 1;
            grid-area: 1 / 3 / 4 / 4;
            display: flex;
            flex-direction: column;
            justify-self: end;
            width: 50%;
            height: calc(100vh - (11vh - 40px) - 60px);
            margin-bottom: calc(100vh - (11vh - 40px));
            -webkit-animation: imgSlideInFromRight 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
            animation: imgSlideInFromRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
        }

        .instructions-content p {
            margin-bottom: 16px;
            line-height: 1.6;
        }

        .instructions-content > div {
            margin-bottom: 10px;
        }

        @-webkit-keyframes imgSlideInFromLeft {
            0% {
                -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
                transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
                -webkit-transform-origin: 100% 50%;
                transform-origin: 100% 50%;
                -webkit-filter: blur(40px);
                filter: blur(40px);
                opacity: 0;
            }
            100% {
                -webkit-transform: translateX(0) scaleY(1) scaleX(1);
                transform: translateX(0) scaleY(1) scaleX(1);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-filter: blur(0);
                filter: blur(0);
                opacity: 1;
            }
        }

        @keyframes imgSlideInFromLeft {
            0% {
                -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
                transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
                -webkit-transform-origin: 100% 50%;
                transform-origin: 100% 50%;
                -webkit-filter: blur(40px);
                filter: blur(40px);
                opacity: 0;
            }
            100% {
                -webkit-transform: translateX(0) scaleY(1) scaleX(1);
                transform: translateX(0) scaleY(1) scaleX(1);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-filter: blur(0);
                filter: blur(0);
                opacity: 1;
            }
        }

        @-webkit-keyframes imgSlideInFromRight {
            0% {
                -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
                transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
                -webkit-transform-origin: 100% 50%;
                transform-origin: 100% 50%;
                -webkit-filter: blur(40px);
                filter: blur(40px);
                opacity: 0;
            }
            100% {
                -webkit-transform: translateX(0) scaleY(1) scaleX(1);
                transform: translateX(0) scaleY(1) scaleX(1);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-filter: blur(0);
                filter: blur(0);
                opacity: 1;
            }
        }

        @keyframes imgSlideInFromRight {
            0% {
                -webkit-transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
                transform: translateX(1000px) scaleX(2.5) scaleY(0.2);
                -webkit-transform-origin: 100% 50%;
                transform-origin: 100% 50%;
                -webkit-filter: blur(40px);
                filter: blur(40px);
                opacity: 0;
            }
            100% {
                -webkit-transform: translateX(0) scaleY(1) scaleX(1);
                transform: translateX(0) scaleY(1) scaleX(1);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-filter: blur(0);
                filter: blur(0);
                opacity: 1;
            }
        }
    `;

    @state() private typewriterLines: string[] = []; // Bevat regels voor het typemachine-effect
    @state() private isTyping: boolean = false;

    private showHowToPlay: boolean = false;
    private instructions: string[] = [];

    // Lifecycle method for handling property changes
    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        if (changedProperties.has("showHowToPlay") && this.showHowToPlay) {
            const sidebar: any = this.shadowRoot?.querySelector(".instructions-content");
            if (sidebar) {
                sidebar.innerHTML = "";
                void this.typewriter(this.instructions);
            }
        }
    }

    private loadGame(): void {
        console.log("Game started!");
        const gameCanvas: GameCanvas = document.createElement("game-canvas") as GameCanvas;
        document.body.appendChild(gameCanvas);
        this.remove();
    }

    private async typewriter(
        text: string[],
        index: number = 0,
        charIndex: number = 0,
        speed: number = 20
    ): Promise<void> {
        this.isTyping = true;
        while (index < text.length) {
            if (!this.isTyping) break;
            if (charIndex <= text[index].length) {
                this.typewriterLines[index] = text[index].substring(0, charIndex);
                this.requestUpdate("typewriterLines", [...this.typewriterLines]);
                await new Promise((resolve) => setTimeout(resolve, speed));
                charIndex++;
            } else {
                index++;
                charIndex = 0;
                await new Promise((resolve) => setTimeout(resolve, 600));
            }
        }
        this.isTyping = false;
    }

    private async howToPlay(): Promise<void> {
        if (!this.isTyping) {
            this.typewriterLines = [];
            this.showHowToPlay = true;
            this.instructions = [
                "The story will be presented at the right of your screen. Just like in this box!",
                "Use the buttons to navigate through the story and make choices.",
                "Explore the world and interact with objects to progress. Trust me, it will be worth it in the end!",
                "Make sure to keep an eye on your health bar, you don't want to die!",
                "Good luck and have fun!",
            ];
            await this.typewriter(this.instructions).catch((error) => {
                console.error("Er is een fout opgetreden tijdens de typemachine-animatie:", error);
                this.isTyping = false;
            });
            this.isTyping = false;
            this.requestUpdate();
        }
    }

    private backToStart(): void {
        if (this.isTyping) {
            this.isTyping = false;
            this.typewriterLines = [];
            this.requestUpdate();
        }
        this.showHowToPlay = false;
        this.requestUpdate();
    }

    protected render(): TemplateResult {
        return html`
            <div class="start">
                ${this.showHowToPlay ? this.renderInstructionsSidebar() : this.renderButtons()}
                <div class="made-by">${this.renderFooter()}</div>
            </div>
        `;
    }

    private renderButtons(): TemplateResult {
        return html`
            <div class="start-buttons">
                <a @click=${this.loadGame} class="button">Load last game</a>
                ${!this.showHowToPlay ? html`<a @click=${this.howToPlay} class="button">How to play</a>` : ""}
            </div>
        `;
    }

    protected renderInstructionsSidebar(): TemplateResult {
        return html`
            <div class="instructions-sidebar">
                <p>Here are the instructions on how to play our game:</p>
                <div class="instructions-content">
                    ${this.typewriterLines.map((line) => html`<div>${line}</div>`)}
                </div>
                <a @click=${this.backToStart} class="back-button">Back</a>
            </div>
        `;
    }

    private renderFooter(): TemplateResult {
        return html`<p>© 2024 - Made by: Borys, Jay, Joas, Mathijs, and Salim</p>`;
    }
}
