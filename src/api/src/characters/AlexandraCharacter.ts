import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
import { ChurchWolburgRoomAlias } from "../rooms/ChurchWolburgRoom";
import { GateWolburgRoomAlias } from "../rooms/GateWolburgRoom";
import { StablesWolburgRoomAlias } from "../rooms/StablesWolburgRoom";
import { ThroneRoomAlias } from "../rooms/ThroneRoom";
import { WolburgRoomAlias } from "../rooms/WolburgRoom";
import { PlayerSession } from "../types";

export const AlexandraAlias: string = "Alexandra-character";

export class AlexandraCharacter extends Character implements Examine {
    public constructor() {
        super(AlexandraAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Alexandra";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const alexandraImage: string = "characters/Alexandra.png";
        if (playerSession.currentRoom === ThroneRoomAlias) {
            return new TextAndImageActionResult(
                [
                    "A young woman, the only woman in the kingsguard. Known for her good deeds that she has done.",
                    "She kind of reminds you of yourself. She has the same characteristics as you have.",
                ],
                [playerSession.image, alexandraImage]
            );
        }

        if (playerSession.currentRoom === WolburgRoomAlias) {
            return new TextAndImageActionResult(
                [
                    "She looks worried about the commotion happening at the stable.",
                    "Besides that she looks worried, she also has a look of relief, the bandits are probably closeby...",
                ],
                [playerSession.image, alexandraImage]
            );
        }

        if (playerSession.currentRoom === GateWolburgRoomAlias) {
            return new TextAndImageActionResult(
                [
                    "She is ready to go on this adventure with you, her eyes and her armour are shining in the sun.",
                ],
                [playerSession.image, alexandraImage]
            );
        }

        return undefined;
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const alexandraImage: string = "characters/Alexandra.png";

        //Check to see if current room is throneroom for the dialogues

        if (playerSession.currentRoom === ThroneRoomAlias) {
            if (_choiceId === 1) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: Those bandits are the worst. I heard some rumours about them being here and took caution.",
                        "The first thing I have seen was some people in the crowd making hand signals to eachother.",
                        "I took some time and remembered what there code meant. 'she is coming, we need to go now'",
                        "Hope we can find the princess soon...",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 2) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: If you find something interesting let us know, we keep the crowd in check for now and keep the rest save.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 3) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: I have seen this sigil somewhere, where was it again...",
                        "Let me think about this for a minute. You can ask the king in the meantime.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 4) {
                return new TalkAndImageActionResult(
                    this,
                    ["Alexandra: So what is it boss? where do we need to go to."],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(10, "It is a location not named on the map on the bottom left"),
                        new TalkChoiceAction(11, "We need to go to Windhollow"),
                        new TalkChoiceAction(11, "We need to go to Silver Coast"),
                    ]
                );
            } else if (_choiceId === 5) {
                return new TextAndImageActionResult(
                    ["Alexandra: You need to look where the bandits have gone to."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 6) {
                return new TextAndImageActionResult(
                    ["Alexandra: Let me know if you know it!"],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 7) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: Alright big boss, you are lucky I got assigned to this mission instead of Henry, he would've snapped you in half.",
                        "Lead the way big guy.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 8) {
                return new TextAndImageActionResult(
                    ["Alexandra: Follow me, i'll lead the way. Lowlands here we come!"],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 9) {
                return new TextAndImageActionResult(
                    ["Alexandra: Alright, let me know if you are ready though guy."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 10) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: I knew it, I heard loads about it but wasn't too sure it was a thing.",
                        "People only spoke of it as a legend, the Lowlands, but it must be real...",
                        "Tell the king that we need to head towards the Lowlands",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 11) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: I don't know chief, that doesn't sound right. ",
                        "It must be something really mysterious of things what I've heard. maybe ask the king.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 12) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: Mmmh... I don't think that's it,",
                        "It has to do with something really mysterious, you should ask the king about this.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            }

            let choiceActions: TalkChoiceAction[] = [
                new TalkChoiceAction(1, "There were a few bandits in the croud that took her."),
                new TalkChoiceAction(2, "I'm going to take a look"),
            ];

            if (playerSession.inventory.includes(RingItemAlias)) {
                choiceActions.push(new TalkChoiceAction(3, "I have found a ring."));
            }

            if (playerSession.knowLocationLowlands === true) {
                choiceActions = [
                    new TalkChoiceAction(7, "Follow me, i'll lead the way"),
                    new TalkChoiceAction(8, "Alright lets's go!"),
                    new TalkChoiceAction(9, "Give me a second."),
                ];
                return new TalkAndImageActionResult(
                    this,
                    ["Alexandra: So, you ready to go? Save the princess and stuff."],
                    [playerSession.image, alexandraImage],
                    choiceActions
                );
            }

            if (playerSession.knowWhereMapIs === true) {
                choiceActions = [
                    new TalkChoiceAction(4, "I have found a map and I think where we need to go"),
                    new TalkChoiceAction(5, "Where do I need to look for?"),
                    new TalkChoiceAction(6, "I'm looking further into the map"),
                ];
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: Hey I was thinking about the ring and I know what it was again. I've heard some stories of this.",
                        "It is widely known as a great mystery and not many people know about this.",
                        "Besides this i don't know much more sorry. But you wanted to say something?",
                    ],
                    [playerSession.image, alexandraImage],
                    choiceActions
                );
            }

            return new TalkAndImageActionResult(
                this,
                ["Alexandra: Hey you there, you found something?"],
                [playerSession.image, alexandraImage],
                choiceActions
            );
        }

        // check to see if the current room is wolburg for the dialogues

        if (playerSession.currentRoom === GateWolburgRoomAlias) {
            if (_choiceId === 1) {
                return new TextAndImageActionResult(
                    ["Alright lets go."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 2) {
                return new TextAndImageActionResult(
                    [
                        "That's fine, take your time",
                        "If we don't get the princess back we are dead, just to give you a heads up boss.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 99) {
                return new TextActionResult(["Oh alright, Bye!"]);
            }
            return new TalkAndImageActionResult(
                this,
                [
                    "This is it, the end of Wolburg,",
                    "Are you ready to save the princess?",
                    "Maybe if you forgot anything you can go back to the shop and buy something",
                ],
                [playerSession.image, alexandraImage],
                [
                    new TalkChoiceAction(1, "I'm fine, lets go!"),
                    new TalkChoiceAction(2, "I totally forgot something."),
                    new TalkChoiceAction(99, "Bye!"),
                ]
            );
        }
        if (playerSession.currentRoom === StablesWolburgRoomAlias) {
            if (
                playerSession.horseMission10 === true ||
                playerSession.horseMission20 === true ||
                playerSession.horseMission30 === true
            ) {
                if (_choiceId === 1) {
                    return new TextAndImageActionResult(
                        [
                            "Alexandra: We indeed do, you should take a closer look next time we are in Wolburg.",
                        ],
                        [playerSession.image, alexandraImage]
                    );
                } else if (_choiceId === 2) {
                    return new TextAndImageActionResult(
                        ["Alexandra: You are right, we need to save the princess!"],
                        [playerSession.image, alexandraImage]
                    );
                }

                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: At least Richard is getting back up again. It even looks like people are helping him.",
                        "The more I see these people work together the more I love this city.",
                    ],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(1, "What a great folk we have"),
                        new TalkChoiceAction(2, "We need to go further"),
                        new TalkChoiceAction(99, "Bye!"),
                    ]
                );
            }
            if (_choiceId === 1) {
                return new TextAndImageActionResult(
                    ["Alexandra: You should talk to him, I think that would cheer him up"],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 2) {
                return new TalkAndImageActionResult(
                    this,
                    ["Alexandra: Are you sure, I think he needs help"],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(3, "I'm sure, lets go"),
                        new TalkChoiceAction(4, "Alright, lets check him out"),
                    ]
                );
            } else if (_choiceId === 3) {
                return new TextAndImageActionResult(
                    ["Alexandra: Sure thing boss"],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 4) {
                return new TextAndImageActionResult(
                    ["Alexandra: Yess nice! You are the best"],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 99) {
                return new TextActionResult(["Alexandra: Oh alright, Bye!"]);
            }
            return new TalkAndImageActionResult(
                this,
                ["Alexandra: Look at that poor man, he is even crying, I'm wondering whats happened to him"],
                [playerSession.image, alexandraImage],
                [
                    new TalkChoiceAction(1, "Lets check him out!"),
                    new TalkChoiceAction(2, "We need to go further"),
                    new TalkChoiceAction(99, "Bye!"),
                ]
            );
        }

        if (playerSession.currentRoom === WolburgRoomAlias) {
            if (_choiceId === 1) {
                return new TextAndImageActionResult(
                    ["Alexandra: Alright lets go."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 2) {
                return new TextAndImageActionResult(
                    ["Alexandra: Do your thing boss."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 99) {
                return new TextActionResult(["Alexandra: Oh, bye!"]);
            }

            return new TalkAndImageActionResult(
                this,
                ["Alexandra: Wow check out the stable, looks like they need some help."],
                [playerSession.image, alexandraImage],
                [
                    new TalkChoiceAction(1, "Lets check the stables out"),
                    new TalkChoiceAction(2, "I'm checking out something else first"),
                    new TalkChoiceAction(99, "Bye!"),
                ]
            );
        }

        if (playerSession.currentRoom === ChurchWolburgRoomAlias) {
            if (_choiceId === 1) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: I think it just doesn't make sense to me.",
                        "If I do something that helps the people because of my good deed why should a god be involved into this?",
                        "It's that i made it like this so that people get better not that the god did this to make the world better",
                    ],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(4, "But some things are unexplainable"),
                        new TalkChoiceAction(5, "I think you are wrong"),
                        new TalkChoiceAction(8, "Alright, thanks"),
                    ]
                );
            } else if (_choiceId === 2) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: Right! It's some made up stuff by the higher ups that just want to make money out of people their toughts",
                        "It's a total scam and people fall really easily into it because of some unexplainable things happening",
                    ],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(6, "What unexplainable things?"),
                        new TalkChoiceAction(7, "So the people are stupid?"),
                        new TalkChoiceAction(8, "Alright, thanks"),
                    ]
                );
            } else if (_choiceId === 3) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: You have never heard of the gods?",
                        "Let me tell you what they tell the rest of the people.",
                    ],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(9, "I'm interested"),
                        new TalkChoiceAction(10, "I don't have time for it now"),
                        new TalkChoiceAction(99, "Bye!"),
                    ]
                );
            } else if (_choiceId === 4) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: I'm not into discussing it now with you, maybe the pastor will tell you more.",
                        "But Some thing just need some thinking before saying it was because of the gods.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 5) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: Hey, thats your opinion and if you think there are gods, so be it.",
                        "Lets talk to this small pastor, if you want to know more about some gods just ask him.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 6) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: Like whats going to happen when you die, why there is life but also people pray to gods to bring fortune to themselves.",
                        "Maybe you can ask this pastor about this because he of course is an expert in religion.",
                    ],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(11, "Let's ask him"),
                        new TalkChoiceAction(12, "I'm not THAT interested"),
                    ]
                );
            } else if (_choiceId === 7) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: I mean kind of, they just believe these thing really quickly but that doesn't make them necessarily stupid.",
                    ],
                    [playerSession.image, alexandraImage],
                    [new TalkChoiceAction(13, "That's true"), new TalkChoiceAction(8, "Alright thanks")]
                );
            } else if (_choiceId === 8) {
                return new TextAndImageActionResult(
                    ["Alexandra: No problem boss."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 9) {
                return new TalkAndImageActionResult(
                    this,
                    [
                        "Alexandra: I'll try the best I can do.",
                        "So there are 9 gods that have created life, our world where we live in now. That are the gods, tyr, pelor, sune, kelemvor, oghma, leira, hextor, shar and umberlee",
                        "These gods are the creating of good and bad, there are also gods that are neutral.",
                        "But I don't really believe in the gods so you should ask someone here about it more if you are interested.",
                    ],
                    [playerSession.image, alexandraImage],
                    [
                        new TalkChoiceAction(11, "Let's ask him"),
                        new TalkChoiceAction(12, "I'm not THAT interested"),
                        new TalkChoiceAction(9, "Alright thanks"),
                    ]
                );
            } else if (_choiceId === 10) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: Me neither, I don't even like the gods.",
                        "Lets go further into our mission.",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 11) {
                return new TextAndImageActionResult(
                    ["Alexandra: Alright boss, do your thing."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 12) {
                return new TextAndImageActionResult(
                    [
                        "Alexandra: That's what I wanted to hear, stupid gods.",
                        "Let's go further on our mission boss, we got a princess to save",
                    ],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 13) {
                return new TextAndImageActionResult(
                    ["Alexandra: So let's get back into the mission."],
                    [playerSession.image, alexandraImage]
                );
            } else if (_choiceId === 99) {
                return new TextActionResult(["Alexandra: Oh, bye!"]);
            }
            return new TalkAndImageActionResult(
                this,
                [
                    "Alexandra: Just so that you know, I don't believe in any of the 9 gods there are.",
                    "I just believe in what is happening at the moment and what's going to happen with the actions I take.",
                ],
                [playerSession.image, alexandraImage],
                [
                    new TalkChoiceAction(1, "Why don't you believe in the gods?"),
                    new TalkChoiceAction(2, "I don't believe in the gods"),
                    new TalkChoiceAction(3, "There are gods?"),
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
