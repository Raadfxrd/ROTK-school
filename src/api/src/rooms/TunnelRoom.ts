import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { LowLandsRoom } from "./LowLandsRoom";
import { TunnelWallItem } from "../items/TunnelWallItem";

export const TunnelRoomAlias: string = "tunnel-room";
let picture: string = "tunnel";

export class TunnelRoom extends Room {
    public constructor() {
        super("tunnel-room");
    }

    public name(): string {
        return "A dark tunnel";
    }

    public images(): string[] {
        return [picture];
    }

    public actions(): Action[] {
        return [
            new CustomAction("inventory", "Inventory", false),
            new ExamineAction(),
            new CustomAction("go-back", "Go back", false),
        ];
    }

    public objects(): GameObject[] {
        return [this, new TunnelWallItem()];
    }

    public examine(): ActionResult | undefined {
        picture = "rooms/tunnel.png";
        return new TextActionResult([
            "The tunnel stretches into darkness, promising neither safety nor comfort.",
            "It is a place of mystery and danger.",
            "You try going inside the tunnel, but there is a mysterious force stopping you.",
            "You should try finding a light source before venturing into the unknown.",
        ]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "inventory") {
            const playerSession: PlayerSession = getPlayerSession();
            const gameobject: GameObject[] = getGameObjectsFromInventory();
            const gameObjectArray: any[] = [];
            for (let i: number = 0; i < gameobject.length; i++) {
                gameObjectArray.push(gameobject[i].name());
            }
            gameObjectArray.push("Gold amount: " + playerSession.gold);
            return new TextActionResult(gameObjectArray);
        }
        if (alias === "go-back") {
            const lastroom: TunnelRoom = new TunnelRoom();
            const room: LowLandsRoom = new LowLandsRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        return undefined;
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
