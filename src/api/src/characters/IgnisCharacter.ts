import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const IgnisAlias: string = "Ignis";
export class IgnisCharacter extends Character implements Examine {
    public constructor() {
        super(IgnisAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Ignis";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a smithy working on his crafts."]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TalkActionResult(
                this,
                ["Sure! What are you looking for exactly?"],
                [
                    new TalkChoiceAction(4, "I need armour, can you make this?"),
                    new TalkChoiceAction(5, "Do you have any weaponry?"),
                ]
            );
        }
        if (_choiceId === 2) {
            return new TextActionResult(["Is the princess missing! That's terrible!"]);
        }
        if (_choiceId === 3) {
            return new TextActionResult(["hmmm, I don't think you are ready for my methods yet..."]);
        }
        if (_choiceId === 4) {
            return new TextActionResult([
                "Yes, this is my specialty. I will make you a strong piece of armor made out off the most durable piece of iron.",
            ]);
        }
        if (_choiceId === 5) {
            return new TalkActionResult(
                this,
                [
                    "Yes, I make some of the sharpest blades in the region and my Axes are well known for their destructive capabilities. What will it be?",
                ],
                [
                    new TalkChoiceAction(6, "Make me a sword"),
                    new TalkChoiceAction(7, "Make me a battle-Axe"),
                    new TalkChoiceAction(8, "Make me a mace"),
                ]
            );
        }
        if (_choiceId === 6) {
            return new TextActionResult(["Alright, here you go.<hands over sword>"]);
        }
        if (_choiceId === 7) {
            return new TextActionResult(["That should do it!<hands over battle-axe>"]);
        }
        if (_choiceId === 8) {
            return new TextActionResult(["Sure...<hands over mace>"]);
        }

        return new TalkActionResult(
            this,
            ["G'day Sir. What brings you to my workplace?"],
            [
                new TalkChoiceAction(1, "I am here to aquire better equipment."),
                new TalkChoiceAction(2, "Do you know anything about the missing princess?"),
                new TalkChoiceAction(3, "Can you teach me something about forging weapons?"),
            ]
        );
    }
}
