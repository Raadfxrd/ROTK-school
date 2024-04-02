import { TalkChoiceAction } from "../actions/TalkAction";
import { Character } from "../gameObjects/Character";
import { TextActionResult } from "./TextActionResult";

/**
 * Class used the represent the result of an Talk action
 */
export class TalkAndImageActionResult extends TextActionResult {
    private _character: Character;
    private _images: string[];
    private _choices: TalkChoiceAction[];

    /**
     * Create a new instance of this action result
     *
     * @param character Character who is offering the choices
     * @param text Text to show alongside the choices
     * @param images Image to show
     * @param choices Choices available to the player
     */
    public constructor(character: Character, text: string[], images: string[], choices: TalkChoiceAction[]) {
        super(text);

        this._character = character;
        this._images = images;
        this._choices = choices;
    }

    /**
     * Character who is offering the choices
     */
    public get character(): Character {
        return this._character;
    }

    /**
     * Image to show
     */
    public get images(): string[] {
        return this._images;
    }

    /**
     * Choices available to the player
     */
    public get choices(): TalkChoiceAction[] {
        return this._choices;
    }
}
