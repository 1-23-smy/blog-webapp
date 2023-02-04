//API messages
export const API_NOTIFICATION_MSG =
{
    loading: {
        title: "loading...",
        message: "Data is being loaded please wait."
    },
    success: {
        title: "Success",
        message: "Data successfully loaded"
    },
    responseFailure: {
        title: "Error",
        message: "An error occured while fetching response from the server. Please try again"
    },
    requestFailure: {
        title: "Error",
        message: "An error occured while parsing the data"
    },
    networkError: {
        title: "Error",
        message: "Unable to connect with the server, please check the internet connectivity and try again later"
    }
}

//API SERVICE CALL
export const SERVICE_URLS = {
    userSignup: {
        url: '/signup',
        method: 'POST'
    }
}