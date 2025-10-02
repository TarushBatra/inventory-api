const Product = require('../models/productModel');

const createProduct = async(data) => {
    return Product.create(data);
};

const getAllProducts = async() => Product.find().lean();

const getProductById = async(id) => Product.findById(id);

const updateProduct = async(id, update) => Product.findByIdAndUpdate(id, update, { new: true });

const deleteProduct = async(id) => Product.findByIdAndDelete(id);

// increase stock (atomic)
const increaseStock = async(id, amount) => {
    if (amount <= 0) throw { status: 400, message: 'amount must be > 0' };
    return Product.findByIdAndUpdate(id, { $inc: { stock_quantity: amount } }, { new: true });
};

// decrease stock with atomic precondition
const decreaseStock = async(id, amount) => {
    if (amount <= 0) throw { status: 400, message: 'amount must be > 0' };

    const updated = await Product.findOneAndUpdate({ _id: id, stock_quantity: { $gte: amount } }, { $inc: { stock_quantity: -amount } }, { new: true });

    if (!updated) throw { status: 400, message: 'Insufficient stock' };
    return updated;
};

const getLowStockProducts = async() =>
    Product.find({ $expr: { $lt: ["$stock_quantity", "$low_stock_threshold"] } });

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    increaseStock,
    decreaseStock,
    getLowStockProducts
};