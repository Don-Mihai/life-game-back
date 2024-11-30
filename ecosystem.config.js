module.exports = {
    apps: [
        {
            name: 'life-game-back',
            script: 'server.js',
            watch: true,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
