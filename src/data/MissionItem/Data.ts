// commmonly used data arrangements
import { AmmoId, AnimalId, ItemId, MapId, MissionData, MissionId, MissionItemData, MissionSetData, MissionSetId } from '../../types'
import missionData from './lookups/Mission.json'
import missionItemData from './mappings/MissionItem.json'
import missionMapData from './mappings/MissionMap.json'
import missionSetData from './lookups/MissionSet.json'
import missionSetMapData from './mappings/MissionSetMap.json'
import animalMapData from '../../data/PermittedAmmo/AnimalMap.json'
import animalAmmoData from '../../data/PermittedAmmo/AnimalAmmo.json'

type MissionSetMap = { [index: MapId]: MissionSetId[] }
export const missionSetMap: MissionSetMap = missionSetMapData.reduce((acc: MissionSetMap, cur: { map: MapId; mission_set: MissionSetId }) => {
    if (!acc[cur.map]) acc[cur.map] = []
    acc[cur.map].push(cur.mission_set)
    return acc
}, {})
type MissionMap = { [index: MapId]: MissionId[] }
export const missionMap: MissionMap = missionMapData.reduce((acc: MissionMap, cur: { mission: MissionId; map: MapId }) => {
    if (!acc[cur.map]) acc[cur.map] = []
    acc[cur.map].push(cur.mission)
    return acc
}, {})

type SimpleMissionItems = { [index: MissionId]: ItemId[] }

export const simpleMissionItems: SimpleMissionItems = missionItemData.reduce((acc: SimpleMissionItems, cur: MissionItemData) => {
    if (!acc[cur.mission]) acc[cur.mission] = []
    acc[cur.mission].push(cur.item)
    return acc
}, {})

type MissionSetMissions = { [index: MissionSetId]: MissionId[] }
export const missionSetMissions: MissionSetMissions = missionData.reduce((acc: MissionSetMissions, cur: MissionData) => {
    if (!acc[cur.mission_set]) acc[cur.mission_set] = []
    acc[cur.mission_set].push(cur.pk)
    return acc
}, {})

type AnimalMap = { [index: AnimalId]: MapId[] }
export const animalMap: AnimalMap = animalMapData.reduce((acc: AnimalMap, cur: { animal: AnimalId; map: MapId }) => {
    if (!acc[cur.animal]) acc[cur.animal] = []
    acc[cur.animal].push(cur.map)
    return acc
}, {})

type MapAnimal = { [index: MapId]: AnimalId[] }
export const mapAnimal: MapAnimal = animalMapData.reduce((acc: AnimalMap, cur: { animal: AnimalId; map: MapId }) => {
    if (!acc[cur.map]) acc[cur.map] = []
    acc[cur.map].push(cur.animal)
    return acc
}, {})

type AmmoAnimal = { [index: AmmoId]: AnimalId[] }
export const ammoAnimal: AmmoAnimal = animalAmmoData.reduce((acc: AmmoAnimal, cur: { animal: AnimalId; ammo: AmmoId }) => {
    if (!acc[cur.ammo]) acc[cur.ammo] = []
    acc[cur.ammo].push(cur.animal)
    acc[cur.ammo].sort()
    return acc
}, {})

type AnimalAmmo = { [index: AnimalId]: AmmoId[] }
export const animalAmmo: AnimalAmmo = animalAmmoData.reduce((acc: AnimalAmmo, cur: { animal: AnimalId; ammo: AmmoId }) => {
    if (!acc[cur.animal]) acc[cur.animal] = []
    acc[cur.animal].push(cur.ammo)
    acc[cur.animal].sort()
    return acc
}, {})

type MissionSets = { [index: MissionSetId]: Omit<MissionSetData, 'pk'> }
export const missionSetObject: MissionSets = missionSetData.reduce((acc: MissionSets, cur: MissionSetData) => {
    acc[cur.pk] = { ...cur } //ts doesn't know that omitted keys are present
    return acc
}, {})
