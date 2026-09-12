// import { drizzle } from 'drizzle-orm/node-postgres';
// import { relations } from './schema';

// const DATABASE_URL = process.env.DATABASE_URL
// if (!DATABASE_URL) {
//     throw new Error("DATABASE_URL is not defined")
// }

// export const db = drizzle(DATABASE_URL, { relations });

import 'dotenv/config';
import { relations } from './relations';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const DATABASE_URL = process.env.DATABASE_URL!;
if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}
const pool = new Pool({
  connectionString: DATABASE_URL,
});
export const db = drizzle({ client: pool, relations });
