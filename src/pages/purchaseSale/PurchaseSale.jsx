import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, CircularProgress, IconButton, Tooltip } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { MdRemoveRedEye } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { MdConfirmationNumber } from "react-icons/md";
import Layout from "../../layout/Layout";
import moment from "moment";
import BASE_URL from "../../base/BaseUrl";

const PurchaseSale = () => {
  const [chapterList, setChapterList] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/api/web-fetch-purchase-list/Tiles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChapterList(response.data?.purchase);
      } catch (error) {
        console.error("error while fetching select chapters ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderList();
    setLoading(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        name: "purchase_date",
        label: "Date",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (purchase_date) => {
            return moment(purchase_date).format("DD-MM-YYYY");
          },
        },
      },

      {
        name: "purchase_supplier",
        label: "Supplier",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "purchase_bill_no",
        label: "Ref Bill No",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "purchase_estimate_ref",
        label: "Estimate No",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "purchase_amount",
        label: "Amount",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "purchase_no_of_count",
        label: "No Of Items",
        options: {
          filter: true,
          sort: false,
        },
      },

      {
        name: "id",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (id) => {
            return (
              <div className="flex items-center space-x-2">
                <Tooltip title="View" placement="top">
                  <IconButton
                    aria-label="Edit"
                    className="transition duration-300 ease-in-out transform hover:scale-110 hover:bg-purple-50"
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "8px",
                      color: "rgb(33 150 243)",
                      "&:hover": {
                        color: "blue",
                        backgroundColor: "#f3e8ff",
                      },
                    }}
                  >
                    <Link to={`/view-purchase-tiles/${id}`}>
                      <MdRemoveRedEye />
                    </Link>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit" placement="top">
                  <IconButton
                    aria-label="Edit"
                    className="transition duration-300 ease-in-out transform hover:scale-110 hover:bg-purple-50"
                    sx={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "8px",
                      color: "rgb(33 150 243)",
                      "&:hover": {
                        color: "blue",
                        backgroundColor: "#f3e8ff",
                      },
                    }}
                  >
                    <Link to={`/edit-purchase-tiles/${id}`}>
                      <MdEdit />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            );
          },
        },
      },
    ],
    [chapterList]
  );

  const options = {
    selectableRows: "none",
    elevation: 0,
    responsive: "standard",
    viewColumns: false,
    download: false,
    print: false,
  };

  const data = useMemo(() => (chapterList ? chapterList : []), [chapterList]);

  return (
    <Layout>
      {loading && (
        <CircularProgress
          disableShrink
          style={{
            marginLeft: "600px",
            marginTop: "300px",
            marginBottom: "300px",
          }}
          color="secondary"
        />
      )}
      <div className="flex flex-col md:flex-row justify-between items-center  mt-5 p-2 rounded-lg space-y-4 md:space-y-0">
        <h3 className="text-center md:text-left text-lg md:text-xl font-bold">
          Purchase Tiles
        </h3>

        <Link
          to="/add-purchase-tiles"
          className="btn btn-primary text-center md:text-right text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md"
        >
          <button>+ Add Purchase Tiles</button>
        </Link>
      </div>
      <div className="mt-5">
        <div className="bg-white mt-4 p-4 md:p-6 rounded-lg shadow-lg">
          <MUIDataTable
            title={"Purchase Tiles List"}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    </Layout>
  );
};

export default PurchaseSale;
