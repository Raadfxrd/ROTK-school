import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const QuickpassMapItemAlias: string = "quickpass-map-item";

export class QuickPassMapItem extends Item implements Examine {
    public constructor() {
        super(QuickpassMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "QuickPass Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at Quickpass.",
                "It is a big town which is between 2 main roads, probably with a lot of trades going on in the town",
            ],
            ["rooms/QuickpassMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
