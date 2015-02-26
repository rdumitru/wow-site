(function () {
    'use strict';

    var app = angular.module('app');

    //=========================================================================
    // Global enums.
    //
    // Mandatory fields:
    //   - val
    //   - enumVal
    //   - display
    //=========================================================================

    app.constant(
        'globalEnum', {
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
            }
        }
    );

})();
