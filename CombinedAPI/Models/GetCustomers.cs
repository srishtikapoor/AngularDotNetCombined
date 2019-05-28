using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CombinedAPI.Models
{
    public class GetCustomers
    {
        public int CustomerID { get; set; }
        public string CustomerName{ get; set; }
        public string CustomerEmail { get; set; }
    }
}
