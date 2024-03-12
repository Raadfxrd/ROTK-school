import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const ArmourItemAlias: string = "Armour";
export class ArmourItem extends Item implements Examine {
    public constructor() {
        super(ArmourItemAlias);
    }
    public name(): string {
        return "Armour";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
