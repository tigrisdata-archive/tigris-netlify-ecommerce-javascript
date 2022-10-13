import { Tigris } from "@tigrisdata/core";

const tigris = new Tigris({
  serverUrl: process.env.TIGRIS_URL
})

exports.handler = async (event, context) => {
  const collection = tigris.getDatabase("ecommerce_db").getCollection("ecommerce_collection")

  // a batch of documents can be upserted with the following JSON syntax
  // '[{"id":"9d436e98-1dc9-4f21-9587-76d4c0255e33","color":"Goldenrod","description":"Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.","gender":"Male","name":"Desi Avramovitz","review":"productize virtual markets","starrating":3,"price":50.4,"img":"1.jpg"}]'
  const data = JSON.parse(event.body);
  console.log(data);

  return collection.insertOrReplaceMany(data).then(insertResponse => {
    console.log('success', insertResponse)
    return {
      statusCode: 200,
      body: JSON.stringify(insertResponse),
    };
  }).catch((error) => {
    console.log('failure', error)
    return {
      statusCode: 503,
      body: JSON.stringify(error),
    };
  });
};