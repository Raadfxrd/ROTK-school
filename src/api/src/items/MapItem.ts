import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const MapItemAlias: string = "map-item";

export class MapItem extends Item implements Examine, Pickup {
    public constructor() {
        super(MapItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Map";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This looks like the map of Kaseon, you see all the different cities and towns in the region.",
            "You see that some towns don't have a name included on them.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(MapItemAlias)) {
            playerSession.inventory.push(MapItemAlias);
            return new TextActionResult(["You picked up the map"]);
        }
        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
}
