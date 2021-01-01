import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Listview from "./../Listview/Listview";
import * as Icon from "react-feather";
import "./DepositList.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {API_KEY, DepositList_Url} from './../../const';

function DepositList(props) {
  const [loading, setLoading] = useState(true);
  const [depositList, setDepositList] = useState([]);

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const columnDefs = [
    /*{
      Header: "View",
      show : true, 
      width: 40,
      id: 'colView',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let depositRecordObj = obj.row.original;
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/DepositDetail/${depositRecordObj.depositID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },*/
    {
      field: "depositID",
      Header: "depositID",
      accessor: "depositID"
    },
    {
      name: "depositDate",
      field: "PrioritdepositDateyCode",
      Header: "depositDate",
      accessor: "depositDate"
    }/*,
    {
      name: "ImmediateDestination",
      field: "ImmediateDestination",
      Header: "ImmediateDestination",
      accessor: "ImmediateDestination"
    },
    {
      headerName: "ImmediateOrigin",
      field: "ImmediateOrigin",
      Header: "ImmediateOrigin",
      accessor: "ImmediateOrigin"
    },
    {
      name: "FileCreationDateTime",
      field: "FileCreationDateTime",
      Header: "FileCreationDateTime",
      accessor: "FileCreationDateTime"
    },
    {
      name: "FileIDModifier",
      field: "FileIDModifier",
      Header: "FileIDModifier",
      accessor: "FileIDModifier"
    },
    {
      name: "RecordSize",
      field: "RecordSize",
      Header: "RecordSize",
      accessor: "RecordSize"
    },
    {
      headerName: "BlockingFactor",
      field: "BlockingFactor",
      Header: "BlockingFactor",
      accessor: "BlockingFactor"
    },
    {
      headerName: "FormatCode",
      field: "FormatCode",
      Header: "FormatCode",
      accessor: "FormatCode"
    },
    {
      headerName: "ImmediateDestinationName",
      field: "ImmediateDestinationName",
      Header: "ImmediateDestinationName",
      accessor: "ImmediateDestinationName"
    },
    {
      headerName: "ImmediateOriginName",
      field: "ImmediateOriginName",
      Header: "ImmediateOriginName",
      accessor: "ImmediateOriginName"
    },
    {
      headerName: "ReferenceCode",
      field: "ReferenceCode",
      Header: "ReferenceCode",
      accessor: "ReferenceCode"
    }*/
  ];

  useEffect(() => {
    console.log("ACHFileRecord UseEffect");
    let ignore = false;
    async function fetchDepositList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let res = await axios.get(DepositList_Url, options);
      console.log(res.data);
      //console.log(res.data.resource);
      let depositListArray = res.data.resource;
      //console.log(depositListArray);
      setLoading(false);
      setDepositList(depositListArray);
    }
    fetchDepositList();
    return () => { ignore = true };
  }, [session_token]);
  
  //console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "depositID", desc: true }]
   }; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={depositList}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );
  
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">Deposit List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DepositList;
