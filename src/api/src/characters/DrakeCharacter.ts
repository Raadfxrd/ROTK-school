import { ActionResult } from "../base/actionResults/ActionResult";
import { Character } from "../base/gameObjects/Character";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TalkChoiceAction } from "../base/actions/TalkAction";

export const DrakecharacterAlias: string = "drake";

export class Drakecharacter extends Character implements Examine {
    public constructor() {
        super(DrakecharacterAlias, ExamineActionAlias);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TextActionResult(["Ah i see... feel free to "]);
        }
        return new TalkActionResult(
            this,
            ["Greetings handsome travaler.. What brings u to Volo's village?"],
            [
                new TalkChoiceAction(1, "Im here on a journey to save the princess"),
                new TalkChoiceAction(2, "I rather keep it short, Im here to retrieve a certain item"),
            ]
        );
    }

    public name(): string {
        return "drake";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "There is a somewhat zasty looking fella infront of u. It appears he is the village chief",
        ]);
    }
}
