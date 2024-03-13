import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const KVFallenTreesItemAlias: string = "KVFallenTrees";

export class KVFallenTreesItem extends Item implements Examine {
    public constructor() {
        super(KVFallenTreesItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Fallen tree";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You move closer to the tree and see that there are claw marks etched into the bark of the tree,",
            "you also see footprints of a very large birdlike creature",
        ]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
