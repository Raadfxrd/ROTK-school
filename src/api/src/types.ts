export type PlayerSession = {
    currentRoom: string;
    lastRoom: string;
    inventory: string[];
    knowWhereMapIs: boolean;
    wentNorth: boolean;
    knowLocationLowlands: boolean;
    horseMission30: boolean;
    horseMission20: boolean;
    horseMission10: boolean;
    gold: number;
    knowsOfKara: boolean;
    summonedKara: boolean;
    blessing: boolean;
    shownRing: boolean;
    shownRingBadEnding: boolean;
    inStables: boolean;
    inGate: boolean;
};
