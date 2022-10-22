import React, { useState, useEffect } from "react";
import TipoVentaDataService from "../services/TipoVentaService";
import { Link } from "react-router-dom";
const TipoVentaList = () => {
   const [tipoVentas, setTipoVentas] = useState([]);
   const [currentTipoVenta, setCurrentTipoVenta] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(-1);

   useEffect(() => {
      retrieveTipoVentas();
   }, []);

   const retrieveTipoVentas = () => {
      TipoVentaDataService.getAll()
         .then(response => {
            setTipoVentas(response.data);
            console.log(response.data);
         })
         .catch(e => {
            console.log(e);
         });
   };
   const refreshList = () => {
      retrieveTipoVentas();
      setCurrentTipoVenta(null);
      setCurrentIndex(-1);
   };
   const setActiveTipoVenta = (tipoVenta, index) => {
      setCurrentTipoVenta(tipoVenta);
      setCurrentIndex(index);
   };


   return (
      <div className="list row">

         <div className="col-md-6">
            <h4>Lista de Tipos de Ventas</h4>
            <ul className="list-group">
               {tipoVentas &&
                  tipoVentas.map((tipoVenta, index) => (
                     <li
                        className={
                           "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveTipoVenta(tipoVenta, index)}
                        key={index}
                     >
                        {tipoVenta.descripcion}
                     </li>
                  ))}
            </ul>

         </div>
         <div className="col-md-6">
            {currentTipoVenta ? (
               <div>
                  <h4>Tipo de Venta</h4>
                  <div>
                     <label>
                        <strong>Descripcion:</strong>
                     </label>{" "}
                     {currentTipoVenta.descripcion}
                  </div>
                  <button className="btn btn-outline-primary">
                    <Link to={"/tipoVentas/" + currentTipoVenta.id} className="btn-success">
                        Editar
                    </Link>
                  </button>
               </div>
            ) : (
               <div>
                  <br />
                  <p>Seleccione un Tipo de Venta</p>
               </div>
            )}
         </div>
      </div>

   );

};
export default TipoVentaList;