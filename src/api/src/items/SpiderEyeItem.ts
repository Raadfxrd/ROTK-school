import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const SpiderEyeAlias: string = "SpiderEye";
export class SpiderEyeItem extends Item implements Examine {
    public constructor() {
        super(SpiderEyeAlias);
    }
    public objectActions(): string[] {
        return [PickupActionAlias];
    }
    public name(): string {
        return "SpiderEye";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
