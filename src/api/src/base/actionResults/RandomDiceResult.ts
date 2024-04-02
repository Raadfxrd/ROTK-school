import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
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
     * @param dice Max number allowed to be rolled
     */
    public constructor(text: string[], dice: number) {
        super(text);
        const playerSession: PlayerSession = getPlayerSession();

        const number: number = Math.floor(Math.random() * dice) + 1;

        const damage: number = (playerSession.strength - 10) / 2 + number;

        const numberString: string = damage.toString();

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
