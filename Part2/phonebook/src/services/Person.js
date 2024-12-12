import axios from 'axios'

const base_url = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(base_url);
    return request.then(response => response.data);
}

const addPerson = (newPersonObject) => {
    const request = axios.post(base_url, newPersonObject);
    return request.then(response => response.data);
}

const updatePerson = (id, updatedDetails) => {
    const url = `http://localhost:3001/persons/${id}`;
    return axios.put(url, updatedDetails).then(response => response.data);
};


const deletePerson = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    // console.log(`Person to be delted has id ${id}`);
    return axios.delete(url);
}


export default { getAll, addPerson, updatePerson  , deletePerson}