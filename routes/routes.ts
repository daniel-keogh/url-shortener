import { Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';

import { getShortUrl, getFavicon } from '../controllers/index.ts';
import { getAllUrls, addUrl, deleteUrl } from '../controllers/urls.ts';

const router = new Router();

// urls
router
  .get('/api/urls', getAllUrls)
  .post('/api/urls', addUrl)
  .delete('/api/urls/:code', deleteUrl);

// index
router
  .get('/favicon.ico', getFavicon)
  .get('/:code', getShortUrl);

export default router;
