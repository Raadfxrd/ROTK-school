import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const princessAlias: string = "princess";
export class princessCharacter extends Character implements Examine {
    public constructor() {
        super(princessAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Princess";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            " She's a royal lady who looks worn out and sad. Her fancy clothes are all ripped up, but she still holds herself with dignity. Even though she's been through a lot, you can see in her eyes that she's not giving up hope.",
        ]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Princess:(Voice trembling with gratitude) Oh, Arthur, I cannot express how thankful I am that you've come for me. ",
                ],
                [
                    new TalkChoiceAction(
                        2,
                        "There's no need to thank me, Princess. Saving you is all that matters."
                    ),
                ]
            );
        }
        if (_choiceId === 2) {
            return new TalkActionResult(
                this,
                ["Princess: But you must hurry, Arthur. Smaug grows hungry, and his wrath is fearsome. "],
                [new TalkChoiceAction(3, "I understand. We won't linger any longer than necessary.")]
            );
        }
        if (_choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "Princess: Arthur, there's something you must know... Smaug's weakness lies in faith, the belief gathered from the world around you. He is weakened by the strength of your conviction. ",
                ],
                [new TalkChoiceAction(4, "Faith... I will remember that. Thank you, Princess.")]
            );
        }
        if (_choiceId === 4) {
            return new TalkActionResult(
                this,
                ["Princess: Be careful, Arthur. Smaug is cunning beyond measure. "],
                [new TalkChoiceAction(5, " I won't fail you, Princess. I promise.")]
            );
        }
        if (_choiceId === 5) {
            return new TextActionResult(["..."]);
        }
        return new TalkActionResult(
            this,
            ["Princess: (Eyes widening in disbelief) Arthur... is it truly you?"],
            [new TalkChoiceAction(1, "Yes, Princess, it's me. I've come to rescue you.")]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
