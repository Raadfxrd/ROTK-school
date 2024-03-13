import { NavigateBlacksmithAlias, NavigationTownSquare } from "../actions/NavigateAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";

export const KarasValeBlacksmithRoomAlias: string = "KVBlacksmith";

export class KarasValeBlacksmithRoom extends Room {
    public constructor() {
        super(KarasValeBlacksmithRoomAlias, NavigateBlacksmithAlias);
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "You are standing in the smithy. The fires of the forge light up the room.",
        ]);
    }
    public images(): string[] {
        return ["rooms/example.png"];
    }
    public name(): string {
        return "Blacksmith";
    }

    public actions(): Action[] {
        return [new NavigationTownSquare()];
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "KVTownSquare") {
            const room: KarasValeTownSquareRoom = new KarasValeTownSquareRoom();

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
