import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
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
        return new TextActionResult([
            "The great king Eleonor, Grandson of founder of the castle Ferdinand. ",
            "He won a lot of important battles to keep the peace in the realm. He looks a bit older than on the pictures",
            "He looks if he is fearing the worst for his daughter, Eleonora",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (_choiceId === 1) {
            return new TextActionResult([
                "Eleonor: How? I thought you were here to protect her",
                "Find out how this has happened and return to me if you know more",
            ]);
        } else if (_choiceId === 2) {
            return new TextActionResult([
                "Eleonor: Please, I don't want anything bad happen to her. Let me know if you find something",
            ]);
        } else if (_choiceId === 3) {
            return new TextActionResult(["Eleonor: Please, let me know if you have something..."]);
        } else if (_choiceId === 4) {
            playerSession.knowWhereMapIs = true;
            return new TextActionResult([
                "Eleonor: This ingraved cave reminds me of something, something i have not seen in a while...",
                "Maybe you can find something on the map. it is on the right side of the entrance.",
            ]);
        } else if (_choiceId === 5) {
            playerSession.knowLocationLowlands = true;
            return new TalkActionResult(
                this,
                [
                    "Eleonor: I think that's it! They must bring her to there, it is known as the Lowlands. I've heard of all different kinds of mysteries going on there",
                    "I won't send you on your own to search for the princess. Take Alexandra with you, she knows a lot about what is happening too",
                    "Take care Arthur and Alexandra, come back in one piece.",
                ],
                [
                    new TalkChoiceAction(10, "Start Adventure")
                ]
            );
        } else if (_choiceId === 6) {
            playerSession.knowLocationLowlands = true;
            return new TalkActionResult(
                this,
                [
                    "Eleonor: I think that's not it. Volo's village is a really friendly village with some darker type of people.",
                    "I took some time thinking about this while you were looking at the map and I think the place you are looking for are the LowLands.",
                    "I won't send you on your own to search for the princess. Take Alexandra with you, she knows a lot about what is happening too",
                    "Take care Arthur and Alexandra, come back in one piece.",
                ],
                [
                    new TalkChoiceAction(10, "Start Adventure")
                ]
            );
        } else if (_choiceId === 7) {
            playerSession.knowLocationLowlands = true;
            return new TalkActionResult(
                this,
                [
                    "Eleonor: I think that's not it. Quickpass is a neutral village whom are really kind to all people passing by.",
                    "I took some time thinking about this while you were looking at the map and I think the place you are looking for are the LowLands.",
                    "I won't send you on your own to search for the princess. Take Alexandra with you, she knows a lot about what is happening too",
                    "Take care Arthur and Alexandra, come back in one piece.",
                ],
                [
                    new TalkChoiceAction(10, "Start Adventure")
                ]
                );
        } else if (_choiceId === 8) {
            return new TextActionResult([
                "Eleonor: You'll have to go to the Lowlands, it is in the bottom left of the province Kaseon.",
                "Make hurry because we have no time to spare!",
            ]);
        } else if (_choiceId === 9) {
            return new TextActionResult(["Eleonor: Good luck Arthur and Alexandra."]);
        } else if (_choiceId === 10) {
            playerSession.gold += 10;
            return new TextActionResult([
                "Eleonor: Here is some gold to help you around, take good care of yourself.",
                "*You recieved 10 gold and a steel sword*",
            ]);
        }

        let choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "There were a few bandits in the croud that took her."),
            new TalkChoiceAction(2, "I have got no clue."),
            new TalkChoiceAction(3, "Bye!"),
        ];

        if (playerSession.inventory.includes(RingItemAlias)) {
            choiceActions.push(new TalkChoiceAction(4, "I have found a ring."));
        }

        if (playerSession.knowLocationLowlands === true) {
            choiceActions = [
                new TalkChoiceAction(8, "So where do i need to go again?"),
                new TalkChoiceAction(9, "Sorry for bothering, I'm going on my way!"),
            ];
            return new TalkActionResult(this, ["Eleonor: You need something?"], choiceActions);
        }

        if (playerSession.knowWhereMapIs === true) {
            choiceActions = [
                new TalkChoiceAction(5, "We need to go to the cave in the bottom left of the map"),
                new TalkChoiceAction(6, "We need to go to Volo's village"),
                new TalkChoiceAction(7, "We need to go to Quickpass"),
            ];

            return new TalkActionResult(this, ["Eleonor: Where do we need to go to Arthur?"], choiceActions);
        }

        return new TalkActionResult(
            this,
            ["Eleonor: Please, how could this have happened..."],
            choiceActions
        );
    }
}
