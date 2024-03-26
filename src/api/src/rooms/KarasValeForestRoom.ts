import { NavigateToVolosVillage, NavigationEast } from "../actions/NavigateAction";
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
import { KVFallenTreesItem } from "../items/KVFallenTreeItem";
import { KVForestItem } from "../items/KVForestItem";
import { KaraWhistleItem } from "../items/KaraWhistleItem";
import { PlayerSession } from "../types";
import { KarasValeTownSquareRoom } from "./KarasValeTownSquareRoom";
import { VolosVillageRoom } from "./VolosVillageRoom";

export const KarasValeForestRoomAlias: string = "KVForest";

export class KarasValeForestRoom extends Room {
    public constructor() {
        super(KarasValeForestRoomAlias);
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
            new NavigationEast(),
            new NavigateToVolosVillage(),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are standing in a forest"]);
    }

    public objects(): GameObject[] {
        if (this.PlayerSession.summonedKara === true) {
            return [new KVFallenTreesItem(), new KVForestItem(), new KaraWhistleItem(), new KaraCharacter()];
        }
        return [new KVFallenTreesItem(), new KVForestItem(), new KaraWhistleItem()];
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
        return [ExamineActionAlias];
    }
}
