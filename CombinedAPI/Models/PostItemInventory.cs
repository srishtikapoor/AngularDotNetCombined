using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CombinedAPI.Models
{
    public class PostItemInventory
    {
        public int ItemInventoryID { get; set; }
        public int ItemQuantity { get; set; }
        
        public int ItemRate { get; set; }
        public int ItemID { get; set; }
        public int CreateDate { get; set; }
    }
}
