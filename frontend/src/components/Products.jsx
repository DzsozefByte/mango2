import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/zene')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <>
            <h1>Termékek oldal</h1>
            <div>
                {products.map(product => (
                    <div key={product.id}>
                        <h2>{product.mufaj}</h2>
                        <p>{product.frontember}</p>
                    </div>
                ))}
            </div>
        </>
    )
}