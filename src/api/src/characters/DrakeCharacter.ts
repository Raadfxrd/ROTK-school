import { ActionResult } from "../base/actionResults/ActionResult";
import { Character } from "../base/gameObjects/Character";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAndImageActionResult } from "../base/actionResults/TalkAndImageActionResult";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { PlayerSession } from "../types";
import { getPlayerSession } from "../instances";
import { VolosTorchAlias } from "../items/VolosVillageTorchItem";

export const DrakecharacterAlias: string = "drake";

export class Drakecharacter extends Character implements Examine {
    public constructor() {
        super(DrakecharacterAlias, ExamineActionAlias);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.taylorlikesRonaldo === true) {
            playerSession.inventory.push(VolosTorchAlias);
            playerSession.secondMedalionHalf = true;
            return new TextActionResult([
                "I have never seen ronaldo so happy before... U deserve this, i dont know what it is for but its a torch. here u go :) *acquired a torch*",
            ]);
        }
        if (choiceId === 1) {
            return new TalkAndImageActionResult(
                this,
                ["The princess is kidnapped?! NO... How did it happen?? "],
                [playerSession.image, "character/drakee.png"],
                [new TalkChoiceAction(3, "There were some bandits! And they just took the princess.")]
            );
        } else if (choiceId === 2) {
            return new TalkAndImageActionResult(
                this,
                [
                    "Not so fast! If u want to enter the lowlands u shall first do something for me.",
                    "The guardian of the village Ronaldo, He is struggling with his love and wont listen untl he is happy again. Can you help him?",
                ],
                [playerSession.image, "character/drakee.png"],
                [new TalkChoiceAction(7, "Alright..")]
            );
        } else if (choiceId === 3) {
            return new TalkAndImageActionResult(
                this,
                [
                    "This is tragic... If u want to enter the lowlands u shall first do something for me.",
                    "The guardian of the village Ronaldo, He has a problem with his lover and wont cooperate untl he is happy again. Can you talk to him?",
                ],
                [playerSession.image, "character/drakee.png"],
                [new TalkChoiceAction(7, "Yeah sure, I will see what i can do.")]
            );
        } else if (choiceId === 7) {
            playerSession.drakeIntro = true;
            return new TextActionResult([
                "Alright, Ronaldo is a generous man when he is happy. He will reward u with the same kindness for helping him",
            ]);
        }
        return new TalkAndImageActionResult(
            this,
            ["Greetings traveler.. What brings u to Volo's village?"],
            [playerSession.image, "character/drakee.png"],
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
