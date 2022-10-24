import React, { useState } from "react";
import ProductoDataService from "../services/ProductoService";
const AddProducto = () => {
    const initialProductoState = {
        id: null,
        descripcion: "",
        cantidad: 1
    };
    const [Producto, setProducto] = useState(initialProductoState);
    const [submitted, setSubmitted] = useState(false);
    const [cVacio, setCVacio] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setProducto({ ...Producto, [name]: value });
    };

    const validation = () => {
        if (Producto.descripcion === "" || Producto.cantidad === "") {
            return false;
        }
        return true;
    };

    const saveProducto = () => {
        if (validation()) {
            var data = {
                descripcion: Producto.descripcion,
                cantidad: Producto.cantidad
            };
            ProductoDataService.create(data)
                .then(response => {
                    setProducto({
                        descripcion: response.data.descripcion,
                        cantidad: response.data.cantidad
                    });
                    setSubmitted(true);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            setCVacio(true);
        }
    };
    const newProducto = () => {
        setProducto(initialProductoState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Agregado Corretamente</h4>
                    <button className="btn btn-success" onClick={newProducto}>
                        Agregar
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripcion</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descripcion"
                            required
                            value={Producto.descripcion}
                            onChange={handleInputChange}
                            name="descripcion"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cantidad"
                            required
                            value={Producto.cantidad}
                            onChange={handleInputChange}
                            name="cantidad"
                        />
                    </div>
                    <button onClick={saveProducto} className="btn btn-success">
                        Agregar Producto
                    </button>
                </div>
            )}
        </div>
    );

};
export default AddProducto;