import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const LowLandsMapItemAlias: string = "lowlands-map-item";

export class LowlandsMapItem extends Item implements Examine {
    public constructor() {
        super(LowLandsMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "LowLands Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at the Lowlands.",
                "It is a big open field with a cave in the middle of the field.",
                "There is a path going around the cave.",
            ],
            ["rooms/LowlandsMap.jpeg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
