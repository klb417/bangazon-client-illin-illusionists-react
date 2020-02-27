import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import APIManager from '../helpers/APIManager'

export default function ProductFormSell() {
    const [product, setProduct] = useState()
    const [producttype, setProducttype] = useState([])
    const history = useHistory()


    const getProductTypes = () => {
        APIManager.getAll('producttypes')
            .then(response => {
                setProducttype(response)
            })
    }

    console.log(producttype)
    useEffect(getProductTypes, [])

    // Grab values from form fields and set to state
    const handleFieldChange = event => {
        setProduct({
            ...product,
            [event.target.id]: event.target.value
        })
    }



    const handleSubmit = event => {
        // console.log("handleSubmit is executing")
        event.preventDefault()
        if (product && product.name && product.price && product.description && product.quantity && product.location && product.image_path && product.product_type_id) {
            const newproduct = {
                "name": product.name,
                "price": Number(product.price),
                "description": product.description,
                "quantity": Number(product.quantity),
                "location": product.location,
                "image_path": product.image_path,
                "product_type_id": Number(product.product_type_id)
            }
    
            APIManager.createNew('products', newproduct)

        } 

    }

    return (
        <>
            <main>
                <form>
                    <fieldset>
                        <label htmlFor="name">Product Name</label>
                        <input
                            onChange={handleFieldChange}
                            id="name"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="price">Price</label>
                        <input
                            onChange={handleFieldChange}
                            id="price"
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="description">Description</label>
                        <input id="description"
                            onChange={handleFieldChange}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            id="quantity"
                            onChange={handleFieldChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="location">Location</label>
                        <input
                            id="location"
                            onChange={handleFieldChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="image_path">Image Path</label>
                        <input
                            id="image_path"
                            onChange={handleFieldChange} />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="product_type_id">Product Type</label>
                        <select
                            className="form-control"
                            id="product_type_id"
                            onChange={handleFieldChange}
                        >
                            {producttype.map(type =>
                                <option key={type.id} value={type.id}>{type.name}</option>
                            )}
                        </select>
                    </fieldset>
                </form>
                <button onClick={handleSubmit}>Submit</button>
            </main>
        </>
    )
}
