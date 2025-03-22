/** @type {import('next').NextConfig} */
const nextConfig = {
    generateBuildId: async () => {
        return process.env.GIT_HASH
    },
    generateEtags: false,
    reactStrictMode: true,
    onDemandEntries: {

        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000, 

        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2
    },
};

export default nextConfig;
