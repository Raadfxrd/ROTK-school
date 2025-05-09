import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const HolyBibleAlias: string = "HolyBible";
export class HolyBibleItem extends Item implements Examine {
    public constructor() {
        super(HolyBibleAlias);
    }
    public objectActions(): string[] {
        return [PickupActionAlias];
    }
    public name(): string {
        return "Holy Bible";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
