import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
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
        return new TextActionResult([
            "A young woman, the only woman in the kingsguard. Known for her good deeds that she has done",
            "She kind of reminds you of yourself. She has the same characteristics as you have",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        //Check to see if current room is throneroom for the dialogues

        if ((playerSession.currentRoom = ThroneRoomAlias)) {
            if (_choiceId === 1) {
                return new TextActionResult([
                    "Alexandra: Those bandits are the worst. I heard some rumours about them being here and took caution.",
                    "The first thing I have seen was some people in the crowd making hand signals to eachother.",
                    "I took some time and remembered what there code meant. 'she is coming, we need to go now'",
                    "Hope we can find the princess soon...",
                ]);
            } else if (_choiceId === 2) {
                return new TextActionResult([
                    "Alexandra: If you find something interesting let us know, we keep the crowd in check for now and keep the rest save.",
                ]);
            } else if (_choiceId === 3) {
                return new TextActionResult([
                    "Alexandra: I have seen this sigil somewhere, where was it again...",
                    "Let me think about this for a minute. You can ask the king in the meantime",
                ]);
            } else if (_choiceId === 4) {
                return new TalkActionResult(
                    this,
                    ["Alexandra: So what is it boss? where do we need to go to."],
                    [
                        new TalkChoiceAction(10, "It is a location not named on the map on the bottom left"),
                        new TalkChoiceAction(11, "We need to go to Windhollow"),
                        new TalkChoiceAction(11, "We need to go to Silver Coast"),
                    ]
                );
            } else if (_choiceId === 5) {
                return new TextActionResult(["Alexandra: You need to look where the bandits have gone too."]);
            } else if (_choiceId === 6) {
                return new TextActionResult(["Alexandra: Let me know if you know it!"]);
            } else if (_choiceId === 7) {
                return new TextActionResult([
                    "Alexandra: Alright big boss, you are lucky I got assigned to this mission instead of Henry, he would've snapped you in half.",
                    "Lead the way big guy.",
                ]);
            } else if (_choiceId === 8) {
                return new TextActionResult([
                    "Alexandra: Follow me, i'll lead the way. Lowlands here we come!",
                ]);
            } else if (_choiceId === 9) {
                return new TextActionResult(["Alexandra: Alright, let me know if you are ready though guy."]);
            } else if (_choiceId === 10) {
                return new TextActionResult([
                    "Alexandra: I knew it, I heard loads about it but wasn't too sure it was a thing",
                    "People only spoke of it as a legend, the Lowlands, but it must be real...",
                    "Tell the king that we need to head towards the Lowlands",
                ]);
            } else if (_choiceId === 11) {
                return new TextActionResult([
                    "Alexandra: I don't know chief, that doesn't sound right. ",
                    "It must be something really mysterious of things what I've heard. maybe ask the king.",
                ]);
            } else if (_choiceId === 12) {
                return new TextActionResult([
                    "Alexandra: Mmmh... I don't think that's it,",
                    "It has to do with something really mysterious, you should ask the king about this.",
                ]);
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
                return new TalkActionResult(
                    this,
                    ["Alexandra: So, you ready to go? Save the princess and stuff."],
                    choiceActions
                );
            }

            if (playerSession.knowWhereMapIs === true) {
                choiceActions = [
                    new TalkChoiceAction(4, "I have found a map and I think where we need to go"),
                    new TalkChoiceAction(5, "Where do I need to look for?"),
                    new TalkChoiceAction(6, "I'm looking further into the map"),
                ];
                return new TalkActionResult(
                    this,
                    [
                        "Alexandra: Hey I know what it was again, I heard some stories of this.",
                        "It is widely known as a great mystery and not many people know about this.",
                        "Besides this i don't know much more sorry. But you wanted to say something?",
                    ],
                    choiceActions
                );
            }

            return new TalkActionResult(
                this,
                ["Alexandra: Hey you there, you found something?"],
                choiceActions
            );
        }

        // check to see if the current room is wolburg for the dialogues

        if (playerSession.currentRoom === WolburgRoomAlias) {
            if (_choiceId === 1) {
                return new TextActionResult(["Alright lets go"]);
            } else if (_choiceId === 2) {
                return new TextActionResult([""]);
            } else if (_choiceId === 3) {
                return new TextActionResult([""]);
            }

            return new TalkActionResult(
                this,
                ["Alexandra: Wow check out the stable, looks like they need some help."],
                [
                    new TalkChoiceAction(1, "Lets check the stables out"),
                    new TalkChoiceAction(2, "Not right now"),
                    new TalkChoiceAction(2, "Bye!"),
                ]
            );
        }

        return undefined;
    }
}
