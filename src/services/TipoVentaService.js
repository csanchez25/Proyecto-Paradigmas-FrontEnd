import http from "../http-common";

const getAll = () => {
    return http.get("/tipoVentas");
};

const get = id => {
    return http.get(`/tipoVentas/${id}`);
};

const create = data => {
    return http.post("/tipoVentas", data);
};

const update = (id, data) => {
    return http.put(`/tipoVentas/`, data);
};

const remove = id => {
    return http.delete(`/tipoVentas/${id}`);
};

const TipoVentaService = {
    getAll,
    get,
    create,
    update,
    remove
};
export default TipoVentaService;