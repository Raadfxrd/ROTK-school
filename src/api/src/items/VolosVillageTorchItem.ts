import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const VolosTorchAlias: string = "VolosTorch";

export class VolosTorch extends Item implements Examine, Pickup {
    public constructor() {
        super(VolosTorchAlias, ExamineActionAlias, PickupActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            ["Salim moet invoegen."],
            ["rooms/churchwolburg.png", "items/torch-church.png"]
        );
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(VolosTorchAlias)) {
            return new TextActionResult(["You already picked up the torch."]);
        }

        if (!playerSession.inventory.includes(VolosTorchAlias)) {
            playerSession.inventory.push(VolosTorchAlias);
            return new TextActionResult(["You pick up the torch."]);
        } else {
            return undefined;
        }
    }

    public name(): string {
        return "The fire of zesty Volo";
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
}
