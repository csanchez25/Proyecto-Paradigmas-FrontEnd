import http from "../http-common";

const getAll = () => {
    return http.get("/Ventas");
};

const get = id => {
    return http.get(`/Ventas/${id}`);
};

const create = data => {
    return http.post("/Ventas", data);
};

const update = (id, data) => {
    return http.put(`/Ventas/`, data);
};

const remove = id => {
    return http.delete(`/Ventas/${id}`);
};

const VentaService = {
    getAll,
    get,
    create,
    update,
    remove
};
export default VentaService;