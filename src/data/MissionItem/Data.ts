// commmonly used data arrangements
import { AmmoId, AnimalId, ItemId, MapId, MissionData, MissionId, MissionItemData, MissionSetId } from '../../types'
import missionData from './lookups/Mission.json'
import missionItemData from './mappings/MissionItem.json'
import missionMapData from './mappings/MissionMap.json'
import missionSetMapData from './mappings/MissionSetMap.json'
import animalMapData from '../../data/PermittedAmmo/AnimalMap.json'
import animalAmmoData from '../../data/PermittedAmmo/AnimalAmmo.json'

type MissionSetMap = { [index: MapId]: MissionSetId[] }
export const missionSetMap: MissionSetMap = missionSetMapData.reduce((acc: MissionSetMap, cur: { map: MapId; mission_set: MissionSetId }) => {
    if (!acc[cur.map]) acc[cur.map] = []
    acc[cur.map].push(cur.mission_set)
    return acc
}, {})
// export const missionSetMap: MissionSetMap = {
//     '1': [1, 3, 6, 28, 32, 33, 60, 53],
//     '2': [28, 32, 1, 2, 18, 34, 42],
//     '3': [1, 6, 32, 33, 42, 54, 18],
//     '4': [1, 3, 5, 6, 14, 59],
//     '5': [8, 12, 17, 29, 34, 35, 55, 66],
//     '6': [5, 11, 12, 13, 29, 40, 57, 31],
//     '7': [1, 18, 32, 38, 39, 58],
//     '8': [8, 12, 13, 22, 29, 40, 41, 56],
//     '9': [18, 23, 26, 29, 41, 65, 82],
//     '10': [4, 5, 16, 21, 25, 30, 36, 43, 64],
//     '11': [2, 7, 15, 24, 27, 40, 62, 63],
//     '12': [9, 10, 18, 19, 20, 37],
// }

type MissionMap = { [index: MapId]: MissionId[] }
export const missionMap: MissionMap = missionMapData.reduce((acc: MissionMap, cur: { mission: MissionId; map: MapId }) => {
    if (!acc[cur.map]) acc[cur.map] = []
    acc[cur.map].push(cur.mission)
    return acc
}, {})
// export const missionMap: MissionMap = {
//     '1': [
//         449, 450, 452, 456, 463, 464, 467, 468, 472, 474, 480, 481, 489, 492, 494, 502, 503, 505, 509, 511, 514, 515, 1174, 36, 316, 317, 30, 31, 32, 33, 34,
//         35, 37, 324, 325, 39,
//     ],
//     '2': [
//         448, 450, 456, 458, 461, 462, 463, 465, 467, 468, 475, 477, 480, 481, 491, 493, 494, 497, 498, 499, 500, 502, 507, 510, 511, 514, 1169, 318, 319, 320,
//         431, 435, 287, 427, 428, 288, 289, 429, 290, 292, 432, 433, 294, 324, 325,
//     ],
//     '3': [
//         450, 452, 458, 464, 465, 467, 468, 469, 481, 489, 491, 492, 496, 502, 505, 506, 507, 509, 510, 511, 512, 1167, 321, 322, 430, 434, 436, 427, 428, 188,
//         429, 192, 432, 433, 194, 324, 195, 325,
//     ],
//     '4': [
//         449, 450, 452, 453, 457, 464, 466, 467, 468, 469, 474, 476, 481, 482, 487, 488, 492, 496, 501, 502, 503, 505, 506, 508, 509, 511, 512, 515, 1173, 38,
//         30, 31, 32, 33, 34, 35, 37, 39, 357,
//     ],
//     '5': [
//         447, 451, 454, 458, 459, 460, 461, 463, 465, 471, 473, 478, 479, 484, 485, 486, 490, 491, 495, 513, 514, 127, 347, 348, 128, 349, 130, 350, 131, 351,
//         352, 132, 133, 134, 354, 135, 136, 356,
//     ],
//     '6': [
//         447, 453, 455, 457, 459, 463, 466, 470, 471, 473, 478, 479, 483, 484, 485, 488, 490, 501, 504, 508, 514, 1168, 411, 412, 407, 408, 415, 416, 50, 51, 52,
//         53, 55, 57, 58, 59,
//     ],
//     '7': [450, 458, 465, 467, 468, 469, 481, 483, 491, 496, 502, 506, 510, 511, 512, 1176, 323, 188, 192, 194, 324, 195, 325],
//     '8': [
//         447, 451, 455, 459, 460, 463, 470, 471, 473, 478, 479, 484, 485, 490, 495, 504, 507, 514, 516, 1175, 409, 410, 407, 408, 415, 416, 137, 127, 128, 138,
//         139, 130, 140, 131, 141, 132, 142, 143, 133, 134, 144, 145, 135, 136,
//     ],
//     '9': [458, 463, 465, 473, 479, 484, 490, 491, 507, 510, 514, 1171, 417, 188, 418, 419, 420, 421, 192, 422, 423, 424, 194, 195, 425],
//     '10': [453, 457, 466, 488, 501, 507, 508, 514, 1170, 50, 51, 52, 53, 55, 57, 58, 59],
//     '11': [448, 462, 475, 497, 498, 499, 500, 1172, 413, 414, 407, 408, 415, 416],
//     '12': [458, 465, 491, 510, 188, 192, 194, 195],
// }

