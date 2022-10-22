import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PersonaDataService from "../services/PersonaService";

const Persona = props => {
    const { id } = useParams();
    let navigate = useNavigate();
    const initialPersonaState = {
        id: null,
        identificacion: "",
        nombre: "",
    };
    const [currentPersona, setCurrentPersona] = useState(initialPersonaState);
    const [message, setMessage] = useState("");
    const getPersona = id => {
        PersonaDataService.get(id).then(response => {
            setCurrentPersona(response.data);
            console.log(response.data);
        }) .catch(e => {
            console.log(e);
        })
    };
    useEffect(() => {
        if (id)
            getPersona(id);
    }, [id]);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentPersona({ ...currentPersona, [name]: value});
    };

    const updatePersona = () => {
        PersonaDataService.update(currentPersona.id, currentPersona)
            .then(response => {
                console.log(response.data);
                setMessage("Persona actualizada");
            })
            .catch(e => {
                console.log(e);
            });
    };
    const deletePersona = () => {
        PersonaDataService.remove(currentPersona.id).then(response => {
            console.log(response.data);
            navigate("/personas");
        })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            {currentPersona ? (
                <div className="edit-form">
                    <h2>Personas</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="identificacion">Identificacion</label>
                            <input type="text" className="form-control" id="identificacion"
                            name="identificacion" value={currentPersona.identificacion}
                            onChange={handleInputChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" className="form-control" id="nombre"
                            name="nombre" value={currentPersona.nombre}
                            onChange={handleInputChange}/>
                        </div>
                    </form>
                    <button className="btn btn-outline-danger" onClick={deletePersona}>
                        Eliminar
                    </button>
                    <button type="submit" className="btn btn-outline-primary" onClick={updatePersona}>
                        Actualizar
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br/>
                    <p>Seleccione una persona</p>
                </div>
            )}
        </div>
    );
};
export default Persona;