import Hero from "./components/Hero/Hero";
import ProductList from "./components/ProductList/ProductList";
import Header from "./components/layout/Header/Header";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { CartProvider } from "./contexts/CartContext";

function App() {
	return (
		<div className="bg-white">
			<CartProvider>
				<Header />
				<Hero />
				<ProductList />
				<ShoppingCart />
			</CartProvider>
		</div>
	);
}

export default App;
