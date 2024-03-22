import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { UseItemActionAlias, useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const SteelSwordItemAlias: string = "steel-sword";

export class SteelSwordItem extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(SteelSwordItemAlias, ExamineActionAlias, PickupActionAlias, UseItemActionAlias);
    }

    public name(): string {
        return "Steel Sword";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This sword is made of steel, it is a lot stronger than a normal blade",
            "Equipping it will give you an extra bonus to your Damage. (+1)",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(SteelSwordItemAlias)) {
            playerSession.inventory.push(SteelSwordItemAlias);
            return new TextActionResult(["You picked up a Steel Sword"]);
        }
        return undefined;
    }

    public useItem(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.equipment.includes(SteelSwordItemAlias)) {
            playerSession.equipment.push(SteelSwordItemAlias);
            playerSession.strength = 14;
            playerSession.strength += 1;
            return new TextActionResult([
                "You equipped the Steel Sword.",
                "You feel one with the sword, the Steel Sword feels great in your hand and you like the weight of it.",
            ]);
        }
        return new TextActionResult(["You already equipped the Steel Sword"]);
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias, UseItemActionAlias];
    }
}
