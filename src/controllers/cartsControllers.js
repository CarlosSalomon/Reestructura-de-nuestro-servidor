import {getUsers} from "../service/userService.js";
import {getCartsById,removeallProductFromCart, removeProductFromCart,addProductInCart} from '../service/cartService.js';
import {getProductById} from "../service/productService.js";


export const getCartById = async (req, res) => {
    const logUser = req.session.user;
    const user= await getUsers(logUser.email)
    const cartId = user.cartId
    const productsInCart = await getCartsById(cartId)
    const productList = Object.values(productsInCart.products)
    res.render("partials/cart", { productList })
}

export const emptyCart = async  (req,res)=>{
    try {
        const logUser = req.session.user;
        const user= await getUsers(logUser.email)
        const cartId = user.cartId
        const cart = await removeallProductFromCart(cartId);
        res.status(200).json({ message: 'Carrito vaciado exitosamente' });
    } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        res.status(500).json({ error: 'Error al vaciar el carrito' });
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const logUser = req.session.user;
        const user= await getUsers(logUser.email)
        const cartId = user.cartId
        const removeCartProduct = await removeProductFromCart(cartId, productId);
        // En lugar de enviar un script con alert y redirección, puedes enviar un mensaje JSON de éxito
        res.json({ success: true, message: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ message: 'Error al agregar producto al carrito' });
    }
}

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body; // Obtener la cantidad del cuerpo de la solicitud
        const logUser = req.session.user;
        const user= await getUsers(logUser.email)
        const cartId = user.cartId
        const cart = await getCartsById(cartId);
        if (productId) {
            const id = productId;
            const productDetails = await getProductById(productId);
            const addedProduct = await addProductInCart(cartId, productDetails, id, quantity); // Pasar la cantidad al método addProductInCart
        }
        res.json({ success: true, message: 'Producto agregado al carrito' });
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
        res.status(500).json({ message: 'Error al agregar producto al carrito' });
    }
}

