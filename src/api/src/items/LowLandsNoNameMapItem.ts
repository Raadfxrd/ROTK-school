import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const LowLandsNoNameMapItemAlias: string = "lowlands-noname-map-item";

export class LowlandsNoNameMapItem extends Item implements Examine {
    public constructor() {
        super(LowLandsNoNameMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Big open space";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at this open space.",
                "It is a big open field with a cave in the middle of the field.",
                "There is a path going around the cave.",
            ],
            ["rooms/LowlandsNoNameMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
