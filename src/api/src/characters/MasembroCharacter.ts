import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const MasemboCharacterAlias: string = "Masembo-character";

export class MasemboCharacter extends Character implements Examine {
    public constructor() {
        super(MasemboCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Masembo";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Masembo is a small creature. He is very interested in what you are doing here.",
            "This create is also known as an 'Halfling'.",
            "He is wearing ",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult(["You greet the example character."]);
        } else if (_choiceId === 2) {
            return new TextActionResult(["You do not wish to communicate any further."]);
        }

        return new TalkActionResult(
            this,
            ["Hello!"],
            [new TalkChoiceAction(1, "Hello!"), new TalkChoiceAction(2, "Bye!")]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
