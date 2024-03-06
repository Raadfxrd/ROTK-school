import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { GameObject } from "../base/gameObjects/GameObject";
import { Action } from "../base/actions/Action";
import { NavigationBlacksmith, NavigationNorth } from "../actions/NavigateAction";
import { getPlayerSession } from "../instances";
import { KarasValeBlacksmithRoom } from "./KarasValeBlacksmithRoom";
import { ExamineAction } from "../base/actions/ExamineAction";

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
        return [new ExamineAction(), new NavigationNorth(), new NavigationBlacksmith()];
    }

    public objects(): GameObject[] {
        return [this];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "NavigateNorth") {
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

        return undefined;
    }
}
