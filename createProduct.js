const scrapeProductData = require('./scraper');
const shopify = require('./shopify');

async function createShopifyProduct(productData) {
    try {
        const newProduct = await shopify.product.create({
            title: productData.title,
            body_html: productData.description,
            variants: [{ price: productData.price }],
            images: [{ src: productData.image_url }],
            tags: productData.tags.join(', '),
            status: 'draft'  // Set product status to 'draft'
        });

        console.log(`Product created: ${newProduct.id}`);
    } catch (error) {
        console.error(`Error creating product: ${error}`);
    }
}

async function main() {
    const url = 'http://example.com/product-page';  // Example URL, replace with actual URL
    const productData = await scrapeProductData(url);
    if (productData) {
        await createShopifyProduct(productData);
    }
}

main();
