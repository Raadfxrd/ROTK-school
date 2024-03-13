import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const RonaldoCharacteralias: string = "ronaldo";

export class RonaldoCharacter extends Character implements Examine {
    public constructor() {
        super(RonaldoCharacteralias, ExamineActionAlias);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.taylorlikesRonaldo === true) {
            return new TextActionResult(["SUIIII taylor likes me now! Il tell drake to give u the award."]);
        }
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                [
                    "Yeah lil susybakka. listen, i want taylor swift to like me. But everytime i suii she flys away.",
                    "If u make her like me, then i shall see what i can do for u",
                ],
                [
                    new TalkChoiceAction(
                        2,
                        "Bro why taylor. anyways its yo life. sure, do u know what she likes?"
                    ),
                    new TalkChoiceAction(3, "I think i know how to get taylor to like u. Il be back at ya"),
                ]
            );
        } else if (choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "Yeah, i think she likes aviation. she always talks about flying here and there. even when a short distance",
                ],
                [new TalkChoiceAction(4, "thanks! I think i know how to make taylor like u!")]
            );
        } else if (choiceId === 4) {
            playerSession.ronaldoIntro = true;
            return new TextActionResult(["I trust you"]);
        }
        return new TalkActionResult(
            this,
            ["SUIIIIIIIII, may i ask who u are? Did drake let u in? Such a sussy baka..."],
            [new TalkChoiceAction(1, "Yeah, he sent me. He said u need some sort of help correct? ")]
        );
    }

    public name(): string {
        return "ronaldo";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["He is indeed very aerodynamic. Interesting."]);
    }
}
