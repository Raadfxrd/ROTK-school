import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { ActionResult } from "../base/actionResults/ActionResult";
import { PickupActionAlias } from "../actions/PickupAction";

export const SwordItemAlias: string = "Sword";
export class SwordItem extends Item implements Examine {
    public constructor() {
        super(SwordItemAlias);
    }
    public objectActions(): string[] {
        return [PickupActionAlias];
    }
    public name(): string {
        return "Sword";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
