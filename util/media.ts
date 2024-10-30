const imageLoader = ({ src, width, quality }) => {
    const assetHost = process.env.ASSET_HOST;
    return `${assetHost}${src}?w=${width}&q=${quality || 75}`
}

export default imageLoader;
