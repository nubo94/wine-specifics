module.exports = {
    env: {
        basePath: process.env.NODE_ENV === 'development'
            ? "http://localhost:3000"
            : "https://wine-specifics.vercel.app",
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};