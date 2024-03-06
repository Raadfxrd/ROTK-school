import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { RingItemAlias } from "../items/RingItem";
import { PlayerSession } from "../types";

export const AlexandraAlias: string = "Alexandra-character";

export class AlexandraCharacter extends Character implements Examine {
    public constructor() {
        super(AlexandraAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Alexandra";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "A young woman, the only woman in the kingsguard. Known for her good deeds that she has done",
            "She kind of reminds you of yourself. She has the same characteristics as you have",
        ]);
    }

    public talk(_choiceId?: number): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (_choiceId === 1) {
            return new TextActionResult([
                "Alexandra: Those bandits are the worst. I heard some rumours about them being here and took caution.",
                "The first thing I have seen was some people in the crowd making hand signals to eachother.",
                "I took some time and remembered what there code meant. 'she is coming, we need to go now'",
                "Hope we can find the princess soon...",
            ]);
        } else if (_choiceId === 2) {
            return new TextActionResult([
                "Alexandra: If you find something interesting let us know, we keep the crowd in check for now and keep the rest save.",
            ]);
        } else if (_choiceId === 3) {
            playerSession.knowWhereMapIs = true;
            return new TextActionResult([
                "Alexandra: I have seen this sigil somewhere, where was it again...",
                "Let me think about this for a minute. You can ask the king in the meantime",
            ]);
        } else if (_choiceId === 4) {
            return new TextActionResult(["Alexandra: So what is it where we need to go to?"]);
        } else if (_choiceId === 5) {
            return new TextActionResult(["Alexandra: You need to look where the bandits have gone too."]);
        } else if (_choiceId === 6) {
            return new TextActionResult(["Alexandra: Let me know if you know it!"]);
        }

        let choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "There were a few bandits in the croud that took her."),
            new TalkChoiceAction(2, "I'm going to take a look"),
        ];

        if (playerSession.inventory.includes(RingItemAlias)) {
            choiceActions.push(new TalkChoiceAction(3, "I have found a ring."));
        }

        if (playerSession.knowWhereMapIs === true) {
            choiceActions = [
                new TalkChoiceAction(4, "I have found a map and I think where we need to go"),
                new TalkChoiceAction(5, "Where do I need to look for?"),
                new TalkChoiceAction(6, "I'm looking further into the map"),
            ];
            return new TalkActionResult(
                this,
                [
                    "Alexandra: Hey I know what it was again, I heard some stories of this.",
                    "It is widely known as a great mystery and not many people know about this.",
                    "Besides this i don't know much more sorry. But you wanted to say something?",
                ],
                choiceActions
            );
        }
        return new TalkActionResult(this, ["Alexandra: Hey you there, you found something?"], choiceActions);
    }
}
