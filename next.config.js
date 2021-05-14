module.exports = {
    env: {
        basePath: process.env.NODE_ENV === 'development'
            ? "http://localhost:3000"
            : "https://wine-specifics-gvjolvhpm-yankcarlos94.vercel.app",
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};