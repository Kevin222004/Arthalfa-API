const Product = require('../models/product');
const {productSchema} = require('../utils/validation');
const {ZodError} = require('zod');
const {Op} = require('sequelize');

exports.createProduct = async (req, res, next) => {
    try {
        const preprocessedData = {
            ...req.body, price: parseFloat(req.body.price)
        };
        const validatedData = productSchema.parse(preprocessedData);

        const product = await Product.create(validatedData);
        res.status(201).json(product);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({error: 'Validation Error', details: error.errors});
        } else if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({error: 'Database Validation Error', details: error.errors});
        }
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * limit;

        const products = await Product.findAndCountAll({
            attributes: ['id', 'name', 'price', 'description', 'category'], limit: limit, offset: offset
        });

        res.json({
            totalItems: products.count,
            totalPages: Math.ceil(products.count / limit),
            currentPage: page,
            data: products.rows
        });
    } catch (error) {
        next(error);
    }
};

exports.searchProducts = async (req, res, next) => {
    try {
        const name = req.query.name || '';
        const category = req.query.category || '';
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;

        const offset = (page - 1) * limit;
        const whereClause = {};

        if (name) {
            whereClause.name = {[Op.like]: `%${name}%`};
        }

        if (category) {
            whereClause.category = {[Op.like]: `%${category}%`};
        }

        const products = await Product.findAndCountAll({
            where: whereClause,
            attributes: ['id', 'name', 'price', 'description', 'category'],
            limit: limit,
            offset: offset,
        });

        // Respond with the search results
        res.json({
            totalItems: products.count,
            totalPages: Math.ceil(products.count / limit),
            currentPage: page,
            data: products.rows
        });
    } catch (error) {
        console.error('Error in searchProducts:', error);
        next(error);
    }
};

exports.getProductById = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            attributes: ['name', 'price', 'description', 'category']
        });
        if (!product) {
            return res.status(404).json({error: 'Product not found'})
        }
        res.json(product);
    } catch (error) {
        next(error);
    }
};

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }

        let updateData = {...req.body};
        if (typeof updateData.price === 'string') {
            updateData.price = parseFloat(updateData.price);
            if (isNaN(updateData.price)) {
                return res.status(400).json({error: 'Invalid price format'});
            }
        }

        const validatedData = productSchema.parse(updateData);

        await product.update(validatedData);

        const updatedProduct = await Product.findByPk(req.params.id, {
            attributes: ['name', 'price', 'description', 'category']
        });

        res.json(updatedProduct);
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({error: error.errors});
        }
        next(error);
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const deleted = await Product.destroy({
            where: {id: req.params.id},
        });
        if (!deleted) {
            return res.status(404).json({error: 'Product not found'})
        }
        return res.status(200).json({msg: 'Successfully deleted'});
    } catch (error) {
        next(error);
    }
};
