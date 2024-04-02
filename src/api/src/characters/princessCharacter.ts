import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";

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
            return new TalkAndImageActionResult(
                this,
                [
                    "Princess:(Voice trembling with gratitude) Oh, Arthur, I cannot express how thankful I am that you've come for me. ",
                ],
                [getPlayerSession().image, "characters/pixelartprincess.png"],
                [
                    new TalkChoiceAction(
                        2,
                        "There's no need to thank me, Princess. Saving you is all that matters."
                    ),
                ]
            );
        }
        if (_choiceId === 2) {
            return new TalkAndImageActionResult(
                this,
                ["Princess: But you must hurry, Arthur. Smaug grows hungry, and his wrath is fearsome. "],
                [getPlayerSession().image, "characters/pixelartprincess.png"],
                [new TalkChoiceAction(3, "I understand. We won't linger any longer than necessary.")]
            );
        }
        if (_choiceId === 3) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Princess: Arthur, there's something you must know... Smaug's weakness lies in faith, the belief gathered from the world around you. He is weakened by the strength of your conviction. ",
                ],
                [getPlayerSession().image, "characters/pixelartprincess.png"],
                [new TalkChoiceAction(4, "Faith... I will remember that. Thank you, Princess.")]
            );
        }
        if (_choiceId === 4) {
            return new TalkAndImageActionResult(
                this,
                ["Princess: Be careful, Arthur. Smaug is cunning beyond measure. "],
                [getPlayerSession().image, "characters/pixelartprincess.png"],
                [new TalkChoiceAction(5, " I won't fail you, Princess. I promise.")]
            );
        }
        if (_choiceId === 5) {
            return new TextActionResult(["..."]);
        }
        return new TalkAndImageActionResult(
            this,
            ["Princess: (Eyes widening in disbelief) Arthur... is it truly you?"],
            [getPlayerSession().image, "characters/pixelartprincess.png"],
            [new TalkChoiceAction(1, "Yes, Princess, it's me. I've come to rescue you.")]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
