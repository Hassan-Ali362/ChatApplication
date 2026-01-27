// Middleware to validate request body
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();     // validation passed
    } 
    catch (err) {
        return res.status(400).json({ message: err.errors[0].message });
    }
};