type SimpleMissionItems = { [index: MissionId]: ItemId[] }

export const simpleMissionItems: SimpleMissionItems = missionItemData.reduce((acc: SimpleMissionItems, cur: MissionItemData) => {
    if (!acc[cur.mission]) acc[cur.mission] = []
    acc[cur.mission].push(cur.item)
    return acc
}, {})
// export const simpleMissionItems: SimpleMissionItems = {
//     '16': [20],
//     '17': [6, 9, 12, 18, 20, 32],
//     '27': [6],
//     '28': [20],
//     '31': [32],
//     '33': [14],
//     '35': [25],
//     '37': [88],
//     '39': [81, 83],
//     '42': [75, 76, 77, 78, 79, 81, 82, 83, 85, 87],
//     '44': [75, 76, 77, 78, 79, 81, 82, 83, 85, 87],
//     '46': [18],
//     '47': [88, 89],
//     '51': [12],
//     '57': [79],
//     '74': [20, 39, 45],
//     '80': [22, 23],
//     '82': [81, 83],
//     '83': [8, 9, 10],
//     '85': [24],
//     '91': [31],
//     '92': [71],
//     '95': [16],
//     '96': [14],
//     '100': [83, 81],
//     '105': [88],
//     '109': [83, 81],
//     '111': [87, 85],
//     '112': [26, 27],
//     '122': [26],
//     '123': [69, 70],
//     '124': [11],
//     '126': [76],
//     '130': [69],
//     '132': [9],
//     '134': [76, 77, 78, 79],
//     '135': [88],
//     '141': [32],
//     '143': [71],
//     '145': [76],
//     '146': [16],
//     '152': [12],
//     '155': [79],
//     '161': [76],
//     '162': [24],
//     '163': [12],
//     '164': [85],
//     '165': [66, 83, 81],
//     '166': [24],
//     '171': [88, 89],
//     '172': [17, 19, 22, 23],
//     '181': [89],
//     '182': [25],
//     '184': [87],
//     '185': [83, 81],
//     '193': [79],
//     '194': [12, 20],
//     '199': [76, 77, 78, 79, 81, 83, 85, 87, 26, 27, 17, 19, 22, 23, 36, 72, 24],
//     '203': [17],
//     '205': [24],
//     '208': [76, 77, 78, 79, 81, 83, 85, 87, 26, 27, 17, 19, 22, 23, 36, 72, 24, 12, 65, 66, 69, 70, 71],
//     '212': [76, 77, 78, 79],
//     '214': [88, 89],
//     '220': [83, 85, 87, 26, 27, 17, 19, 22, 23, 36, 72, 24, 12, 65, 66, 69, 70, 71, 76, 77, 78, 79, 81],
//     '222': [26],
//     '223': [23],
//     '224': [83, 81],
//     '226': [24],
//     '233': [70],
//     '234': [76, 77, 78, 79, 81, 83, 87, 85],
//     '235': [26],
//     '236': [65, 66],
//     '241': [4, 5],
//     '242': [75, 81, 82, 83],
//     '243': [16, 18, 20, 30],
//     '250': [76, 77, 78, 79, 81, 83, 87, 85, 75, 82],
//     '254': [65, 66],
//     '272': [70],
//     '273': [82],
//     '275': [9],
//     '276': [14, 69, 71, 34, 40, 49, 73],
//     '279': [76, 77, 78, 79],
//     '280': [87, 85],
//     '281': [88],
//     '283': [6],
//     '284': [76, 77, 78, 79, 87, 85, 6],
//     '285': [16, 18, 20, 27, 30],
//     '292': [20],
//     '294': [79],
//     '301': [4],
//     '302': [18],
//     '303': [31],
//     '304': [76],
//     '305': [89],
//     '314': [89],
//     '315': [75, 76, 77, 78, 79, 81, 82, 83, 80, 87, 85, 18],
//     '321': [88],
//     '322': [88],
//     '329': [80, 87, 85],
//     '330': [88],
//     '334': [88],
//     '345': [33],
//     '346': [3],
//     '354': [3],
//     '356': [79],
//     '361': [42],
//     '364': [90],
//     '365': [3],
//     '366': [82],
//     '371': [42, 32],
//     '372': [90],
//     '374': [3, 91],
//     '376': [76, 77, 78, 79],
//     '378': [17, 19, 22, 23, 24, 26, 27, 36, 72, 76, 77, 78, 79, 81, 83, 85, 87],
//     '384': [1],
//     '386': [76, 77, 78, 79],
//     '390': [32],
//     '392': [90],
//     '393': [31],
//     '394': [33],
//     '399': [31],
//     '401': [42],
//     '405': [3],
//     '406': [2],
//     '421': [2],
//     '426': [3],
//     '434': [2],
//     '435': [82, 88],
//     '436': [42],
//     '447': [14],
//     '448': [14],
//     '449': [69],
//     '450': [69],
//     '451': [71],
//     '452': [71],
//     '453': [14, 69, 71],
//     '454': [14, 69, 71],
//     '455': [71],
//     '456': [14],
//     '457': [31],
//     '458': [60],
//     '459': [31],
//     '460': [60],
//     '461': [31],
//     '463': [4, 5],
//     '464': [8, 10, 9],
//     '465': [20],
//     '466': [12],
//     '467': [60, 61],
//     '468': [14, 15, 16],
//     '469': [69, 70],
//     '470': [71],
//     '471': [6, 11, 18, 65, 66, 4, 5, 12, 8, 10, 14, 15, 16, 60, 61, 69, 70, 71, 20, 9],
//     '472': [87],
//     '473': [87],
//     '474': [87],
//     '475': [87],
//     '476': [87, 53],
//     '477': [76],
//     '478': [76],
//     '479': [76],
//     '480': [76],
//     '481': [76],
//     '482': [73, 65, 66, 69, 71, 14],
//     '483': [73, 65, 66, 69, 71, 14],
//     '484': [73, 4],
//     '485': [60, 74],
//     '486': [73, 65, 66, 69, 71, 14],
//     '488': [25],
//     '489': [3],
//     '490': [18],
//     '491': [87, 85],
//     '492': [87, 85],
//     '493': [76, 77, 78, 79],
//     '494': [76, 77, 78, 79],
//     '495': [83, 81],
//     '496': [83, 81],
//     '502': [60],
//     '504': [71],
//     '505': [69],
//     '507': [82],
//     '508': [75],
//     '509': [82],
//     '510': [83, 81],
//     '511': [75, 82, 83, 81],
//     '513': [83, 81],
//     '515': [81],
//     '526': [14, 69, 71],
//     '528': [14, 69, 71],
//     '529': [66],
//     '530': [76],
//     '536': [65],
//     '537': [76, 77, 78, 79, 75, 82, 83, 81],
//     '538': [9],
//     '539': [76, 77, 78, 79],
//     '540': [66],
//     '547': [82],
//     '548': [69],
//     '549': [31],
//     '550': [16],
//     '556': [76, 77, 78, 79, 75, 82, 83, 81, 87, 85],
//     '557': [76, 77, 78, 79, 75, 82, 83, 81, 87, 85],
//     '560': [65, 66],
//     '566': [12],
//     '567': [20],
//     '569': [76, 77, 78, 79, 75, 82, 83, 81, 87, 85],
//     '570': [18],
//     '578': [11, 13],
//     '579': [9],
//     '580': [9],
//     '586': [65],
//     '587': [65, 66],
//     '588': [25],
//     '589': [87],
//     '590': [32],
//     '1173': [33, 35, 31],
//     '1174': [32, 42, 92, 29],
//     '1175': [41, 44, 32, 92],
//     '1180': [76, 77, 78, 79, 75, 82, 83, 81, 87, 85],
//     '1181': [76, 77, 78, 79, 75, 82, 83, 81, 87, 85],
//     '1185': [60, 61],
//     '1191': [75, 76, 77, 78, 79, 81, 82, 83, 85, 87],
//     '1194': [7],
//     '1195': [83, 75, 81, 82],
//     '1196': [24, 31],
//     '1212': [76, 77, 78, 79, 83, 81, 87, 85],
//     '1213': [76, 77, 78, 79, 83, 81],
//     '1218': [60, 61],
//     '1221': [75, 76, 77, 78, 79, 81, 82, 83],
//     '1222': [30, 18, 39, 45, 20, 16, 38, 84],
//     '1230': [18, 20, 16, 30],
//     '1232': [75, 76, 77, 78, 79, 81, 82, 83],
//     '1321': [75, 76, 77, 78, 79, 81, 82, 83, 87, 85],
//     '1323': [18, 20, 16, 30],
// }

