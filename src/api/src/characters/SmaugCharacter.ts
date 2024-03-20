import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const SmaugAlias: string = "Smaug";
export class SmaugCharacter extends Character implements Examine {
    public constructor() {
        super(SmaugAlias);
    }
    public name(): string {
        return "Smaug";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["its a big dragon"]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (_choiceId === 1) {
            playerSession.healthPoints -= 5;
            return new TextActionResult(["Lol i did damage"]);
        }
        return new TalkActionResult(this, ["hello"], [new TalkChoiceAction(1, "damage")]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
