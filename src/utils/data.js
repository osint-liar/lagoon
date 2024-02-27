import Mustache from 'mustache';
import {getApplicationKeyToken} from "./app_config";


/**
 * Fetch data from OSINT LIAR
 * @param url
 * @param configurations
 * @returns {Promise<any|{Status: number, Type: string, Message: string, Title: string, Count: number, Records: *[]}>}
 */
export async function fetchOsinLiarData(url, configurations)
{
    let normalizedConfiguration = {
        WebHost: configurations.WebHost,
    }

    if(configurations.SelectedCase?.Name)
    {
        normalizedConfiguration.CaseManagementUuid = configurations.SelectedCase.Uuid
    }

    const renderedUrl = Mustache.render(url, normalizedConfiguration)
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
