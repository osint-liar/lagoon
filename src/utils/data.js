import Mustache from 'mustache';


/**
 * Fetch data from OSINT LIAR
 * @param url
 * @param configurations
 * @param token
 * @returns {Promise<any|{Status: number, Type: string, Message: string, Title: string, Count: number, Records: *[]}>}
 */
export async function fetchOsinLiarData(url, configurations, token)
{
    Mustache.escape = function (text) { return text; }
    const renderedUrl = Mustache.render(url, configurations)
    let response
    try {
        response = await fetch(renderedUrl,{
            headers: {Authorization: `Bearer ${token}`}
      })
    }
    catch(error) {
        return {
            Title: 'Critical Error',
            Message: 'Failed to connect. Is OSINT LIAR running?',
            Type: 'danger',
            Status: 500,
            Records: [],
            Count: 0
        }
    }
    const data = await response.json()
    return data
}
