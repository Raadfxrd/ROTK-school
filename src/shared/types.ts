export type GameState = {
    smaugHP: number;
    playerHP: number;
    roomAlias: string;
    roomTitle: string;
    roomImages: string[];
    text: string[];
    actions: ActionReference[];
    objects: GameObjectReference[];
};

export type GameObjectReference = {
    alias: string;
    name: string;
    actions: string[];
};

export type ActionReference = {
    alias: string;
    label: string;
    needsObject: boolean;
};

export type PerformActionRequest = {
    action: string;
    objects?: string[];
};
