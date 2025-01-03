import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { UseItemActionAlias, useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { TunnelWallAlias } from "../rooms/TunnelWall";
import { PlayerSession } from "../types";

export const KarasTorchAlias: string = "KarasTorch";

export class KarasTorch extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(KarasTorchAlias, ExamineActionAlias, PickupActionAlias, UseItemActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "The torch burns blue. It is a torch of wisdom.",
                "It casts a blue light on both you and Kara.",
                "The torch does not feel hot, yet it gives off a comforting warmth.",
                "You feel calm and in control of the flame.",
            ],
            ["rooms/Kara.png", "items/torch-karasvale.png"]
        );
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(KarasTorchAlias)) {
            return new TextActionResult(["*You already picked up the torch.*"]);
        }

        if (!playerSession.inventory.includes(KarasTorchAlias)) {
            playerSession.inventory.push(KarasTorchAlias);
            return new TextActionResult(["*You picked up the torch.*"]);
        } else {
            return undefined;
        }
    }

    public useItem(): ActionResult | undefined {
        if (getPlayerSession().currentRoom === TunnelWallAlias) {
            const playerSession: PlayerSession = getPlayerSession();
            playerSession.torchesGathered.push("items/TorchKarasValeOnWall.png");

            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to Kara.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchKarasValeOnWall.png"]
            );
        } else {
            return undefined;
        }
    }

    public name(): string {
        return "A blue torch of wisdom.";
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias, UseItemActionAlias];
    }
}
