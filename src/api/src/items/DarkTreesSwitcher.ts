import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { DarkTreesRoom } from "../rooms/DarkTreesRoom";
import { LowLandsRoom } from "../rooms/LowLandsRoom";

export const DarkTreesSwitcherAlias: string = "DarkTrees";

export class DarkTreesSwitcher extends Item implements Examine {
    public constructor() {
        super(DarkTreesSwitcherAlias, ExamineActionAlias);
    }

    public name(): string {
        return "A cluster of ominious trees";
    }

    public examine(): ActionResult | undefined {
        const lastroom: LowLandsRoom = new LowLandsRoom();
        const room: DarkTreesRoom = new DarkTreesRoom();

        //Set the current room to the example room
        getPlayerSession().lastRoom = lastroom.alias;
        getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
