import { Back, NavigateBackAlias } from "../actions/NavigateAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction, ExamineActionAlias } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { KarasValeMapItem } from "../items/KarasValeMapItem";
import { LowlandsMapItem } from "../items/LowLandsMapItem";
import { LowlandsNoNameMapItem } from "../items/LowLandsNoNameMapItem";
import { MountainsMapItem } from "../items/MountainsMapItem";
import { QuickPassMapItem } from "../items/QuickpassMapItem";
import { RavensRestMapItem } from "../items/RavensRestMapItem";
import { SilverCoastMapItem } from "../items/SilverCoastMapItem";
import { VolosVillageMapItem } from "../items/VolosVillageMapItem";
import { WildeWoodMapItem } from "../items/WildeWoodMapItem";
import { WindHollowMapItem } from "../items/WindHollowMapItem";
import { WolburgMapItem } from "../items/WolburgMapItem";
import { PlayerSession } from "../types";

export const MapRoomAlias: string = "map-room";

export class MapRoom extends Room implements Pickup {
    public constructor() {
        super(MapRoomAlias, PickupActionAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Map";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.knowNameLowlands === true) {
            return ["rooms/Kaseon.png"];
        }
        return ["rooms/KaseonNoLowlands.jpg"];
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.inventory.includes(MapRoomAlias)) {
            playerSession.inventory.push(MapRoomAlias);
            return new TextActionResult(["*You picked up the map*"]);
        }
        return undefined;
    }

    public actions(): Action[] {
        return [new ExamineAction(), new Back()];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.knowNameLowlands === true) {
            return [
                this,
                new KarasValeMapItem(),
                new LowlandsMapItem(),
                new MountainsMapItem(),
                new QuickPassMapItem(),
                new RavensRestMapItem(),
                new SilverCoastMapItem(),
                new VolosVillageMapItem(),
                new WildeWoodMapItem(),
                new WindHollowMapItem(),
                new WolburgMapItem(),
            ];
        }
        return [
            this,
            new KarasValeMapItem(),
            new LowlandsNoNameMapItem(),
            new MountainsMapItem(),
            new QuickPassMapItem(),
            new RavensRestMapItem(),
            new SilverCoastMapItem(),
            new VolosVillageMapItem(),
            new WildeWoodMapItem(),
            new WindHollowMapItem(),
            new WolburgMapItem(),
        ];
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const room: MapRoom = new MapRoom();
        const lastroom: string = playerSession.currentRoom;

        playerSession.currentRoom = room.alias;
        playerSession.lastRoom = lastroom;
        return new TextAndImageActionResult(
            [
                "This looks like the map of Kaseon, you see all the different cities and towns in the region",
                "You see that some towns don't have a name included on them",
            ],
            ["rooms/KaseonNoLowlands.jpg"]
        );
    }

    public custom(alias: string, _gameObjects?: GameObject[] | undefined): ActionResult | undefined {
        if (alias === NavigateBackAlias) {
            const playerSession: PlayerSession = getPlayerSession();
            const currentRoom: string = playerSession.currentRoom;
            const lastRoom: string = playerSession.lastRoom;
            playerSession.currentRoom = lastRoom;
            playerSession.lastRoom = currentRoom;
            return new TextActionResult(["*You put the map away*"]);
        }
        return undefined;
    }
    public objectActions(): string[] {
        return [ExamineActionAlias, PickupActionAlias];
    }
}
