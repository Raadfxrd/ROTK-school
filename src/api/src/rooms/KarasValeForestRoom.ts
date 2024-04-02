import { NavigationAction, NavigationActionAlias } from "../actions/NavigationAction";
import { PickupAction } from "../actions/PickupAction";
import { useItemAction } from "../actions/UseItemAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { KaraCharacter } from "../characters/KaraCharacter";
import { getPlayerSession } from "../instances";
import { firstMedallionHalf } from "../items/FirstMedallionHalfItem";
import { KVFallenTreesItem } from "../items/KVFallenTreeItem";
import { KVForestItem } from "../items/KVForestItem";
import { KaraWhistleItem } from "../items/KaraWhistleItem";
import { KarasTorch } from "../items/KarasValeTorchItem";
import { PlayerSession } from "../types";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";
import { VolosVillageRoom } from "./VolosVillageRoom";

export const KarasValeForestRoomAlias: string = "KVForest-room";

export class KarasValeForestRoom extends Room {
    public constructor() {
        super(KarasValeForestRoomAlias, NavigationActionAlias);
    }

    public PlayerSession: PlayerSession = getPlayerSession();

    public name(): string {
        return "Kara's Forest";
    }

    public images(): string[] {
        if (this.PlayerSession.summonedKara === true) {
            return ["rooms/Kara.png"];
        }
        return ["rooms/noKara.png"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new useItemAction(),
            new TalkAction(),
            new NavigationAction(),
            new PickupAction(),
        ];
    }

    public navigation(): ActionResult | undefined {
        const room: KarasValeForestRoom = new KarasValeForestRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are standing in a forest."]);
    }

    public objects(): GameObject[] {
        if (
            this.PlayerSession.earnedBlueTorch === true &&
            this.PlayerSession.summonedKara === true &&
            this.PlayerSession.firstMedallionHalf === true
        ) {
            return [
                new KVFallenTreesItem(),
                new KVForestItem(),
                new KaraWhistleItem(),
                new KaraCharacter(),
                new KarasValeTownSquareRoom(),
                new VolosVillageRoom(),
                new KarasTorch(),
                new firstMedallionHalf(),
            ];
        }

        if (this.PlayerSession.earnedBlueTorch === true && this.PlayerSession.summonedKara === true) {
            return [
                new KVFallenTreesItem(),
                new KVForestItem(),
                new KaraWhistleItem(),
                new KaraCharacter(),
                new KarasValeTownSquareRoom(),
                new VolosVillageRoom(),
                new KarasTorch(),
            ];
        }
        if (this.PlayerSession.summonedKara === true) {
            return [
                new KVFallenTreesItem(),
                new KVForestItem(),
                new KaraWhistleItem(),
                new KaraCharacter(),
                new KarasValeTownSquareRoom(),
            ];
        }

        return [
            new KVFallenTreesItem(),
            new KVForestItem(),
            new KaraWhistleItem(),
            new KarasValeTownSquareRoom(),
            new VolosVillageRoom(),
        ];
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "NavigateEast") {
            const room: KarasValeTownSquareRoom = new KarasValeTownSquareRoom();

            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "NavigateVolo") {
            const room: VolosVillageRoom = new VolosVillageRoom();

            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        return undefined;
    }

    public objectActions(): string[] {
        if (this.PlayerSession.currentRoom === KarasValeForestRoomAlias) {
            return [ExamineActionAlias];
        }
        return [NavigationActionAlias];
    }
}
