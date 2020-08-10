import { Router } from 'https://deno.land/x/oak/mod.ts';

import { getShortUrl } from '../controllers/index.ts';
import { getAllUrls, addUrl, deleteUrl } from '../controllers/urls.ts';

const router = new Router();

// urls
router
  .get('/urls', getAllUrls)
  .post('/urls', addUrl)
  .delete('/urls/:code', deleteUrl);

// index
router.get('/:code', getShortUrl);

export default router;
