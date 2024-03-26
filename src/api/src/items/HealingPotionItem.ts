import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { UseItemActionAlias, useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const HealingPotionAlias: string = "HealingPotion";
export class HealingPotionItem extends Item implements Examine, Pickup, useItem {
    public constructor() {
        super(HealingPotionAlias, ExamineActionAlias, UseItemActionAlias);
    }
    public pickup(): ActionResult | undefined {
        return undefined;
    }
    public objectActions(): string[] {
        return [PickupActionAlias, ExamineActionAlias];
    }
    public name(): string {
        return "HealingPotion";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }

    public useItem(): ActionResult | undefined {
        return undefined;
    }
}
