// import { ActionReference, GameObjectReference, GameState } from "@shared/types";
import { LitElement, TemplateResult, css, html } from "lit";
import { customElement } from "lit/decorators.js";
// import { getState, performAction } from "../services/routeService";

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
            grid-template-columns: 1.1fr 1fr 2fr;
            grid-template-rows: 1fr 1fr 1fr;
            gap: 0px 0px;
            grid-auto-flow: row;
            grid-template-areas:
                ". . ."
                ". . start-buttons"
                ". . made-by";
        }

        .start-buttons {
            grid-area: start-buttons;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
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
            width: calc(25% - 10px);
        }

        .button:hover {
            background-color: #332c57;
            transition: background-color 0.3s;
        }

        .made-by {
            height: 40px;
            grid-area: made-by;
            align-self: flex-end;
            text-align: center;
        }
    `;

    public render(): TemplateResult {
        return html`
            <div class="start">
                <div class="start-buttons">${this.renderButtons()}</div>
                <div class="made-by">${this.renderFooter()}</div>
            </div>
        `;
    }

    private renderButtons(): TemplateResult {
        return html`
            <a class="button">Start Game</a>
            <a class="button">How to play</a>
            <a class="button">Load game</a>
        `;
    }

    private renderFooter(): TemplateResult {
        return html` <p>© 2024 - Made by: Borys, Jay, Joas, Matthijs and Salim.</p> `;
    }
}
