module.exports = {
    env: {
        basePath: process.env.NODE_ENV === 'development'
            ? "http://localhost:3000"
            : "https://doctor-app.vercel.app",

        // SendGrid
        // SendGrid (senders)
        sendGridApi: "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",
        sendersSG: "lutius94@gmail.com",
        receiveSG: "yankcarlos94@gmail.com",

        // recaptcha
        recaptchaPub: "6LcKA0waAAAAAJnyGSDmuox7oSLpucfl5DFRxASv",
        recaptchaSec: "6LcKA0waAAAAAEzgPr2_mvBfTLfLggA6kmKbRSLz",

        // Token
        apiAuthorization: "ZmFzdFBlcnNvbmFsUGFnZTpOPz86WCoqIiNgdGtnVTMh",
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};