import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const TunnelItemAlias: string = "Tunnel";

export class TunnelItem extends Item implements Examine {
    public constructor() {
        super(TunnelItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "The wall of the tunnel";
    }

    public examine(): ActionResult | undefined {
        return new TextAndImageActionResult(
            [
                "The walls of the tunnel are made of stone and are covered in moss.",
                "They are cold to the touch and the air is damp and musty. The tunnel seems to go on forever.",
                "There is holsters on the wall, it seems like it was used to hold torches.",
                "Maybe this means that there is a way to pass...",
            ],
            ["rooms/tunnel-wall.png"]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
