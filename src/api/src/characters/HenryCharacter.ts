import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const HenryAlias: string = "Henry-character";

export class HenryCharacter extends Character implements Examine {
    public constructor() {
        super(HenryAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Henry";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is Henry, Henry Just got into the kingsguard. He comes from the noble family 'Bourbon'",
            "He looks like a really genuine guy that can take a hit. He is wearing some nice knight armour. He doesn't look that scary though.",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult([
                "Henry: She was last seen in the entrance of the room, maybe there is a clue there?",
            ]);
        } else if (_choiceId === 2) {
            return new TextActionResult([
                "Henry: Start looking where she was last seen, there must be something there",
            ]);
        } else if (_choiceId === 3) {
            return new TextActionResult(["Henry: If you find something, let me know."]);
        } else if (_choiceId === 4) {
            return new TextActionResult([
                "Henry: I've never seen this ring before, you might ask the king, he knows a lot more than i do.",
            ]);
        }
        return new TalkActionResult(
            this,
            ["Henry: What happend?"],
            [
                new TalkChoiceAction(1, "Have you seen the queen?"),
                new TalkChoiceAction(2, "I have got no clue."),
                new TalkChoiceAction(3, "Bye!"),
            ]
        );
    }
}
