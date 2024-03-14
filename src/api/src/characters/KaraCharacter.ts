import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const KaraCharacterAlias: string = "KaraCharacter";

export class KaraCharacter extends Character implements Examine {
    public constructor() {
        super(KaraCharacterAlias);
    }

    public name(): string {
        return "Kara";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It is a massive crow towering over you. It looks at you with curiosity.",
        ]);
    }

    public getRandomNumber(_min: number, _max: number): number {
        const x: number = Math.floor(Math.random() * 10) + 1;
        return x;
    }

    public createArrayOfNumbers(start: any, end: any): Array<number> {
        const myArray: Array<number> = [];

        for (let i: number = start; i < end; i++) {
            myArray.push(i);
        }
        return myArray;
    }

    public numbersArray: Array<number> = this.createArrayOfNumbers(5, 17);
    public randomIndex: number = this.getRandomNumber(0, this.numbersArray.length - 1);
    //choiceid = randomnumber
    // een continue knop na de question waar de choiceid wordt bepaald voor welke het wordt

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Ah, Aurelius must have told you of my existence.",
                    "Very well, I know of your cause and shall help you.",
                    "But before I give you what you need I will judge you myself.",
                ],
                [
                    new TalkChoiceAction(3, "I am ready for your challenge."),
                    new TalkChoiceAction(4, "How do you know of my quest?"),
                ]
            );
        }

        if (choiceId === 2) {
            return new TalkActionResult(
                this,
                ["Many do, but i deem very few worthy enough to receive it."],
                [new TalkChoiceAction(3, "I am ready for your challenge.")]
            );
        }

        if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "You will answer my riddles.",
                    "If your mind is capable enough i shall share with you what i know of the whereabouts of the princess.",
                ],
                [new TalkChoiceAction(this.randomIndex, "Very well.")]
            );
        }
        if (choiceId === 4) {
            return new TalkActionResult(
                this,
                ["Word spreads quick and I have ears and eyes in many places."],
                [new TalkChoiceAction(this.randomIndex, "Very well.")]
            );
        }
        if (choiceId === 5) {
            this.numbersArray.splice(this.randomIndex, 5);
            return new TalkActionResult(
                this,
                [
                    "In Spring I am gay in handsome array in summer more clothing I wear when colder it grows.",
                    "I fling off my clothes and in winter quite naked appear.",
                    "What am I.",
                ],
                [
                    new TalkChoiceAction(this.randomIndex, "A tree"), // correct answer
                    new TalkChoiceAction(this.randomIndex, "A goat"),
                    new TalkChoiceAction(this.randomIndex, "A mountain"),
                ]
            );
        }

        if (choiceId === 6) {
            this.numbersArray.splice(this.randomIndex, 6);
            return new TalkActionResult(
                this,
                [
                    "Some try to hide, some try to cheat, but time will show, we always will meet.",
                    "Try as you might to guess my name, I promise you'll know when you I do claim",
                ],
                [
                    new TalkChoiceAction(this.randomIndex, "Destiny"),
                    new TalkChoiceAction(this.randomIndex, "Time"),
                    new TalkChoiceAction(this.randomIndex, "Death"), // correct answer
                ]
            );
        }

        if (choiceId === 7) {
            this.numbersArray.splice(this.randomIndex, 7);
            return new TalkActionResult(
                this,
                [
                    "As small as your thumb, I am light in the air.",
                    "You may hear me before you see me, but trust that I'm there",
                ],
                [
                    new TalkChoiceAction(this.randomIndex, "A hummingbird"), // correct answer
                    new TalkChoiceAction(this.randomIndex, "A mosquito"),
                    new TalkChoiceAction(this.randomIndex, "A Bumblebee"),
                ]
            );
        }

        // math.random
        // gebruiken en daarna
        // nummer pushen naar array
        // als het nummer nog een keer getrokken wordt check of het al in de array staat
        if (choiceId === 100) {
            return new TextActionResult([""]);
        }
        return new TalkActionResult(
            this,
            ["For what purpose have you summoned me human?"],
            [
                new TalkChoiceAction(1, "I am on a mission of great importance."),

                new TalkChoiceAction(2, "I seek your wisdom."),

                new TalkChoiceAction(100, "bye!"),
            ]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
