import { Action } from "../base/actions/Action";

export const NavigateNorthAlias: string = "NavigateNorth";
export const NavigateBackToWolburgAlias: string = "BackToWolburg";
export const NavigateEastAlias: string = "NavigateEast";
export const NavigateSouthAlias: string = "NavigateSouth";
export const NavigateWestAlias: string = "NavigateWest";
export const NavigateBlacksmithAlias: string = "BlackSmith-room";
export const NavigateShopRoomAlias: string = "ShopRoom";
export const NavigateTownSquareAlias: string = "KVTownSquare";
export const EnterVoloAlias: string = "EnterVolo";
export const LeaveVoloAlias: string = "LeaveVolo";
export const NavigateToVolosVillageAlias: string = "NavigateVolo";
// class om naar het volo te navigeren
export class EnterVolo extends Action {
    public constructor() {
        super(EnterVoloAlias, "Enter Volo", false);
    }
}
//class om weg van volo te navigeren
export class LeaveVolo extends Action {
    public constructor() {
        super(LeaveVoloAlias, "Leave Volo", false);
    }
}

export const NavigateStablesWolburgAlias: string = "WStables";
export const NavigateBackAlias: string = "Back";
// class om naar het noorden te navigeren
export class NavigationNorth extends Action {
    public constructor() {
        super(NavigateNorthAlias, "Go North", false);
    }
}

// class om naar het oosten te navigeren
export class NavigationEast extends Action {
    public constructor() {
        super(NavigateEastAlias, "Go East", false);
    }
}

// class om naar het zuiden te navigeren
export class NavigationSouth extends Action {
    public constructor() {
        super(NavigateSouthAlias, "Go South", false);
    }
}

// class om naar het westen te navigeren
export class NavigationWest extends Action {
    public constructor() {
        super(NavigateWestAlias, "Go West", false);
    }
}

// class om naar de algemene blacksmith kamers te navigeren

export class NavigationBlacksmith extends Action {
    public constructor() {
        super(NavigateBlacksmithAlias, "Blacksmith", false);
    }
}
export class NavigateBackToWolburg extends Action {
    public constructor() {
        super(NavigateBackToWolburgAlias, "Back To Wolburg", false);
    }
}
export class NavigationShop extends Action {
    public constructor() {
        super(NavigateShopRoomAlias, "ShopRoom", false);
    }
}
export class Back extends Action {
    public constructor() {
        super(NavigateBackAlias, "Back", false);
    }
}

export class NavigationTownSquare extends Action {
    public constructor() {
        super(NavigateTownSquareAlias, "Town Square", false);
    }
}

// class om naar het oosten te navigeren
export class NavigationStablesWolburg extends Action {
    public constructor() {
        super(NavigateStablesWolburgAlias, "Stables", false);
    }
}

// class om terug naar wolburg te navigeren vanaf kara's vale
export class NavigateToWolburg extends Action {
    public constructor() {
        super(NavigateBackToWolburgAlias, "Wolburg", false);
    }
}

export class NavigateToVolosVillage extends Action {
    public constructor() {
        super(NavigateToVolosVillageAlias, "Volo's village", false);
    }
}
