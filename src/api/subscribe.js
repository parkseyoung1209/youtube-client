import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080/api/"
});

export const count = async (channelCode) => {
    return await authorize.get(`sub/${channelCode}/count`);
}

const authorize = axios.create({
    baseURL : "http://localhost:8080/api/private/",
    headers : {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const create = async (data) => {
    return await authorize.post("sub", data);
}

export const remove = async (subCode) => {
    return await authorize.delete(`sub/${subCode}`);
}

export const getSub = async(channelCode) => {
    return await authorize.get(`sub/${channelCode}`);
}