import { TextActionResult } from "./TextActionResult";

/**
 * Class used the represent the numberical result of an action
 */
export class RandomDiceResult extends TextActionResult {
    private _number: string[];

    /**
     * Create a new instance of this action result
     *
     * @param text Text to show
     * @param number Number to show
     */
    public constructor(text: string[], Dice: number) {
        super(text);

        const number: number = Math.floor(Math.random() * Dice) + 1;

        const numberString: string = number.toString();

        text.push(numberString);

        this._number = text;
    }

    /**
     * Number to show
     */
    public get text(): string[] {
        return this._number;
    }
}
