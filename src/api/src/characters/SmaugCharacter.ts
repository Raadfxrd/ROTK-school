import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkActionAlias, TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { deathRoom } from "../rooms/Deathroom";
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
        return new TextActionResult([
            "Smaug: Ancient and formidable, this colossal dragon is a sight to behold. With scales gleaming like molten gold and eyes that burn with intelligence, he guards his vast treasure hoard within the Lonely Mountain. Cunning and ruthless, he speaks with a sly tongue, toying with those who dare to challenge him. Beware, for crossing paths with Smaug is to face the epitome of greed and power.",
        ]);
    }
    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (_choiceId === 1) {
            playerSession.healthPoints -= 100;

            if (playerSession.healthPoints <= 0) {
                const room: deathRoom = new deathRoom();

                playerSession.currentRoom = room.alias;
                return room.examine();
            }

            return new TextActionResult(["Lol i did damage"]);
        }
        return new TalkActionResult(this, ["hello"], [new TalkChoiceAction(1, "damage")]);
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, TalkActionAlias];
    }
}
