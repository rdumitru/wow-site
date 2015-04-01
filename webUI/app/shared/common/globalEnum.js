(function () {
    'use strict';

    var appCommon = angular.module('app.common');

    //=========================================================================
    // Global enums.
    //
    // Mandatory fields:
    //   - mask
    //   - enumVal
    //   - display
    //=========================================================================

    appCommon.constant(
        'globalEnum', {
            region: {
                EU: {
                    mask: Math.pow(2, 0),
                    enumVal: 'eu',
                    display: 'EU',
                    displayLong: 'Europe'
                },
                US: {
                    mask: Math.pow(2, 1),
                    enumVal: 'us',
                    display: 'US',
                    displayLong: 'United States'
                }
            },

            gameMode: {
                PvE: {
                    mask: Math.pow(2, 0),
                    enumVal: 'pve',
                    display: 'PvE'
                },
                PvP: {
                    mask: Math.pow(2, 1),
                    enumVal: 'pvp',
                    display: 'PvP'
                }
            },

            faction: {
                Alliance: {
                    mask: Math.pow(2, 0),
                    enumVal: 'alliance',
                    display: 'Alliance',
                    blizzId: 0
                },
                Horde: {
                    mask: Math.pow(2, 1),
                    enumVal: 'horde',
                    display: 'Horde',
                    blizzId: 1
                }
            },

            gender: {
                Male: {
                    mask: Math.pow(2, 0),
                    enumVal: 'male',
                    display: 'Male',
                    blizzId: 0
                },
                Female: {
                    mask: Math.pow(2, 1),
                    enumVal: 'female',
                    display: 'Female',
                    blizzId: 1
                }
            },

            race: {
                Human: {
                    mask: Math.pow(2, 0),
                    enumVal: 'human',
                    display: 'Human',
                    blizzId: 1
                },
                Orc: {
                    mask: Math.pow(2, 1),
                    enumVal: 'orc',
                    display: 'Orc',
                    blizzId: 2
                },
                Dwarf: {
                    mask: Math.pow(2, 2),
                    enumVal: 'dwarf',
                    display: 'Dwarf',
                    blizzId: 3
                },
                NightElf: {
                    mask: Math.pow(2, 3),
                    enumVal: 'nightelf',
                    display: 'Night Elf',
                    blizzId: 4
                },
                Undead: {
                    mask: Math.pow(2, 4),
                    enumVal: 'undead',
                    display: 'Undead',
                    blizzId: 5
                },
                Tauren: {
                    mask: Math.pow(2, 5),
                    enumVal: 'tauren',
                    display: 'Tauren',
                    blizzId: 6
                },
                Gnome: {
                    mask: Math.pow(2, 6),
                    enumVal: 'gnome',
                    display: 'Gnome',
                    blizzId: 7
                },
                Troll: {
                    mask: Math.pow(2, 7),
                    enumVal: 'troll',
                    display: 'Troll',
                    blizzId: 8
                },
                Goblin: {
                    mask: Math.pow(2, 8),
                    enumVal: 'goblin',
                    display: 'Goblin',
                    blizzId: 9
                },
                BloodElf: {
                    mask: Math.pow(2, 9),
                    enumVal: 'bloodelf',
                    display: 'Blood Elf',
                    blizzId: 10
                },
                Draenei: {
                    mask: Math.pow(2, 10),
                    enumVal: 'draenei',
                    display: 'Draenei',
                    blizzId: 11
                },
                Worgen: {
                    mask: Math.pow(2, 11),
                    enumVal: 'worgen',
                    display: 'Worgen',
                    blizzId: 22
                },
                PandarenNeutral: {
                    mask: Math.pow(2, 12),
                    enumVal: 'pandarenneutral',
                    display: 'Pandaren Neutral',
                    blizzId: 24
                },
                PandarenAlliance: {
                    mask: Math.pow(2, 13),
                    enumVal: 'pandarenalliance',
                    display: 'Pandaren Alliance',
                    blizzId: 25
                },
                PandarenHorde: {
                    mask: Math.pow(2, 14),
                    enumVal: 'pandarenhorde',
                    display: 'Pandaren Horde',
                    blizzId: 26
                }
            },

            class: {
                Warrior: {
                    mask: Math.pow(2, 0),
                    enumVal: 'warrior',
                    display: 'Warrior',
                    blizzId: 1,
                    specIds: [71, 72, 73]
                },
                Paladin: {
                    mask: Math.pow(2, 1),
                    enumVal: 'paladin',
                    display: 'Paladin',
                    blizzId: 2,
                    specIds: [65, 66, 70]
                },
                Hunter: {
                    mask: Math.pow(2, 2),
                    enumVal: 'hunter',
                    display: 'Hunter',
                    blizzId: 3,
                    specIds: [253, 254, 255]
                },
                Rogue: {
                    mask: Math.pow(2, 3),
                    enumVal: 'rogue',
                    display: 'Rogue',
                    blizzId: 4,
                    specIds: [259, 260, 261]
                },
                Priest: {
                    mask: Math.pow(2, 4),
                    enumVal: 'priest',
                    display: 'Priest',
                    blizzId: 5,
                    specIds: [256, 257, 258]
                },
                DeathKnight: {
                    mask: Math.pow(2, 5),
                    enumVal: 'deathknight',
                    display: 'Death Knight',
                    blizzId: 6,
                    specIds: [250, 251, 252]
                },
                Shaman: {
                    mask: Math.pow(2, 6),
                    enumVal: 'shaman',
                    display: 'Shaman',
                    blizzId: 7,
                    specIds: [262, 263, 264]
                },
                Mage: {
                    mask: Math.pow(2, 7),
                    enumVal: 'mage',
                    display: 'Mage',
                    blizzId: 8,
                    specIds: [62, 63, 64]
                },
                Warlock: {
                    mask: Math.pow(2, 8),
                    enumVal: 'warlock',
                    display: 'Warlock',
                    blizzId: 9,
                    specIds: [265, 266, 267]
                },
                Monk: {
                    mask: Math.pow(2, 9),
                    enumVal: 'monk',
                    display: 'Monk',
                    blizzId: 10,
                    specIds: [268, 269, 270]
                },
                Druid: {
                    mask: Math.pow(2, 10),
                    enumVal: 'druid',
                    display: 'Druid',
                    blizzId: 11,
                    specIds: [102, 103, 104, 105]
                }
            },

            bracket: {
                TwoVsTwo: {
                    mask: Math.pow(2, 0),
                    enumVal: '2v2',
                    display: '2v2',
                    displayLong: 'Arena 2v2'
                },
                ThreeVsThree: {
                    mask: Math.pow(2, 1),
                    enumVal: '3v3',
                    display: '3v3',
                    displayLong: 'Arena 3v3'
                },
                FiveVsFive: {
                    mask: Math.pow(2, 2),
                    enumVal: '5v5',
                    display: '5v5',
                    displayLong: 'Arena 5v5'
                },
                Rbg: {
                    mask: Math.pow(2, 3),
                    enumVal: 'rbg',
                    display: 'Rbg',
                    displayLong: 'Rated Battlegrounds'
                }
            },

            iconSize: {
                Small: {
                    mask: Math.pow(2, 0),
                    enumVal: 'small',
                    display: 'Small'
                },
                Medium: {
                    mask: Math.pow(2, 1),
                    enumVal: 'medium',
                    display: 'Medium'
                },
                Large: {
                    mask: Math.pow(2, 2),
                    enumVal: 'large',
                    display: 'Large'
                }
            },

            rankListType: {
                Players: {
                    mask: Math.pow(2, 0),
                    enumVal: 'players',
                    display: 'Players'
                },
                Specs: {
                    mask: Math.pow(2, 1),
                    enumVal: 'specs',
                    display: 'Specs'
                },
                Races: {
                    mask: Math.pow(2, 2),
                    enumVal: 'races',
                    display: 'Races'
                },
                Guilds: {
                    mask: Math.pow(2, 3),
                    enumVal: 'guilds',
                    display: 'Guilds'
                },
                Achievements: {
                    mask: Math.pow(2, 4),
                    enumVal: 'achievements',
                    display: 'Achievements'
                },
                Mounts: {
                    mask: Math.pow(2, 5),
                    enumVal: 'mounts',
                    display: 'Mounts'
                }
            }
        }
    );

})();

