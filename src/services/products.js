import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/products'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response
}

const getBeanies = async () => {
  const response = await axios.get(`${baseUrl}/beanies`)
  return response.data
}

const getFacemasks = async () => {
  const response = await axios.get(`${baseUrl}/facemasks`)
  return response.data
}

const getGloves = async () => {
  const response = await axios.get(`${baseUrl}/gloves`)
  return response.data
}

const Getters = { getAll, getBeanies, getFacemasks, getGloves }

export default Getters