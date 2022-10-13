import { Tigris } from "@tigrisdata/core";

const tigris = new Tigris({
    serverUrl: "localhost:8081",
    insecureChannel: true,
  })


exports.handler = async (event, context) => {
  const db = tigris.getDatabase("ecommerce_db");
  const collection = db.getCollection("ecommerce_collection")

  const productsCursor = collection.findMany();
  const products = await productsCursor.toArray();
  return {
    statusCode: 200,
    body: JSON.stringify(products)
  };
};