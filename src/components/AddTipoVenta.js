import React, { useState } from "react";
import TipoVentaDataService from "../services/TipoVentaService";
const AddTipoVenta = () => {
    const initialTipoVentaState = {
        id: null,
        descripcion: ""
    };
    const [TipoVenta, setTipoVenta] = useState(initialTipoVentaState);
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = event => {
        const { name, value } = event.target;
        setTipoVenta({ ...TipoVenta, [name]: value });
    };
    const saveTipoVenta = () => {
        var data = {
            descripcion: TipoVenta.descripcion
        };
        TipoVentaDataService.create(data)
            .then(response => {
                setTipoVenta({
                    descripcion: response.data.descripcion
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newTipoVenta = () => {
        setTipoVenta(initialTipoVentaState);
        setSubmitted(false);
    };
    return(
        <div className="submit-form">
        {submitted ? (
            <div>
                <h4>Agregado Corretamente</h4>
                <button className="btn btn-success" onClick={newTipoVenta}>
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
                        value={TipoVenta.descripcion}
                        onChange={handleInputChange}
                        name="descripcion"
                    />
                </div>
                <button onClick={saveTipoVenta} className="btn btn-success">
                    Agregar Tipo de Venta
                </button>
            </div>
        )}
    </div>
    );

};
export default AddTipoVenta;