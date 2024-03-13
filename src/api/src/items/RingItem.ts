import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Talk, TalkActionAlias } from "../base/actions/TalkAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const RingItemAlias: string = "ring-item";

export class RingItem extends Item implements Examine, Pickup, Talk {
    public constructor() {
        super(RingItemAlias, ExamineActionAlias, PickupActionAlias, TalkActionAlias);
    }

    public name(): string {
        return "Ring";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inventory.includes(RingItemAlias)) {
            return new TextActionResult([
                "The ring is made of silver and has been engraved with the image of an cave",
            ]);
        }
        return new TextActionResult([
            "You see a ring laying on the floor that you have never seen before. ",
            "The ring is made of silver and has been engraved with the image of an cave.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(RingItemAlias)) {
            playerSession.inventory.push(RingItemAlias);
            return new TextActionResult(["*You picked up the ring*"]);
        }
        if (!playerSession.inventory.includes(RingItemAlias)) {
            return new TextActionResult(["*You already have the ring in your inventory*"]);
        } else {
            return undefined;
        }
    }

    public talk(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.inventory.includes(RingItemAlias)) {
            return new TextActionResult([
                "*You start talking to the ring*",
                "My precious, GOLUM GOLUM.",
                "*The ring doesn't talk back*",
            ]);
        }

        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
}
