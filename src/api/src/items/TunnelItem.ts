import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const TunnelItemAlias: string = "Tunnel";

export class TunnelItem extends Item implements Examine {
    public constructor() {
        super(TunnelItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "A dark tunnel in the middle of nowhere";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The tunnel stretches into darkness, promising neither safety nor comfort.",
            "It is a place of mystery and danger.",
            "You try going inside the tunnel, but there is a mysterious force stopping you.",
            "You should try finding a light source before venturing into the unknown.",
        ]);
    }
}
