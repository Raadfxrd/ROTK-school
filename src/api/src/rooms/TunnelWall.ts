import { useItemAction } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { Examine, ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession, getGameObjectsFromInventory } from "../instances";
import { PlayerSession } from "../types";
import { TunnelRoom } from "./TunnelRoom";

export const TunnelWallAlias: string = "tunnel-wall";

export class TunnelWall extends Room implements Examine {
    public constructor() {
        super(TunnelWallAlias, ExamineActionAlias);
    }

    public name(): string {
        return "The wall of the tunnel";
    }

    public images(): string[] {
        const pictures: string[] = getPlayerSession().torchesGathered;
        return pictures;
    }

    public actions(): Action[] {
        return [
            new CustomAction("inventory", "Inventory", false),
            new ExamineAction(),
            new useItemAction(),
            new CustomAction("go-back", "Go back", false),
        ];
    }

    public objects(): GameObject[] {
        return [this, ...getGameObjectsFromInventory()];
    }

    public examine(): ActionResult | undefined {
        return undefined;
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
            const lastroom: TunnelWall = new TunnelWall();
            const room: TunnelRoom = new TunnelRoom();

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

    // if (playerSession.inventory.includes(ShadowbeakTorchAlias)) {
    //     return new TextAndImageActionResult(
    //         [
    //             "You place in the torch that belongs to the Shadowbeak Wilds.",
    //             "The torch flickers, casting shadows on the wall of the tunnel.",
    //             "You hear a strange noise...",
    //         ],
    //         ["rooms/tunnel-wall.png", "items/TorchPlainsOnWall.png"]
    //     );
    // }
}
