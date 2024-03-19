import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { AlexandraCharacter } from "../characters/AlexandraCharacter";
import { CharlesCharacter } from "../characters/CharlesCharacter";
import { EleonorCharacter } from "../characters/EleonorCharacter";
import { HenryCharacter } from "../characters/HenryCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { RingItem, RingItemAlias } from "../items/RingItem";
import { MapItem, MapItemAlias } from "../items/MapItem";
import { PlayerSession } from "../types";
import { WolburgRoom } from "./WolburgRoom";

export const ThroneRoomAlias: string = "throne-room";

export class ThroneRoom extends Room {
    public picture?: string;

    public constructor() {
        super(ThroneRoomAlias);
    }
    public name(): string {
        return "Throne Room";
    }

    public images(): string[] {
        return ["rooms/throneroomentrance.png"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        const actions: Action[] = [
            new ExamineAction(),
            new TalkAction(),
            new PickupAction(),
            new CustomAction("inventory", "Inventory", false),
        ];

        if (playerSession.knowLocationLowlands === true) {
            actions.push(new CustomAction("wolburg", "Go Outside", false));
        }

        return actions;
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(RingItemAlias)) {
            objects.push(new RingItem());
        }

        if (!playerSession.inventory.includes(MapItemAlias) && playerSession.knowWhereMapIs === true) {
            objects.push(new MapItem());
        }

        objects.push(
            new HenryCharacter(),
            new EleonorCharacter(),
            new AlexandraCharacter(),
            new CharlesCharacter()
        );
        return objects;
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.inventory.includes(RingItemAlias)) {
            return new TextActionResult([
                "The throne room of Wolburg in castle Ferdinand.",
                "The people in the Throneroom have been calmed down now.",
                "Besides of the ring laying on the ground before there is nothing more to see here.",
            ]);
        } else {
            return new TextActionResult([
                "You look at the spot where the princess was last seen, There is something shining on the ground.",
                "It looks like a small circular object, maybe from the kidnappers that grabbed the princess.",
            ]);
        }
    }

    public custom(alias: string, _gameObjects?: GameObject[]): TextActionResult | ActionResult | undefined {
        if (alias === "wolburg") {
            const lastroom: ThroneRoom = new ThroneRoom();
            const room: WolburgRoom = new WolburgRoom();

            //Set the current room to the example room
            getPlayerSession().lastRoom = lastroom.alias;
            getPlayerSession().currentRoom = room.alias;
            return room.examine();
        }
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
        return undefined;
    }
    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
