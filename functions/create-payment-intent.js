// An endpoint that calculates the order total and creates a 
// PaymentIntent on Stripe 
import { Tigris } from "@tigrisdata/core";

require("dotenv").config();
const axios = require("axios");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };

const tigris = new Tigris({
  serverUrl: process.env.TIGRIS_URL
})

const collection = tigris.getDatabase("ecommerce_db").getCollection("ecommerce_collection")

exports.handler = async (event, context) => {
  // CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers
    };
  }

  const data = JSON.parse(event.body);
  console.log(data);

  if (!data.items) {
    console.error("List of items to purchase is missing.");

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "missing information"
      })
    };
  }

  // Stripe payment processing begins here
  try {
    // Always calculate the order amount on your server to prevent customers
    // from manipulating the order amount from the client
    // Here we will use a simple json file to represent inventory
    // but you could replace this with a DB lookup

    console.log(data.items)
    let amount = 0;
    for (let item of data.items) {
      console.log(item)
      console.log(item.id)

      // a simple logic to fetch from the database and if item is present then add it to amount
      // note: this can be replaced by a batch call, but for the purpose of demonstration we are calling one by one.
      const product = await collection.findOne({
        id: item.id
      })
      console.log(product);

      if (product == undefined) {
        continue
      }

      console.log("product price ", product.price)
      console.log("item quantity ", item.quantity)
      amount = amount + product.price * item.quantity
    }

    console.log('amount charging ', amount)

    // Create a PaymentIntent on Stripe
    // A PaymentIntent represents your customer's intent to pay
    // and needs to be confirmed on the client to finalize the payment
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      description: "Order from store"
    });

    // Send the client_secret to the client
    // The client secret has a limited set of permissions that
    // let you finalize the payment and update some details from the client
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      })
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: err
      })
    };
  }
};
