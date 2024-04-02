import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const WolburgMapItemAlias: string = "wolburg-map-item";

export class WolburgMapItem extends Item implements Examine {
    public constructor() {
        super(WolburgMapItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Wolbrug Map";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "You take a closer look at Wolburg. You see that the city is really big and has a great wall around it.",
                "It also has a harbour which is used regulary. Outside the city are some farms.",
            ],
            ["rooms/Wolburg.png"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
