import http from "../http-common";
const getAll = () => {
    return http.get("/audit");
   };

   const LogService = {
    getAll
   };
   export default LogService;