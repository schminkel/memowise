import { MongoClient } from 'mongodb'

if (!process.env.DB_URI) {
  throw new Error('Invalid/Missing environment variable: "DB_URI"')
}

const uri = process.env.DB_URI
const options = {}

let client = new MongoClient(uri, options)
let clientPromise: Promise<MongoClient>

clientPromise = client.connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise