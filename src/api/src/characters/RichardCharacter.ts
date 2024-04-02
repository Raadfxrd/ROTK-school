import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const RichardCharacterAlias: string = "richard-character";

export class RichardCharacter extends Character implements Examine {
    public constructor() {
        super(RichardCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Richard";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const richardImage: string = "characters/Richard.png";
        return new TextAndImageActionResult(
            [
                "Richard looks like a man that is in total shock. Why is he in shock?",
                "Maybe the bandits just came through and pushed him aside.",
                "He looks like a normal person thats just living a normal life.",
            ],
            [playerSession.image, richardImage]
        );
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const richardImage: string = "characters/Richard.png";
        if (_choiceId === 1) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: Those maggots, they were running away and pushed me aside."],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(3, "What do they look like?"),
                    new TalkChoiceAction(4, "Did they have someone with them?"),
                ]
            );
        } else if (_choiceId === 2) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: The princess? what happened to her? She was going to be Queen innit?"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(9, "She just got kidnapped from her crowning"),
                    new TalkChoiceAction(7, "She dissapeared"),
                    new TalkChoiceAction(8, "I don't know either, I'm looking for her"),
                ]
            );
        } else if (_choiceId === 3) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Richard: Couldn't really take a good look, they were just really fast and hasty.",
                    "For me they just looked like normal peasants.",
                ],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(5, "Where were they headed?"),
                    new TalkChoiceAction(6, "Thanks, i'll go look further"),
                ]
            );
        } else if (_choiceId === 4) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: I indeed saw someone taken but didn't think much of it"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(5, "Where were they headed"),
                    new TalkChoiceAction(6, "Thanks i'll go look further"),
                ]
            );
        } else if (_choiceId === 5) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: They were going to the stables where all the commotion is now."],
                [playerSession.image, richardImage],
                [new TalkChoiceAction(6, "Thanks, that's all i needed")]
            );
        } else if (_choiceId === 6) {
            return new TextActionResult(["Good luck going after them."]);
        } else if (_choiceId === 7) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: How? She can't just have dissapeared."],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(8, "I can't give you more information"),
                    new TalkChoiceAction(9, "She got kidnapped"),
                ]
            );
        } else if (_choiceId === 8) {
            return new TextActionResult(["Alright lad, good look finding her."]);
        } else if (_choiceId === 9) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: By who?"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(10, "We are trying to figure that out"),
                    new TalkChoiceAction(11, "By some bandits"),
                    new TalkChoiceAction(5, "By those people running away!"),
                ]
            );
        } else if (_choiceId === 10) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: Figure it out quickly because she is our queen!"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(5, "We think the people running away were it"),
                    new TalkChoiceAction(14, "Can you help me then?"),
                    new TalkChoiceAction(6, "I will!"),
                ]
            );
        } else if (_choiceId === 11) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: Bandits? They are here in town?"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(12, "Apparently yeah"),
                    new TalkChoiceAction(5, "I think it was the people running away!"),
                ]
            );
        } else if (_choiceId === 12) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: Thats not great, take them down will ya"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(13, "Have you seen something strange lately?"),
                    new TalkChoiceAction(6, "I will!"),
                ]
            );
        } else if (_choiceId === 13) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: Well besides those people running not much"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(5, "Where were they headed?"),
                    new TalkChoiceAction(6, "We'll go after them"),
                ]
            );
        } else if (_choiceId === 14) {
            return new TalkAndImageActionResult(
                this,
                ["Richard: Alrighty son, What can i do?"],
                [playerSession.image, richardImage],
                [
                    new TalkChoiceAction(5, "Where did the people go to?"),
                    new TalkChoiceAction(3, "What do the people look like?"),
                    new TalkChoiceAction(4, "Did they have someone with them?"),
                ]
            );
        } else if (_choiceId === 99) {
            return new TextActionResult(["Richard: Bye stranger."]);
        }

        return new TalkAndImageActionResult(
            this,
            [
                "Richard: Those bloody maggots, what are they on about...",
                "Top o' the morning to ya, didn't see ya standing there.",
            ],
            [playerSession.image, richardImage],
            [
                new TalkChoiceAction(1, "Who were you talking about?"),
                new TalkChoiceAction(2, "Have you seen the princess?"),
                new TalkChoiceAction(99, "Bye!"),
            ]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
