(function () {
    'use strict';

    angular.module('app.common').factory('cache', Cache);

    Cache.$inject = ['globalConstants', 'logger'];

    function Cache(globalConstants, logger) {
        //=====================================================================
        // Exposed functions.
        //=====================================================================
        function store(key, obj) {
            if (!key) {
                logger.error(Cache, store, 'Key not provided.');
                return;
            }

            obj.timestamp = moment().toISOString();
            localStorage.setItem(key, JSON.stringify(obj));

            logger.log(Cache, store, 'Storing object with key: \"' + key + '\".');
        }

        function load(key) {
            if (!key) {
                logger.error(Cache, load, 'Key not provided.');
                return;
            }

            // Fetch the object.
            var obj = JSON.parse(localStorage.getItem(key));
            if (!obj) return null;

            // Check if the item has expired.
            var objMoment = moment(obj.timestamp);
            var nowMoment = moment();
            
            if (nowMoment.diff(objMoment, 'minutes') >= globalConstants.CACHE_MINUTES) {
                return null;
            }

            // Clone item and remove timestamp.
            var cloneObj = _.clone(obj, true);
            delete cloneObj.timestamp;

            return cloneObj;
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            store: store,
            load : load
        };
    }

})();