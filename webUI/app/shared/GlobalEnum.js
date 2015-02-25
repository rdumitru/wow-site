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
        'GlobalEnum', {
            GameMode: {
                PVE: {
                    val: Math.pow(2, 0),
                    enumVal: 'PVE',
                    display: 'PvE'
                },
                PVP: {
                    val: Math.pow(2, 1),
                    enumVal: 'PVP',
                    display: 'PvP'
                }
            },

            RankListType: {
                PLAYERS: {
                    val: Math.pow(2, 0),
                    enumVal: 'PLAYERS',
                    display: 'Players'
                },
                SPECS: {
                    val: Math.pow(2, 1),
                    enumVal: 'SPECS',
                    display: 'Specs'
                },
                RACES: {
                    val: Math.pow(2, 2),
                    enumVal: 'RACES',
                    display: 'Races'
                },
                GUILDS: {
                    val: Math.pow(2, 3),
                    enumVal: 'GUILDS',
                    display: 'Guilds'
                },
                ACHIEVEMENTS: {
                    val: Math.pow(2, 4),
                    enumVal: 'ACHIEVEMENTS',
                    display: 'Achievements'
                },
                MOUNTS: {
                    val: Math.pow(2, 5),
                    enumVal: 'MOUNTS',
                    display: 'Mounts'
                }
            }
        }
    );

})();
