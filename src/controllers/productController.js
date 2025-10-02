const service = require('../services/productService');

const wrap = fn => (req, res, next) => fn(req, res, next).catch(next);

exports.create = wrap(async(req, res) => {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
});

exports.list = wrap(async(req, res) => {
    const products = await service.getAllProducts();
    res.json(products);
});

exports.get = wrap(async(req, res) => {
    const product = await service.getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

exports.update = wrap(async(req, res) => {
    const updated = await service.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
});

exports.remove = wrap(async(req, res) => {
    const deleted = await service.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Deleted' });
});

exports.increase = wrap(async(req, res) => {
    const { amount } = req.body;
    const updated = await service.increaseStock(req.params.id, Number(amount));
    res.json(updated);
});

exports.decrease = wrap(async(req, res) => {
    const { amount } = req.body;
    const updated = await service.decreaseStock(req.params.id, Number(amount));
    res.json(updated);
});

exports.lowStock = wrap(async(req, res) => {
    const list = await service.getLowStockProducts();
    res.json(list);
});