import { simpleAPICall } from "../utils/requesting"

const BASE_URL = "http://localhost:5153/api/sample/sample-request"

export const requestSampleRequest = ({ message, verbose = false }) => {
    const formData = new FormData()
    formData.append("message", message)
    return simpleAPICall({ endpoint: BASE_URL, body: formData, verbose: verbose })
}