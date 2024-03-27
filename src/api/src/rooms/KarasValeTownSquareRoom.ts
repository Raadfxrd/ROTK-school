import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { GameObject } from "../base/gameObjects/GameObject";
import { Action } from "../base/actions/Action";
import { NavigateBackToWolburg, NavigationNorth } from "../actions/NavigateAction";
import { getPlayerSession } from "../instances";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { PlayerSession } from "../types";
import { AureliusCharacter } from "../characters/AureliusCharacter";
import { TalkAction } from "../base/actions/TalkAction";
import { KarasValeForestRoom } from "./KarasValeForestRoom";
import { KaraWhistleItem } from "../items/KaraWhistleItem";
import { useItemAction } from "../actions/UseItemAction";
import { BlackSmithRoom } from "./BlacksmithRoom";
import { ShopRoom } from "./ShopRoom";
import { LowLandsRoom } from "./LowLandsRoom";
import { NavigationAction, NavigationActionAlias } from "../actions/NavigationAction";
import { GateWolburgRoom } from "./GateWolburgRoom";
import { JainaCharacter } from "../characters/JainaCharacter";

export const KarasValeTownSquareRoomAlias: string = "KVTownSquare";

export class KarasValeTownSquareRoom extends Room {
    public constructor() {
        super(KarasValeTownSquareRoomAlias, NavigationActionAlias);
    }
    public playerSession: PlayerSession = getPlayerSession();

    public name(): string {
        return "Kara's Vale";
    }

    public images(): string[] {
        return ["rooms/KVTownSquare.png"];
    }

    public actions(): Action[] {
        if (this.playerSession.knowsOfKara === true && this.playerSession.wentNorth === true) {
            return [new ExamineAction(), new TalkAction(), new useItemAction(), new NavigationAction()];
        }
        if (this.playerSession.wentNorth === true) {
            return [new ExamineAction(), new TalkAction(), new NavigationAction()];
        }

        return [new NavigationNorth(), new NavigateBackToWolburg()];
    }

    public objects(): GameObject[] {
        if (this.playerSession.hasWhistle === true) {
            return [
                // new NavigateToLowlandsFromKV(),
                new AureliusCharacter(),
                new KaraWhistleItem(),
                new JainaCharacter(),
                new BlackSmithRoom(),
                new ShopRoom(),
                new KarasValeForestRoom(),
            ];
        }
        return [new AureliusCharacter(), new JainaCharacter(), new BlackSmithRoom(), new ShopRoom()];
    }

    public navigation(): ActionResult | undefined {
        const room: KarasValeTownSquareRoom = new KarasValeTownSquareRoom();
        const lastroom: string = getPlayerSession().currentRoom;

        //Set the current room to the example room
        getPlayerSession().currentRoom = room.alias;
        getPlayerSession().lastRoom = lastroom;

        return room.examine();
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "NavigateNorth") {
            this.playerSession.wentNorth = true;

            return new TextActionResult([
                "You move to the center of the town, and see there is a small shop and a blacksmith.",
                "There is also someone sitting on a bench.",
            ]);
        }

        if (alias === "NavigateSouth") {
            this.playerSession.wentNorth = false;
            return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
        }

        if (alias === "BackToWolburg") {
            const room: GateWolburgRoom = new GateWolburgRoom();

            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "NavigateLowLands") {
            const room: LowLandsRoom = new LowLandsRoom();

            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        return undefined;
    }

    public objectActions(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.currentRoom === KarasValeTownSquareRoomAlias) {
            return [ExamineActionAlias];
        }
        return [NavigationActionAlias];
    }
}
