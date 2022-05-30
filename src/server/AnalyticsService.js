import api from "./api";

export default {
    downloadExcel(start, end) {
            start = start.split('T')[0];
            end = end.split('T')[0];
           return api.get('/analytics/fee/', { params: { start, end } })
    },
    getName(total, used, free) {
        return api.get('/analytics/data/', { total, used, free })
    },
    deleteFile(files) {
        return api.delete(`/analytics/data/${files}/`, );
    },
    downloadZip() {
        return api.get('/analytics/zip/');
    },
    deleteZip() {
        return api.delete('/analytics/zip/');

    }
}