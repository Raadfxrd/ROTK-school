import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";
import { GameObject } from "../base/gameObjects/GameObject";
import { Action } from "../base/actions/Action";
import {
    NavigateBackToWolburg,
    NavigateShopRoomAlias,
    NavigateToLowlandsFromKV,
    NavigationBlacksmith,
    NavigationNorth,
    NavigationShop,
    NavigationSouth,
    NavigationWest,
} from "../actions/NavigateAction";
import { getPlayerSession } from "../instances";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { PlayerSession } from "../types";
import { AureliusCharacter } from "../characters/AureliusCharacter";
import { TalkAction } from "../base/actions/TalkAction";
import { KarasValeForestRoom } from "./KarasValeForestRoom";
import { KaraWhistleItem } from "../items/KaraWhistleItem";
import { useItemAction } from "../actions/UseItemAction";
import { BlackSmithRoom } from "./BlacksmithRoom";
import { WolburgRoom } from "./WolburgRoom";
import { ShopRoom } from "./ShopRoom";
import { LowLandsRoom } from "./LowLandsRoom";

export const KarasValeTownSquareRoomAlias: string = "KVTownSquare";

export class KarasValeTownSquareRoom extends Room {
    public constructor() {
        super(KarasValeTownSquareRoomAlias);
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
            console.log(this.playerSession);
            return [
                new ExamineAction(),
                new TalkAction(),
                new NavigationBlacksmith(),
                new NavigationShop(),
                new NavigationSouth(),
                new NavigationWest(),
                new useItemAction(),
                new NavigateToLowlandsFromKV(),
            ];
        }
        if (this.playerSession.wentNorth === true) {
            return [
                new ExamineAction(),
                new TalkAction(),
                new NavigationBlacksmith(),
                new NavigationShop(),
                new NavigationSouth(),
            ];
        }

        return [new NavigationNorth(), new NavigateBackToWolburg()];
    }

    public objects(): GameObject[] {
        if (this.playerSession.hasWhistle === true) {
            return [new AureliusCharacter(), new KaraWhistleItem()];
        }
        return [new AureliusCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "NavigateNorth") {
            this.playerSession.wentNorth = true;

            return new TextActionResult([
                "You move to the center of the town, and see there is a small tavern and a blacksmith.",
                "There is also someone sitting on a bench.",
            ]);
        }

        if (alias === NavigateShopRoomAlias) {
            const room: ShopRoom = new ShopRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        if (alias === "BlackSmith-room") {
            const room: BlackSmithRoom = new BlackSmithRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "NavigateSouth") {
            this.playerSession.wentNorth = false;
            return new TextActionResult(["In front of you is a small town named Kara's Vale."]);
        }

        if (alias === "NavigateWest") {
            const room: KarasValeForestRoom = new KarasValeForestRoom();

            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        if (alias === "BackToWolburg") {
            const room: WolburgRoom = new WolburgRoom();

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
        return [ExamineActionAlias];
    }
}