type MissionSetMissions = { [index: MissionSetId]: MissionId[] }
export const missionSetMissions: MissionSetMissions = missionData.reduce((acc: MissionSetMissions, cur: MissionData) => {
    if (!acc[cur.mission_set]) acc[cur.mission_set] = []
    acc[cur.mission_set].push(cur.pk)
    return acc
}, {})
// export const missionSetMissions: MissionSetMissions = {
//     '1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
//     '2': [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
//     '3': [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
//     '4': [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
//     '5': [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
//     '6': [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76],
//     '7': [77, 78, 79, 80, 81, 82, 83, 84, 85, 86],
//     '8': [87, 88, 89, 90, 91, 92, 93, 94, 95, 96],
//     '9': [97, 98, 99, 100, 101, 102, 103, 104, 105, 106],
//     '10': [107, 108, 109, 110, 111, 112, 113, 114, 115, 116],
//     '11': [117, 118, 119, 120, 121, 122, 123, 124, 125, 126],
//     '12': [127, 128, 129, 130, 131, 132, 133, 134, 135, 136],
//     '13': [137, 138, 139, 140, 141, 142, 143, 144, 145, 146],
//     '14': [147, 148, 149, 150, 151, 152, 153, 154, 155, 156],
//     '15': [157, 158, 159, 160, 161, 162, 163, 164, 165, 166],
//     '16': [167, 168, 169, 170, 171, 172, 173, 174, 175, 176],
//     '17': [177, 178, 179, 180, 181, 182, 183, 184, 185, 186],
//     '18': [187, 188, 189, 190, 191, 192, 193, 194, 195, 196],
//     '19': [197, 198, 199, 200, 201, 202, 203, 204, 205, 206],
//     '20': [207, 208, 209, 210, 211, 212, 213, 214, 215, 216],
//     '21': [217, 218, 219, 220, 221, 222, 223, 224, 225, 226],
//     '22': [227, 228, 229, 230, 231, 232, 233, 234, 235, 236],
//     '23': [237, 238, 239, 240, 241, 242, 243, 244, 245, 246],
//     '24': [247, 248, 249, 250, 251, 252, 253, 254, 255, 256],
//     '25': [257, 258, 259, 260, 261, 262, 263, 264, 265, 266],
//     '26': [267, 268, 269, 270, 271, 272, 273, 274, 275, 276],
//     '27': [277, 278, 279, 280, 281, 282, 283, 284, 285, 286],
//     '28': [287, 288, 289, 290, 291, 292, 293, 294, 295],
//     '29': [296, 297, 298, 299, 300, 301, 302, 303, 304, 305],
//     '30': [306, 307, 308, 309, 310, 311, 312, 313, 314, 315],
//     '31': [326, 327, 328, 329, 330, 331, 332, 333, 334, 335],
//     '32': [316, 317, 318, 319, 320, 321, 322, 323, 324, 325],
//     '33': [336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346],
//     '34': [347, 348, 349, 350, 351, 352, 353, 354, 355, 356],
//     '35': [357, 358, 359, 360, 361, 362, 363, 364, 365, 366],
//     '36': [367, 368, 369, 370, 371, 372, 373, 374, 375, 376],
//     '37': [377, 378, 379, 380, 381, 382, 383, 384, 385, 386],
//     '38': [387, 388, 389, 390, 391, 392, 393, 394, 395, 396],
//     '39': [397, 398, 399, 400, 401, 402, 403, 404, 405, 406],
//     '40': [407, 408, 409, 410, 411, 412, 413, 414, 415, 416],
//     '41': [417, 418, 419, 420, 421, 422, 423, 424, 425, 426],
//     '42': [427, 428, 429, 430, 431, 432, 433, 434, 435, 436],
//     '43': [437, 438, 439, 440, 441, 442, 443, 444, 445, 446],
//     '44': [447, 448, 449, 450, 451, 452, 453, 454, 455, 456],
//     '45': [457, 458, 459, 460, 461],
//     '46': [462, 463, 464, 465, 466, 467, 468, 469, 470, 471],
//     '47': [472, 473, 474, 475, 476],
//     '48': [477, 478, 479, 480, 481],
//     '49': [482, 483, 484, 485, 486],
//     '50': [487, 488, 489, 490, 491, 492, 493, 494, 495, 496],
//     '51': [497, 498, 499, 500, 501, 502, 503, 504, 505, 506],
//     '52': [507, 508, 509, 510, 511, 512, 513, 514, 515, 516],
//     '53': [517, 518, 519, 520],
//     '54': [531, 532, 533, 534, 535, 536, 537, 538, 539, 540],
//     '55': [541, 542, 543, 544, 545, 546, 547, 548, 549, 550],
//     '56': [551, 552, 553, 554, 555, 556, 557, 558, 559, 560],
//     '57': [561, 562, 563, 564, 565, 566, 567, 568, 569, 570],
//     '58': [571, 572, 573, 574, 575, 576, 577, 578, 579, 580],
//     '59': [581, 582, 583, 584, 585, 586, 587, 588, 589, 590],
//     '60': [521, 522, 523, 524, 525, 526, 527, 528, 529, 530],
//     '61': [1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176],
//     '62': [1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186],
//     '63': [1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196],
//     '64': [1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213],
//     '65': [1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223],
//     '66': [1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233],
//     '82': [1314, 1315, 1316, 1317, 1318, 1319, 1320, 1321, 1322, 1323],
// }

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
    return acc
}, {})
type AnimalAmmo = { [index: AnimalId]: AmmoId[] }
export const animalAmmo: AnimalAmmo = animalAmmoData.reduce((acc: AnimalAmmo, cur: { animal: AnimalId; ammo: AmmoId }) => {
    if (!acc[cur.animal]) acc[cur.animal] = []
    acc[cur.animal].push(cur.ammo)
    return acc
}, {})
