import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Character } from "../base/gameObjects/Character";

export const AureliusCharacterAlias: string = "Aurelius";

export class AureliusCharacter extends Character implements Examine {
    public constructor() {
        super(AureliusCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Village elder Aurelius";
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return undefined;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "It's a fragile old man.",
            "He matches the aesthetic of the town due to the fact that they both look like they could topple over at any second.",
        ]);
    }
}
