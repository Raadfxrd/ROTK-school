import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
export const Taylorcharacteralias: string = "taylor";
export class Taylorcharacter extends Character implements Examine {
    public constructor() {
        super(Taylorcharacteralias, ExamineActionAlias);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (choiceId === 1) {
            return new TalkAndImageActionResult(
                this,
                ["What is it?"],
                [playerSession.image, "character/pixelgirl.png"],

                [new TalkChoiceAction(4, "Its about Edwin, I hope u know what he is doing in this village.")]
            );
        }
        if (choiceId === 100) {
            return new TextActionResult([playerSession.image, "pixelgirl.png"]);
        }
        if (choiceId === 2) {
            new TextActionResult(["Okay... Il talk to him one last time"]);
        }
        if (choiceId === 4 && playerSession.edwinBusted === true) {
            return new TalkAndImageActionResult(
                this,
                ["Do you have proof? He is super nice to me.. i cant believe it."],
                [playerSession.image, "character/pixelgirl.png"],

                [new TalkChoiceAction(20, "I actually have. He is busted as an illegal weapontrader")]
            );
        }
        if (choiceId === 4) {
            return new TalkAndImageActionResult(
                this,
                ["Do you have proof? He is super nice to me.. i cant believe it."],
                [playerSession.image, "character/pixelgirl.png"],

                [new TalkChoiceAction(5, "I will get you proof. But trust me")]
            );
        }

        if (choiceId === 20) {
            return new TalkAndImageActionResult(
                this,
                ["Oh gosh... was he lying to me all this time."],
                [playerSession.image, "character/pixelgirl.png"],

                [new TalkChoiceAction(21, "Yeah he actually was! Ronaldo knew what bad person he was..")]
            );
        }
        if (choiceId === 21) {
            playerSession.taylorlikesRonaldo = true;
            return new TextActionResult([
                "Oh gosh... that means he also lied about Ronaldo! I have to talk to him..",
            ]);
        }
        if (choiceId === 3) {
            //if statement voor gold
            playerSession.taylorlikesRonaldo = true;
            return new TextActionResult(["Deal"]);
        }
        if (playerSession.edwinHint === true) {
            return new TalkAndImageActionResult(
                this,
                ["Hi there, how can i help you"],
                [playerSession.image, "character/pixelgirl.png"],
                [
                    new TalkChoiceAction(1, "Hello, I have to talk about something with you"),
                    new TalkChoiceAction(
                        3,
                        "I have a proposal...U made ronaldo really sad.. Can u date him, I'll pay you.(50 gold) "
                    ),
                    new TalkChoiceAction(100, "bye"),
                ]
            );
        }
        if (playerSession.ronaldoGotRose === true) {
            return new TalkAndImageActionResult(
                this,
                ["Hi there, how can i help you"],
                [playerSession.image, "character/pixelgirl.png"],
                [
                    new TalkChoiceAction(
                        2,
                        "I want you to talk to ronaldo again, he wants to give u something"
                    ),
                    new TalkChoiceAction(
                        3,
                        "I have a proposal...U made ronaldo really sad.. Can u date him, I'll pay you.(50 gold) "
                    ),
                    new TalkChoiceAction(100, "bye"),
                ]
            );
        }

        return new TalkAndImageActionResult(
            this,
            ["Hi there, how can i help you"],
            [playerSession.image, "character/pixelgirl.png"],
            [
                new TalkChoiceAction(
                    3,
                    "I have a proposal...U made ronaldo really sad.. Can u date him, I'll pay you. (50 gold)"
                ),
                new TalkChoiceAction(100, "bye"),
            ]
        );
    }

    public name(): string {
        return "taylor";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["U see a woman who looks like she likes to fly inside airplanes"]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
    public image(): string[] {
        return [""];
    }
}
