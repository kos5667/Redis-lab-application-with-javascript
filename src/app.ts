// import express, { Request, Response } from 'express';
import async from 'async';
import { createClient, RedisClientType } from 'redis';


/**
 * isRedisClient: {true, false} // Redis Client 서버
 * isRedisServer: {true, false} // Redis 서버
 *
 * @type {undefined}
 */
interface ConfigurationOptions {
    isRedisClient: boolean;
    isRedisServer: boolean;
}

const configurationOptions: ConfigurationOptions = {
    isRedisClient: false,   // Redis Client
    isRedisServer: false    // Redis Server
};

/**
 * Initialize Application
 */
async.waterfall([
    function (next): void {
        console.info('┌────────────────────────────────────────────────────────┐')
        console.info('│            Redis Server is up and running!!            │')
        console.info('└────────────────────────────────────────────────────────┘')
        next(null);
    },

    /**
     * Load Configuration
     */
    function LoadConfiguration (next: async.ErrorCallback<null>) {
        for (let i = 1; i < process.argv.length; i++) {
            switch (process.argv[i]) {
                case '-redis-server':
                    configurationOptions.isRedisServer = true;
                    break;
                case '-redis-client':
                    configurationOptions.isRedisClient = true;
                    break;
                default:
                    break;
            }
        }
        next(null);
    },

    function CreateRedisClient(next: async.ErrorCallback<null>) {

    }
], (err) => {
    if (err) {
        console.error('An error occurred:', err);
    } else {
        console.info('Application initialized successfully.');
    }
})
