import { Attack, AttackActionAlias } from "../actions/AttackAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { RandomDiceResult } from "../base/actionResults/RandomDiceResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const VladimirCharacterAlias: string = "vladimir-character";
export class VladimirCharacter extends Character implements Examine, Attack {
    public constructor() {
        super(VladimirCharacterAlias, ExamineActionAlias, AttackActionAlias);
    }

    public name(): string {
        return "Vladimir";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const vladimirImage: string = "characters/Vladimir.png";

        if (playerSession.inCombat === true) {
            return new TextAndImageActionResult(
                [
                    "A healthbar pops up above Vladimir. He has * " +
                        playerSession.vladimirHP +
                        " * Health left.",
                ],
                [playerSession.image, vladimirImage]
            );
        }

        if (playerSession.vladimirHP === 0) {
            return new TextActionResult([
                "You look at the dead body on the ground",
                "Vladimir starts to become much paler than before, his whole appearance seems to change.",
                "From what you have heard, this must be a changeling!",
            ]);
        }

        if (playerSession.vladimirGone === true) {
            return new TextActionResult([
                "You see Vladimir run to his horse and gallops away towards his group.",
                "This wasn't the wisest thing to do...",
            ]);
        }
        return new TextAndImageActionResult(
            [
                "Vladimir looks like a normal civilion in your city.",
                "As of this moment he is readying is horse to get away with the princess.",
            ],
            [playerSession.image, vladimirImage]
        );
    }

    public Attack(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inCombat === true) {
            if (playerSession.vladimirHP <= 0) {
                playerSession.inCombat = false;
                playerSession.vladimirHP = 0;
                return new TextActionResult([
                    "You hit vladimir hard enough that he doesn't move anymore.",
                    "It even looks like he is dead. Was this really the way we had to go?",
                ]);
            }
            const diceResult: RandomDiceResult = new RandomDiceResult(
                ["You hit vladimir again, he takes this much damage:"],
                4
            );
            const damage: number = parseInt(diceResult.text[1]);
            playerSession.vladimirHP -= damage;
            return diceResult;
        }
        if (playerSession.vladimirHP === 0) {
            return new TextActionResult(["Vladimir is already dead..."]);
        }
        playerSession.inCombat = true;
        const diceResult: RandomDiceResult = new RandomDiceResult(
            [
                "You ready yourself and attack vladimir. You take a good punch on him and knock him down on the ground as his group leaves him alone and run away with the princess..",
                "As he stumbles back he start to talk",
                "Vladimir: Please don't kill me, have mercy!",
                "Vladimir takes this much HP damage:",
            ],
            4
        );
        const damage: number = parseInt(diceResult.text[4]);
        playerSession.vladimirHP -= damage;
        console.log(playerSession.vladimirHP);
        return diceResult;
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const vladimirImage: string = "characters/Vladimir.png";

        if (playerSession.vladimirHP === 0) {
            return new TextActionResult([
                "You ask him about where their friends went to. He doesn't answer back...",
            ]);
        }
        if (_choiceId === 1) {
            playerSession.knowNameLowlands = true;
            return new TalkAndImageActionResult(
                this,
                ["Vladimir: I was heading towards the lowlands, it's my hometown."],
                [playerSession.image, vladimirImage],

                [
                    new TalkChoiceAction(5, "Where is the princess?"),
                    new TalkChoiceAction(6, "Who is your leader"),
                    new TalkChoiceAction(7, "What are you"),
                    new TalkChoiceAction(98, "You are going in jail"),
                ]
            );
        } else if (_choiceId === 2) {
            return new TalkAndImageActionResult(
                this,
                ["Vladimir: We took her with us, she is going to my home."],
                [playerSession.image, vladimirImage],
                [
                    new TalkChoiceAction(1, "Tell me where you're headed"),
                    new TalkChoiceAction(3, "Who is your leader"),
                    new TalkChoiceAction(4, "What are you"),
                    new TalkChoiceAction(98, "You are going in jail"),
                ]
            );
        } else if (_choiceId === 3) {
            return new TalkAndImageActionResult(
                this,
                ["Vladimir: We serve Antrax, he is our leader of the colony where my home is."],
                [playerSession.image, vladimirImage],
                [
                    new TalkChoiceAction(1, "Tell me where you're headed"),
                    new TalkChoiceAction(2, "Where is the princess?"),
                    new TalkChoiceAction(4, "What are you"),
                    new TalkChoiceAction(98, "You are going in jail"),
                ]
            );
        } else if (_choiceId === 4) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Vladimir: I am a changeling, we can change into other creatures and take over their shape and what they look like.",
                ],
                [playerSession.image, vladimirImage],
                [
                    new TalkChoiceAction(1, "Tell me where you're headed"),
                    new TalkChoiceAction(2, "Where is the princess?"),
                    new TalkChoiceAction(3, "Who is your leader"),
                    new TalkChoiceAction(98, "You are going in jail"),
                ]
            );
        } else if (_choiceId === 96) {
            playerSession.inCombat = false;
            playerSession.vladimirTaken = true;
            return new TextActionResult([
                "You must hurry, they are going to give the princess to a big dragon who wants her.",
                "If we didn't hand her over to the dragon he would destroy the Lowlands",
            ]);
        } else if (_choiceId === 97) {
            playerSession.inCombat = false;
            playerSession.vladimirTaken = true;

            return new TextActionResult(["*You start dragging vladimir back to the throne room.*"]);
        } else if (_choiceId === 98) {
            return new TalkAndImageActionResult(
                this,
                [
                    "*You drag vladimir back to the throne room where the king is.*",
                    "Vladimir: Please I can give you more information.",
                ],
                [playerSession.image, vladimirImage],
                [
                    new TalkChoiceAction(97, "I already know enough"),
                    new TalkChoiceAction(96, "What more do you know?"),
                ]
            );
        } else if (_choiceId === 99) {
            playerSession.vladimirGone = true;
            playerSession.inCombat = false;
            return new TextActionResult(["You wave him goodbye and he runs away"]);
        }

        return new TalkAndImageActionResult(
            this,
            ["Vladimir: Please don't kill me, I have a wife and kids at home"],
            [playerSession.image, vladimirImage],
            [
                new TalkChoiceAction(1, "Tell me where you're headed"),
                new TalkChoiceAction(2, "Where is the princess?"),
                new TalkChoiceAction(3, "Who is your leader"),
                new TalkChoiceAction(4, "Who are you"),
                new TalkChoiceAction(99, "Bye!"),
            ]
        );
    }
    public objectActions(): string[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.vladimirGone === true || playerSession.vladimirTaken === true) {
            return [ExamineActionAlias];
        }
        return [ExamineActionAlias, AttackActionAlias, TalkActionAlias];
    }
}
