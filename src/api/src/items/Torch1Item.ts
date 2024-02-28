import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const Torch1ItemAlias: string = "torch1";

export class Torch1Item extends Item implements Examine {
    public constructor() {
        super(Torch1ItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "The first torch";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["A torch that can be used to light up dark places."]);
    }
}
