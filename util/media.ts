const imageLoader = ({ src, width, quality }) => {
    const assetHost = process.env.NEXT_PUBLIC_ASSET_HOST;
    const env = process.env.NODE_ENV
    if (env == "development") {
        return `${src}?w=${width}&q=${quality || 75}`
    }

    return `${assetHost}${src}?w=${width}&q=${quality || 75}`
}

export default imageLoader;
