import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { GameCanvas } from "./GameCanvas";
// import { playerSessionMiddleware } from "../../../api/src/base/playerSessionMiddleware";

@customElement("start-screen")
export class StartScreen extends LitElement {
    public static styles = css`
        .start {
            margin-top: 20px;
            height: calc(
                100vh - 40px
            ); /** Limiteren van display van website door viewheight - 40px doen, zorgt voor "claustrofobische" retro vibe **/
            width: calc(
                100vw - 40px
            ); /** Limiteren van display van website door viewwidth - 40px doen, zorgt voor "claustrofobische" retro vibe **/
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
            height: calc(11vh - 50px);
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
            /* Subtract the height of the .made-by box and any additional space you want to leave */
            height: calc(100vh - (11vh - 40px) - 60px);
            margin-bottom: calc(100vh - (11vh - 40px));
            -webkit-animation: imgSlideInFromRight 1.3s cubic-bezier(0.23, 1, 0.32, 1) both;
            animation: imgSlideInFromRight 0.6s cubic-bezier(0.23, 1, 0.32, 1) both;
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

    private showHowToPlay: boolean = false;

    private startGame(): void {
        console.log("game started");

        // Create a new instance of the game-canvas
        const gameCanvas: GameCanvas = document.createElement("game-canvas") as GameCanvas;

        // Add the game-canvas to the body of the page
        document.body.appendChild(gameCanvas);

        this.remove();
    }

    private howToPlay(): void {
        this.showHowToPlay = true;
        this.requestUpdate();
    }

    private loadGame(): void {
        console.log("load game");
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
                <a @click=${this.startGame} class="button">Start new game</a>
                ${!this.showHowToPlay ? html`<a @click=${this.howToPlay} class="button">How to play</a>` : ""}
                <a @click=${this.loadGame} class="button">Load game</a>
            </div>
        `;
    }

    private backToStart(): void {
        this.showHowToPlay = false;
        this.requestUpdate();
    }

    private renderInstructionsSidebar(): TemplateResult {
        return html`
            <div class="instructions-sidebar">
                <p>Here are the instructions on how to play our game:</p>
                <ul>
                    <li>The story will be presented at the right of your screen. Just like in this box!</li>
                    <li>Use the buttons to navigate through the story and make choices.</li>
                    <li>
                        Explore the world and interact with objects to progress. Trust me, it will be worth it
                        in the end!
                    </li>
                    <li>Make sure to keep an eye on your health bar, you don't want to die!</li>
                    <li>Good luck and have fun!</li>
                </ul>
                <a @click=${this.backToStart} class=" back-button">Back</a>
            </div>
        `;
    }

    private renderFooter(): TemplateResult {
        return html` <p>© 2024 - Made by: Borys, Jay, Joas, Mathijs and Salim.</p> `;
    }
}
