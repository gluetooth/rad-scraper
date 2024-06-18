const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeProductData(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const productData = {
            title: $('.module-view-header h1').text().trim(),
            description: $('div.module-details').text().trim(),
            //price: $('span.product-price').text().trim().replace('$', ''),
            image_url: $('img.img-skyscrape').attr('src'),
            tags: []
        };

        $('.module-tags a').each((i, element) => {
            const tagText = $(element).text().trim();
            if (tagText) {
                productData.tags.push(`eurorack|${tagText}`);
            }
        });

        return productData;
    } catch (error) {
        console.error(`Error fetching product data: ${error}`);
        return null;
    }
}

module.exports = scrapeProductData;
