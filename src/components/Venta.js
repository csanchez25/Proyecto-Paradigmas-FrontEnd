import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PersonaDataService from "../services/PersonaService";
import ProductoDataService from "../services/ProductoService";
import TipoVentaDataService from "../services/TipoVentaService";
import VentaDataService from "../services/VentaService";

const Venta = props => {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialVentaState = {
        id: null,
        persona: "",
        producto: "",
        tipoVenta: "",
        cantidad: 0,
        fecha: null
    };
    const [persona, setPersona] = useState([]);
    const [producto, setProducto] = useState([]);
    const [tipoVenta, setTipoVenta] = useState([]);
    const [currentVenta, setCurrentVenta] = useState(initialVentaState);
    const [message, setMessage] = useState("");
    const getVenta = id => {
        VentaDataService.get(id).then(response => {
            setCurrentVenta(response.data);
            console.log(response.data);
        }) .catch(e => {
            console.log(e);
        })
    };
    useEffect(() => {
        if (id){
            getVenta(id);
        }
        retrievePersonas();
        retriveProductos();
        retriveTipoVentas();
    }, [id]);

    const retrievePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersona(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retriveProductos = () => {
        ProductoDataService.getAll()
            .then(response => {
                setProducto(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retriveTipoVentas = () => {
        TipoVentaDataService.getAll()
            .then(response => {
                setTipoVenta(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentVenta({ ...currentVenta, [name]: value});
    };

    const updateVenta = () => {
        VentaDataService.update(currentVenta.id, currentVenta).then(response => {
                console.log(response.data);
                setMessage("Venta actualizada");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const deleteVenta = () => {
        VentaDataService.remove(currentVenta.id).then(response => {
            console.log(response.data);
            navigate("/ventas");
        })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentVenta ? (
                <div className="edit-form">
                    <h4>Venta</h4>
                    <label for="persona">Cliente:</label>
                    <select
                        className="form-select"
                        name="persona"
                        id="persona"
                        value={currentVenta.persona}
                        onChange={handleInputChange}
                        required
                    >
                        {persona.map((persona) => (
                            <option value={persona.identificacion}>{persona.identificacion}</option>
                        ))}
                    </select>
                    <label for="producto">Producto:</label>
                    <select
                        className="form-select"
                        name="producto"
                        id="producto"
                        value={currentVenta.producto}
                        onChange={handleInputChange}
                        required
                    >
                        {producto.map((producto) => (
                            <option value={producto.descripcion}>{producto.descripcion}</option>
                        ))}
                    </select>
                    <label for="tipoVenta">Seleccione el Tipo de Venta:</label>
                    <select
                        className="form-select"
                        name="tipoVenta"
                        id="tipoVenta"
                        value={currentVenta.tipoVenta}
                        onChange={handleInputChange}
                        required
                    >
                        {tipoVenta.map((tipoVenta) => (
                            <option value={tipoVenta.descripcion}>{tipoVenta.descripcion}</option>
                        ))}
                    </select>
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cantidad"
                        value={currentVenta.cantidad}
                        onChange={handleInputChange}
                        name="cantidad"
                    />
                    <label htmlFor="cantidad">Fecha:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        value={currentVenta.fecha}
                        onChange={handleInputChange}
                        name="fecha"
                    />
                    <button className="btn btn-outline-danger" onClick={deleteVenta}>
                        Eliminar
                    </button>
                    <button type="submit" className="btn btn-outline-primary" onClick={updateVenta}>
                        Actualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Seleccione una Venta</p>
                </div>
            )}
        </div>
    );
};
export default Venta;