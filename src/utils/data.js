import Mustache from 'mustache';
import {getApplicationKeyToken} from "./app_config";


/**
 * Fetch data from OSINT LIAR
 * @param url
 * @param configurations
 * @returns {Promise<any|{Status: number, Type: string, Message: string, Title: string, Count: number, Records: *[]}>}
 */
export async function fetchOsintLiarData(url, configurations)
{
    const renderedUrl = Mustache.render(url, {
        WebHost : "http://127.0.0.1:9906/",
    })
    let response
    try {
        response = await fetch(renderedUrl,{
            headers: {Authorization: `Bearer ${getApplicationKeyToken()}`}
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

/**
 * Fetch data from the sql endpoint
 * @param sql
 * @param configurations
 * @returns {Promise<*|{Status: number, Type: string, Message: string, Title: string, Count: number, Records: *[]}>}
 */
async function fetchDataBySql(sql, configurations){
    const data = await fetchOsintLiarData("{{WebHost}}v1/analysis-tool/raw-sql?SqlQuery="+encodeURIComponent(sql), configurations)
    return data
}

