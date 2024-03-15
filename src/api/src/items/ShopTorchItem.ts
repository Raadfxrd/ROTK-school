import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const ShopTorchAlias: string = "ShopTorch";

export class ShopTorch extends Item implements Examine, Pickup {
    public constructor() {
        super(ShopTorchAlias, ExamineActionAlias, PickupActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "The torch of the common folk.",
                "Innocence lies in the flickering flame.",
                "It is a bright, warm light. It warms your heart.",
                "You feel a welcoming feeling.",
            ],
            ["rooms/store.png", "items/torch-shop.png"]
        );
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(ShopTorchAlias)) {
            return new TextActionResult(["*You already picked up the torch.*"]);
        }

        if (!playerSession.inventory.includes(ShopTorchAlias)) {
            playerSession.inventory.push(ShopTorchAlias);
            return new TextActionResult(["*You picked up the torch.*"]);
        } else {
            return undefined;
        }
    }

    public name(): string {
        return "A bright, flaming torch.";
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
}
