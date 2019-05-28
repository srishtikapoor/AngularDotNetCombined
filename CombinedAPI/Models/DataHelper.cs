using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CombinedAPI.Models
{
    public class DataHelper
    {
        SqlConnection sqlConnection = new SqlConnection();

        public DataTable GetResults(string sqlQuery)
        {

            OpenSqlConn();
            DataTable DtResult = new DataTable();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlQuery, sqlConnection);
            sqlDataAdapter.Fill(DtResult);
            return DtResult;
        }

        public DataTable PostValues(string sqlQuery)
        {
            OpenSqlConn();
            SqlCommand sqlCommand = new SqlCommand(sqlQuery, sqlConnection);
            sqlCommand.ExecuteNonQuery();
            return null;
        }



        private void OpenSqlConn()
        {
            if (sqlConnection.State != ConnectionState.Open)
            {
                sqlConnection.ConnectionString = "Data Source = 192.168.12.20; Initial Catalog = Training2019; User ID=qancs_imarc; Password=qancs#2019";
                sqlConnection.Open();
            }
        }
    }
}
