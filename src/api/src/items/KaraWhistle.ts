import { useItem } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const KaraWhistleItemAlias: string = "KaraWhistle";

export class KaraWhistleItem extends Item implements Examine, useItem {
    public constructor() {
        super(KaraWhistleItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Whistle";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It is a small whistle with an image of a crow etched into it."]);
    }

    public useItem(): ActionResult | undefined {
        return new TextActionResult([
            "*You blow the whistle, it creates a hard to hear high pitched sound.*",
        ]);
    }
}
