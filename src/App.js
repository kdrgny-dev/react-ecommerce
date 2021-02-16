import React, {useState, useEffect} from 'react'
import { Products, Navbar, Cart } from './components'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {commerce} from './lib/commerce'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setcart] = useState({})

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()
        
        setProducts(data);
    }

    const fetchCart = async () => {
        setcart(await commerce.cart.retrieve())
    }
    
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        setcart(item.cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    console.log(cart)
    

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>

                    <Route exact path="/cart">
                        <Cart cart={cart} />
                    </Route>
                    
                </Switch>
                
            </div>
        </Router>
        
    )
}

export default App
