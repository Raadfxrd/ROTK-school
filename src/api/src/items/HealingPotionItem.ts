import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { UseItemActionAlias, useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const HealingPotionAlias: string = "HealingPotion";

export class HealingPotionItem extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(HealingPotionAlias, ExamineActionAlias, UseItemActionAlias);
    }
    public pickup(): ActionResult | undefined {
        return undefined;
    }
    public objectActions(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes("HealingPotion")) {
            return [UseItemActionAlias];
        }
        return [PickupActionAlias, ExamineActionAlias];
    }
    public name(): string {
        return "HealingPotion";
    }
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.inventory.includes("HealingPotion")) {
            return new TextActionResult(["The bottle appears to be empty..."]);
        }
        return new TextActionResult(["It's a Magic potion that heals you in times of need."]);
    }

    public useItem(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes("HealingPotion")) {
            playerSession.healthPoints += 35;
            const index: number = playerSession.inventory.indexOf("HealingPotion");
            playerSession.inventory.splice(index);
            return new TextActionResult(["<you have used a healing potion>"]);
        } else {
            return new TextActionResult(["You dont have a healing"]);
        }
    }
}
