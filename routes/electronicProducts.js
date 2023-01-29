const express = require('express');
const axios = require('axios');
const app = express();
const router = express.Router()

const auth = {
  username: 'important_user',
  password: 'qwerty123456'
}


router.get('/getProducts', (req, res) => {
  try {
    // Make the GET request to the server
    axios.get('http://128.199.59.152:1234/api/products', { auth })
      .then(response => {
        // Extract the data from the response
        const products = response.data;
        // Loop through the products and update the corresponding signs
        for (const product of products) {
          updateSign(product);
        }
        res.send('Success');
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});




router.post('/updateSign/:productId', (req, res) => {
  try {
    // Prepare the data for the POST request
    let title = req.body.name;
    let text;
    if (req.body.discountPrice) {
      text = `Price: ${req.body.discountPrice} instead of ${req.body.price}`;
    } else {
      text = `Price: ${req.body.price}`;
    }
    const data = {
      title,
      text
    };
    // Make the POST request to update the sign
    axios.post(`http://128.199.59.152:1234/api/sign/${req.params.productId}`, data, { auth })
      .then(response => {
        res.send('Success');
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});



// Use setInterval function to check for new products every minute
setInterval(() => router.get('/updateSign/:productId'), 60000);




module.exports = router;