import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

function generateRandomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
}
export const BobCharacterAlias: string = "Bob";

export class BobCharacter extends Character implements Examine {
    public constructor() {
        super(BobCharacterAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Bob";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a friendly bartender"]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult(["<Gives beer> There you go."]);
        }
        if (_choiceId === 2) {
            const number: number = generateRandomNumber();
            return new TextActionResult(["<Hands over keys> Yes, ofcourse! you have room number " + number]);
        }

        return new TalkActionResult(
            this,
            ["Hello, what can I help you with? A drink perhaps?"],
            [
                new TalkChoiceAction(1, "Can I buy a beer?"),
                new TalkChoiceAction(2, "Can I sleep here?"),
                new TalkChoiceAction(3, "How are you doing?"),
            ]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
