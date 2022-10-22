import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import TipoVentaDataService from "../services/TipoVentaService";

const TipoVenta = props => {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialTipoVentaState = {
        id: null,
        descripcion: ""
    };
    const [currentTipoVenta, setCurrentTipoVenta] = useState(initialTipoVentaState);
    const [message, setMessage] = useState("");
    const getTipoVenta = id => {
        TipoVentaDataService.get(id).then(response => {
            setCurrentTipoVenta(response.data);
            console.log(response.data);
        }) .catch(e => {
            console.log(e);
        })
    };
    useEffect(() => {
        if (id)
            getTipoVenta(id);
    }, [id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentPersona({ ...currentTipoVenta, [name]: value});
    };

    const updateTipoVenta = () => {
        TipoVentaDataService.update(currentTipoVenta.id, currentTipoVenta)
            .then(response => {
                console.log(response.data);
                setMessage("Tipo de Venta actualizado");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const deleteTipoVenta = () => {
        TipoVentaDataService.remove(currentTipoVenta.id).then(response => {
            console.log(response.data);
            navigate("/tipoVentas");
        })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentTipoVenta ? (
                <div className="edit-form">
                    <h4>Tipo de Venta</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripcion</label>
                            <input type="text" className="form-control" id="descripcion"
                                name="descripcion" value={currentTipoVenta.descripcion}
                                onChange={handleInputChange} />
                        </div>
                    </form>
                    <button className="btn btn-outline-danger" onClick={deleteTipoVenta}>
                        Eliminar
                    </button>
                    <button type="submit" className="btn btn-outline-primary" onClick={updateTipoVenta}>
                        Actualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Seleccione un Tipo de Venta</p>
                </div>
            )}
        </div>
    );
};
export default TipoVenta;