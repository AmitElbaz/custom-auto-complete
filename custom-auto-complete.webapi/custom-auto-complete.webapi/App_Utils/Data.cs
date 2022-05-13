using custom_auto_complete.webapi.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace custom_auto_complete.webapi.App_Utils
{
    public class Data
    {
        public static Data _instance;
        private static List<City> _cities;
        private static readonly string JSON_PATH = ConfigurationManager.AppSettings["JSON_PATH"].ToString();
        

        public static Data Instance()
        {
            try
            {
                if (_instance == null)
                {
                    _instance = new Data();
                    _cities = readJson();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


            return _instance;
        }

        private static List<City> readJson()
        {
            try
            {
                string appRootPath = AppDomain.CurrentDomain.BaseDirectory;
                using (StreamReader r = new StreamReader(AppDomain.CurrentDomain.BaseDirectory + JSON_PATH))
                {
                    string json = r.ReadToEnd();
                    List<City> cities = JsonConvert.DeserializeObject<List<City>>(json);
                    return cities;
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public static List<City> filterCities(string cityPrefix)
        {
            try
            {
                return _cities.Where(c => c.name.ToLower().StartsWith(cityPrefix.ToLower())).Take(100).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }            
        }
    }
}