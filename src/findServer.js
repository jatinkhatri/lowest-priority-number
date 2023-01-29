const axios = require('axios');

/**
 * Function to return list of all the servers
 * @returns {Promise}
 */
const findServer = async () =>
    new Promise(async (resolve, reject) => {
        const urlReqs = [];
        const serverList = [
            {
                url: 'http://oxylabs.io/',
                priority: 1,
            },
            {
                url: 'http://kp.org',
                priority: 7,
            },
            {
                url: 'https://www.twilio.com/',
                priority: 2,
            },
            {
                url: 'https://stackoverflow.com/',
                priority: 4,
            },
        ];

        // Sorting depending upon there priority
        serverList.sort(function (a, b) {
            return a.priority - b.priority;
        });

        //If no server present then reject
        if (serverList.length === 0) reject();

        // Check whether servers are online
        serverList.forEach(server => {
            urlReqs.push(isSeverUp(server.url));
        });

        try {
            const serverResponse = await Promise.all(urlReqs);
            if (serverResponse.length != serverList.length) {
                reject();
            }
        } catch (error) {
            reject();
        }


        resolve(serverList[0]);
    });

const isSeverUp = (url) => {
    // Request a URL with get method
    // Timeout is 5 seconds
    const timeoutSeconds = 5;
    return new Promise((resolve, reject) => {
        axios.get(url, { timeout: 1000 * timeoutSeconds }).then(response => {
            if (response.status <= 200 || response.status >= 299) {
                resolve(response.status);
            }
            reject("server is down");
        }).catch(error => {
            reject(error);
        });
    });
}

module.exports = findServer;