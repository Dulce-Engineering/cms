
const config = 
{
  "localhost": // use locale api
  {
    api_client_url: "http://localhost:81/decms-6dc54/us-central1/api/rpc-client",
    api_server_host: "http://localhost:81/decms-6dc54/us-central1/api"
  },
  "localhost:5000": // use locale api
  {
    api_client_url: "http://localhost:5001/decms-6dc54/us-central1/api/rpc-client",
    api_server_host: "http://localhost:5001/decms-6dc54/us-central1/api"
  },
  "xlocalhost": // use remote api
  {
    api_client_url: "https://us-central1-decms-6dc54.cloudfunctions.net/api/rpc-client",
    api_server_host: "https://us-central1-decms-6dc54.cloudfunctions.net/api"
  },
  default:
  {
    api_client_url: "https://us-central1-decms-6dc54.cloudfunctions.net/api/rpc-client",
    api_server_host: "https://us-central1-decms-6dc54.cloudfunctions.net/api"
  },

  get: function()
  {
    return config[window.location.host] || config.default;
  }
};
export default config;