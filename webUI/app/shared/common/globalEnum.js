(function () {
    'use strict';

    var appCommon = angular.module('app.common');

    //=========================================================================
    // Global enums.
    //
    // Mandatory fields:
    //   - val
    //   - enumVal
    //   - display
    //=========================================================================

    appCommon.constant(
        'globalEnum', {
            region: {
                EU: {
                    val: Math.pow(2, 0),
                    enumVal: 'EU',
                    display: 'EU',
                    longDisplay: 'Europe'
                },
                US: {
                    val: Math.pow(2, 1),
                    enumVal: 'US',
                    display: 'US',
                    longDisplay: 'United States'
                }
            },

            gameMode: {
                PvE: {
                    val: Math.pow(2, 0),
                    enumVal: 'PvE',
                    display: 'PvE'
                },
                PvP: {
                    val: Math.pow(2, 1),
                    enumVal: 'PvP',
                    display: 'PvP'
                }
            },

            pvpBracket: {
                TwoVsTwo: {
                    val: Math.pow(2, 0),
                    enumVal: '2v2',
                    display: '2v2',
                    longDisplay: 'Arena 2v2'
                },
                ThreeVsThree: {
                    val: Math.pow(2, 1),
                    enumVal: '3v3',
                    display: '3v3',
                    longDisplay: 'Arena 3v3'
                },
                FiveVsFive: {
                    val: Math.pow(2, 2),
                    enumVal: '5v5',
                    display: '5v5',
                    longDisplay: 'Arena 5v5'
                },
                Rbg: {
                    val: Math.pow(2, 3),
                    enumVal: 'rbg',
                    display: 'Rbg',
                    longDisplay: 'Rated Battlegrounds'
                }
            },

            rankListType: {
                Players: {
                    val: Math.pow(2, 0),
                    enumVal: 'Players',
                    display: 'Players'
                },
                Specs: {
                    val: Math.pow(2, 1),
                    enumVal: 'Specs',
                    display: 'Specs'
                },
                Races: {
                    val: Math.pow(2, 2),
                    enumVal: 'Races',
                    display: 'Races'
                },
                Guilds: {
                    val: Math.pow(2, 3),
                    enumVal: 'Guilds',
                    display: 'Guilds'
                },
                Achievements: {
                    val: Math.pow(2, 4),
                    enumVal: 'Achievements',
                    display: 'Achievements'
                },
                Mounts: {
                    val: Math.pow(2, 5),
                    enumVal: 'Mounts',
                    display: 'Mounts'
                }
            }
        }
    );

})();
