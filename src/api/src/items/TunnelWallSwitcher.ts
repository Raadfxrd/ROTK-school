import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { TunnelRoom } from "../rooms/TunnelRoom";
import { TunnelWall } from "../rooms/TunnelWall";

export const TunnelWallSwitcherAlias: string = "TunnelWallSwitcher";

export class TunnelWallSwitcher extends Item implements Examine {
    public constructor() {
        super(TunnelWallSwitcherAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Piece of a wall in the tunnel";
    }

    public examine(): ActionResult | undefined {
        const lastroom: TunnelRoom = new TunnelRoom();
        const room: TunnelWall = new TunnelWall();

        //Set the current room to the example room
        getPlayerSession().lastRoom = lastroom.alias;
        getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
