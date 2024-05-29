const { body, validationResult } = require('express-validator');

// Validation middleware for creating an item
const validateCreateItem = [
    body('sku')
        .isLength({ min: 10, max: 10 }).withMessage('SKU should be 10 characters.')
        .isAlphanumeric().withMessage('SKU should only contain alphanumeric characters.'),
    body('title')
        .isLength({ max: 50 }).withMessage('Title should be no longer than 50 characters.'),
    body('price')
        .isFloat({ min: 0 }).withMessage('Price should be a positive number.'),
    body('description')
        .optional().isString().withMessage('Description should be a string.'),
    body('category')
        .optional().isString().withMessage('Category should be a string.'),
    body('image')
        .optional().isURL().withMessage('Image should be a valid URL.'),
    body('rating')
        .optional().isInt({ min: 0, max: 5 }).withMessage('Rating should be an integer between 0 and 5.'),
    body('quantity')
        .optional().isInt({ min: 0 }).withMessage('Quantity should be a non-negative integer.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation middleware for creating a user
const validateCreateUser = [
    body('firstName')
        .isString().withMessage('First name should be a string.')
        .isLength({ min: 2 }).withMessage('First name should be at least 2 characters long.'),
    body('lastName')
        .isString().withMessage('Last name should be a string.')
        .isLength({ min: 2 }).withMessage('Last name should be at least 2 characters long.'),
    body('email')
        .isEmail().withMessage('Please enter a valid email address.'),
    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/\d/).withMessage('Password must contain at least 1 digit.')
        .matches(/[a-z]/).withMessage('Password must contain at least 1 lowercase letter.')
        .matches(/[A-Z]/).withMessage('Password must contain at least 1 uppercase letter.')
        .not().matches(/\s/).withMessage('Password must not contain spaces.'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateCreateItem,
    validateCreateUser
};
