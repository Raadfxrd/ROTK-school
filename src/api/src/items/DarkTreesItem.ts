import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const darkTreesItemAlias: string = "darkTrees";

export class darkTreesItem extends Item implements Examine {
    public constructor() {
        super(darkTreesItemAlias, ExamineActionAlias);
    }
    public name(): string {
        return "A cluster of ominious trees";
    }

    public images(): string[] {
        return ["darktree"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You take a closer look at the trees.",
            "There is something written on them...",
        ]);
    }
}
