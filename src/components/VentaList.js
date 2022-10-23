import React, { useState, useEffect } from "react";
import VentaDataService from "../services/VentaService";
import { Link } from "react-router-dom";
const VentaList = () => {
   const [ventas, setVentas] = useState([]);
   const [currentVenta, setCurrentVenta] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(-1);

   useEffect(() => {
      retrieveVentas();
   }, []);

   const retrieveVentas = () => {
      VentaDataService.getAll()
         .then(response => {
            setVentas(response.data);
            console.log(response.data);
         })
         .catch(e => {
            console.log(e);
         });
   };
   const refreshList = () => {
      retrieveVentas();
      setCurrentVenta(null);
      setCurrentIndex(-1);
   };
   const setActiveVenta = (venta, index) => {
      setCurrentVenta(venta);
      setCurrentIndex(index);
   };


   return (
      <div className="list row">

         <div className="col-md-6">
            <h4>Lista de Ventas</h4>
            <ul className="list-group">
               {ventas &&
                  ventas.map((venta, index) => (
                     <li
                        className={
                           "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveVenta(venta, index)}
                        key={index}
                     >
                        {venta.id}
                     </li>
                  ))}
            </ul>

         </div>
         <div className="col-md-6">
            {currentVenta ? (
               <div>
                  <h4>Venta</h4>
                  <div>
                     <label>
                        <strong>ID del Cliente:</strong>
                     </label>{" "}
                     {currentVenta.persona}
                  </div>
                  <div>
                     <label>
                        <strong>Producto:</strong>
                     </label>{" "}
                     {currentVenta.producto}
                  </div>
                  <div>
                     <label>
                        <strong>Tipo de Venta:</strong>
                     </label>{" "}
                     {currentVenta.tipoVenta}
                  </div>
                  <div>
                     <label>
                        <strong>Cantidad:</strong>
                     </label>{" "}
                     {currentVenta.cantidad}
                  </div>
                  <div>
                     <label>
                        <strong>Fecha:</strong>
                     </label>{" "}
                     {currentVenta.fecha}
                  </div>
                  <button className="btn btn-outline-primary">
                    <Link to={"/ventas/" + currentVenta.id} className="btn-success">
                        Editar
                    </Link>
                  </button>
               </div>
            ) : (
               <div>
                  <br />
                  <p>Seleccione una Venta</p>
               </div>
            )}
         </div>
      </div>

   );

};
export default VentaList;