import { ActionResult } from "../base/actionResults/ActionResult";
import { TextAndImageActionResult } from "../base/actionResults/TextAndImageActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";
import { LowlandsTorchAlias } from "./LowlandsTorchItem";
import { ChurchTorchAlias } from "./ThroneRoomTorchItem";
import { VolosTorchAlias } from "./VolosVillageTorchItem";
import { ShopTorchAlias } from "./ShopTorchItem";

export const TunnelWallItemAlias: string = "Tunnel";

export class TunnelWallItem extends Item implements Examine {
    public constructor() {
        super(TunnelWallItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "The wall of the tunnel";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (
            // playerSession.inventory.includes(ShadowbeakTorchAlias) &&
            // playerSession.inventory.includes(KarasTorchAlias) &&
            playerSession.inventory.includes(VolosTorchAlias) &&
            playerSession.inventory.includes(ChurchTorchAlias) &&
            playerSession.inventory.includes(ShopTorchAlias) &&
            playerSession.inventory.includes(LowlandsTorchAlias)
        ) {
            return new TextAndImageActionResult(
                [
                    "You place in the torches that belong to the different regions.",
                    "The torches flicker, casting shadows on the wall of the tunnel.",
                    "You can finally pass through the tunnel.",
                ],
                ["items/tunnel-wall-complete.png"]
            );
        }
        if (playerSession.inventory.includes(LowlandsTorchAlias)) {
            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to the LowLands.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchLowlandsOnWall.png"]
            );
        }
        if (playerSession.inventory.includes(ShopTorchAlias)) {
            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to the Shop.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchShopOnWall.png"]
            );
        }
        if (playerSession.inventory.includes(ChurchTorchAlias)) {
            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to Wolburg.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchDesertOnWall.png"]
            );
        }
        if (playerSession.inventory.includes(VolosTorchAlias)) {
            return new TextAndImageActionResult(
                [
                    "You place in the torch that belongs to Volo.",
                    "The torch flickers, casting shadows on the wall of the tunnel.",
                    "You hear a strange noise...",
                ],
                ["rooms/tunnel-wall.png", "items/TorchForestOnWall.png"]
            );
        }
        // if (playerSession.inventory.includes(KarasTorchAlias)) {
        //     return new TextAndImageActionResult(
        //         [
        //             "You place in the torch that belongs to Kara.",
        //             "The torch flickers, casting shadows on the wall of the tunnel.",
        //             "You hear a strange noise...",
        //         ],
        //         ["rooms/tunnel-wall.png", "items/TorchMountainsOnWall.png"]
        //     );
        // }
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

        if (!playerSession.inventory.includes(LowlandsTorchAlias)) {
            return new TextAndImageActionResult(
                [
                    "The walls of the tunnel are made of stone and are covered in moss.",
                    "They are cold to the touch and the air is damp and musty. The tunnel seems to go on forever.",
                    "There is holsters on the wall, it seems like it was used to hold torches.",
                    "Maybe this means that there is a way to pass...",
                ],
                ["rooms/tunnel-wall.png"]
            );
        }
        return undefined;
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
