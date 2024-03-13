import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const DarkTreeItemAlias: string = "DarkTreeItem";

export class DarkTreeItem extends Item implements Examine {
    public constructor() {
        super(DarkTreeItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "A dark tree with an inscription";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The tree looms ominously, its branches like twisted arms.",
            "You take a closer look at the tree, there is an inscription written on the bark.",
            "Among the lands are obels of guiding light. Bring the light to me, and I shall grant thee passage to the mighty one.",
        ]);
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
