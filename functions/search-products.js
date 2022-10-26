import { Tigris } from "@tigrisdata/core";

const tigris = new Tigris({ 
  serverUrl: process.env.TIGRIS_URI, 
  clientId: process.env.TIGRIS_CLIENT_ID, 
  clientSecret: process.env.TIGRIS_CLIENT_SECRET
})

exports.handler = async (event, context) => {
  const collection = tigris.getDatabase("ecommerce_db").getCollection("ecommerce_collection")

  const searchReq = JSON.parse(event.body);
  console.log(searchReq);
  if (!searchReq.q) {
    console.error("search keyword is missing.");

    return {
      statusCode: 400,
      body: JSON.stringify({
        status: "search query missing"
      })
    };
  }

  try {
    const searchResult = await collection.search(searchReq);
    const products = new Array()
    for (const hit of searchResult.hits) {
      products.push(hit.document)
    }
    console.log(products)
    return {
      statusCode: 200,
      body: JSON.stringify(products)
    };
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
};