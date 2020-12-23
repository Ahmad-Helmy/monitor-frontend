import axios from "axios"

const URL='http://localhost:4200'

export function getPatients() {
    return axios.get(URL+"/patient")
}
export function getPatient(id) {
    return axios.get(`${URL}/patient/${id}`)
}
export function postPatient(name,age) {
    return axios.post(URL+"/patient",{name,age})
}

