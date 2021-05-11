import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./ACHDetailEntry.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
//import {API_KEY, ACHDetailEntry_Url, env} from './../../../const';
const {API_KEY, ACHDetailEntry_Url, env} = window.constVar;

function ACHDetailEntry(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { achdetails } = useSelector(state => {
    return {
        ...state.achReducer
    }
  });

  let { BatchID } = useParams();
  console.log("BatchID : "+BatchID);

  const columnDefs = [
    {
      Header: "View",
      show : true, 
      width: 40,
      id: 'colView',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let achDetailRecordObj = obj.row.original;
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/ACHDetails/${achDetailRecordObj.entryDetailID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    {
      headerName: "DetailID",
      field: "entryDetailID",
      Header: "DetailID",
      accessor: "entryDetailID"
    },
    {
      headerName: "BatchID",
      field: "batchRecordID",
      Header: "BatchID",
      accessor: "batchRecordID"
    },
    /*{
      headerName: "FileID",
      field: "fileRecordID",
      Header: "FileID",
      accessor: "fileRecordID"
    },*/
    {
      name: "TransactionCode",
      field: "TransactionCode",
      Header: "TransactionCode",
      accessor: "TransactionCode"
    },
    {
      name: "RDFID",
      field: "RDFID",
      Header: "RDFID",
      accessor: "RDFID"
    },
    {
      headerName: "DFIAccountNumber",
      field: "DFIAccountNumber",
      Header: "DFIAccountNumber",
      accessor: "DFIAccountNumber"
    },
    {
      name: "Amount",
      field: "Amount",
      Header: "Amount",
      accessor: "Amount"
    },
    {
      name: "AdviceRoutingNumber",
      field: "AdviceRoutingNumber",
      Header: "AdviceRoutingNumber",
      accessor: "AdviceRoutingNumber"
    },
    {
      name: "IndivIDNumber",
      field: "IndivIDNumber",
      Header: "IndivIDNumber",
      accessor: "IndivIDNumber"
    },
    {
      headerName: "IndivName",
      field: "IndivName",
      Header: "IndivName",
      accessor: "IndivName"
    },
    {
      headerName: "AddendaRecordCount",
      field: "AddendaRecordCount",
      Header: "AddendaRecordCount",
      accessor: "AddendaRecordCount"
    },
    {
      headerName: "ADVACHRoutingNum",
      field: "ADVACHRoutingNum",
      Header: "ADVACHRoutingNum",
      accessor: "ADVACHRoutingNum"
    },
    {
      headerName: "ADVSequenceNumber",
      field: "ADVSequenceNumber",
      Header: "ADVSequenceNumber",
      accessor: "ADVSequenceNumber"
    },
    {
      headerName: "TraceNumber",
      field: "TraceNumber",
      Header: "TraceNumber",
      accessor: "TraceNumber"
    }
  ];

  useEffect(() => {
    console.log("ACHFileRecord UseEffect");
    let ignore = false;
    async function fetchACHDetailEntry() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let url = ACHDetailEntry_Url+ "batchRecordID='"+BatchID+"'";
      if(env==="DEVLOCAL"){
        url = ACHDetailEntry_Url;
      }
      let res = await axios.get(url, options);
      console.log(res.data);
      console.log(res.data.resource);
      let achDetailEntryArray = res.data.resource;
      console.log(achDetailEntryArray);
      dispatch({
        type:'SETACHDETAILS',
        payload:achDetailEntryArray
      });
      setLoading(false);
      //setAchdetailentry(achDetailEntryArray);
    }
    fetchACHDetailEntry();
    return () => { ignore = true };
  }, [BatchID, dispatch, session_token]);
  
  console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "BatchID", desc: true }]
   }; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={achdetails}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );

  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">ACHEntryDetail List - Batch {BatchID}</h3>
            <div className="btnCls">
              <button type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
            </div>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ACHDetailEntry;
