module.exports = {
    apps: [
        {
            name: 'life-game-back',
            script: 'index.js', // Поменяйте на новый файл
            watch: true,
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
