using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CombinedAPI.Models
{
    public class PostItemOrder
    {
        //public int OrderID { get; set; }
        public int ItemOrderQuantity { get; set; }
        public int TotalAmount { get; set; }
        public int ItemID { get; set; }
        public int CustomerID { get; set; }
    }
}
