import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const EdwinCharacterAlias: string = "edwin";

export class EdwinCharacter extends Character implements Examine {
    public constructor() {
        super(ExamineActionAlias);
    }
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if (choiceId === 1) {
            new TalkActionResult(
                this,
                ["Ah it was easy!, I just tell her a bunch of lies about hero story's"],
                [new TalkChoiceAction(3, "Ah u a sneaky one haha.")]
            );
        } else if (choiceId === 2) {
            new TalkActionResult(
                this,
                [
                    "Ah i see you are interested.. Go to the shop. I trade under herbs but they are actually illegal weapons.",
                ],
                [new TalkChoiceAction(4, "I see, il go there!")]
            );
        }
        return new TalkActionResult(
            this,
            ["U look new here, what u want?"],
            [
                new TalkChoiceAction(1, "I see u got Taylor as yours! How did u do it hehe?"),
                new TalkChoiceAction(2, "I heared u deal inside illegal trading? Im interested"),
            ]
        );
    }
    public name(): string {
        return "Edwin";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["A person that doesnt have a trustable look."]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
