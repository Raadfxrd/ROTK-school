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
        const x: number = Math.floor(Math.random() * 3) + 5;
        return x;
    }

    public createArrayOfNumbers(start: number, end: number): Array<number> {
        const myArray: Array<number> = [];

        for (let i: number = start; i <= end; i++) {
            myArray.push(i);
        }
        return myArray;
    }

    // public numbersArray: Array<number> = this.createArrayOfNumbers(5, 7);
    // public randomIndex: number = this.getRandomNumber(0, this.numbersArray.length - 1);

    // public riddlesAnsweredArray: Array<number> = this.createArrayOfNumbers(1, 3);
    // public randomIndex2: number = this.getRandomNumber(0, this.riddlesAnsweredArray.length - 1);

    //choiceid = randomnumber
    // een continue knop na de question waar de choiceid wordt bepaald voor welke het wordt

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        // if (this.riddlesAnsweredArray.length === 0) {
        //     return new TalkActionResult(this, ["Enough"], [new TalkChoiceAction(60, "bet")]);
        // }
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
                [new TalkChoiceAction(5, "Very well.")]
            );
        }
        if (choiceId === 4) {
            return new TalkActionResult(
                this,
                ["Word spreads quick and I have ears and eyes in many places."],
                [new TalkChoiceAction(5, "Very well.")]
            );
        }
        if (choiceId === 5 && !this.numbersArray.includes(5)) {
            const index: number = this.numbersArray.indexOf(5);
            const numbersUsedArray: number[] = [];

            // numbersUsedArray.push(this.numbersArray.splice(index, 1));

            //this.numbersArray.splice(index, 1);
            console.log(this.numbersArray);
            return new TalkActionResult(
                this,
                [
                    "In Spring I am gay in handsome array in summer more clothing I wear when colder it grows.",
                    "I fling off my clothes and in winter quite naked appear.",
                    "What am I.",
                ],
                [
                    new TalkChoiceAction(40, "A tree"), // correct answer
                    new TalkChoiceAction(50, "A goat"),
                    new TalkChoiceAction(50, "A mountain"),
                ]
            );
        }

        if (choiceId === 6 && !this.numbersArray.includes(6)) {
            const index: number = this.numbersArray.indexOf(6);
            this.numbersArray.splice(index, 1);
            console.log(this.numbersArray);
            return new TalkActionResult(
                this,
                [
                    "Some try to hide, some try to cheat, but time will show, we always will meet.",
                    "Try as you might to guess my name, I promise you'll know when you I do claim",
                ],
                [
                    new TalkChoiceAction(50, "Destiny"),
                    new TalkChoiceAction(50, "Time"),
                    new TalkChoiceAction(40, "Death"), // correct answer
                ]
            );
        }

        if (choiceId === 7 && !this.numbersArray.includes(7)) {
            const index: number = this.numbersArray.indexOf(7);
            this.numbersArray.splice(index, 1);
            console.log(this.numbersArray);
            return new TalkActionResult(
                this,
                [
                    "As small as your thumb, I am light in the air.",
                    "You may hear me before you see me, but trust that I'm there",
                ],
                [
                    new TalkChoiceAction(40, "A hummingbird"), // correct answer
                    new TalkChoiceAction(50, "A mosquito"),
                    new TalkChoiceAction(50, "A Bumblebee"),
                ]
            );
        }
        if (choiceId === 40) {
            return new TalkActionResult(
                this,
                ["You are correct human, another"],
                [new TalkChoiceAction(100, "Alright")]
            );
        }

        if (choiceId === 50) {
            this.riddlesAnsweredArray.splice(0, 1);
            console.log(this.numbersArray);
            console.log(this.randomIndex);
            console.log(this.riddlesAnsweredArray);
            return new TalkActionResult(
                this,
                ["Incorrect, another"],
                [new TalkChoiceAction(this.randomIndex, "Very well")]
            );
        }

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
