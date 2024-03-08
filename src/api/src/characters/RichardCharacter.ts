import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const RichardCharacterAlias: string = "richard-character";

export class RichardCharacter extends Character implements Examine {
    public constructor() {
        super(RichardCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Richard";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Richard looks like a man that is in total shock. Why is he in shock?",
            "Maybe the bandits just came through and pushed him aside.",
            "He looks like a normal person thats just living a normal life.",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TalkActionResult(
                this,
                ["Richard: Those maggots, they were running away and pushed me aside."],
                [
                    new TalkChoiceAction(3, "What do they look like"),
                    new TalkChoiceAction(4, "Did they have someone with them?"),
                ]
            );
        } else if (_choiceId === 2) {
            return new TalkActionResult(
                this,
                ["Richard: The princess? what happened to her? She was going to be Queen innit?"],
                [
                    new TalkChoiceAction(9, "She just got kidnapped from her crowning"),
                    new TalkChoiceAction(7, "She dissapeared"),
                    new TalkChoiceAction(8, "I don't know either, I'm looking for her"),
                ]
            );
        } else if (_choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "Couldn't really take a good look, they were just really fast and hasty.",
                    "for me they just looked like normal peasants",
                ],
                [
                    new TalkChoiceAction(5, "Where were they headed?"),
                    new TalkChoiceAction(6, "Thanks, i'll go look further"),
                ]
            );
        } else if (_choiceId === 4) {
            return new TalkActionResult(
                this,
                ["I indeed saw someone taken but didn't think much of it"],
                [
                    new TalkChoiceAction(5, "Where were they headed"),
                    new TalkChoiceAction(6, "Thanks i'll go look further"),
                ]
            );
        } else if (_choiceId === 5) {
            return new TalkActionResult(
                this,
                ["They were going to the stables where all the commition is now."],
                [new TalkChoiceAction(6, "Thanks, that's all i needed")]
            );
        } else if (_choiceId === 6) {
            return new TextActionResult(["Good luck going after them."]);
        } else if (_choiceId === 7) {
            return new TalkActionResult(
                this,
                ["How? She can't just have dissapeared."],
                [
                    new TalkChoiceAction(8, "I can't give you more information"),
                    new TalkChoiceAction(9, "She got kidnapped"),
                ]
            );
        } else if (_choiceId === 8) {
            return new TextActionResult(["Alright lad, good look finding her."]);
        } else if (_choiceId === 9) {
            return new TalkActionResult(
                this,
                ["By who?"],
                [
                    new TalkChoiceAction(10, "We are trying to figure that out"),
                    new TalkChoiceAction(11, "By some bandits"),
                    new TalkChoiceAction(5, "By those people running away!"),
                ]
            );
        } else if (_choiceId === 10) {
            return new TalkActionResult(
                this,
                ["Figure it out quickly because she is our queen!"],
                [
                    new TalkChoiceAction(5, "We think the people running away were it"),
                    new TalkChoiceAction(14, "Can you help me then?"),
                    new TalkChoiceAction(6, "I will!"),
                ]
            );
        } else if (_choiceId === 11) {
            return new TalkActionResult(
                this,
                ["Bandits? They are here in town?"],
                [
                    new TalkChoiceAction(12, "Apparently yeah"),
                    new TalkChoiceAction(5, "I think it were the people running"),
                ]
            );
        } else if (_choiceId === 12) {
            return new TalkActionResult(
                this,
                ["Thats not great, take them down will ya"],
                [
                    new TalkChoiceAction(13, "have you seen something strange lately?"),
                    new TalkChoiceAction(6, "I will!"),
                ]
            );
        } else if (_choiceId === 13) {
            return new TalkActionResult(
                this,
                ["Well besides those people running not much"],
                [
                    new TalkChoiceAction(5, "Where were they headed?"),
                    new TalkChoiceAction(6, "We'll go after them"),
                ]
            );
        } else if (_choiceId === 14) {
            return new TalkActionResult(
                this,
                ["Alrighty son, What can i do?"],
                [
                    new TalkChoiceAction(5, "Where did the people go to?"),
                    new TalkChoiceAction(3, "What do the people look like?"),
                    new TalkChoiceAction(4, "Did they have someone with them?"),
                ]
            );
        } else if (_choiceId === 99) {
            return new TextActionResult(["Bye stranger."]);
        }

        return new TalkActionResult(
            this,
            [
                "Richard: Those bloody maggots, what are they on about...",
                "Top o' the morning to ya, didn't see ya standing there.",
            ],
            [
                new TalkChoiceAction(1, "Who were you talking about?"),
                new TalkChoiceAction(2, "Have you seen the princess?"),
                new TalkChoiceAction(99, "Bye!"),
            ]
        );
    }
}
