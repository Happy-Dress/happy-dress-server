const axios = require('axios');

const login = process.argv[2];
const password = process.argv[3];
const numOfProductPerOneCategory = process.argv[4];

axios.post('https://happy-dress-server.herokuapp.com/api/v1/auth/login', {
    login: login,
    password: password,
}).then((authResponse) => {
    const headers = {'Authorization': `Bearer ${authResponse.data.accessToken}`}
    axios.get('https://happy-dress-server.herokuapp.com/api/v1/settings').then((response) => {
        const data = response.data;
        const products = data.categories.reduce((acc, category) => {
            return [...acc, ...createProductsWithCertainCategory(category, data, numOfProductPerOneCategory)]
        }, []);
        products.forEach(product => {
            axios.post('https://happy-dress-server.herokuapp.com/api/v1/products/create', product, {headers})
                .then(() => console.log(`Product was saved successfully: ${JSON.stringify(product)}`))
                .catch((error) => console.error(error.response.data))
        })
    })
});


function createProductsWithCertainCategory(category, settings, numOfCreateProducts) {
    const productWithCertainCategory = [];
    for (let i = 0; i < numOfCreateProducts; i++) {
        let colorId = settings.colors[Math.floor(Math.random() * settings.colors.length)].id;
        productWithCertainCategory.push({
            name: generateText(3, 10),
            description: generateText(3, 20),
            mainImageUrl: category.imageUrl,
            categoryId: category.id,
            modelId: settings.models[Math.floor(Math.random() * settings.models.length)].id,
            materialIds: [settings.materials[Math.floor(Math.random() * settings.materials.length)].id],
            productColorSizes: [{
                colorId: colorId,
                sizeId: settings.sizes[Math.floor(Math.random() * settings.sizes.length)].id
            }],
            productColorImages: [{
                colorId: colorId,
                imageURLs: [
                    category.imageUrl,
                    category.imageUrl,
                ]
            }]
        })
    }
    return productWithCertainCategory;
}

function generateText(minLength, maxLength) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength; // Выбираем случайную длину слова от 5 до 10

    let word = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        const randomLetter = alphabet[randomIndex];
        word += randomLetter;
    }
    return word;
}