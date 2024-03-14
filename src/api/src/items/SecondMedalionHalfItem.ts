import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const secondMedalionHalfItemAlias: string = "Second-Medalion-Half";

export class secondMedalionHalfItem extends Item implements Examine {
    public constructor() {
        super(secondMedalionHalfItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Second half of medalion";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's the half of a medalion. This may be usefull in the lowlands"]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
