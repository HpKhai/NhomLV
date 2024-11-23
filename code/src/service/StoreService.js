
import axios from "axios"

export const createStore = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/store/create-store`, data)
    return res.data
}