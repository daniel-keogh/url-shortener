import { Application, send } from 'https://deno.land/x/oak@v6.0.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.0/mod.ts';

import { DbClient } from './config/db_client.ts';
import { logger } from './middleware/logger.ts';
import router from './routes/routes.ts';

const port = Deno.env.get('PORT') ?? 5000;
const app = new Application();

// Connect to DB
DbClient.connect();

app.use(logger());
app.use(
  oakCors({
    origin: /^.+localhost:8080$/,
  })
);

// Serve client app
app.use(async (ctx, next) => {
  try {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/client/dist`,
      index: 'index.html',
    });
  } catch (_) {
    await next();
  }
});

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
  console.log(`Server listening on port: ${port}`);
});

await app.listen({ port: +port });
