import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const ChurchTorchAlias: string = "ChurchTorch";

export class ChurchTorch extends Item implements Examine, Pickup {
    public constructor() {
        super(ChurchTorchAlias, ExamineActionAlias, PickupActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You see this torch in the corner behind the statue.",
                "It is shimmering with a bright light and a holy feeling around it.",
                "It might resemble something from the sun and healing from Pelor.",
            ],
            ["rooms/churchwolburg.png", "items/torch-church.png"]
        );
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(ChurchTorchAlias)) {
            return new TextActionResult(["*You already picked up the torch.*"]);
        }

        if (!playerSession.inventory.includes(ChurchTorchAlias)) {
            playerSession.inventory.push(ChurchTorchAlias);
            return new TextActionResult([
                "*You pick up the torch.*",
                "You feel a magic flow going through your body.",
                "All of a sudden, the magic leaves your body and you are left with the torch.",
                "You feel uneasy.",
            ]);
        } else {
            return undefined;
        }
    }

    public name(): string {
        return "Flame of the Holy Spirit";
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
}
