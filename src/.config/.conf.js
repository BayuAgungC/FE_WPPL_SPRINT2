import URLAPI from "./.url";

const API = {
    POST: `${URLAPI}/api/post`,
    GET: `${URLAPI}/api/get`,
}
const ENDPOINTS = {
    GET: {
        ITEMS: {
            LIST: `${API.GET}/items/list`,
            RECEIVE: `${API.GET}/items/receive`,
            ISSUED: `${API.GET}/items/issued`,
        },
        SUMMARY: {
            ITEMS: `${API.GET}/summary/items`
        }
    },
    POST: {
        LOGIN: `${API.POST}/login`,
        ITEMS: {
            LIST: {
                ADD: `${API.POST}/items/list/add`,
                EDIT: `${API.POST}/items/list/edit`,
                DELETE: `${API.POST}/items/list/delete`,
            },
            RECEIVE: {
                ADD: `${API.POST}/items/receive/add`,
                EDIT: `${API.POST}/items/receive/edit`,
                DELETE: `${API.POST}/items/receive/delete`,
            },
            ISSUED: {
                ADD: `${API.POST}/items/issued/add`,
                EDIT: `${API.POST}/items/issued/edit`,
                DELETE: `${API.POST}/items/issued/delete`,
            }
        },
    }
}

export default ENDPOINTS;