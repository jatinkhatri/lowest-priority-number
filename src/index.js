const findServer =  require('./findServer');
(async () => {
    try {
        console.log("finding server with lowest priority....");
        const text = await findServer();
        console.log(text);
    } catch (e) {
        console.log("Error: Servers are ofline");
    }
})();