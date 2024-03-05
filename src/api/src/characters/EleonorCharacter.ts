import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
import { PlayerSession } from "../types";

export const eleonorAlias: string = "Eleonor-character";

export class EleonorCharacter extends Character implements Examine {
    public constructor() {
        super(eleonorAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Eleonor";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The great king Eleonor, Grandson of founder of the castle Ferdinand. ",
            "He won a lot of important battles to keep the peace in the realm. He looks a bit older than on the pictures",
            "He looks if he is fearing the worst for his daughter, Eleonora",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (_choiceId === 1) {
            return new TextActionResult([
                "Eleonor: How? I thought you were here to protect her",
                "Find out how this has happened and return to me if you know more",
            ]);
        } else if (_choiceId === 2) {
            return new TextActionResult([
                "Eleonor: Please, I don't want anything bad happen to her. Let me know if you find something",
            ]);
        } else if (_choiceId === 3) {
            return new TextActionResult(["Eleonor: Please, let me know if you have something..."]);
        } else if (_choiceId === 4) {
            playerSession.knowWhereMapIs = true;
            return new TextActionResult([
                "Eleonor: This ingraved cave reminds me of something, something i have not seen in a while...",
                "Maybe you can find something on the map. it is on the right side of the entrance.",
            ]);
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "There were a few bandits in the croud that took her."),
            new TalkChoiceAction(2, "I have got no clue."),
            new TalkChoiceAction(3, "Bye!"),
        ];

        if (playerSession.inventory.includes(RingItemAlias)) {
            choiceActions.push(new TalkChoiceAction(4, "I have found a ring."));
        }
        return new TalkActionResult(
            this,
            ["Eleonor: Please, how could this have happened..."],
            choiceActions
        );
    }
}
