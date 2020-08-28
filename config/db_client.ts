import {
  Database,
  MongoClient,
  Collection,
} from 'https://deno.land/x/mongo@v0.11.1/mod.ts';
import { Url } from './../models/url.ts';

export namespace DbClient {
  let db: Database;

  export function connect() {
    const client = new MongoClient();

    const uri = Deno.env.get('DB_URI');
    const dbName = Deno.env.get('DB_NAME');

    if (!uri) {
      throw new Error('DB_URI not defined');
    }

    if (!dbName) {
      throw new Error('DB_NAME not defined');
    }

    client.connectWithUri(uri);
    db = client.database(dbName);
  }

  export function urls(): Collection<Url> {
    return db.collection('urls');
  }
}
