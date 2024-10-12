const z = require('zod');

const productSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().optional(),
    category: z.string().min(1, "Category is required"),
});

module.exports = {
    productSchema,
};