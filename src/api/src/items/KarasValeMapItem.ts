import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const KarasValeMapItemAlias: string = "karasvale-map-item";

export class KarasValeMapItem extends Item implements Examine {
    public constructor() {
        super(KarasValeMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Kara's Vale Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a closer look at Kara's Vale. You see that it is just a small town.",
                "It also has a path going around the town. The town is surrounded by trees.",
            ],
            ["rooms/KarasValeMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
