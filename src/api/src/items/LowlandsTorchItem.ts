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

export const LowlandsTorchAlias: string = "LowlandsTorch";

export class LowlandsTorch extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(LowlandsTorchAlias, ExamineActionAlias, PickupActionAlias, UseItemActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "The torch flickers, casting shadows on the bark of the trees.",
                "It appears to be the only source of light around here.",
                "It is a weak, green light, but it is better than nothing.",
                "You feel a little safer with it in your hand.",
            ],
            ["rooms/lowlands.png", "items/torch-lowlands.png"]
        );
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(LowlandsTorchAlias)) {
            return new TextActionResult(["*You already picked up the torch.*"]);
        }

        if (!playerSession.inventory.includes(LowlandsTorchAlias)) {
            playerSession.inventory.push(LowlandsTorchAlias);
            return new TextActionResult(["*You picked up the torch.*"]);
        } else {
            return undefined;
        }
    }

    public useItem(): ActionResult | undefined {
        if (getPlayerSession().currentRoom === TunnelWallAlias) {
            const playerSession: PlayerSession = getPlayerSession();
            playerSession.torchesGathered.push("items/TorchLowlandsOnWall.png");

            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to the LowLands.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchLowlandsOnWall.png"]
            );
        } else {
            return undefined;
        }
    }

    public name(): string {
        return "A weak, green torch";
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias, UseItemActionAlias];
    }
}
