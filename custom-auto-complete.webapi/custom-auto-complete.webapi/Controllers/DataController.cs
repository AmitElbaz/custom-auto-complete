using custom_auto_complete.webapi.App_Utils;
using custom_auto_complete.webapi.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace custom_auto_complete.webapi.Controllers
{
    [RoutePrefix("api/Data")]
    public class DataController : ApiController
    {
        public DataController()
        {
            Data.Instance();
        }

        [HttpGet, Route("getFilterdCities")]
        public List<City> getFilterdCities(string cityPrefix)
        {
            return Data.filterCities(cityPrefix);            
        }

    }
}
