import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const DarkTreesItemAlias: string = "DarkTrees";

export class DarkTreesItem extends Item implements Examine {
    public constructor() {
        super(DarkTreesItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "A cluster of ominious trees";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The trees loom ominously, their branches like twisted arms.",
            "You take a closer look at the trees.",
            "The bark is dark and rough, and the leaves are a sickly green.",
            "You feel a shiver run down your spine, yet you can't look away.",
            "You try reading what is written on the bark.",
        ]);
    }
}
