export const generateSKU = () => {
    let sku = ''

    while (sku.length < 10) {
        const digit = Math.floor(Math.random() * (9 - 0 + 1) + 0)
        sku = `${sku}${digit}`
    }

    return sku
}
