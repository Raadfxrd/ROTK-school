import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const JohanCharacterAlias: string = "johan-character";

export class JohanCharacter extends Character implements Examine {
    public constructor() {
        super(JohanCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Johan";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is Johan, he looks like an adult in his 30s.",
            "Besides that he looks like in his 30s, he has some short pointy ears.",
            "You know that the pointy ears means that he is at least an half elf or an elf.",
            "He looks like he is hurt, maybe those people that were running away did something to him.",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (
            playerSession.horseMission10 === false ||
            playerSession.horseMission20 === false ||
            playerSession.horseMission30 === false
        ) {
            if (_choiceId === 1) {
                return new TalkActionResult(
                    this,
                    ["Johan: I'm ok, it's just dat mij horses are all gone."],
                    [
                        new TalkChoiceAction(2, "Where did they go to?"),
                        new TalkChoiceAction(3, "How many horses have they stolen?"),
                        new TalkChoiceAction(4, "Did you see the princess with them?"),
                        new TalkChoiceAction(99, "Bye!"),
                    ]
                );
            } else if (_choiceId === 2) {
                return new TalkActionResult(
                    this,
                    ["Johan: They went to the zuider gate.", "Can you alstjeblieft take mij horses back?"],
                    [
                        new TalkChoiceAction(5, "If there is a reward..."),
                        new TalkChoiceAction(6, "Of course, I'll get them back"),
                        new TalkChoiceAction(7, "No, I got bigger fish to fry"),
                    ]
                );
            } else if (_choiceId === 3) {
                return new TalkActionResult(
                    this,
                    ["Johan: They stole 5 horses from mij."],
                    [
                        new TalkChoiceAction(5, "I'll get them back if there is a reward..."),
                        new TalkChoiceAction(6, "Of course, I'll get them back"),
                        new TalkChoiceAction(7, "No, I got bigger fish to fry"),
                    ]
                );
            } else if (_choiceId === 4) {
                return new TalkActionResult(
                    this,
                    [
                        "Ik saw a woman with them, but dat was de princess?",
                        "Man, this is another cookie...",
                        "If ik had any more horses you could have taken een with you",
                    ],
                    [
                        new TalkChoiceAction(8, "Yeah they were quick!"),
                        new TalkChoiceAction(2, "Thanks for your help, where did they go to?"),
                        new TalkChoiceAction(9, "I don't have any more time, i'll go after them"),
                    ]
                );
            } else if (_choiceId === 5) {
                return new TalkActionResult(
                    this,
                    ["Johan: Ok, is goed. I'll give you 20 gold als jij my horses bring back."],
                    [
                        new TalkChoiceAction(10, "I want 10 gold now and 10 gold when I'm back"),
                        new TalkChoiceAction(6, "Of course, I'll get them back"),
                        new TalkChoiceAction(11, "I want more, this is not worth it."),
                    ]
                );
            } else if (_choiceId === 6) {
                playerSession.horseMission20 = true;
                return new TextActionResult(["Johan: Dankjewel! You are my held."]);
            } else if (_choiceId === 7) {
                return new TextActionResult([
                    "Johan: Oh ok. Succes verder, I will zoek verder for someone who will help me take mij horses back!",
                ]);
            } else if (_choiceId === 8) {
                return new TalkActionResult(
                    this,
                    [
                        "Johan: They indeed were, They had some kind of magie. I don't know veel about magie but it looked like their leader.",
                    ],
                    [
                        new TalkChoiceAction(12, "Interesting, thanks for the information."),
                        new TalkChoiceAction(5, "I'll take your horses back"),
                    ]
                );
            } else if (_choiceId === 9) {
                return new TalkActionResult(
                    this,
                    ["Johan: Succes, take them down and give mij horses back!"],
                    [
                        new TalkChoiceAction(6, "Of course, I'll get them back"),
                        new TalkChoiceAction(13, "I need to go, I can't help further"),
                    ]
                );
            } else if (_choiceId === 10) {
                playerSession.horseMission10 = true;
                playerSession.gold += 10;
                return new TextActionResult([
                    "Johan: Alright, thats fine, here is 10 gold",
                    "*You received 10 gold*",
                    "Succes en be save",
                ]);
            } else if (_choiceId === 11) {
                return new TalkActionResult(
                    this,
                    ["Johan: Final offer, 30 gold totaal, 15 now, 15 when jij are back."],
                    [
                        new TalkChoiceAction(13, "I need to go, I can't help further"),
                        new TalkChoiceAction(14, "I want more, this is not worth it."),
                        new TalkChoiceAction(15, "I'll take it"),
                    ]
                );
            } else if (_choiceId === 12) {
                return new TextActionResult(["Johan: Succes verder!"]);
            } else if (_choiceId === 13) {
                return new TextActionResult(["Johan: If jij change jouw mind, jij can always kom back"]);
            } else if (_choiceId === 14) {
                return new TextActionResult(["Johan: Ok, deal is off the table. Succes verder."]);
            } else if (_choiceId === 15) {
                playerSession.horseMission30 = true;
                playerSession.gold += 15;
                return new TextActionResult([
                    "Johan: Dankjewel, Thank you for your help.",
                    "*You received 15 gold*",
                    "Kom back in one stukje.",
                ]);
            } else if (_choiceId === 99) {
                return new TextActionResult(["Doei doei."]);
            }

            return new TalkActionResult(
                this,
                [
                    "Johan: Waarom, waarom gebeurt dit mij altijd...",
                    "Oh, hallo. Sorry that jij see mij this way. I just got robbed by die people.",
                    "They stole all my horses en fled.",
                ],
                [
                    new TalkChoiceAction(1, "Are you alright?"),
                    new TalkChoiceAction(2, "Where did they go to?"),
                    new TalkChoiceAction(99, "Bye!"),
                ]
            );
        }
        return undefined;
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
