import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const HealingPotionAlias: string = "HealingPotion";
export class HealingPotionItem extends Item implements Examine {
    public constructor() {
        super(HealingPotionAlias);
    }
    public objectActions(): string[] {
        return [PickupActionAlias];
    }
    public name(): string {
        return "Healing potion";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
