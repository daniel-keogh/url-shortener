import { Application } from 'https://deno.land/x/oak/mod.ts';
import { DbClient } from './config/db_client.ts';

import router from './routes/routes.ts';

const port = Deno.env.get('PORT') ?? 5000;
const app = new Application();

// Connect to DB
DbClient.connect();

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening on port: ${port}`);

await app.listen({ port: +port });
