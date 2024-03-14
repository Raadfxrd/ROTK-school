import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { DarkTreeItem } from "../items/DarkTreeItem";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { LowLandsRoom } from "./LowLandsRoom";

export const DarkTreesRoomAlias: string = "darktrees-room";
let picture: string = "darktrees";

export class DarkTreesRoom extends Room {
    public constructor() {
        super("darktrees-room");
    }

    public name(): string {
        return "Ominous Trees";
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
        return [this, new DarkTreeItem()];
    }

    public examine(): ActionResult | undefined {
        picture = "rooms/darktree.png";
        return new TextActionResult([
            "The trees loom ominously, their branches like twisted arms.",
            "You take a closer look at the trees.",
            "The bark is dark and rough, and the leaves are a sickly green.",
            "You feel a shiver run down your spine, yet you can't look away.",
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
            const lastroom: DarkTreesRoom = new DarkTreesRoom();
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
