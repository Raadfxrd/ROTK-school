import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
// import { ThroneRoom } from "./ThroneRoom";
import { ThroneRoomTest } from "./ThroneRoomTest";

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Realm of the Kings";
    }

    public images(): string[] {
        return ["ROTK"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
            const room: ThroneRoomTest = new ThroneRoomTest();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}
