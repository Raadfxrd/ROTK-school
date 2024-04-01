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

export const ShadowbeakTorchAlias: string = "ShadowbeakTorch";

export class ShadowBeakTorch extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(ShadowbeakTorchAlias, ExamineActionAlias, PickupActionAlias, UseItemActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "The torch of a dark forest.",
                "The flame is a dark, cold light.",
                "It is a torch that casts long shadows on the wall.",
                "You feel a cold, dark feeling.",
            ],
            ["rooms/shadowbeak.png", "items/torch-shadowbeak.png"]
        );
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(ShadowbeakTorchAlias)) {
            return new TextActionResult(["You already picked up the torch."]);
        }

        if (!playerSession.inventory.includes(ShadowbeakTorchAlias)) {
            playerSession.inventory.push(ShadowbeakTorchAlias);
            return new TextActionResult(["You picked up the torch."]);
        } else {
            return undefined;
        }
    }

    public useItem(): ActionResult | undefined {
        if (getPlayerSession().currentRoom === TunnelWallAlias) {
            const playerSession: PlayerSession = getPlayerSession();
            playerSession.torchesGathered.push("items/TorchShadowBeakOnWall.png");

            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to the Wilds.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchShadowBeakOnWall.png"]
            );
        } else {
            return undefined;
        }
    }

    public name(): string {
        return "A funny looking, flaming torch.";
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias, UseItemActionAlias];
    }
}
