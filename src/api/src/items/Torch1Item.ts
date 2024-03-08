import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const Torch1ItemAlias: string = "Torch1";

export class Torch1Item extends Item implements Examine {
    public constructor() {
        super(Torch1ItemAlias, ExamineActionAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "The torch flickers, casting shadows on the walls.",
                "It appears to be the only source of light around here.",
                "You feel a little safer with it in your hand.",
            ],
            ["items/torches.png"]
        );
    }

    public name(): string {
        return "The first torch";
    }
}
