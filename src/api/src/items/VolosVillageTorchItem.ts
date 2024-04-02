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

export const VolosTorchAlias: string = "VolosTorch";

export class VolosTorch extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(VolosTorchAlias, ExamineActionAlias, PickupActionAlias, UseItemActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["A really mystical torch..."]);
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

    public useItem(): ActionResult | undefined {
        if (getPlayerSession().currentRoom === TunnelWallAlias) {
            const playerSession: PlayerSession = getPlayerSession();
            playerSession.torchesGathered.push("items/TorchVolosVillageOnWall.png");

            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to Volo.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchVolosVillageOnWall.png"]
            );
        } else {
            return undefined;
        }
    }

    public name(): string {
        return "The fire of Volo";
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias, UseItemActionAlias];
    }
}
