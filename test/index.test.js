const chai = require('chai');
const { expect } = chai;
const MockAdapter = require("axios-mock-adapter");
const axios = require('axios');
const chaiAsPromised = require("chai-as-promised");
const findServer = require('../src/findServer');
chai.use(chaiAsPromised);

describe('Find Server file ', () => {
    
    it('will run find server function with server up',async () => {
        const servers = await findServer();
        expect(servers).to.not.be.empty;
    });

    it('will run find server function with server down',async () => {
        const mock = new MockAdapter(axios);
        mock.onGet("http://google.com").replyOnce(400);
        const servers = findServer();

        expect(servers).to.be.rejectedWith();
        mock.resetHistory();
    });
    
});