import { CustomAction } from "../base/actions/CustomAction";
import { Action } from "../base/actions/Action";

export const NavigateNorthAlias: string = "NavigateNorth";
export const NavigateEastAlias: string = "NavigateEast";
export const NavigateSouthAlias: string = "NavigateSouth";
export const NavigateWestAlias: string = "NavigateWest";

// class om naar het noorden te navigeren
export class NavigationNorth extends Action {
    public constructor() {
        super(NavigateNorthAlias, "Go North", false);
    }

    public NavigationNorth(): Action[] {
        return [new CustomAction("NavigateNorth", "Go North", false)];
    }
}

// class om naar het oosten te navigeren
export class NavigationEast extends Action {
    public constructor() {
        super(NavigateEastAlias, "Go East", false);
    }

    public NavigationEast(): Action[] {
        return [new CustomAction("NavigateEast", "Go East", false)];
    }
}

// class om naar het zuiden te navigeren
export class NavigationSouth extends Action {
    public constructor() {
        super(NavigateSouthAlias, "Go South", false);
    }

    public NavigationSouth(): Action[] {
        return [new CustomAction("NavigateSouth", "Go South", false)];
    }
}

// class om naar het westen te navigeren
export class NavigationWest extends Action {
    public constructor() {
        super(NavigateWestAlias, "Go West", false);
    }

    public NavigationWest(): Action[] {
        return [new CustomAction("NavigateWest", "Go West", false)];
    }
}
