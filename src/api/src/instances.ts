import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { AlexandraAlias, AlexandraCharacter } from "./characters/AlexandraCharacter";
import { CharlesAlias, CharlesCharacter } from "./characters/CharlesCharacter";
import { eleonorAlias, EleonorCharacter } from "./characters/EleonorCharacter";
import { Drakecharacter, DrakecharacterAlias } from "./characters/DrakeCharacter";
import { BobCharacter, BobCharacterAlias } from "./characters/BobCharacter";
import { RingItem, RingItemAlias } from "./items/RingItem";
import { KarasValeTownSquareRoom, KarasValeTownSquareRoomAlias } from "./rooms/KarasValeTownSquareRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { LowLandsRoom, LowLandsRoomAlias } from "./rooms/LowLandsRoom";
import { TunnelWallItem, TunnelWallItemAlias } from "./items/TunnelWallItem";
import { ThroneRoom, ThroneRoomAlias } from "./rooms/ThroneRoom";
import { HenryAlias, HenryCharacter } from "./characters/HenryCharacter";
import { LowlandsTorch, LowlandsTorchAlias } from "./items/LowlandsTorchItem";
import { VolosVillageRoom, VolosVillageRoomAlias } from "./rooms/VolosVillageRoom";
import { TavernRoom, TavernRoomAlias } from "./rooms/TavernRoom";
import { PlayerSession } from "./types";
import { DarkTreesSwitcherAlias, DarkTreesSwitcher } from "./items/DarkTreesSwitcher";
import { AureliusCharacter, AureliusCharacterAlias } from "./characters/AureliusCharacter";
import { KarasValeForestRoom, KarasValeForestRoomAlias } from "./rooms/KarasValeForestRoom";
import { KVFallenTreesItem, KVFallenTreesItemAlias } from "./items/KVFallenTreeItem";
import { KVForestItem, KVForestItemAlias } from "./items/KVForestItem";
import { KaraWhistleItem, KaraWhistleItemAlias } from "./items/KaraWhistleItem";
import { MapItem, MapItemAlias } from "./items/MapItem";
import { WolburgRoom, WolburgRoomAlias } from "./rooms/WolburgRoom";
import { RichardCharacter, RichardCharacterAlias } from "./characters/RichardCharacter";
import { BlackSmithRoom, BlacksmithAlias } from "./rooms/BlacksmithRoom";
import { IgnisCharacter, IgnisAlias } from "./characters/IgnisCharacter";
import { SwordItemAlias, SwordItem } from "./items/SwordItem";
import { ShopAlias, ShopRoom } from "./rooms/ShopRoom";
import { BrannAlias, BrannCharacter } from "./characters/BrannCharacter";
import { ArmourItem, ArmourItemAlias } from "./items/ArmourItem";
import { battleAxeItem, battleAxeItemAlias } from "./items/battleAxeItem";
import { maceItem, maceItemAlias } from "./items/maceItem";
import { JohanCharacter, JohanCharacterAlias } from "./characters/JohanCharachter";
import { KaraCharacter, KaraCharacterAlias } from "./characters/KaraCharacter";
import { ChurchWolburgRoom, ChurchWolburgRoomAlias } from "./rooms/ChurchWolburgRoom";
import { ChurchTorch, ChurchTorchAlias } from "./items/ThroneRoomTorchItem";
import { MarkCharacter, MarkCharacterAlias } from "./characters/MarkCharacter";
import { VolosTorch, VolosTorchAlias } from "./items/VolosVillageTorchItem";
import { DarkTreeItemAlias, DarkTreeItem } from "./items/DarkTreeItem";
import { TunnelSwitcherAlias, TunnelSwitcher } from "./items/TunnelSwitcher";
import { DarkTreesRoomAlias, DarkTreesRoom } from "./rooms/DarkTreesRoom";
import { TunnelRoomAlias, TunnelRoom } from "./rooms/TunnelRoom";
import { RonaldoCharacter, RonaldoCharacteralias } from "./characters/RonaldoCharacter";
import { Taylorcharacter, Taylorcharacteralias } from "./characters/TaylorCharacter";
import { secondMedalionHalfItem, secondMedalionHalfItemAlias } from "./items/SecondMedalionHalfItem";
import { EdwinCharacter, EdwinCharacterAlias } from "./characters/EdwinCharacter";
import { HealingPotionAlias, HealingPotionItem } from "./items/HealingPotionItem";
import { HolyBibleAlias, HolyBibleItem } from "./items/HolyBibleItem";
import { SpiderEyeAlias, SpiderEyeItem } from "./items/SpiderEyeItem";
import { MysteriousPaintingAlias, MysteriousPaintingItem } from "./items/MysteriousPaintingItem";
import { JainaCharacter, JainaCharacterAlias } from "./characters/JainaCharacter";
import { IntroRoom, IntroRoomAlias } from "./rooms/IntroRoom";
import {
    ChainmailArmourOfTheGreatItem,
    ChainmailArmourOfTheGreatItemAlias,
} from "./items/ChainmailArmourOfTheGreatItem";
import { SteelSwordItem, SteelSwordItemAlias } from "./items/SteelSwordItem";
import { SwordOfGoodFortuneItem, SwordOfGoodFortuneItemAlias } from "./items/SwordOfGoodFortuneItem";
import { SmaugRoomAlias, SmaugRoom } from "./rooms/SmaugRoom";
import { SmaugAlias, SmaugCharacter } from "./characters/SmaugCharacter";
import { DeathAlias, deathRoom } from "./rooms/Deathroom";
import { princessAlias, princessCharacter } from "./characters/princessCharacter";
import { StablesWolburgRoom, StablesWolburgRoomAlias } from "./rooms/StablesWolburgRoom";
import { GateWolburgRoom, GateWolburgRoomAlias } from "./rooms/GateWolburgRoom";
import { VladimirCharacter, VladimirCharacterAlias } from "./characters/VladimirCharacter";
import { ShopTorch, ShopTorchAlias } from "./items/ShopTorchItem";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        //Room session
        currentRoom: "Volo's-Village",
        lastRoom: "",
        inCombat: false,

        //Inventory session
        inventory: [],
        equipment: [],
        gold: 0,

        //Stats
        healthPoints: 100,
        armourClass: 12,
        strength: 14,

        //enemy stats
        vladimirHP: 20,
        vladimirGone: false,

        //Booleans
        knowWhereMapIs: false,
        wentNorth: false,
        knowsOfKara: false,
        summonedKara: false,
        blessing: false,
        shownRing: false,
        shownRingBadEnding: false,
        drakeIntro: false,
        taylorlikesRonaldo: false,
        ronaldoIntro: false,
        firstMedallionHalf: false,
        secondMedalionHalf: false,
        leftVolo: false,
        inStables: false,
        inGate: false,
        death: false,

        //Missions
        knowLocationLowlands: false,
        horseMission10: false,
        horseMission20: false,
        horseMission30: false,
        hasWhistle: false,
        riddlesAnswered: [],
        correctAnswers: [],
        wrongAnswers: [],
        allRiddles: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        edwinHint: false,
        edwinBusted: false,
        roseAcquired: false,
        ronaldoGotRose: false,
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case KarasValeTownSquareRoomAlias:
            return new KarasValeTownSquareRoom();

        case LowLandsRoomAlias:
            return new LowLandsRoom();

        case ThroneRoomAlias:
            return new ThroneRoom();

        case KarasValeForestRoomAlias:
            return new KarasValeForestRoom();

        case VolosVillageRoomAlias:
            return new VolosVillageRoom();

        case TavernRoomAlias:
            return new TavernRoom();

        case WolburgRoomAlias:
            return new WolburgRoom();

        case BlacksmithAlias:
            return new BlackSmithRoom();

        case ShopAlias:
            return new ShopRoom();

        case ChurchWolburgRoomAlias:
            return new ChurchWolburgRoom();

        case DarkTreesRoomAlias:
            return new DarkTreesRoom();

        case TunnelRoomAlias:
            return new TunnelRoom();

        case IntroRoomAlias:
            return new IntroRoom();

        case SmaugRoomAlias:
            return new SmaugRoom();
        case DeathAlias:
            return new deathRoom();

        case StablesWolburgRoomAlias:
            return new StablesWolburgRoom();

        case GateWolburgRoomAlias:
            return new GateWolburgRoom();
    }

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        case DrakecharacterAlias:
            return new Drakecharacter();

        case LowlandsTorchAlias:
            return new LowlandsTorch();

        case DarkTreesSwitcherAlias:
            return new DarkTreesSwitcher();

        case TunnelWallItemAlias:
            return new TunnelWallItem();

        case secondMedalionHalfItemAlias:
            return new secondMedalionHalfItem();

        case secondMedalionHalfItemAlias:
            return new secondMedalionHalfItem();

        case eleonorAlias:
            return new EleonorCharacter();

        case HenryAlias:
            return new HenryCharacter();

        case RingItemAlias:
            return new RingItem();

        case MapItemAlias:
            return new MapItem();

        case AlexandraAlias:
            return new AlexandraCharacter();

        case CharlesAlias:
            return new CharlesCharacter();

        case DrakecharacterAlias:
            return new Drakecharacter();

        case RonaldoCharacteralias:
            return new RonaldoCharacter();

        case Taylorcharacteralias:
            return new Taylorcharacter();

        case AureliusCharacterAlias:
            return new AureliusCharacter();

        case KVFallenTreesItemAlias:
            return new KVFallenTreesItem();

        case KVForestItemAlias:
            return new KVForestItem();

        case KaraWhistleItemAlias:
            return new KaraWhistleItem();

        case RichardCharacterAlias:
            return new RichardCharacter();

        case BobCharacterAlias:
            return new BobCharacter();

        case IgnisAlias:
            return new IgnisCharacter();

        case SwordItemAlias:
            return new SwordItem();

        case BrannAlias:
            return new BrannCharacter();

        case ArmourItemAlias:
            return new ArmourItem();

        case battleAxeItemAlias:
            return new battleAxeItem();

        case maceItemAlias:
            return new maceItem();

        case JohanCharacterAlias:
            return new JohanCharacter();

        case HealingPotionAlias:
            return new HealingPotionItem();

        case HolyBibleAlias:
            return new HolyBibleItem();

        case SpiderEyeAlias:
            return new SpiderEyeItem();

        case MysteriousPaintingAlias:
            return new MysteriousPaintingItem();

        case KaraCharacterAlias:
            return new KaraCharacter();

        case ChurchTorchAlias:
            return new ChurchTorch();

        case MarkCharacterAlias:
            return new MarkCharacter();

        case VolosTorchAlias:
            return new VolosTorch();

        case DarkTreeItemAlias:
            return new DarkTreeItem();

        case TunnelSwitcherAlias:
            return new TunnelSwitcher();

        case ChainmailArmourOfTheGreatItemAlias:
            return new ChainmailArmourOfTheGreatItem();

        case SteelSwordItemAlias:
            return new SteelSwordItem();

        case SwordOfGoodFortuneItemAlias:
            return new SwordOfGoodFortuneItem();

        case SmaugAlias:
            return new SmaugCharacter();
        case princessAlias:
            return new princessCharacter();
        case ShopTorchAlias:
            return new ShopTorch();

        case VladimirCharacterAlias:
            return new VladimirCharacter();

        case JainaCharacterAlias:
            return new JainaCharacter();
        case EdwinCharacterAlias:
            return new EdwinCharacter();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
