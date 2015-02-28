(function () {
    'use strict';

    angular.module('app.providers').factory('promiseProvider', PromiseProvider);

    PromiseProvider.$inject = ['$q', 'logger'];

    function PromiseProvider($q, logger) {
        //=====================================================================
        // Helper functions.
        //=====================================================================
        function deferredExtender(deferred) {
            deferred.promise.success = function(fn) {
                deferred.promise.then(fn, null);
                return deferred.promise;
            };

            deferred.promise.error = function(fn) {
                deferred.promise.then(null, fn);
                return deferred.promise;
            };

            return deferred;
        }

        //=====================================================================
        // Public functions.
        //=====================================================================
        function promiseFromObj(val, reject) {
            var def = $q.defer();
            if (reject) {
                def.reject(val);
            } else {
                def.resolve(val);
            }

            deferredExtender(def);
            return def.promise;
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            promiseFromObj: promiseFromObj
        };
    }

})();
