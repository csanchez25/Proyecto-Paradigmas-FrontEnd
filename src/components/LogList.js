import React, { useState, useEffect } from "react";
import LogDataService from "../services/LogService";
const LogList = () => {
   const [logs, setLogs] = useState([]);
   const [currentLog, setCurrentLog] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(-1);

   useEffect(() => {
      retrieveLogs();
   }, []);

   const retrieveLogs = () => {
      LogDataService.getAll()
         .then(response => {
            setLogs(response.data);
            console.log(response.data);
         })
         .catch(e => {
            console.log(e);
         });
   };
   const refreshList = () => {
      retrieveLogs();
      setCurrentLog(null);
      setCurrentIndex(-1);
   };

   return (
      <div className="container mt-3">

         <div className="col-md-6">
            <h4>Lista de Logs</h4>
            <table class="table bordered">
                <thead>
                    <th>ID</th>
                    <th>Metodo</th>
                    <th>Fecha</th>
                    <th>Descripcion</th>
                </thead>
                {logs &&
                    logs.map((log) => (
                        <tbody>
                            <tr>
                                <th>{log.id}</th>
                                <th>{log.metodo}</th>
                                <th>{log.fecha}</th>
                                <th>{log.descripcion}</th>
                            </tr>
                        </tbody>
                    ))}
            </table>
         </div>
      </div>
   );

};
export default LogList;