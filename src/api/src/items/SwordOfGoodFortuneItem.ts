import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { UseItemActionAlias, useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const SwordOfGoodFortuneItemAlias: string = "sword-of-good-fortune";

export class SwordOfGoodFortuneItem extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(SwordOfGoodFortuneItemAlias, ExamineActionAlias, PickupActionAlias, UseItemActionAlias);
    }

    public name(): string {
        return "Sword of Good Fortune";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This sword is made of steel, it is a lot stronger than a normal blade",
            "Equipping it will give you an extra bonus to your Damage. (+2)",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(SwordOfGoodFortuneItemAlias)) {
            playerSession.inventory.push(SwordOfGoodFortuneItemAlias);
            return new TextActionResult(["You picked up the Sword of Good Fortune"]);
        }
        return undefined;
    }

    public useItem(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.equipment.includes(SwordOfGoodFortuneItemAlias)) {
            playerSession.equipment.push(SwordOfGoodFortuneItemAlias);
            playerSession.strength = 14;
            playerSession.strength += 2;
            return new TextActionResult([
                "You equipped the Sword of Good Fortune.",
                "You feel one with the sword, the Sword of Good Fortune feels great in your hand and you it is more on the lighter side.",
            ]);
        }
        return new TextActionResult(["You already equipped the Sword of Good Fortune"]);
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias, UseItemActionAlias];
    }
}
