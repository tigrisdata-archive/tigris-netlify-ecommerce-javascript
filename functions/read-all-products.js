import { Tigris } from "@tigrisdata/core";

const tigris = new Tigris({
  serverUrl: process.env.TIGRIS_URL
})

exports.handler = async (event, context) => {
  const collection = tigris.getDatabase("ecommerce_db").getCollection("ecommerce_collection")

  const productsCursor = collection.findMany();
  const products = await productsCursor.toArray();
  return {
    statusCode: 200,
    body: JSON.stringify(products)
  };
};