const axios = require('axios');
const mysql = require('mysql2')

require('dotenv').config();

const numOfProductPerOneCategory = process.argv[2] || 10;
const urlGet = process.argv[6] || 'https://happy-dress-server.herokuapp.com/api/v1/settings';
const sqlProduct = 'INSERT INTO product (name, description, mainImageUrl, categoryId, modelId) VALUES (?, ?, ?, ?, ?)';
const sqlProductMaterials = 'INSERT INTO `product-material` (productId, materialId) VALUES (?, ?)';
const sqlProductColorImages = 'INSERT INTO `product-color-image` (productId, colorId, imageUrls, mainImageUrl) VALUES (?, ?, ?, ?)';
const sqlProductColorSizes = 'INSERT INTO `product-color-size` (productId, colorId, sizeId) VALUES (?, ?, ?)';

// if (numOfProductPerOneCategory > 20) {
//     console.error("Num of products per one category: too big number for generating");
//     process.exit(1)
// }


const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST_SCRIPT,
    user: 'b6650482e460f0',
    password: '7630ad55',
    database: 'heroku_dbdd418e2e45a3d',
})

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        process.exit(1);
    } else {
        console.log('Connected to database as ID', connection.threadId);

        axios.get(urlGet)
            .then((response) => {
                const data = response.data;
                console.log('Data get successful')
                const products = data.categories.reduce((acc, category, index) => {
                    return [...acc, ...createProductsWithCertainCategory(category, data, numOfProductPerOneCategory, index)]
                }, []);
                connection.beginTransaction((error) => {
                    if (error) {
                        console.error(`Error beginning transaction: ${error}`);
                        process.exit(1);
                    }

                    Promise.all(products.map((product) => {
                        return saveProduct(product);
                    })).then(() => {
                        connection.commit((error) => {
                            if (error) {
                                connection.rollback(() => {
                                    console.error(`Error committing transaction: ${error}`);
                                });
                                process.exit(1);
                            }
                            console.log('Transaction committed');
                        });

                        connection.end((error) => {
                            if (error) {
                                console.error(`Error closing database connection: ${error}`);
                                process.exit(1)
                            }
                            console.log('Database connection closed');
                            process.exit(0);
                        })

                    })
                });

            })
            .catch(error => {
                console.error(error);
                process.exit(1);
            })
    }
});

function saveProduct(product) {
    return new Promise((resolve, reject) => {
        connection.query(sqlProduct, [product.name, product.description, product.mainImageUrl,
            product.categoryId, product.modelId], (err, result) => {
            if (err) {
                connection.rollback(() => console.error(err.stack));
                return reject();
            } else {
                console.log(result);
                console.log("product successful")
                connection.query(sqlProductMaterials,
                    [result.insertId, product.materialIds[0]], (err, result) => {
                        if (err) {
                            connection.rollback(() => console.error(err.stack))
                            return reject();
                        } else {
                            console.log(result);
                            console.log("product-materials successful")
                        }
                    });
                connection.query(sqlProductColorSizes,
                    [result.insertId, product.productColorSizes[0].colorId, product.productColorSizes[0].sizeId],
                    (err, result) => {
                        if (err) {
                            connection.rollback(() => console.error(err.stack))
                            return reject();
                        } else {
                            console.log(result)
                            console.log("product-color-size successful")
                        }
                    });

                connection.query(sqlProductColorImages,
                    [result.insertId, product.productColorImages[0].colorId,
                        product.productColorImages[0].imageURLs[0], null],
                    (err, result) => {
                        if (err) {
                            connection.rollback(() => console.error(err.stack))
                            return reject();
                        } else {
                            console.log(result)
                            console.log("product-color-image successful")
                        }
                    });
                return resolve();
            }
        })
    });
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
                imageURLs: [category.imageUrl]
            }]
        })
    }
    return productWithCertainCategory;
}

function generateName() {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return alphabet[Math.floor(Math.random() * alphabet.length)] + String(Math.floor(Math.random() * 1000000)).padStart(7, "0");
}

function generateDescription(minLength, maxLength) {
    const lorem = "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco " +
        "laboris nisi ut aliquip ex ea commodo consequat.";
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const words = lorem.split(" ");
    let paragraph = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        paragraph += words[randomIndex] + " ";
    }
    return paragraph;
}