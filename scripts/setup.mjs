import { TigrisDataTypes } from '@tigrisdata/core/dist/types.js'
import { Tigris } from '@tigrisdata/core'
import dotenv from 'dotenv'
import data from '../static/storedata.json' assert { type: "json" };


// TODO: Add error handling
dotenv.config({ path: '.env.development' })
const tigrisUri = process.env.TIGRIS_URI
if (!tigrisUri) {
  console.log('TIGRIS_URI is is missing in environment variables')
  process.exit(1)
}

console.log(`Connecting to Tigris at ${tigrisUri}....`)

const DB_NAME = 'ecommerce_db'
const COLLECTION_NAME = 'ecommerce_collection'

const tigrisClient = new Tigris({ 
  serverUrl: tigrisUri, 
  clientId: process.env.TIGRIS_CLIENT_ID, 
  clientSecret: process.env.TIGRIS_CLIENT_SECRET
})

// setup database and collection
const db = await tigrisClient.createDatabaseIfNotExists(DB_NAME)
console.log(`Created database: ${DB_NAME}`)

const ecommerceSchema = {
    id: {
      type: TigrisDataTypes.STRING,
      primary_key: {
        order: 1,
      },
    },
    color: {
      type: TigrisDataTypes.STRING,
    },
    description: {
      type: TigrisDataTypes.STRING,
    },
    gender: {
      type: TigrisDataTypes.STRING,
    },
    name: {
      type: TigrisDataTypes.STRING,
    },
    review: {
      type: TigrisDataTypes.STRING,
    },
    starrating: {
      type: TigrisDataTypes.NUMBER,
    },
    price: {
      type: TigrisDataTypes.NUMBER,
    },
    sizes: {
      type: TigrisDataTypes.ARRAY,
      items: {
        type: TigrisDataTypes.STRING,
      },
    },
    img: {
      type: TigrisDataTypes.STRING,
    },
  };

// create collection
const collection = await db.createOrUpdateCollection(COLLECTION_NAME, ecommerceSchema)
console.log(`Created collection: ${COLLECTION_NAME}`)

// insert the data from JSON file into database
const inserted = await collection.insertOrReplaceMany(data)
console.log(`Inserted ${inserted.length} documents`)