import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { LowlandsTorch } from "../items/LowlandsTorchItem";
import { DarkTreesSwitcher } from "../items/DarkTreesSwitcher";
import { TunnelSwitcher } from "../items/TunnelSwitcher";
import { PickupAction } from "../actions/PickupAction";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";
import { NavigationActionAlias } from "../actions/NavigationAction";

export const LowLandsRoomAlias: string = "lowlands-room";
let picture: string = "lowlands";

export class LowLandsRoom extends Room {
    public constructor() {
        super("lowlands-room", NavigationActionAlias);
    }

    public name(): string {
        return "LowLands";
    }

    public images(): string[] {
        return [picture];
    }

    public actions(): Action[] {
        return [
            new CustomAction("inventory", "Inventory", false),
            new ExamineAction(),
            new PickupAction(),
            new CustomAction("go-back", "Go back", false),
        ];
    }

    public objects(): GameObject[] {
        return [this, new LowlandsTorch(), new DarkTreesSwitcher(), new TunnelSwitcher()];
    }

    public examine = (): ActionResult | undefined => {
        picture = "rooms/lowlands.png";
        return new TextActionResult([
            "You are in the LowLands.",
            "The trees are dark and the air is heavy.",
            "You can see a small tunnel in the middle.",
            "You can see a torch on the ground a bit further away.",
        ]);
    };

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
        const lastroom: LowLandsRoom = new LowLandsRoom();
        const room: KarasValeTownSquareRoom = new KarasValeTownSquareRoom();

        //Set the current room to the example room
        getPlayerSession().lastRoom = lastroom.alias;
        getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public navigation(): ActionResult | undefined {
        const room: LowLandsRoom = new LowLandsRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }
    public objectActions(): string[] {
        if (getPlayerSession().currentRoom === LowLandsRoomAlias) {
            return [ExamineActionAlias];
        }
        return [NavigationActionAlias];
    }
}
