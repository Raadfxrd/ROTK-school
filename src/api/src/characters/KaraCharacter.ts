import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { deathRoom } from "../rooms/deathRoom";
import { PlayerSession } from "../types";

export const KaraCharacterAlias: string = "KaraCharacter";

export class KaraCharacter extends Character implements Examine {
    public constructor() {
        super(KaraCharacterAlias, ExamineActionAlias);
    }

    public playerSession: PlayerSession = getPlayerSession();

    public name(): string {
        return "Kara";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It is a massive crow towering over you. It looks at you with curiosity.",
        ]);
    }

    public riddlesArray: number[] = this.playerSession.allRiddles;

    // functie om riddlesArray te shuffelen zodat je een random volgorde krijgt
    public shuffleArray(riddlesArray: number[]): number[] {
        for (let i: number = riddlesArray.length - 1; i > 0; i--) {
            const j: number = Math.floor(Math.random() * (i + 1));
            [riddlesArray[i], riddlesArray[j]] = [riddlesArray[j], riddlesArray[i]];
        }
        return riddlesArray;
    }

    public finalRiddlesArray = this.shuffleArray(this.riddlesArray);

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Ah, Aurelius must have told you of my existence.",
                    "Very well, I know of your cause and shall help you.",
                    "But before I give you what you need I will judge you myself.",
                ],
                [
                    new TalkChoiceAction(3, "I am ready for your challenge."),
                    new TalkChoiceAction(4, "How do you know of my quest?"),
                ]
            );
        }

        if (choiceId === 2) {
            return new TalkActionResult(
                this,
                ["Many do, but i deem very few worthy enough to receive it."],
                [new TalkChoiceAction(3, "I am ready for your challenge.")]
            );
        }

        if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "You will answer my riddles.",
                    "If your mind is capable enough i shall share with you what i know of the whereabouts of the princess.",
                ],
                [new TalkChoiceAction(this.finalRiddlesArray[0], "Very well.")]
            );
        }

        if (choiceId === 4) {
            return new TalkActionResult(
                this,
                ["Word spreads quick and I have ears and eyes in many places."],
                [new TalkChoiceAction(this.finalRiddlesArray[0], "Very well.")]
            );
        }

        if (choiceId === 5) {
            const index: number = this.finalRiddlesArray.indexOf(5);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "In Spring I am gay in handsome array in summer more clothing I wear when colder it grows.",
                    "I fling off my clothes and in winter quite naked appear.",
                    "What am I.",
                ],
                [
                    new TalkChoiceAction(40, "A tree"), // correct answer
                    new TalkChoiceAction(50, "A goat"),
                    new TalkChoiceAction(50, "A mountain"),
                ]
            );
        }

        if (choiceId === 6) {
            const index: number = this.finalRiddlesArray.indexOf(6);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "Some try to hide, some try to cheat, but time will show, we always will meet.",
                    "Try as you might to guess my name, I promise you'll know when you I do claim",
                ],
                [
                    new TalkChoiceAction(50, "Destiny"),
                    new TalkChoiceAction(50, "Time"),
                    new TalkChoiceAction(40, "Death"), // correct answer
                ]
            );
        }

        if (choiceId === 7) {
            const index: number = this.finalRiddlesArray.indexOf(7);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "As small as your thumb, I am light in the air.",
                    "You may hear me before you see me, but trust that I'm there",
                ],
                [
                    new TalkChoiceAction(40, "A hummingbird"), // correct answer
                    new TalkChoiceAction(50, "A mosquito"),
                    new TalkChoiceAction(50, "A Bumblebee"),
                ]
            );
        }

        if (choiceId === 8) {
            const index: number = this.finalRiddlesArray.indexOf(8);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "Never resting, never still, moving silently from hill to hill.",
                    "it does not walk, run, or trot; all is cool where it is not.",
                ],
                [
                    new TalkChoiceAction(50, "The wind"),
                    new TalkChoiceAction(40, "The sun"), // correct answer
                    new TalkChoiceAction(50, "The rain"),
                ]
            );
        }

        if (choiceId === 9) {
            const index: number = this.finalRiddlesArray.indexOf(9);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "What can bring back the dead, make you cry make you laugh, make you young.",
                    "Is born in an instant, yet lasts a lifetime.",
                ],
                [
                    new TalkChoiceAction(40, "A memory"), // correct answer
                    new TalkChoiceAction(50, "A name"),
                    new TalkChoiceAction(50, "A joke"),
                ]
            );
        }

        if (choiceId === 10) {
            const index: number = this.finalRiddlesArray.indexOf(10);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "What can run but never walks. Has a mouth but never talks",
                    "Has a head but never weeps. Has a bed but never sleeps.",
                ],
                [
                    new TalkChoiceAction(50, "A chariot"),
                    new TalkChoiceAction(50, "A child"),
                    new TalkChoiceAction(40, "A river"), // correct answer
                ]
            );
        }

        if (choiceId === 11) {
            const index: number = this.finalRiddlesArray.indexOf(11);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "This thing all things devours: birds, beasts, trees, flowers.",
                    "Gnaws iron, bites steel, grinds hard stones to meal.",
                    "Slays kings, ruins towns and beats high mountains down",
                ],
                [
                    new TalkChoiceAction(50, "Armies"),
                    new TalkChoiceAction(40, "Time"), // correct answer
                    new TalkChoiceAction(50, "Nature"),
                ]
            );
        }

        if (choiceId === 12) {
            const index: number = this.finalRiddlesArray.indexOf(12);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                ["At night they come without being fetched.", "At night they are lost without being stolen"],
                [
                    new TalkChoiceAction(50, "The sun"),
                    new TalkChoiceAction(50, "The moon"),
                    new TalkChoiceAction(40, "The stars"), // correct answer
                ]
            );
        }

        if (choiceId === 13) {
            const index: number = this.finalRiddlesArray.indexOf(13);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                ["I create my lair with earthen string, and dispatch my prey with a biting sting"],
                [
                    new TalkChoiceAction(50, "A snake"),
                    new TalkChoiceAction(50, "A wasp"),
                    new TalkChoiceAction(40, "A spider"), // correct answer
                ]
            );
        }

        if (choiceId === 14) {
            const index: number = this.finalRiddlesArray.indexOf(14);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "I'm alive, but without breath.",
                    "I'm as cold in life, as in death",
                    "I'm never thirsty, though I always drink",
                ],
                [
                    new TalkChoiceAction(50, "A jellyfish"),
                    new TalkChoiceAction(40, "A fish"), // correct answer
                    new TalkChoiceAction(50, "A crocodile "),
                ]
            );
        }

        if (choiceId === 15) {
            const index: number = this.finalRiddlesArray.indexOf(15);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "What has roots that no one sees. Grows taller than trees.",
                    "Up, up, up it goes, and yet never grows",
                ],
                [
                    new TalkChoiceAction(50, "A city"),
                    new TalkChoiceAction(40, "A mountain"), // correct answer
                    new TalkChoiceAction(50, "A forest"),
                ]
            );
        }

        if (choiceId === 16) {
            const index: number = this.finalRiddlesArray.indexOf(16);
            this.finalRiddlesArray.splice(index, 1);
            return new TalkActionResult(
                this,
                [
                    "What is always old and sometimes new. Never sad sometimes blue",
                    "Never empty sometimes full. Never pushes always pulls.",
                ],
                [
                    new TalkChoiceAction(40, "The moon"), // correct answer
                    new TalkChoiceAction(50, "The tide"),
                    new TalkChoiceAction(50, "The sky"),
                ]
            );
        }

        if (choiceId === 80) {
            if (getPlayerSession().correctAnswers.filter((x) => x === "correct-answer").length >= 3) {
                return new TalkActionResult(this, ["Interesting"], [new TalkChoiceAction(81, "What is it?")]);
            } else if (getPlayerSession().correctAnswers.filter((x) => x === "correct-answer").length >= 2) {
                return new TalkActionResult(this, ["Enough"], [new TalkChoiceAction(82, "Alright")]);
            } else if (getPlayerSession().correctAnswers.filter((x) => x === "correct-answer").length >= 1) {
                return new TalkActionResult(this, ["Enough"], [new TalkChoiceAction(83, "Alright")]);
            } else if (getPlayerSession().correctAnswers.filter((x) => x === "correct-answer").length >= 0) {
                return new TalkActionResult(this, ["Enough"], [new TalkChoiceAction(84, "Alright")]);
            }
        }

        if (choiceId === 81) {
            this.playerSession.firstMedallionHalf = true;

            return new TalkActionResult(
                this,
                [
                    "You have succeeded in answering my riddles human, a most impressive feat.",
                    "Here, take these as a reward for your wit and tenacity.",
                    "*You gain one half of a medaillion and a blue torch*",
                ],
                [
                    new TalkChoiceAction(91, "Where can i find the other medallion"),
                    new TalkChoiceAction(100, "Thank you"),
                ]
            );
        }

        if (choiceId === 82) {
            this.playerSession.firstMedallionHalf = true;
            return new TalkActionResult(
                this,
                [
                    "You managed to answer most of my riddles human.",
                    "I grant you these items as a reward, where and how to use them shall be up to you.",
                    "*You gain one half of a medaillion and a blue torch*",
                ],
                [new TalkChoiceAction(100, "Thank you")]
            );
        }

        if (choiceId === 83) {
            return new TalkActionResult(
                this,
                [
                    "You only managed to correctly answer one of my riddles. A dissapointing score to be sure",
                    "Still I grant you this item, you will have to figure out when you need to use it yourself",
                    "*You gain a blue torch*",
                ],
                [new TalkChoiceAction(100, "Thank you")]
            );
        }

        if (choiceId === 84) {
            return new TalkActionResult(
                this,
                [
                    "You have failed to answer my riddles correctly human, you do not meet my expectations.",
                    "If it is your wish to save the princess I can give you what you need, but at a price.",
                ],
                [new TalkChoiceAction(85, "What kind of price?")]
            );
        }

        if (choiceId === 85) {
            return new TalkActionResult(
                this,
                ["Either you pay with your life force, or your gold. I do like shiny things after all."],
                [
                    new TalkChoiceAction(86, "I choose the gold"),
                    new TalkChoiceAction(87, "I choose my life force"),
                    new TalkChoiceAction(88, "I choose neither, die!"),
                ]
            );
        }

        if (choiceId === 86) {
            if (this.playerSession.gold >= 15) {
                this.playerSession.gold -= 15;
                return new TalkActionResult(
                    this,
                    [
                        "Very well.",
                        "*A handfull of gold floats out of your pouch and moves towards the crow.",
                        "I grant you this torch.",
                        "*You gain a blue torch*",
                    ],
                    [new TalkChoiceAction(100, "Thank you")]
                );
            } else {
                return new TalkActionResult(
                    this,
                    [
                        "It seems you do not have the funds you need. You will give me some of your life force then?",
                    ],
                    [new TalkChoiceAction(87, "Yes, take it."), new TalkChoiceAction(88, "I will not, die!")]
                );
            }
        }

        if (choiceId === 87) {
            this.playerSession.healthPoints -= 10;
            return new TalkActionResult(
                this,
                [
                    "Kara: Very well.",
                    "*You fall to your knees as you feel the life force being drained from your body*",
                    "Kara: Thank you for the meal. Now take this",
                    "*You gain a blue torch*",
                ],
                [new TalkChoiceAction(100, "Alright")]
            );
        }

        if (choiceId === 88) {
            return new TalkActionResult(
                this,
                [
                    "Kara: A most unwise choice.",
                    "*In the midst of your charge at the crow you feel your body freeze*",
                    "Kara: You have made a grave transgression, and as punishment you will pay the ultimate price",
                ],
                [new TalkChoiceAction(89, "Continue")]
            );
        }

        if (choiceId === 89) {
            return new TalkActionResult(
                this,
                [
                    "*You can't move, but you can see the crows eyes begin to glow red*",
                    "*A sharp pain shoots into your chest and you see a red beam flowing out of your body into the mouth of the crow*",
                    "*And everything goes black*",
                ],
                [new TalkChoiceAction(90, "Continue")]
            );
        }

        if (choiceId === 90) {
            const room: deathRoom = new deathRoom();

            this.playerSession.currentRoom = room.alias;
            return room.examine();
        }
        if (choiceId === 91) {
            return new TalkActionResult(
                this,
                ["You must seek out Volo's village, there you will find the other half of the medallion"],
                [new TalkChoiceAction(100, "Thank you")]
            );
        }

        if (choiceId === 40) {
            getPlayerSession().riddlesAnswered.push("riddle-answered");
            getPlayerSession().correctAnswers.push("correct-answer");

            if (getPlayerSession().riddlesAnswered.filter((x) => x === "riddle-answered").length >= 3) {
                return new TalkActionResult(this, ["Enough"], [new TalkChoiceAction(80, "Alright")]);
            }
            return new TalkActionResult(
                this,
                ["You are correct human, another"],
                [new TalkChoiceAction(this.finalRiddlesArray[0], "Alright")]
            );
        }

        if (choiceId === 50) {
            getPlayerSession().riddlesAnswered.push("riddle-answered");
            getPlayerSession().wrongAnswers.push("wrong-answer");

            if (getPlayerSession().riddlesAnswered.filter((x) => x === "riddle-answered").length >= 3) {
                return new TalkActionResult(this, ["Enough"], [new TalkChoiceAction(80, "Alright")]);
            }

            return new TalkActionResult(
                this,
                ["Incorrect, another"],
                [new TalkChoiceAction(this.finalRiddlesArray[0], "Very well")]
            );
        }

        if (choiceId === 100) {
            return new TextActionResult([""]);
        }
        return new TalkActionResult(
            this,
            ["For what purpose have you summoned me human?"],
            [
                new TalkChoiceAction(1, "I am on a mission of great importance."),

                new TalkChoiceAction(2, "I seek your wisdom."),

                new TalkChoiceAction(100, "bye!"),
            ]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
