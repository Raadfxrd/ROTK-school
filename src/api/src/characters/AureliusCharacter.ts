import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
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
                ["Aurelius: And who might you be looking for?"],
                [
                    new TalkChoiceAction(6, "You do not need to know who it is."),
                    new TalkChoiceAction(3, "I am looking for the princess."),
                ]
            );
        }
        if (choiceId === 2) {
            return new TalkActionResult(
                this,
                ["Aurelius: Well i'm afraid I can't help you then, but I do know of someone who might."],
                [new TalkChoiceAction(97, "Please, where can i find this person.")]
            );
        }
        if (choiceId === 97) {
            return new TalkActionResult(
                this,
                [
                    "Aurelius: You will want to seek out Kara. She lives in the forest. ",
                    "But beware, for if you can not answer her riddles there will be a price to pay. ",
                    "Take this aswell, you shall need it to summon her. ",
                    "<He gives you a whistle.>",
                ],
                [new TalkChoiceAction(98, "Thank you.")]
            );
        }

        if (choiceId === 98) {
            this.playerSession.knowsOfKara = true;
            this.playerSession.hasWhistle = true;

            return new TextActionResult([""]);
        }
        if (choiceId === 99) {
            return new TextActionResult([""]);
        }
        return new TalkActionResult(
            this,
            ["Hello there"],
            [
                new TalkChoiceAction(1, "I'm looking for someone"),
                new TalkChoiceAction(2, "Has anybody passed through this village recently?"),
                new TalkChoiceAction(10, "Bye!"),
            ]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
