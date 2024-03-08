import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { KVFallenTreesItem } from "../items/KVFallenTreeItem";
import { KVForestItem } from "../items/KVForestItem";

export const KarasValeForestRoomAlias: string = "KVForest";

export class KarasValeForestRoom extends Room {
    public constructor() {
        super(KarasValeForestRoomAlias);
    }
    public name(): string {
        return "Kara's Forest";
    }

    public images(): string[] {
        return ["rooms/noKara.png"];
    }

    public actions(): Action[] {
        return [new ExamineAction()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are standing in a forest"]);
    }
    public objects(): GameObject[] {
        return [new KVFallenTreesItem(), new KVForestItem()];
    }
}
