import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
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
            return new TalkActionResult(
                this,
                ["What is it?"],
                [
                    new TalkChoiceAction(
                        4,
                        "Its about Edwin, I hope u know what he is doing in this village. He openly bragged about it with me"
                    ),
                ]
            );
        }
        if (choiceId === 2) {
            new TextActionResult(["Okay... Il talk to him one last time"]);
        }
        if (choiceId === 4) {
            return new TalkActionResult(
                this,
                ["Do you have proof? He is super nice to me.. i cant believe it."],
                [new TalkChoiceAction(5, "I will get you proof. But trust me")]
            );
        }
        if (choiceId === 3) {
            playerSession.taylorlikesRonaldo = true;
            return new TextActionResult(["Deal"]);
        }

        return new TalkActionResult(
            this,
            ["Hi there, how can i help you"],
            [
                new TalkChoiceAction(1, "Hello, I have to talk about something with you"),
                new TalkChoiceAction(2, "Hello, I want you to talk with Ronaldo. He has something to give u"),
                new TalkChoiceAction(
                    3,
                    "I have a proposal...U made ronaldo really sad.. Can u date him, I'll pay you. "
                ),
            ]
        );
    }

    public name(): string {
        return "taylorswift";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["U see a woman who looks like she likes to fly inside airplanes"]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
