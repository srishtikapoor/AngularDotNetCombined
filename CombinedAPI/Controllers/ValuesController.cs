using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CombinedAPI.Models;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Cors;

namespace CombinedAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [EnableCors("AllowOrigin")]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet(Name ="GetStates")]
        
          public DataTable GetStates()
        {
            DataTable dt = new DataHelper().GetResults("Select * from States");
            return dt;
            
        }

        [HttpGet(Name = "GetCustomerDetails")]

        public DataTable GetCustomerDetails()
        {
            DataTable details = new DataHelper().GetResults("Select * from CustomerData");
            return details;
        }

        //POST api/values
       [HttpPost(Name = "CustomerDetails")]
        //[Route("api/values/CustomerDetails")]
        public void CustomerDetails([FromBody]PostData data)
        {
            DataTable postData = new DataHelper().PostValues("Insert into CustomerData Values('" + data.CustomerName + "','" + data.CustomerEmail + "')");
            return;
        }



        //get categories
        [HttpGet(Name = "GetCategory")]
        public DataTable GetCategory()
        {
            DataTable dt = new DataHelper().GetResults("Select * from CategoryMaster");
            return dt;
        }

        [HttpGet(Name = "GetItems")]
        public DataTable GetItems()
        {
            DataTable items = new DataHelper().GetResults("Select * from ItemMaster");
            return items;
        }

        //post item with category
        [HttpPost(Name = "AddItem")]
        public void AddItem([FromBody]PostItem item)
        {
            DataTable postItem = new DataHelper().PostValues("Insert into ItemMaster Values('" + item.ItemName + "' ,'" + item.CategoryID + "')");
            return;
        }

        [HttpPost(Name = "SaveItemInventory")]
        public void SaveItemInventory([FromBody]PostItemInventory item)
        {
            DataTable postItemInventory = new DataHelper().PostValues("Insert into ItemInventory(ItemQuantity, ItemRate,ItemID) Values('" + item.ItemQuantity + "' ,'" + item.ItemRate + "','" + item.ItemID + "')");
            return;
        }

        //[HttpPost(Name = "SaveItemOrder")]
        //public void SaveItemOrder([FromBody]PostItemOrder item)
        //{
        //    DataTable postItemOrder = new DataHelper().PostValues("Insert into ItemOrder(ItemOrderQuantity, TotalAmount) Values('" + item.ItemOrderQuantity + "' ,'" + item.TotalAmount + "')");
        //    return;
        //}


        [HttpGet(Name = "GetRateList")]
        public Dictionary<int, decimal> GetRateList()
        {
            DataTable dtRateList = new DataHelper().GetResults("Select distinct ItemRate,ItemID from ItemInventory where ItemInventoryID in(SELECT MAX(ItemInventoryID) FROM iteminventory GROUP BY ItemID)");
            Dictionary<int, decimal> itemRateList = new Dictionary<int, decimal>();

            foreach (DataRow drRate in dtRateList.Rows)
            {
                itemRateList.Add(Convert.ToInt16(drRate["ItemID"]), Convert.ToDecimal(drRate["ItemRate"]));
            }
            return itemRateList;
        }

        [HttpPost(Name ="SaveItemOrder")]
        public void SaveItemOrder([FromBody]PostItemOrder items)
        {
                DataTable postItemOrder = new DataHelper().PostValues("INSERT INTO ItemOrder VALUES ('" + items.ItemOrderQuantity + "','" + items.TotalAmount + "', '" + items.ItemID + "','" + items.CustomerID+ "')");

            return;
        }


    }
}
