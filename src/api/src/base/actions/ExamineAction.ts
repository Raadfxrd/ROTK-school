import { castTo, implementsInterface } from "../helpers";
import { ActionResult } from "../actionResults/ActionResult";
import { GameObject } from "../gameObjects/GameObject";
import { Action } from "./Action";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";

/** Alias used to identity the Examine action and interface */
export const ExamineActionAlias: string = "examine";

/**
 * Interface for GameObjects that need to support the Examine action
 */
export interface Examine {
    /**
     * Execute the Examine action
     *
     * @returns Result of the Examine action
     */
    examine(): ActionResult | undefined;
}

/**
 * Class used to represent the Examine action
 */
export class ExamineAction extends Action {
    /**
     * Create a new instance of the Examine action
     */
    public constructor() {
        super(ExamineActionAlias, "Examine", true);
    }

    /**
     * Handle the Examine action
     *
     * @param gameObject Reference to the GameObject on which the Examine action should be executed
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (implementsInterface(gameObject, ExamineActionAlias)) {
            playerSession.clickedButton = ExamineActionAlias;

            return castTo<Examine>(gameObject).examine();
        }

        return undefined;
    }
}
