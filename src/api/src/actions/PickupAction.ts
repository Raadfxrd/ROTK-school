import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const PickupActionAlias: string = "pickup";

export interface Pickup {
    pickup(): ActionResult | undefined;
}

export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pickup", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (implementsInterface(gameObject, PickupActionAlias)) {
            playerSession.clickedButton = PickupActionAlias;
            return castTo<Pickup>(gameObject).pickup();
        }

        return undefined;
    }
}
