import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { VolosVillageRoom } from "./VolosVillageRoom";

export const StartupRoomAlias: string = "startup-room";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Realm of the Kings";
    }

    public images(): string[] {
        return ["rooms/ROTK.png"];
    }

    public actions(): Action[] {
        return [new CustomAction("start-game", "Start Game", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Welcome to our game, Realm of the Kings."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "start-game") {
            const room: VolosVillageRoom = new VolosVillageRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }

        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