//=============================================================================
// Spec IDs.
//=============================================================================
// 62 - Mage: Arcane
// 63 - Mage: Fire
// 64 - Mage: Frost
// 65 - Paladin: Holy
// 66 - Paladin: Protection
// 70 - Paladin: Retribution
// 71 - Warrior: Arms
// 72 - Warrior: Fury
// 73 - Warrior: Protection
// 102 - Druid: Balance
// 103 - Druid: Feral
// 104 - Druid: Guardian
// 105 - Druid: Restoration
// 250 - Death Knight: Blood
// 251 - Death Knight: Frost
// 252 - Death Knight: Unholy
// 253 - Hunter: Beast Mastery
// 254 - Hunter: Marksmanship
// 255 - Hunter: Survival
// 256 - Priest: Discipline
// 257 - Priest: Holy
// 258 - Priest: Shadow
// 259 - Rogue: Assassination
// 260 - Rogue: Combat
// 261 - Rogue: Subtlety
// 262 - Shaman: Elemental
// 263 - Shaman: Enhancement
// 264 - Shaman: Restoration
// 265 - Warlock: Affliction
// 266 - Warlock: Demonology
// 267 - Warlock: Destruction
// 268 - Monk: Brewmaster
// 269 - Monk: Windwalker
// 270 - Monk: Mistweaver
