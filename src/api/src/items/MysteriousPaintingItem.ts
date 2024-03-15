import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const MysteriousPaintingAlias: string = "MysteriousPainting";
export class MysteriousPaintingItem extends Item implements Examine {
    public constructor() {
        super(MysteriousPaintingAlias);
    }
    public objectActions(): string[] {
        return [PickupActionAlias];
    }
    public name(): string {
        return "Mysterious painting";
    }
    public examine(): ActionResult | undefined {
        return undefined;
    }
}
