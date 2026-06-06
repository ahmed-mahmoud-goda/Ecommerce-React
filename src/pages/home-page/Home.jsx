import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import './Home.css'
import ProductsGrid from './ProductsGrid';

function Home({cart}) {

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const getHomeData = async ()=>{
            const res = await axios.get("/api/products");
            setProducts(res.data);
        }
        getHomeData();
    }, [])


    return (
        <>
            <Header cart={cart}/>
            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    )
}

export default Home