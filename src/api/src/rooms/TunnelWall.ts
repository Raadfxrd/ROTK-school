import { useItemAction } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { Examine, ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession, getGameObjectsFromInventory } from "../instances";
import { PlayerSession } from "../types";
import { SmaugRoom } from "./SmaugRoom";
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
            new CustomAction("final", "Final challenge", false),
        ];
    }

    public objects(): GameObject[] {
        return [this, ...getGameObjectsFromInventory()];
    }

    public examine(): ActionResult | undefined {
        if (
            getPlayerSession().torchesGathered.includes("items/TorchLowlandsOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchShadowBeakOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchKarasValeOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchShopOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchVolosVillageOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchThroneOnWall.png")
        ) {
            return new TextAndImageActionResult(
                ["You placed all torches on the wall. You can continue to the your final challenge."],
                ["items/tunnel-wall-complete.png"]
            );
        } else {
            return new TextActionResult([
                "You see a wall in the tunnel. It is made of stone and looks very sturdy.",
                "You can see some holsters on the wall.",
            ]);
        }
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

            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
        if (
            getPlayerSession().torchesGathered.includes("items/TorchLowlandsOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchShadowBeakOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchKarasValeOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchShopOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchVolosVillageOnWall.png") &&
            getPlayerSession().torchesGathered.includes("items/TorchThroneOnWall.png") &&
            alias === "final"
        ) {
            const lastroom: TunnelWall = new TunnelWall();
            const room: SmaugRoom = new SmaugRoom();

            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        } else {
            return new TextActionResult([
                "You can't go there yet.",
                "You need to place all torches on the wall first.",
            ]);
        }
        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
