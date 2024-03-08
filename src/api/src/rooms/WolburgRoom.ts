import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { AlexandraCharacter } from "../characters/AlexandraCharacter";
import { RichardCharacter } from "../characters/RichardCharacter";
import { getGameObjectsFromInventory} from "../instances";

export const WolburgRoomAlias: string = "wolburg-room";

let image: string ="rooms/WolburgCity.png";
let inStables: boolean = false;

export class WolburgRoom extends Room {
    public constructor() {
        super(WolburgRoomAlias);
    }

    public name(): string {
        return "Wolburg";
    }

    public images(): string[] {
        return [image];
    }

    public actions(): Action[] {
        if (inStables === true) {
            return [new CustomAction("back", "Back", false), new ExamineAction(), new TalkAction()];
        }
        return [new ExamineAction(), new TalkAction(), new CustomAction("stablesAlias", "Stables", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "The City Wolburg, it is really lively out in town. You see some people further at the stable that were in trouble. Maybe another clue?",
            "There are some buildings nearby like houses, a church, a tavern and a blacksmith.",
        ]);
    }

    public objects(): GameObject[] {
        return [this, ...getGameObjectsFromInventory(), new AlexandraCharacter(), new RichardCharacter()];
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "stablesAlias") {
            inStables = true;
            image = "rooms/stableWolburg.png";
        }

        return undefined;
    }
}
