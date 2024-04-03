import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const JainaCharacterAlias: string = "JainaCharacter";

export class JainaCharacter extends Character implements Examine {
    public constructor() {
        super(JainaCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Jaina";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It's a slender woman, she has an aura of mystique and magic around her. She seems to hail from the capital.",
        ]);
    }
    public playerSession: PlayerSession = getPlayerSession();

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Jaina: I have, they were riding horses and had a person bound up in ropes on one of the horses.",
                ],
                [this.playerSession.image, "characters/Jaina.png"],
                [
                    new TalkChoiceAction(3, "What did they look like?"),
                    new TalkChoiceAction(4, "They went south, correct?"),
                ]
            );
        }

        if (choiceId === 2) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Jaina: I'm enjoying a quiet life, which is why I can't exactly appreciate this conversation.",
                ],
                [this.playerSession.image, "characters/Jaina.png"],
                [new TalkChoiceAction(99, "Noted.")]
            );
        }

        if (choiceId === 3) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Jaina: I didn't get a good look at their faces, but I doubt it would have mattered since they'll probably have a different face by the time you find them.",
                ],
                [this.playerSession.image, "characters/Jaina.png"],
                [
                    new TalkChoiceAction(5, "What do you mean?"),
                    new TalkChoiceAction(6, "They can change their faces?"),
                ]
            );
        }

        if (choiceId === 4) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Jaina: Yes, which means they propably went to the Low Lands.",
                    "Not many who venture there make it back in one piece.",
                    "So if that's where you're headed you're in for quite an adventure.",
                ],
                [this.playerSession.image, "characters/Jaina.png"],
                [
                    new TalkChoiceAction(7, "You wouldn't happen to know much about the LowLands would you?"),
                    new TalkChoiceAction(99, "I've noticed."),
                ]
            );
        }

        if (choiceId === 5) {
            return new TalkAndImageActionResult(
                this,
                ["Jaina: They were changelings, creatures capable of completely changing their appearance."],
                [this.playerSession.image, "characters/Jaina.png"],
                [
                    new TalkChoiceAction(
                        8,
                        "That will prove difficult if we have to identify them out of a group."
                    ),
                    new TalkChoiceAction(99, "Thank you for this information."),
                ]
            );
        }

        if (choiceId === 6) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Jaina: Yes, they were changelings, creatures capable of completely changing their appearance.",
                ],
                [this.playerSession.image, "characters/Jaina.png"],
                [
                    new TalkChoiceAction(8, "That will prove difficult if we have to identify them."),
                    new TalkChoiceAction(99, "Thank you for this information."),
                ]
            );
        }

        if (choiceId === 7) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Jaina: All I know is it is an incredibly dangerous place.",
                    "If the goal of your quest is there I'd suggest you give up since it will likely cost you your life.",
                ],
                [this.playerSession.image, "characters/Jaina.png"],
                [new TalkChoiceAction(99, "Perhaps, but it is a price I'm willing to pay.")]
            );
        }

        if (choiceId === 8) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Jaina: This will help with that, use it when you are face to face with the changelings.",
                    "<You gain a scroll of detect thoughts.>",
                ],
                [this.playerSession.image, "characters/Jaina.png"],
                [new TalkChoiceAction(99, "Thank you.")]
            );
        }

        if (choiceId === 99) {
            return new TextActionResult([""]);
        }
        return new TalkAndImageActionResult(
            this,
            ["Jaina: What is it."],
            [this.playerSession.image, "characters/Jaina.png"],
            [
                new TalkChoiceAction(1, "Have you seen anybody passing through town recently?"),
                new TalkChoiceAction(2, "What is someone like you doing out here?"),
                new TalkChoiceAction(99, "bye!"),
            ]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
