import { Router } from 'https://deno.land/x/oak@v6.0.1/mod.ts';

import { getShortUrl } from '../controllers/index.ts';
import { getAllUrls, addUrl, deleteUrl } from '../controllers/urls.ts';

const router = new Router();

// urls
router
  .get('/api/urls', getAllUrls)
  .post('/api/urls', addUrl)
  .delete('/api/urls/:slug', deleteUrl);

// index
router.get('/:slug', getShortUrl);

export default router;
