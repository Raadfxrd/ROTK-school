import { ActionResult } from "../base/actionResults/ActionResult";
import { Character } from "../base/gameObjects/Character";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
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
                [new TalkChoiceAction(3, "There were some bandits! And they just took the princess.")]
            );
        } else if (choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "U won't pass until i say so! If u want to enter the lowlands u shall first do something for me.",
                    "The guardian of the village Ronaldo, He has a problem with his wife and wont cooperate untl he is happy again. Can you talk to him?",
                ],
                [new TalkChoiceAction(7, "Alright..")]
            );
        } else if (choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "This is tragic... If u want to enter the lowlands u shall first do something for me.",
                    "The guardian of the village Ronaldo, He has a problem with his lover and wont cooperate untl he is happy again. Can you talk to him?",
                ],
                [new TalkChoiceAction(7, "Yeah sure, I will see what i can do.")]
            );
        } else if (choiceId === 7) {
            playerSession.drakeIntro = true;
            return new TextActionResult([
                "Alright, Ronaldo is a generous man when he is happy. He will reward u with the same kindness for helping him",
            ]);
        }
        return new TalkActionResult(
            this,
            ["Greetings traveler.. What brings u to Volo's village?"],
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
        return new TextActionResult(["There is a person near the gate. It appears he is the village chief"]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
