import React, { useState, useEffect } from "react";
import PersonaDataService from "../services/PersonaService";
import ProductoDataService from "../services/ProductoService";
import TipoVentaDataService from "../services/TipoVentaService";
import VentaDataService from "../services/VentaService";

const AddVenta = () => {
    const initialVentaState = {
        id: null,
        persona: "",
        producto: "",
        tipoVenta: "",
        cantidad: 0,
        fecha: null
    };

    useEffect(() => {
        retrievePersonas();
        retriveProductos();
        retriveTipoVentas();
    }, []);

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

    const [persona, setPersona] = useState([]);
    const [producto, setProducto] = useState([]);
    const [tipoVenta, setTipoVenta] = useState([]);
    const [venta, setVenta] = useState(initialVentaState);
    const [submitted, setSubmitted] = useState(false);
    const [errorCant, setErrorCant] = useState(false);
    const [cVacio, setCVacio] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setVenta({ ...venta, [name]: value });
    }

    const validation = () => {
        if (venta.persona === "" || venta.producto === "" || venta.tipoVenta === "" || venta.fecha === null) {
            return false;
        }
        return true;
    };

    const validateCant = () => {
        if (venta.cantidad <= 0) {
            setErrorCant(true);
            return false;
        }
        return true;
    };

    const saveVenta = () => {
        if (validation()) {
            if (validateCant()) {
                var data = {
                    persona: venta.persona,
                    producto: venta.producto,
                    tipoVenta: venta.tipoVenta,
                    cantidad: venta.cantidad,
                    fecha: venta.fecha
                };

                VentaDataService.create(data)
                    .then(response => {
                        setVenta({
                            persona: response.data.descripcion,
                            producto: response.data.producto,
                            tipoVenta: response.data.tipoVenta,
                            cantidad: response.data.cantidad,
                            fecha: response.data.fecha
                        });
                        setSubmitted(true);
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            } else {
                setErrorCant(true);
            }
        } else {
            setCVacio(true);
        }
    };
    const newVenta = () => {
        setVenta(initialVentaState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Agregado Corretamente</h4>
                    <button className="btn btn-success" onClick={newVenta}>
                        Agregar
                    </button>
                </div>
            ) : (
                <div className="form-group">
                    <label for="persona">Seleccione el Cliente:</label>
                    <select
                        className="form-select"
                        name="persona"
                        id="persona"
                        value={venta.persona}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione el Cliente</option>
                        {persona.map((persona) => (
                            <option value={persona.identificacion}>{persona.identificacion}</option>
                        ))}
                    </select>
                    <label for="producto">Seleccione el Producto:</label>
                    <select
                        className="form-select"
                        name="producto"
                        id="producto"
                        value={venta.producto}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione el Producto</option>
                        {producto.map((producto) => (
                            <option value={producto.descripcion}>{producto.descripcion}</option>
                        ))}
                    </select>
                    <label for="tipoVenta">Seleccione el Tipo de Venta:</label>
                    <select
                        className="form-select"
                        name="tipoVenta"
                        id="tipoVenta"
                        value={venta.tipoVenta}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Seleccione el Tipo de Venta</option>
                        {tipoVenta.map((tipoVenta) => (
                            <option value={tipoVenta.descripcion}>{tipoVenta.descripcion}</option>
                        ))}
                    </select>
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cantidad"
                        required
                        value={venta.cantidad}
                        onChange={handleInputChange}
                        name="cantidad"
                    />
                    <label htmlFor="cantidad">Fecha:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="fecha"
                        required
                        value={venta.fecha}
                        onChange={handleInputChange}
                        name="fecha"
                    />
                    <button onClick={saveVenta} className="btn btn-outline-success">
                        Agregar Venta
                    </button>
                    {/* <div style="display:none">
                        <p className={errorCant ? "text-danger mt-3" : "d-done"}>La cantidad ingresada debe ser mayor a 0</p>

                        <p className={cVacio ? "text-danger mt-3" : "d-done"}>LLene todos los espacios para continuar</p>
                    </div> */}
                    
                </div>
            )}
        </div>
    );

};
export default AddVenta;