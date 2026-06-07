import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import './Home.css'
import ProductsGrid from './ProductsGrid';
import { useSearchParams } from 'react-router';

function Home({cart,getCartData}) {

    
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const getHomeData = async ()=>{
            let res;
            if(search){
                res = await axios.get(`/api/products?search=${search}`);
            }
            else{
                res = await axios.get(`/api/products`);
            }
            setProducts(res.data);
        }
        getHomeData();
    }, [search])


    return (
        <>
            <Header cart={cart}/>
            <div className="home-page">
                <ProductsGrid products={products} getCartData={getCartData}/>
            </div>
        </>
    )
}

export default Home