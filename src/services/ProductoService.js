import http from "../http-common";

const getAll = () => {
    return http.get("/productos");
};

const get = id => {
    return http.get(`/productos/${id}`);
};

const create = data => {
    return http.post("/productos", data);
};

const update = (id, data) => {
    return http.put(`/productos/`, data);
};

const remove = id => {
    return http.delete(`/productos/${id}`);
};

const ProductoService = {
    getAll,
    get,
    create,
    update,
    remove
};
export default ProductoService;