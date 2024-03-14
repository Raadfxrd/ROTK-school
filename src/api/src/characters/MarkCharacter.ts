import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { ChurchTorchAlias } from "../items/ThroneRoomTorchItem";
import { PlayerSession } from "../types";

export const MarkCharacterAlias: string = "mark-character";

export class MarkCharacter extends Character implements Examine {
    public constructor() {
        super(MarkCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Mark";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You are looking at a small priest, he is not higher than your hip.",
            "You know that these creatures are called halflings.",
            "The small priest is wearing brown robes.",
        ]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        console.log(playerSession);

        if (playerSession.shownRing === false && playerSession.shownRingBadEnding === false) {
            if (_choiceId === 1) {
                return new TalkActionResult(
                    this,
                    ["Mark: Hi, how can I help you?"],
                    [
                        new TalkChoiceAction(2, "Do you know something about this ring"),
                        new TalkChoiceAction(3, "I would like to pray."),
                        new TalkChoiceAction(99, "bye!"),
                    ]
                );
            } else if (_choiceId === 2) {
                return new TalkActionResult(
                    this,
                    ["Mark: This ring you are showing me, where did you get it from? This is from legends!"],
                    [
                        new TalkChoiceAction(4, "I just want to know what this ring is"),
                        new TalkChoiceAction(5, "It was from one of the kidnappers."),
                        new TalkChoiceAction(6, "It's secret"),
                    ]
                );
            } else if (_choiceId === 3) {
                playerSession.blessing = true;
                return new TalkActionResult(
                    this,
                    [
                        "Lets pray together",
                        "*While praying you feel that you gain the blessing from the god Pelor*",
                        "Thank you for praying with me for our god. Can I help you with anything else?",
                    ],
                    [
                        new TalkChoiceAction(2, "Do you know something about this ring"),
                        new TalkChoiceAction(99, "bye!"),
                    ]
                );
            } else if (_choiceId === 4) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: Alright, I'll tell you what this ring is about...",
                        "This ring is a legend from the Changeling people. They live deep underground but nobody has seen them because they can change their appearance.",
                        "The difficult part is to spot a changeling because they are always someone else. When they die they will form back to their old selves...",
                    ],
                    [
                        new TalkChoiceAction(7, "Interesting, do you know more about this?"),
                        new TalkChoiceAction(8, "Where do they live underground"),
                        new TalkChoiceAction(9, "Thanks, I'll go on my way"),
                    ]
                );
            } else if (_choiceId === 5) {
                return new TalkActionResult(
                    this,
                    ["Mark: Kidnappers? Who did they kidnap?"],
                    [
                        new TalkChoiceAction(10, "The princess, she is gone"),
                        new TalkChoiceAction(6, "I can't tell, it's top secret"),
                    ]
                );
            } else if (_choiceId === 6) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: Alright, keep your secrets. But why would I want to tell you something about this ring then?",
                    ],
                    [
                        new TalkChoiceAction(15, "I'm Arthur from the kingsguard"),
                        new TalkChoiceAction(16, "We got a quest"),
                        new TalkChoiceAction(17, "I'll pay you 5 gold"),
                    ]
                );
            } else if (_choiceId === 7) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: Besides what I just told you there isn't really any more information I can give you about this ring and the stories of it.",
                    ],
                    [
                        new TalkChoiceAction(8, "Where do they live"),
                        new TalkChoiceAction(9, "Thanks, I'll go on my way"),
                    ]
                );
            } else if (_choiceId === 8) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: What I have heard of where they might reside is the Lowlands, but you should be very cautious about the Lowlands.",
                        "The lowlands is known as a place of no return and very mysterious place.",
                    ],
                    [new TalkChoiceAction(9, "Thanks, I'll go on my way")]
                );
            } else if (_choiceId === 9) {
                playerSession.shownRing = true;
                return new TextActionResult([
                    "Mark: Good luck on your adventure, may Pelor be in your favour.",
                ]);
            } else if (_choiceId === 10) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: How has this happened? You were supposed to protect her.",
                        "This is outragious, I can't believe this is happening. You should be ashamed of yourself.",
                    ],
                    [
                        new TalkChoiceAction(11, "There was nothing I could do"),
                        new TalkChoiceAction(12, "Can we talk about the ring?"),
                        new TalkChoiceAction(13, "We are going after them now"),
                    ]
                );
            } else if (_choiceId === 11) {
                return new TalkActionResult(
                    this,
                    ["Mark: You can do something about it now, go after them!"],
                    [
                        new TalkChoiceAction(14, "They are gone, I need clues"),
                        new TalkChoiceAction(13, "I'll be on my way"),
                    ]
                );
            } else if (_choiceId === 12) {
                return new TalkActionResult(
                    this,
                    ["Mark: No I can't anymore, you are a disgrace to the city."],
                    [
                        new TalkChoiceAction(14, "Please, this will give us a clue"),
                        new TalkChoiceAction(13, "I'll be on my way"),
                    ]
                );
            } else if (_choiceId === 13) {
                playerSession.shownRingBadEnding = true;
                return new TextActionResult(["Mark: You better be, and don't come back!"]);
            } else if (_choiceId === 14) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: If this will help you bring the princess back, I'll tell you about this ring.",
                        "This ring is a legend from the Changeling people. They live deep underground but nobody has seen them because they can change their appearance.",
                        "The difficult part is to spot a changeling because they are always someone else. When they die they will form back to their old selves...",
                    ],
                    [
                        new TalkChoiceAction(7, "Interesting, do you know more about this?"),
                        new TalkChoiceAction(8, "Where do they live underground"),
                        new TalkChoiceAction(9, "Thanks, I'll go on my way"),
                    ]
                );
            } else if (_choiceId === 99) {
                return new TextActionResult(["Mark: Bye! good luck on your adventure."]);
            }

            return new TalkActionResult(
                this,
                [
                    "Mark: Hello, I'm Mark and I'm the priest of Wolburg.",
                    "We follow the god of the sun and healing, Pelor.",
                    "Would you like to pray to our god?",
                ],
                [
                    new TalkChoiceAction(1, "Oh hi Mark"),
                    new TalkChoiceAction(2, "Do you know something about this ring"),
                    new TalkChoiceAction(3, "I would like to pray."),
                    new TalkChoiceAction(99, "bye!"),
                ]
            );
        }
        if (playerSession.shownRing === true) {
            if (_choiceId === 1) {
                return new TextActionResult([
                    "Mark: Well I don't have anything to tell you, good luck on your adventure.",
                ]);
            } else if (_choiceId === 2) {
                return new TextActionResult(["I don't have anything more to tell you, I'm sorry."]);
            } else if (_choiceId === 3) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: A torch you are talking about? There is a torch in the left corner behind Pelor, there is nothing we do with it so you can take it with you.",
                    ],
                    [
                        new TalkChoiceAction(4, "How did you get the torch"),
                        new TalkChoiceAction(5, "Take the torch"),
                        new TalkChoiceAction(99, "Bye!"),
                    ]
                );
            } else if (_choiceId === 4) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: We got the torch from someone, he was mysterious and dropped it of and told us to take care of it.",
                        "But this was more than 100 years ago, I don't see why we still have to take care of it so take it.",
                    ],
                    [new TalkChoiceAction(5, "Take torch"), new TalkChoiceAction(99, "Bye!")]
                );
            } else if (_choiceId === 5) {
                playerSession.inventory.push(ChurchTorchAlias);
                return new TextActionResult([
                    "*You pick up the torch.",
                    "You feel a magic flow going through your body.",
                    "All of a sudden, the magic leaves your body and you are left with the torch.",
                    "You feel uneasy.*",
                    "Mark: Take care adventurer.",
                ]);
            } else if (_choiceId === 99) {
                return new TextActionResult(["Mark: Take care adventurer."]);
            }
            return new TalkActionResult(
                this,
                ["Mark: You are back, have you found something yet?"],
                [
                    new TalkChoiceAction(1, "Not yet, we are still exploring"),
                    new TalkChoiceAction(2, "Do you have any more information?"),
                    new TalkChoiceAction(3, "Do you have a holy torch?"),
                    new TalkChoiceAction(99, "Bye!"),
                ]
            );
        }
        if (playerSession.shownRingBadEnding === true) {
            if (_choiceId === 1) {
                return new TextActionResult([
                    "Mark: Well I don't have anything to tell you, good luck on your adventure.",
                ]);
            } else if (_choiceId === 2) {
                return new TextActionResult(["I don't have anything more to tell you, I'm sorry."]);
            } else if (_choiceId === 3) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: A torch you are talking about? There is a torch in the left corner behind Pelor, there is nothing we do with it so you can take it with you.",
                    ],
                    [
                        new TalkChoiceAction(4, "How did you get the torch"),
                        new TalkChoiceAction(5, "Take the torch"),
                        new TalkChoiceAction(99, "Bye!"),
                    ]
                );
            } else if (_choiceId === 4) {
                return new TalkActionResult(
                    this,
                    [
                        "Mark: We got the torch from someone, he was mysterious and dropped it of and told us to take care of it.",
                        "But this was more than 100 years ago, I don't see why we still have to take care of it so take it.",
                    ],
                    [new TalkChoiceAction(5, "Take torch"), new TalkChoiceAction(99, "Bye!")]
                );
            } else if (_choiceId === 5) {
                playerSession.inventory.push(ChurchTorchAlias);
                return new TextActionResult(["*You took the torch*", "Mark: Take care adventurer."]);
            } else if (_choiceId === 99) {
                return new TextActionResult(["Mark: Take care adventurer."]);
            }
            return new TalkActionResult(
                this,
                ["Mark: Its you again... You better have rescued the princess already!"],
                [
                    new TalkChoiceAction(1, "Not yet, we are still exploring"),
                    new TalkChoiceAction(2, "Do you have any more information?"),
                    new TalkChoiceAction(3, "Do you have a holy torch?"),
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
