/**
 * Application Token is provided by OSINT LIAR
 * @returns {string}
 */
const getApplicationKeyToken = () => {
    const token = localStorage.getItem("applicationToken")
    return token
}

const setApplicationToken = (token) => {
    localStorage.setItem("applicationToken", token);
}

/**
 * Default web configuration for connecting to OSINT LIAR.
 * @returns {{Path: null, WebHost: string, SelectedCase: null, Algorithm: null}}
 */
const getDefaultConfiguration = () => {
    const configuration = {
        WebHost : "http://127.0.0.1:9906/",
        Algorithm: null,
        Path: null,
        SelectedCase: null
    }
    return configuration
}


const getAlgorithm = () => {
    const algorithm = localStorage.getItem("algorithm")
    return algorithm
}

const setAlgorithm = (algorithm) => {
    localStorage.setItem("algorithm", algorithm);
    return algorithm
}



module.exports = {
    getApplicationKeyToken,
    setApplicationToken,
    getDefaultConfiguration,
    getAlgorithm,
    setAlgorithm
};