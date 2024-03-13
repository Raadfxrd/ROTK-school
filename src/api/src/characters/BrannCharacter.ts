import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const BrannAlias: string = "Brann";
export class BrannCharacter extends Character implements Examine {
    public constructor() {
        super(BrannAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Brann";
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a storemanager in his element!"]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return new TalkActionResult(
            this,
            ["Greetings Stranger, we have all the items you need."],
            [
                new TalkChoiceAction(1, "What items do you sell?"),
                new TalkChoiceAction(2, "Ask about Ignis."),
                new TalkChoiceAction(3, "Show Ring to Brann"),
                new TalkChoiceAction(4, "Do you know where I can find a torch?"),
            ]
        );
    }
}
