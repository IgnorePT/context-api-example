import { createContext, useEffect, useState } from "react";

//Criar Contexto - createContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	//Criar toda a logica do cart
	// Estados, metodos, valores

	//Open ShoppingCart Popup
	const [isShoppingCartOpen, setIsShoppingCartOpen] = useState(false);
	const toggleShoppingCart = () => {
		setIsShoppingCartOpen(!isShoppingCartOpen);
	};

	// Carrinho
	const cartInLocalStorage = localStorage.getItem("cart");
	const [cart, setCart] = useState(
		cartInLocalStorage ? JSON.parse(cartInLocalStorage) : []
	);

	//AddToCart
	const addToCart = (product) => {
		//Buscar se existe no Carrinho
		const isProductInCart = cart.find(
			(cartProduct) => cartProduct.id === product.id
		);

		if (isProductInCart) {
			const updatedCart = cart.map((cartProduct) =>
				cartProduct.id === product.id
					? { ...cartProduct, quantity: cartProduct.quantity + 1 }
					: cartProduct
			);

			setCart(updatedCart);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
	};

	//RemoveFromCart
	const removeFromCart = (productId) => {
		console.log("removeFromCart");

		const isProductInCart = cart.find(
			(cartProduct) => cartProduct.id === productId
		);

		if (isProductInCart) {
			setCart(cart.filter((cartProduct) => cartProduct.id !== productId));
		}
	};

	const getCartQuantity = () => {
		return cart.reduce((acc, product) => {
			return product.quantity + acc;
		}, 0);
	};

	const getTotalPrice = () => {
		return cart.reduce((acc, product) => {
			return product.price * product.quantity + acc;
		}, 0);
	};

	useEffect(() => {
		const cartInString = JSON.stringify(cart);
		localStorage.setItem("cart", cartInString);
	}, [cart]);

	return (
		<CartContext.Provider
			value={{
				isShoppingCartOpen,
				toggleShoppingCart,
				cart,
				addToCart,
				removeFromCart,
				getCartQuantity,
				getTotalPrice,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};
