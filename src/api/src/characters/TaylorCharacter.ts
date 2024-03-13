import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
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
                ["I do know him. I wonder if he has a private jet.."],
                [new TalkChoiceAction(4, "He has actually")]
            );
        }
        if (choiceId === 4) {
            playerSession.taylorlikesRonaldo = true;
            return new TalkActionResult(
                this,
                ["omg really!? I want to date him!!"],
                [new TalkChoiceAction(5, "yeah he likes u too apperantly. Nice!")]
            );
        }
        if (choiceId === 3) {
            playerSession.taylorlikesRonaldo = true;
            return new TextActionResult(["Deal"]);
        }
        if (choiceId === 2) {
            playerSession.taylorlikesRonaldo = true;
            new TalkActionResult(
                this,
                ["No way!! I want to date him <3"],
                [new TalkChoiceAction(1, "yeah his jet go sui!")]
            );
        }
        return new TalkActionResult(
            this,
            ["Hi there. u look baked. how can i help you? "],
            [
                new TalkChoiceAction(1, "Do u know ronaldo?"),
                new TalkChoiceAction(2, "Did u know ronaldo has a private jet?"),
                new TalkChoiceAction(3, "If u date ronaldo, i will give u money to fly"),
            ]
        );
    }

    public name(): string {
        return "taylorswift";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["U see a woman who looks like she likes to fly inside airplanes"]);
    }
}
