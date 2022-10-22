import React, { useState, useEffect } from "react";
import ProductoDataService from "../services/ProductoService";
import { Link } from "react-router-dom";
const ProductoList = () => {
   const [productos, setProductos] = useState([]);
   const [currentProducto, setCurrentProducto] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(-1);

   useEffect(() => {
      retrieveProductos();
   }, []);

   const retrieveProductos = () => {
      ProductoDataService.getAll()
         .then(response => {
            setProductos(response.data);
            console.log(response.data);
         })
         .catch(e => {
            console.log(e);
         });
   };
   const refreshList = () => {
      retrieveProductos();
      setCurrentProducto(null);
      setCurrentIndex(-1);
   };
   const setActiveProducto = (producto, index) => {
      setCurrentProducto(producto);
      setCurrentIndex(index);
   };


   return (
      <div className="list row">

         <div className="col-md-6">
            <h4>Lista de Productos</h4>
            <ul className="list-group">
               {productos &&
                  productos.map((producto, index) => (
                     <li
                        className={
                           "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveProducto(producto, index)}
                        key={index}
                     >
                        {producto.descripcion}
                     </li>
                  ))}
            </ul>

         </div>
         <div className="col-md-6">
            {currentProducto ? (
               <div>
                  <h4>Producto</h4>
                  <div>
                     <label>
                        <strong>Descripcion:</strong>
                     </label>{" "}
                     {currentProducto.descripcion}
                  </div>
                  <div>
                     <label>
                        <strong>Cantidad:</strong>
                     </label>{" "}
                     {currentProducto.cantidad}
                  </div>
                  <button className="btn btn-outline-primary">
                    <Link to={"/productos/" + currentProducto.id} className="btn-success">
                        Editar
                    </Link>
                  </button>
               </div>
            ) : (
               <div>
                  <br />
                  <p>Seleccione una Producto</p>
               </div>
            )}
         </div>
      </div>

   );

};
export default ProductoList;