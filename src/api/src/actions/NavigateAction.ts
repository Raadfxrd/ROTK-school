import { Action } from "../base/actions/Action";

export const NavigateNorthAlias: string = "NavigateNorth";
export const NavigateEastAlias: string = "NavigateEast";
export const NavigateSouthAlias: string = "NavigateSouth";
export const NavigateWestAlias: string = "NavigateWest";
export const NavigateBlacksmithAlias: string = "KVBlacksmith";
export const NavigateTownSquareAlias: string = "KVTownSquare";
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

export class NavigationTownSquare extends Action {
    public constructor() {
        super(NavigateTownSquareAlias, "Town Square", false);
    }
}
