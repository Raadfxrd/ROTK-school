import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { deathRoom } from "../rooms/deathRoom";
import { PlayerSession } from "../types";

export const SmaugAlias: string = "Smaug";
export class SmaugCharacter extends Character implements Examine {
    public constructor() {
        super(SmaugAlias, ExamineActionAlias);
    }
    public name(): string {
        return "Smaug";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Smaug: Ancient and formidable, this colossal dragon is a sight to behold. With scales gleaming like molten gold and eyes that burn with intelligence, he guards his vast treasure hoard within the Lonely Mountain. Cunning and ruthless, he speaks with a sly tongue, toying with those who dare to challenge him. Beware, for crossing paths with Smaug is to face the epitome of greed and power.",
        ]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (_choiceId === 5) {
            return new TalkActionResult(
                this,
                [
                    "How quaint... Very well, little one. If you seek to challenge me, then prepare yourself for a battle unlike any you have ever faced.",
                ],
                [new TalkChoiceAction(1, "<Attack Smaug>")]
            );
        }

        if (_choiceId === 4) {
            return new TalkActionResult(
                this,
                [
                    "Bold words, indeed. But tell me, are you here to challenge me, or simply to admire the magnificence of a true king under the mountain?",
                ],
                [new TalkChoiceAction(5, " I am here to free the princess, whatever the cost!")]
            );
        }

        if (_choiceId === 3) {
            return new TalkActionResult(
                this,
                [
                    "Ah, the princess... So she sent you, did she? Tell me, little one, do you truly believe you can rescue her from my grasp?",
                ],
                [new TalkChoiceAction(4, " I believe in doing what is right, no matter the odds.")]
            );
        }

        if (_choiceId === 2) {
            return new TalkActionResult(
                this,
                [
                    "(Interrupting )Ah, do not trouble yourself with words, little one. Your presence here speaks volumes. Tell me, have you come seeking fortune? Or perhaps you are foolish enough to believe you can challenge me?",
                ],
                [
                    new TalkChoiceAction(
                        3,
                        "I have not come for treasure, nor for a battle. I... I seek the princess who was taken captive."
                    ),
                ]
            );
        }

        if (_choiceId === 1) {
            playerSession.healthPoints -= 10;

            if (playerSession.healthPoints <= 0) {
                const room: deathRoom = new deathRoom();

                playerSession.currentRoom = room.alias;
                return room.examine();
            }

            return new TextActionResult(["Then prepare to suffer the consequences of your arrogance!"]);
        }
        return new TalkActionResult(
            this,
            [
                "Well, well, well... What do we have here? Another insignificant creature daring to venture into my domain?",
            ],
            [new TalkChoiceAction(1, "<Insult Smaug>"), new TalkChoiceAction(2, "I-I...")]
        );
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
