import { ActionResult } from "../actionResults/ActionResult";
import { GameObject } from "../gameObjects/GameObject";
import { implementsInterface, castTo } from "../helpers";
import { Action } from "./Action";
import { Examine } from "./ExamineAction";
import { Talk } from "./TalkAction";

export const InteractActionAlias: string = "interact";

/**
 * Interface for GameObjects that need to support the Interact action
 */

export interface Interact {
    /**
     * Execute the Interact action
     *
     * @returns Result of the Interact action
     */
    interact(): ActionResult | undefined;
}

/**
 * Class used to represent the Interact action
 */

export class InteractAction extends Action implements Examine, Talk {
    /**
     * Create a new instance of the Interact action
     */
    public constructor() {
        super(InteractActionAlias, "Interact", true);
    }

    public examine(): ActionResult | undefined {
        throw new Error("Method not implemented.");
    }

    public talk(): ActionResult | undefined {
        throw new Error("Method not implemented.");
    }

    /**
     * Handle the Interact action
     *
     * @param gameObject Reference to the GameObject on which the Interact action should be executed
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, InteractActionAlias)) {
            return castTo<Interact>(gameObject).interact();
        }

        return undefined;
    }
}
