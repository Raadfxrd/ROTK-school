import { ActionResult } from "../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { TunnelRoom } from "../rooms/TunnelRoom";
import { LowLandsRoom } from "../rooms/LowLandsRoom";

export const TunnelSwitcherAlias: string = "TunnelSwitcher";

export class TunnelSwitcher extends Item implements Examine {
    public constructor() {
        super(TunnelSwitcherAlias, ExamineActionAlias);
    }

    public name(): string {
        return "A dark tunnel";
    }

    public examine(): ActionResult | undefined {
        const lastroom: LowLandsRoom = new LowLandsRoom();
        const room: TunnelRoom = new TunnelRoom();

        //Set the current room to the example room
        getPlayerSession().lastRoom = lastroom.alias;
        getPlayerSession().currentRoom = room.alias;
        return room.examine();
    }

    public objectActions(): string[] {
        return [ExamineActionAlias];
    }
}
