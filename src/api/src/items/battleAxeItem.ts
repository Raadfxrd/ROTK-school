import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const battleAxeItemAlias: string = "battleAxe";
export class battleAxeItem extends Item implements Examine {
    public constructor() {
        super(battleAxeItemAlias);
    }
    public objectActions(): string[] {
        return [PickupActionAlias];
    }
    public Attack(): number {
        return 12;
    }
    public name(): string {
        return "Battle axe";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
