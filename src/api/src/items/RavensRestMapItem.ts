import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const RavensRestMapItemAlias: string = "ravensrest-map-item";

export class RavensRestMapItem extends Item implements Examine {
    public constructor() {
        super(RavensRestMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Ravens Rest Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at Ravens Rest.",
                "It is a town on the border of the province Kaseon.",
                "It looks a bit cold and snowy on the other side of the province.",
            ],
            ["rooms/RavensRestMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
