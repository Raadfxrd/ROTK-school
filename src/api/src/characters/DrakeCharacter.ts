import { ActionResult } from "../base/actionResults/ActionResult";
import { Character } from "../base/gameObjects/Character";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { PlayerSession } from "../types";
import { getPlayerSession } from "../instances";

export const DrakecharacterAlias: string = "drake";

export class Drakecharacter extends Character implements Examine {
    public constructor() {
        super(DrakecharacterAlias, ExamineActionAlias);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.taylorlikesRonaldo === true) {
            playerSession.secondMedalionHalf = true;
            return new TextActionResult([
                "I have never seen ronaldo so happy before... U deserve this, i dont know what it is for but its a half of some medalion. here u go :) *acquired half of medalion*",
            ]);
        }
        if (choiceId === 1) {
            return new TalkActionResult(
                this,
                ["The princess is kidnapped?! NO... How did it happen?? "],
                [new TalkChoiceAction(3, "There were some bandits! And they just took the princess. :(")]
            );
        } else if (choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "Pipe down sussy bakka, that aint so max wyn of u.If u want to enter the lowlands u shall first do something for me, ul be awarded with the half of some random medalion. Go to ronaldo. Trust",
                ],
                [new TalkChoiceAction(7, "Alright dazeling looking chief.. PIPE DOWN.")]
            );
        } else if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "This is tragic... She was a baddie tho.. If u want to enter the lowlands u shall first do something for me, ul be awarded with the half of some random medalion. Go to ronaldo. Trust.",
                ],
                [new TalkChoiceAction(7, "Thank you drake...")]
            );
        } else if (choiceId === 7) {
            playerSession.drakeIntro = true;
            return new TextActionResult(["Alright, i need ta max wynnnn"]);
        }
        return new TalkActionResult(
            this,
            ["Greetings handsome traveler.. What brings u to Volo's village?"],
            [
                new TalkChoiceAction(1, "Im here on a journey to save the princess"),
                new TalkChoiceAction(2, "leave the smalltalk for later, im here on my way to the lowlands"),
            ]
        );
    }

    public name(): string {
        return "drake";
    }
    public image(): string[] {
        return ["rooms/volodrake.png"];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        console.log(playerSession);

        return new TextActionResult([
            "There is a somewhat zasty looking fella infront of u. It appears he is the village chief",
        ]);
    }
}
