import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const maceItemAlias: string = "Mace";
export class maceItem extends Item implements Examine {
    public constructor() {
        super(maceItemAlias);
    }
    public name(): string {
        return "Mace";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
