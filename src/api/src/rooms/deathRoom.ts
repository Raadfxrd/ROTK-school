import { PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { SmaugRoom } from "./SmaugRoom";
import { StartupRoom } from "./StartupRoom";

export const DeathAlias: string = "death-room";
export class deathRoom extends Room {
    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
    public constructor() {
        super(DeathAlias);
    }
    public name(): string {
        return "Death";
    }
    public images(): string[] {
        return [];
    }
    public objects(): GameObject[] {
        return [];
    }
    public actions(): Action[] {
        return [new CustomAction("RestartAlias", "Restart", false)];
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You have died..."]);
    }
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "RestartAlias") {
            const playerSession: PlayerSession = getPlayerSession();
            playerSession.healthPoints = 100;
            const lastroom: SmaugRoom = new SmaugRoom();
            const room: StartupRoom = new StartupRoom();
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine;
        }
        return undefined;
    }
}
