import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('index.handlebars', { name: 'Marcelo'});
})

export default router;