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
    function (next: async.ErrorCallback<Error|null>): void {
        console.info('┌────────────────────────────────────────────────────────┐')
        console.info('│            Redis Server is up and running!!            │')
        console.info('└────────────────────────────────────────────────────────┘')
        next(null);
    },

    /**
     * Load Configuration
     */
    function LoadConfiguration (next: async.ErrorCallback<Error|null>) {
        for (let i = 2; i < process.argv.length; i++) {
            console.log(`Settings Option ${process.argv[i]}`)
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


    /**
     * Redis Client 생성
     * @param next
     * @constructor
     */
    function CreateRedisClient(next: async.ErrorCallback<Error|null>) {
        if (configurationOptions.isRedisClient) {
            const client: RedisClientType = createClient();

            client.connect().then(() => {
                console.info('Redis Client connected!')
                next(null);
            }).catch((err: Error) => {
                console.error('Failed to connect Redis client:', err);
                next(err);
            })

            client.on('error', (err:Error) => {
                if (err.name == 'AggregateError') {
                    client.emit('reconnect');
                } else {
                    console.error('Redis Client Error', err);
                }
            });

            client.on('reconnect', (err:Error) => {
                console.log('Waiting to reconnect Redis');
                // TODO: Docker compose를 이용한 Redis container 활성화
                // TODO: Container 상태 체크
            })
        } else {
            next(null);
        }
    },

    /**
     * Redis Server 생성
     * @param next
     * @constructor
     */
    function CreateRedisServer(next: async.ErrorCallback<Error|null>) {
        if (configurationOptions.isRedisServer) {

        } else {
            next(null);
        }
    }
], (err: Error|null|undefined) => {
    if (err) {
        console.error('An error occurred:', err);
    } else {
        console.info('Application initialized successfully.');
    }
})
