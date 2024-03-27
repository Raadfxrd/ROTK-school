import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const WindHollowMapItemAlias: string = "windhollow-map-item";

export class WindHollowMapItem extends Item implements Examine {
    public constructor() {
        super(WindHollowMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Wind Hollow Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a close look at Wind Hollow.",
                "It is a town which has a lot of farms.",
                "Their potato's are the best in the province.",
            ],
            ["rooms/WindHollowMap.jpg"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
