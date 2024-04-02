import { productsModel } from "../models/products.model.js"

export const getProducts = async () => {
    try {
        return await productsModel.find().lean();
    } catch (err) {
        return err
    }
}


export const getProductById = async (id) => {
    try {
        return await productsModel.findById(id)
    } catch (err) {
        return { error: err.message }
    }
}



export const addProduct = async (product) => {
    try {
        await productsModel.create(product);
        return await productsModel.findOne({ title: product.title })
    }
    catch (err) {
        return err
    }
}



export const updateProduct = async (id, product) => {
    try {
        return await productsModel.findByIdAndUpdate(id, { $set: product });
    } catch (err) {
        return err
    }
}

export const deleteProduct = async (id) => {
    try {
        return await productsModel.findByIdAndDelete(id);
    } catch (err) {
        return err
    }
}
