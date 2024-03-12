import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const KVForestItemAlias: string = "KVForest";

export class KVForestItem extends Item implements Examine {
    public constructor() {
        super(KVForestItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Kara's Forest";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You look around the forest, but there are no signs of any humans living here.",
        ]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
