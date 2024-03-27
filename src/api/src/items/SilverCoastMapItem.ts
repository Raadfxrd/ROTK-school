import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const SilverCoastMapItemAlias: string = "silvercoast-map-item";

export class SilverCoastMapItem extends Item implements Examine {
    public constructor() {
        super(SilverCoastMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Silver Coast Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at Silver Coast.",
                "It is a town which is on the side of the sea.",
                "It is really close to the grey mountains.",
            ],
            ["rooms/SilverCoastMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
