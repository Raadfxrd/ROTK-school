import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const KaraCharacterAlias: string = "KaraCharacter";

export class KaraCharacter extends Character {
    public constructor() {
        super(KaraCharacterAlias);
    }

    public name(): string {
        return "Kara";
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 10) {
            return new TextActionResult([""]);
        }
        return new TalkActionResult(this, ["fakka niffo"], [new TalkChoiceAction(10, "bye!")]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
