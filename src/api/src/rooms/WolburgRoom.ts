import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { AlexandraCharacter } from "../characters/AlexandraCharacter";
import { RichardCharacter } from "../characters/RichardCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { ThroneRoom } from "./ThroneRoom";

export const WolburgRoomAlias: string = "wolburg-room";

export class WolburgRoom extends Room {
    public constructor() {
        super(WolburgRoomAlias);
    }

    public name(): string {
        return "Wolburg";
    }

    public images(): string[] {
        return ["rooms/WolburgCity.png"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new PickupAction()];
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
        if (alias === "start-game") {
            const room: ThroneRoom = new ThroneRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        return undefined;
    }
}
