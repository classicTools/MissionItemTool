export interface MissionData {
    pk: number
    mission_set: number
    name: string
    objectives: string
    reward: number
    order: number
}
export interface MissionDataPlus extends MissionData {
    state: MissionState
}

export interface MissionSetData {
    pk: number
    name: string
    image_url: string
    order: number
}

export interface RawItemData {
    pk: number
    name: string
    cost: number
}
export interface ItemData extends RawItemData {
    missions: number
    wouldGive: number
}

export interface MissionItemData {
    mission: number
    item: number
    any: boolean
    group: number | null
}

export enum MissionState {
    Ready, //all requirements met
    Blocked, // all requirements met but an earlier locked mission is blocking it
    PartlyLocked, //some requirements met
    Locked, //no requirements met
}
export enum LocalStorageVars {
    Bookmarks = 'bookmarks',
    Items = 'items',
    Reserve = 'reserve',
    CustomColors = 'customColors',
    Ammo = 'ammo', //deprecated
    AmmoIds = 'ammoIds',
    Animal = 'animal',
    AlphaOrder = 'alphaOrder',
    DarkMode = 'darkMode',
    ShowAgenda = 'showAgenda',
}
export enum AssetFolder {
    Missions = 'missions',
    Avatars = 'avatars',
}
export type MapId = number
export type MissionSetId = number
export type MissionId = number
export type ItemId = number
export type MissionOrder = number
export type AnimalId = number
export type AmmoId = number

export const bareFn = () => {}

export type Bookmarks = { [index: MissionSetId]: MissionOrder }

export interface AnimalData {
    pk: number
    name: string
    order: number
    image_url: string
    score_min: string
    score_max: string
    weight_max: string
    rares: string
    other_furs: string
    tax: string
    css_max: string
}

export interface Map {
    pk: MapId
    name: string
    order: number
}
export interface AmmoData {
    pk: AmmoId
    name: string
    order: number
    ammotype: number
}
