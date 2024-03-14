import { ActionResult } from "../base/actionResults/ActionResult";
import { Character } from "../base/gameObjects/Character";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TalkActionAlias } from "../base/actions/TalkAction";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
export const DrakecharacterAlias: string = "drake";

export class Drakecharacter extends Character {
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return undefined;
    }
    public name(): string {
        return "drake";
    }
    public constructor() {
        super(DrakecharacterAlias);
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "There is a somewhat zasty looking fella infront of u. It appears he is the village chief",
        ]);
    }
    public objectActions(): string[] {
        return [TalkActionAlias, ExamineActionAlias];
    }
}
