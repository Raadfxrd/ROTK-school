import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { GameObject } from "../base/gameObjects/GameObject";
import { Action } from "../base/actions/Action";
import { NavigationBlacksmith, NavigationNorth, NavigationSouth } from "../actions/NavigateAction";
import { getPlayerSession } from "../instances";
import { KarasValeBlacksmithRoom } from "./KarasValeBlacksmithRoom";
import { ExamineAction } from "../base/actions/ExamineAction";
import { PlayerSession } from "../types";

export const KarasValeTownSquareRoomAlias: string = "KVTownSquare";

export class KarasValeTownSquareRoom extends Room {
    public constructor() {
        super(KarasValeTownSquareRoomAlias);
    }

    public name(): string {
        return "Kara's Vale";
    }

    public images(): string[] {
        return ["KVTownSquare1"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.wentNorth === true) {
            return [new NavigationBlacksmith(), new NavigationSouth()];
        }
        return [new ExamineAction(), new NavigationNorth()];
    }

    public objects(): GameObject[] {
        return [this];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
    }

    public playerSession: PlayerSession = getPlayerSession();
    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "NavigateNorth") {
            this.playerSession.wentNorth = true;

            return new TextActionResult([
                "You move to the center of the town, and see there is a small tavern and a blacksmith.",
            ]);
        }

        if (alias === "KVBlacksmith") {
            const room: KarasValeBlacksmithRoom = new KarasValeBlacksmithRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "NavigateSouth") {
            this.playerSession.wentNorth = false;
            return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
        }
        return undefined;
    }
}
