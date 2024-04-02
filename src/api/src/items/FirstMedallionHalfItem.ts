import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const firstMedallionHalfAlias: string = "first-Medallion-Half";

export class firstMedallionHalf extends Item implements Examine, Pickup {
    public constructor() {
        super(firstMedallionHalfAlias, ExamineActionAlias, PickupActionAlias);
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }

    public playerSession: PlayerSession = getPlayerSession();

    public name(): string {
        return "First half of a medallion";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's one half of a medallion, it might be useful in the lowlands"]);
    }

    public pickup(): ActionResult | undefined {
        if (this.playerSession.inventory.includes(firstMedallionHalfAlias)) {
            return new TextActionResult(["You already picked up the medallion-half"]);
        }
        if (!this.playerSession.inventory.includes(firstMedallionHalfAlias)) {
            this.playerSession.inventory.push(firstMedallionHalfAlias);
            return new TextActionResult(["You picked up the medallion-half"]);
        } else {
            return undefined;
        }
    }
}
