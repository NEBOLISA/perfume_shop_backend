import Product from "../models/Product.js";



export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.json({ products })
    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }
}


export const getProductById = async (req, res) => {

    const productId = req.params.id

    try {
        const product = await Product.findById(productId)
        if (product) {
            res.json({ product })
        } else {
            res.status(404).json({ message: "Product not found" })
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error })
    }

}

export const createProduct = async (req, res) => {
    try {
        const { name,sku,quantity,pictures,inStock,price,description } = req.body;

        const product = new Product({
            name,
            sku,
            quantity,
            pictures,
            inStock,
            price,
            description
        });

        const savedProduct = await product.save();
        
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product' });
    }
};


export const addReview = async (req, res) => {
    const { name, email, rating, title, description } = req.body;
    
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
  
      // Add new review
      product.reviews.push({ name, email, rating, title, description });
         
      // Recalculate average rating
      const totalReviews = product.reviews.length;
      const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
      product.averageRating = totalRating / totalReviews;
  
      await product.save();
      res.status(201).json({ message: 'Review added successfully', product });
    } catch (error) {
      res.status(500).json({ message: 'Error adding review',error });
    }
  };