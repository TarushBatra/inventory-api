const express = require('express');
const ctrl = require('../controllers/productController');

const router = express.Router();

router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/low-stock', ctrl.lowStock);
router.get('/:id', ctrl.get);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.patch('/:id/increase', ctrl.increase);
router.patch('/:id/decrease', ctrl.decrease);

module.exports = router;