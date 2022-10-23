import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import ProductoDataService from "../services/ProductoService";

const Producto = props => {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialProductoState = {
        id: null,
        descripcion: "",
        cantidad: 0
    };
    const [currentProducto, setCurrentProducto] = useState(initialProductoState);
    const [message, setMessage] = useState("");
    const getProducto = id => {
        ProductoDataService.get(id).then(response => {
            setCurrentProducto(response.data);
            console.log(response.data);
        }) .catch(e => {
            console.log(e);
        })
    };
    useEffect(() => {
        if (id)
            getProducto(id);
    }, [id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentProducto({ ...currentProducto, [name]: value});
    };

    const updateProducto = () => {
        ProductoDataService.update(currentProducto.id, currentProducto).then(response => {
                console.log(response.data);
                setMessage("Producto actualizado");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const deleteProducto = () => {
        ProductoDataService.remove(currentProducto.id).then(response => {
            console.log(response.data);
            navigate("/productos");
        })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentProducto ? (
                <div className="edit-form">
                    <h4>Producto</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripcion</label>
                            <input type="text" className="form-control" id="descripcion"
                                name="descripcion" value={currentProducto.descripcion}
                                onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cantidad">Cantidad</label>
                            <input type="text" className="form-control" id="cantidad"
                                name="cantidad" value={currentProducto.cantidad} onChange={handleInputChange} />
                        </div>
                    </form>
                    <button className="btn btn-outline-danger" onClick={deleteProducto}>
                        Eliminar
                    </button>
                    <button type="submit" className="btn btn-outline-primary" onClick={updateProducto}>
                        Actualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Seleccione un producto</p>
                </div>
            )}
        </div>
    );
};
export default Producto;