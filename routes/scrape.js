const express = require('express');
const router = express.Router();
const scrapeProductData = require('../scraper');
const shopify = require('../shopify');

router.post('/scrape', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        const productData = await scrapeProductData(url);
        if (productData) {
            await createShopifyProduct(productData);
            res.status(200).send('Product created successfully');
        } else {
            res.status(500).send('Failed to scrape product data');
        }
    } catch (error) {
        console.error(`Error creating product: ${error}`);
        res.status(500).send('Internal server error');
    }
});

async function createShopifyProduct(productData) {
    try {
        const newProduct = await shopify.product.create({
            title: productData.title,
            body_html: productData.description,
            //variants: [{ price: productData.price }],
            images: [{ src: productData.image_url }],
            tags: productData.tags.join(', '),
            status: 'draft'  // Set product status to 'draft'
        });

        console.log(`Product created: ${newProduct.id}`);
    } catch (error) {
        console.error(`Error creating product: ${error}`);
    }
}

module.exports = router;
