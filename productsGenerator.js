const axios = require('axios');

const login = process.argv[2];
const password = process.argv[3];
const numOfProductPerOneCategory = process.argv[4] || 10;
const urlLogin = process.argv[5] || 'https://happy-dress-server.herokuapp.com/api/v1/auth/login';
const urlGet = process.argv[6] || 'https://happy-dress-server.herokuapp.com/api/v1/settings';
const urlCreate = process.argv[7] || 'https://happy-dress-server.herokuapp.com/api/v1/products/create'
const errConnectionMessage = 'has exceeded the \'max_user_connections\' resource';
const errQuestionsMessage = 'has exceeded the \'max_questions\'';

axios.post(urlLogin, {
    login: login,
    password: password,
})
    .then((authResponse) => {
    const headers = {'Authorization': `Bearer ${authResponse.data.accessToken}`}
    axios.get(urlGet).then((response) => {
        const data = response.data;
        const products = data.categories.reduce((acc, category, index) => {
            return [...acc, ...createProductsWithCertainCategory(category, data, numOfProductPerOneCategory, index)]
        }, []);
        products.forEach((product)=> {
            setTimeout(() => saveProduct(product, headers), 100);
        })
    })
})
    .catch(error => console.error(error.response.data));

function saveProduct(product, headers) {
    axios.post(urlCreate, product, {headers})
        .then(() => console.log(`Product was saved successfully: ${JSON.stringify(product)}`))
        .catch((error) => {
            console.error(error.response.data.error);
            if (error.response.data.error.includes(errConnectionMessage)
                || error.response.data.error.includes(errQuestionsMessage)) {
                setTimeout(() => saveProduct(product, headers), 10000);
            } else {
                console.error(error.response.data)
            }
        })
}


function createProductsWithCertainCategory(category, settings, numOfCreateProducts) {
    const productWithCertainCategory = [];
    for (let i = 0; i < numOfCreateProducts; i++) {
        let colorId = settings.colors[Math.floor(Math.random() * settings.colors.length)].id;
        productWithCertainCategory.push({
            name: generateName(),
            description: generateDescription(2, 20),
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

function generateName() {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return alphabet[Math.floor(Math.random() * alphabet.length)] + String(Math.floor(Math.random() * 1000000)).padStart(7, "0");
}

function generateDescription(minLength, maxLength){
    const lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const words = lorem.split(" ");
        let paragraph = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            paragraph += words[randomIndex] + " ";
        }
        return paragraph;
}