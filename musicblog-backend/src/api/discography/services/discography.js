'use strict';

/**
 * discography service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::discography.discography');
