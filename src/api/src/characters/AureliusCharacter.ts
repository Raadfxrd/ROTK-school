import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const AureliusCharacterAlias: string = "Aurelius";

export class AureliusCharacter extends Character implements Examine {
    public constructor() {
        super(AureliusCharacterAlias, ExamineActionAlias);
    }

    public playerSession: PlayerSession = getPlayerSession();
    public name(): string {
        return "Village elder Aurelius";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It's a fragile old man.",
            "He matches the aesthetic of the town due to the fact that they both look like they could topple over at any second.",
        ]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                ["And who might you be looking for?"],
                [new TalkChoiceAction(2, "You do not need to know who it is.")]
            );
        }
        if (choiceId === 2) {
            return new TalkActionResult(
                this,
                ["Well i'm afraid I can't help you then, but I do know of someone who might."],
                [new TalkChoiceAction(3, "Please, where can i find this person.")]
            );
        }
        if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "You will want to seek out Kara. She lives in the forest. ",
                    "But beware, for if you can not answer her riddles there will be a price to pay. ",
                ],
                [new TalkChoiceAction(4, "Thank you.")]
            );
        }

        if (choiceId === 4) {
            this.playerSession.knowsOfKara = true;
            return new TextActionResult([""]);
        }
        if (choiceId === 10) {
            return new TextActionResult([""]);
        }
        return new TalkActionResult(
            this,
            ["Hello there"],
            [new TalkChoiceAction(1, "I'm looking for someone"), new TalkChoiceAction(10, "Bye!")]
        );
    }
}
