import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const secondMedalionHalfItemAlias: string = "SecondMedalionHalf";

export class secondMedalionHalfItem extends Item implements Examine {
    public constructor() {
        super(secondMedalionHalfItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Second half of a medalion";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's half of a medalion. This may be useful in the LowLands."]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
