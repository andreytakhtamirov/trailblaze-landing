import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js'

const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST;
const cdnAddress = process.env.CDN_ADDRESS;
export default (phase) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER
    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        assetPrefix: isDev ? undefined : assetHost,
        reactStrictMode: true,
        images: {
            loader: 'custom',
            loaderFile: './util/media.ts',
            path: '',
            remotePatterns: [
                {
                    protocol: 'https',
                    hostname: cdnAddress,
                    port: '',
                    pathname: '/**',
                },
            ],
        },
    }
    return nextConfig
}
