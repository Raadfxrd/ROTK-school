import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
import { SteelSwordItemAlias } from "../items/SteelSwordItem";
import { PlayerSession } from "../types";

export const eleonorAlias: string = "Eleonor-character";

export class EleonorCharacter extends Character implements Examine {
    public constructor() {
        super(eleonorAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Eleonor";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const eleonorImage: string = "characters/Eleonor.png";
        return new TextAndImageActionResult(
            [
                "The great king Eleonor, Grandson of founder of the castle Ferdinand. ",
                "He won a lot of important battles to keep the peace in the realm. He looks a bit older than on the pictures",
                "He looks if he is fearing the worst for his daughter, Eleonora",
            ],
            [playerSession.image, eleonorImage]
        );
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const eleonorImage: string = "characters/Eleonor.png";

        if (playerSession.vladimirTaken === true) {
            if (_choiceId === 1) {
                return new TalkAndImageActionResult(
                    this,
                    ["Eleonor: Of course we must hurry, my daughter is missing. Or is there another reason?"],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(4, "There is this dragon"), new TalkChoiceAction(5, "Ask him")]
                );
            } else if (_choiceId === 2) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: First we need to know what he did to the princess and where she is, or have you already asked him that yourself?",
                    ],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(4, "There is this dragon"), new TalkChoiceAction(5, "Ask him")]
                );
            } else if (_choiceId === 3) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: If you know what you need to do to bring the princess back, it's best to interrogate him. So what information did you get out of him?",
                    ],
                    [playerSession.image, eleonorImage],
                    [
                        new TalkChoiceAction(4, "There is this dragon"),
                        new TalkChoiceAction(5, "Ask him"),
                        new TalkChoiceAction(16, "There is no time to spare"),
                    ]
                );
            } else if (_choiceId === 4) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: Wait you are telling me this dragon is going to kill my daughter? We have no more time to spare! Take the map on the wall and leave at once.",
                        "Take Alexandra with you, you'll need her...",
                    ],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(6, "Start adventure")]
                );
            } else if (_choiceId === 5) {
                return new TalkAndImageActionResult(
                    this,
                    ["Vladimir: I've told him everything I know, please just let me be."],
                    [playerSession.image, eleonorImage],
                    [
                        new TalkChoiceAction(11, "No you must pay for this"),
                        new TalkChoiceAction(7, "Tell him what you know"),
                    ]
                );
            } else if (_choiceId === 6) {
                playerSession.gold += 30;
                playerSession.inventory.push(SteelSwordItemAlias);
                playerSession.knowLocationLowlands = true;
                playerSession.knowWhereMapIs = true;
                playerSession.vladimirTaken = false;
                return new TextAndImageActionResult(
                    [
                        "Eleonor: Here is some gold to help you around, Use it wisely and bring the princess back!",
                        "Don't forgot to take the map with you, its on the right side of the entrance.",
                        "*You recieved 30 gold and a steel sword*",
                        "*You can access the map through the examine button*",
                    ],
                    [playerSession.image, eleonorImage]
                );
            } else if (_choiceId === 7) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Vladimir: Alright, we had to kidnap the princess to save our city.",
                        "I'm from the Lowlands and there is a dragon who is treatening to destroy our city.",
                        "He wanted to have the princess but we don't know why. I'm fearing the worst for her.",
                    ],
                    [playerSession.image, eleonorImage],
                    [
                        new TalkChoiceAction(10, "This is not good"),
                        new TalkChoiceAction(9, "Tell him about yourself"),
                    ]
                );
            } else if (_choiceId === 8) {
                return new TalkAndImageActionResult(
                    this,
                    ["Vladimir: I've told him everything I know, please just let me be."],
                    [playerSession.image, eleonorImage],
                    [
                        new TalkChoiceAction(11, "No you must pay for this"),
                        new TalkChoiceAction(8, "Tell him what you know"),
                    ]
                );
            } else if (_choiceId === 9) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Vladimir: I'm Vladimir and I'm from the Lowlands. My group are all changelings and can shapeshift into other people",
                        "*Vladimir unshifts from his civilian look into a very pale looking creature*",
                        "This is my true form, I hope you trust me now.",
                    ],
                    [playerSession.image, eleonorImage],
                    [
                        new TalkChoiceAction(11, "No you must pay for this"),
                        new TalkChoiceAction(3, "We must go at once"),
                    ]
                );
            } else if (_choiceId === 10) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: This indeed doesn't look all that well. We must make hurry and get the princess back savely.",
                        "You must do whatever it takes to get her back, she can't get hurt.",
                        "Take Alexandra with you, you'll need her...",
                    ],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(6, "Start adventure")]
                );
            } else if (_choiceId === 11) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: We will take care of him, take him into the torture chambers. He indeed must pay for this.",
                        "*2 soldiers take over Vladimir from you and he begins to cry and scream* Vladimir: Please don't do this, don't kill me!",
                        "Charles: I don't think it's a good idea to kill him. These creatures are rare and have a lot of information we can get.",
                    ],
                    [playerSession.image, eleonorImage],
                    [
                        new TalkChoiceAction(12, "I think Charles is right"),
                        new TalkChoiceAction(13, "It's your choice my king"),
                    ]
                );
            } else if (_choiceId === 12) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: You are right, we might get to know a lot more about them if we leave him alive.",
                        "But you Arthur you must hurry, as what we know now we don't have any time to spare.",
                        "Take the map on the wall and leave at once. You must do whatever it takes to save the princess.",
                        "Take Alexandra with you, you'll need her...",
                    ],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(6, "Start adventure")]
                );
            } else if (_choiceId === 13) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: He must pay for his crimes. We will execute him tomorrow at noon for the public to see.",
                        "If there are any other changelings in Wolburg they will be feared and know what happens to them.",
                    ],
                    [playerSession.image, eleonorImage],
                    [
                        new TalkChoiceAction(15, "Good choice"),
                        new TalkChoiceAction(14, "Wow is this really the way?"),
                    ]
                );
            } else if (_choiceId === 14) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: It is my choice, you'll do what I order you to do. Now you Arthur must hurry.",
                        "You and Alexandra must bring the princess back and never doubt me on my choices again.",
                        "Do whatever it takes to save the princess.",
                    ],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(6, "Start adventure")]
                );
            } else if (_choiceId === 15) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: Of course it is a good choice, I made this choice. Now you Arthur, you must hurry.",
                        "You and Alexandra must bring the princess back and never doubt me on my choices again.",
                        "Do whatever it takes to save the princess.",
                    ],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(6, "Start adventure")]
                );
            } else if (_choiceId === 16) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Eleonor: Soldiers! take this man with you to the interrogation room...",
                        "*Vladimir starts screaming and crying*",
                        "Now you Arthur, you must hurry.",
                        "You and Alexandra must bring the princess back and never doubt me on my choices again.",
                        "Do whatever it takes to save the princess.",
                    ],
                    [playerSession.image, eleonorImage],
                    [new TalkChoiceAction(6, "Start adventure")]
                );
            } else if (_choiceId === 16) {
                return new TextActionResult(["Bye Arthur..."]);
            }

            return new TalkAndImageActionResult(
                this,
                [
                    "Eleonor: Who is this you brought here in front of me?",
                    "Wait this must be one of the kidnappers, great job Arthur! You have done very well...",
                ],
                [playerSession.image, eleonorImage],
                [
                    new TalkChoiceAction(1, "We must hurry"),
                    new TalkChoiceAction(2, "Take him into prison"),
                    new TalkChoiceAction(3, "Interrogate him"),
                    new TalkChoiceAction(99, "Bye!"),
                ]
            );
        }
        if (_choiceId === 1) {
            return new TextActionResult([
                "Eleonor: How? I thought you were here to protect her.",
                "Find out how this has happened and return to me if you know more.",
            ]);
        } else if (_choiceId === 2) {
            return new TextActionResult([
                "Eleonor: Please, I don't want anything bad happen to her. Let me know if you find something.",
            ]);
        } else if (_choiceId === 3) {
            return new TextActionResult(["Eleonor: Please, let me know if you have something..."]);
        } else if (_choiceId === 4) {
            playerSession.knowWhereMapIs = true;
            return new TextActionResult([
                "Eleonor: This ingraved cave reminds me of something, something i have not seen in a while...",
                "Maybe you can find something on the map. it is on the right side of the entrance.",
                "*You can now access the map through the examine button*",
            ]);
        } else if (_choiceId === 5) {
            playerSession.knowLocationLowlands = true;
            return new TalkAndImageActionResult(
                this,
                [
                    "Eleonor: I think that's it! They must bring her to there. I've heard of all different kinds of mysteries going on there",
                    "I won't send you on your own to search for the princess. Take Alexandra with you, she knows a lot about what is happening too",
                    "You must save her at any cost, you are the reason she is gone.",
                ],
                [playerSession.image, eleonorImage],
                [new TalkChoiceAction(10, "Start Adventure")]
            );
        } else if (_choiceId === 6) {
            playerSession.knowLocationLowlands = true;
            return new TalkAndImageActionResult(
                this,
                [
                    "Eleonor: I think that's not it. Volo's village is a really friendly village with some darker type of people.",
                    "I took some time thinking about this while you were looking at the map and I think the place you are looking for are the LowLands.",
                    "I won't send you on your own to search for the princess. Take Alexandra with you, she knows a lot about what is happening too.",
                    "You must save her at any cost, you are the reason she is gone.",
                ],
                [playerSession.image, eleonorImage],
                [new TalkChoiceAction(10, "Start Adventure")]
            );
        } else if (_choiceId === 7) {
            playerSession.knowLocationLowlands = true;
            return new TalkAndImageActionResult(
                this,
                [
                    "Eleonor: I think that's not it. Quickpass is a neutral village whom are really kind to all people passing by.",
                    "I took some time thinking about this while you were looking at the map and I think the place you are looking for are the LowLands.",
                    "I won't send you on your own to search for the princess. Take Alexandra with you, she knows a lot about what is happening too.",
                    "You must save her at any cost, you are the reason she is gone.",
                ],
                [playerSession.image, eleonorImage],
                [new TalkChoiceAction(10, "Start Adventure")]
            );
        } else if (_choiceId === 8) {
            return new TextActionResult([
                "Eleonor: You'll have to go to the Lowlands, it is in the bottom left of the province Kaseon.",
                "Make hurry because we have no time to spare!",
            ]);
        } else if (_choiceId === 9) {
            return new TextActionResult(["Eleonor: You must save the princess at any cost!"]);
        } else if (_choiceId === 10) {
            playerSession.gold += 30;
            playerSession.inventory.push(SteelSwordItemAlias);
            return new TextActionResult([
                "Eleonor: Here is some gold to help you around, Use it wisely and bring the princess back!",
                "*You recieved 30 gold and a steel sword*",
            ]);
        } else if (_choiceId === 15) {
            return new TalkAndImageActionResult(
                this,
                ["Eleonor: So where is it where we need to go to?"],
                [playerSession.image, eleonorImage],
                [
                    new TalkChoiceAction(5, "We need to go to the cave in the bottom left of the map"),
                    new TalkChoiceAction(6, "We need to go to Volo's village"),
                    new TalkChoiceAction(7, "We need to go to Quickpass"),
                ]
            );
        } else if (_choiceId === 16) {
            new TextActionResult([
                "Look for the cave on the map, it must be there.",
                "*You can access the map in the examine button*",
            ]);
        } else if (_choiceId === 99) {
            new TextActionResult(["Bye Arthur, good luck."]);
        }

        let choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "There were a few bandits in the croud that took her"),
            new TalkChoiceAction(2, "I have got no clue"),
            new TalkChoiceAction(3, "Bye!"),
        ];

        if (playerSession.inventory.includes(RingItemAlias)) {
            choiceActions.push(new TalkChoiceAction(4, "I have found a ring"));
        }

        if (playerSession.knowLocationLowlands === true) {
            choiceActions = [
                new TalkChoiceAction(8, "So where do i need to go again?"),
                new TalkChoiceAction(9, "Sorry for bothering, I'm going on my way!"),
            ];
            return new TalkAndImageActionResult(
                this,
                ["Eleonor: You need something?"],
                [playerSession.image, eleonorImage],
                choiceActions
            );
        }

        if (playerSession.knowWhereMapIs === true) {
            choiceActions = [
                new TalkChoiceAction(15, "I know where to go"),
                new TalkChoiceAction(16, "I'm looking for the map"),
                new TalkChoiceAction(99, "Bye!"),
            ];

            return new TalkAndImageActionResult(
                this,
                ["Eleonor: Have you found the map Arthur?"],
                [playerSession.image, eleonorImage],
                choiceActions
            );
        }

        return new TalkAndImageActionResult(
            this,
            ["Eleonor: Please, how could this have happened..."],
            [playerSession.image, eleonorImage],
            choiceActions
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
