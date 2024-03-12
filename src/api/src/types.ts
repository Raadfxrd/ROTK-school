export type PlayerSession = {
    currentRoom: string;
    lastRoom: string;
    inventory: string[];
    knowWhereMapIs: boolean;
    image: string;
    wentNorth: boolean;
    knowLocationLowlands: boolean;
    gold: number;
};
