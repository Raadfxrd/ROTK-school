import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

function generateRandomNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
}
export const BobCharacterAlias: string = "Bob";

export class BobCharacter extends Character implements Examine {
    public constructor() {
        super(BobCharacterAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Bob";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a friendly bartender."]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        if (_choiceId === 1) {
            return new TextActionResult(["<Gives beer> There you go."]);
        }
        if (_choiceId === 2) {
            const number: number = generateRandomNumber();
            return new TextActionResult([
                "<Hands over keys> Yes, ofcourse! You have room number " + number + ".",
            ]);
        }
        if (_choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "The town is a melting pot of diverse cultures and races, as travelers from distant lands are drawn to the promises of both prosperity and enlightenment. The people of Ravens Rest are known for their craftsmanship, creating intricate tapestries, ornate weaponry, and mystical artifacts that fetch high prices in the markets of distant realms.",
                ],
                [
                    new TalkChoiceAction(4, "Ask about Ravens Rest's origin"),
                    new TalkChoiceAction(5, "Who is Eldred Stormraven?"),
                ]
            );
        }
        if (_choiceId === 4) {
            return new TextActionResult([
                "Ravens Rest was founded centuries ago by a group of nomadic tribes seeking refuge from the chaos of war and the encroaching darkness that threatened the northern lands. They were Led by a wise and visionary leader named Eldred Stormraven. Eldred, guided by an ancient prophecy, believed that Ravens Rest was destined to play a crucial role in the fate of the realm.",
            ]);
        }
        if (_choiceId === 5) {
            return new TextActionResult([
                "Eldred Stormraven is a wise and visionary leader who knows ancient and forgotten knowledge about the realm. If you wish to know more you should meet him. Though be carefull as he can be  a bit grumpy",
            ]);
        }

        return new TalkActionResult(
            this,
            ["Hello, what can I help you with? A drink perhaps?"],
            [
                new TalkChoiceAction(1, "Can I buy a beer?"),
                new TalkChoiceAction(2, "Can I sleep here?"),
                new TalkChoiceAction(3, "Ask about Ravens Rest"),
            ]
        );
    }

    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
