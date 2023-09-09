const {
    Client
} = require('hazelcast-client');

const config = require("../config/config");

const MAX_RECONNECT_ATTEMPTS = 60;
const TEN_SECOND = 10000;
let currentReconnectAttemptCount = 0;


let client = null;

exports.initializeClient = async () => {
    // dont throw exception even if not connected to hazel cache.
    try {
        client = await Client.newHazelcastClient({
            clusterName: config.cache.clusterName,
            network: {
                clusterMembers: config.cache.clusterMembers
            },
            // security: {
            //     usernamePassword: {
            //         username: 'dev',
            //         password: 'dev'
            //     }
            // },
            lifecycleListeners: [
                (state) => {
                    console.log('Lifecycle Event >>> ' + state);
                    if (state == "shutdown") {
                        client = null;
                        initiateCacheReConnectLogic();
                    }
                }
            ]
        });
    } catch (error) {
        console.error("err in starting hazelCache client: ", error);
        initiateCacheReConnectLogic();
        return null;
    }
};


const initiateCacheReConnectLogic = () => {
    if (currentReconnectAttemptCount < MAX_RECONNECT_ATTEMPTS) {
        currentReconnectAttemptCount += 1;
        setTimeout(() => {
            this.initializeClient();
        }, TEN_SECOND);
    }
};



exports.getDataFromMap = async (mapId, key) => {
    if (client) {
        try {
            return Promise.resolve(client.getMap(mapId))
                .then(map => {
                    return map.get(key);
                })
                .catch(e => {
                    console.log("error while getting data from cache", e);
                    return null;
                });
        } catch (error) {
            console.error("At getDataFromMap, Error in cache service: ", error);
            return Promise.resolve(null);
        }
    } else {
        console.log("cache client is null, returning null");
        return Promise.resolve(null);
    }
};



exports.setDataIntoMap = (mapId, key, value, expiryTime=300000) => {
    if (client) {
        try {
            return Promise.resolve(client.getMap(mapId)).then(map => {
                return map
                    .put(key, value, expiryTime)
                    .then(oldValue => {
                        return oldValue;
                    })
                    .catch(e => {
                        console.log("error while getting data from cache", e);
                        return null;
                    });
            });
        } catch (error) {
            console.error("At setDataIntoMap, Error in cache service: ", error);
            return null;
        }
    } else {
        return null;
    }
};