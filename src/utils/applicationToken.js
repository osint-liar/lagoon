
const getApplicationToken = () => {
    const token = localStorage.getItem("applicationToken")
    return token
}


const setApplicationToken = (token) => {
    localStorage.setItem("applicationToken", token);
}

const getConfiguration = () => {
    const configuration = {
        WebHost : "http://127.0.0.1:9906/"
    }
    return configuration
}

module.exports = {
    getApplicationToken,
    setApplicationToken,
    getConfiguration
};