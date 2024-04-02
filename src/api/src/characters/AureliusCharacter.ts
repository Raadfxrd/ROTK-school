import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
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
            return new TalkAndImageActionResult(
                this,
                ["Aurelius: And who might you be looking for?"],
                [this.playerSession.image, "characters/Aurelius.png"],
                [
                    new TalkChoiceAction(3, "You do not need to know who it is."),
                    new TalkChoiceAction(4, "I am looking for the princess."),
                ]
            );
        }

        if (choiceId === 2) {
            return new TalkAndImageActionResult(
                this,
                ["Aurelius: People pass through here all the time.", "Although they hardly ever stay."],
                [this.playerSession.image, "characters/Aurelius.png"],
                [
                    new TalkChoiceAction(5, "Specifically people on horses."),
                    new TalkChoiceAction(6, "Anybody notable?"),
                ]
            );
        }

        if (choiceId === 3) {
            return new TalkAndImageActionResult(
                this,
                ["Aurelius: Well i'm afraid I can't help you then."],
                [this.playerSession.image, "characters/Aurelius.png"],
                [
                    new TalkChoiceAction(4, "Fine, I am looking for the princess."),
                    new TalkChoiceAction(97, "Please my quest is of utmost importance."),
                    new TalkChoiceAction(99, "bye!"),
                ]
            );
        }

        if (choiceId === 4) {
            return new TalkAndImageActionResult(
                this,
                ["Aurelius: Oh my! What happened?"],
                [this.playerSession.image, "characters/Aurelius.png"],
                [
                    new TalkChoiceAction(7, "She was kidnapped"),
                    new TalkChoiceAction(8, "That is not your concern."),
                ]
            );
        }

        if (choiceId === 5) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: Well I did not see anybody on horses myself, but I did hear the sound of them this afternoon.",
                    "Perhaps someone else saw something.",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
                [new TalkChoiceAction(99, "I'll ask around then."), new TalkChoiceAction(99, "bye!")]
            );
        }

        if (choiceId === 6) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: I haven't seen anybody recently.",
                    "You should ask Jaina, she keeps a watchful eye.",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
                [new TalkChoiceAction(99, "Thank you, I shall ask her.")]
            );
        }

        if (choiceId === 7) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: My goodness! It would seem the quality of the kingsguard has dwindled these days.",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
                [
                    new TalkChoiceAction(9, "Watch your mouth old man."),
                    new TalkChoiceAction(10, "They caught us by surprise."),
                    new TalkChoiceAction(
                        11,
                        "Well, now that you understand the urgency of my quest then tell me everything you know."
                    ),
                ]
            );
        }

        if (choiceId === 8) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: Very well, I understand that you can't give away all your secrets.",
                    "I know someone who might be able to help you.",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
                [
                    new TalkChoiceAction(97, "Please, where can I find this person."),
                    new TalkChoiceAction(97, "Tell me where they are and I'll reward you handsomely."),
                ]
            );
        }

        if (choiceId === 9) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: Alright, Alright, there's no need for this to get violent.",
                    "You will want to seek out Kara. She lives in the forest. ",
                    "But beware, for if you can not answer her riddles there will be a price to pay. ",
                    "Take this aswell, you shall need it to summon her. ",
                    "<He gives you a whistle.>",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
                [new TalkChoiceAction(98, "Thank you.")]
            );
        }

        if (choiceId === 10) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: Sloppy.",
                    "Well then, you will want to seek out Kara. She lives in the forest.",
                    "But beware, for if you can not answer her riddles there will be a price to pay. ",
                    "Take this aswell, you shall need it to summon her. ",
                    "<He gives you a whistle.>",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
                [new TalkChoiceAction(98, "Thank you.")]
            );
        }

        if (choiceId === 11) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: Fine.",
                    "You will want to seek out Kara. She lives in the forest. ",
                    "But beware, for if you can not answer her riddles there will be a price to pay. ",
                    "Take this aswell, you shall need it to summon her. ",
                    "<He gives you a whistle.>",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
                [new TalkChoiceAction(98, "Thank you.")]
            );
        }

        if (choiceId === 12) {
            return new TextActionResult(["You blow it of course!"]);
        }

        if (choiceId === 97) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Aurelius: You will want to seek out Kara. She lives in the forest. ",
                    "But beware, for if you can not answer her riddles there will be a price to pay. ",
                    "Take this aswell, you shall need it to summon her. ",
                    "<He gives you a whistle.>",
                ],
                [this.playerSession.image, "characters/Aurelius.png"],
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

        if (this.playerSession.hasWhistle === true) {
            return new TalkAndImageActionResult(
                this,
                ["Aurelius: I've nothing more of importance to say to you."],
                [this.playerSession.image, "characters/Aurelius.png"],
                [
                    new TalkChoiceAction(12, "What do i do with the whistle?"),
                    new TalkChoiceAction(99, "Fine."),
                ]
            );
        }
        return new TalkAndImageActionResult(
            this,
            ["Aurelius: Hello there"],
            [this.playerSession.image, "characters/Aurelius.png"],
            [
                new TalkChoiceAction(1, "I'm looking for someone"),
                new TalkChoiceAction(2, "Has anybody passed through this village recently?"),
                new TalkChoiceAction(99, "Bye!"),
            ]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
