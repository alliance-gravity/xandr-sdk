"use strict";
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const index_1 = require("../src/index");
const username = 'grvt-app-mktplace';
const password = 'Polpopo1Pl@teformeGAM23';
(0, mocha_1.describe)('Billing Category API', () => {
    const client = new index_1.XandrClient({ username, password });
    (0, mocha_1.it)('Test', async () => {
        const a = await client.segmentBillingCategory.getPricingTaxonomy();
        console.log(JSON.stringify(a));
    });
});
