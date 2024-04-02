import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const WildeWoodMapItemAlias: string = "wildewood-map-item";

export class WildeWoodMapItem extends Item implements Examine {
    public constructor() {
        super(WildeWoodMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Wilde Wood Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at Wilde wood.",
                "It is a town encircled by the whole forest.",
                "It is located in the center of the province.",
            ],
            ["rooms/WildeWoodMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
