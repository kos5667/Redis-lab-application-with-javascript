const express = require('express');
const async = require('async');
const { createClient } = require('redis')

/**
 * isRedisClient: {true, false} // Redis Client 서버
 * isRedisServer: {true, false} // Redis 서버
 *
 * @type {undefined}
 */
const configurationOptions = {
    isRedisClient: false,   // Redis Client
    isRedisServer: false    // Redis Server
};

/**
 * Initialize Application
 */
async.waterfall([
    function (next) {
        console.info('┌────────────────────────────────────────────────────────┐')
        console.info('│            Redis Server is up and running!!            │')
        console.info('└────────────────────────────────────────────────────────┘')
        next(null);
    },

    /**
     * Load Configuration
     * @param next
     */
    function LoadConfiguration (next) {
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

    function CreateRedisClient() {

    }
])
