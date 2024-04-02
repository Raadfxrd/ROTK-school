import { TalkChoiceAction } from "../actions/TalkAction";
import { Character } from "../gameObjects/Character";
import { TextActionResult } from "./TextActionResult";

/**
 * Class used the represent the result of an Talk action
 */
export class TalkAndImageActionResult extends TextActionResult {
    private _character: Character;
    private _choices: TalkChoiceAction[];
    private _images: string[];

    /**
     * Create a new instance of this action result
     *
     * @param character Character who is offering the choices
     * @param text Text to show alongside the choices
     * @param choices Choices available to the player
     * @param images Image to show
     */
    public constructor(character: Character, text: string[], choices: TalkChoiceAction[], images: string[]) {
        super(text);

        this._character = character;
        this._choices = choices;
        this._images = images;
    }

    /**
     * Character who is offering the choices
     */
    public get character(): Character {
        return this._character;
    }

    /**
     * Choices available to the player
     */
    public get choices(): TalkChoiceAction[] {
        return this._choices;
    }

    /**
     * Image to show
     */
    public get images(): string[] {
        return this._images;
    }
}
