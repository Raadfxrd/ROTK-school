import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const tunnelItemAlias: string = "tunnelItem";

export class tunnelItem extends Item implements Examine {
    public constructor() {
        super(tunnelItemAlias, ExamineActionAlias);
    }
    public name(): string {
        return "A dark tunnel in the middle of nowhere";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You try going inside the tunnel, but there is a mysterious force stopping you.",
            "It is also very dark inside. ",
            "You need a light source.",
        ]);
    }
}
