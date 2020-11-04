import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./ACHBatchRecord.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {ACHBatchRecord_Url} from './../../../const';
import {API_KEY} from './../../../const';

function ACHBatchRecord(props) {
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [achbatchrecord, setAchbatchrecord] = useState([]);
  const [selACHFileRecObj, setSelACHFileRecObj] = useState({});
  const [toACHBatchRecord, setToACHBatchRecord] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  let { FileID } = useParams();
  console.log("FileID : "+FileID);

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
        let achBatchRecordObj = obj.row.original;
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/ACHDetailEntry/${achBatchRecordObj.BatchID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    {
      headerName: "BatchID",
      field: "BatchID",
      Header: "BatchID",
      accessor: "BatchID"
    },
    {
      name: "ServiceClassCode",
      field: "ServiceClassCode",
      Header: "ServiceClassCode",
      accessor: "ServiceClassCode"
    },
    {
      name: "CompanyName",
      field: "CompanyName",
      Header: "CompanyName",
      accessor: "CompanyName"
    },
    {
      headerName: "CompanyDiscretionaryData",
      field: "CompanyDiscretionaryData",
      Header: "CompanyDiscretionaryData",
      accessor: "CompanyDiscretionaryData"
    },
    {
      name: "CompanyID",
      field: "CompanyID",
      Header: "CompanyID",
      accessor: "CompanyID"
    },
    {
      name: "StandardEntryClass",
      field: "StandardEntryClass",
      Header: "StandardEntryClass",
      accessor: "StandardEntryClass"
    },
    {
      name: "CompanyEntryDescription",
      field: "CompanyEntryDescription",
      Header: "CompanyEntryDescription",
      accessor: "CompanyEntryDescription"
    },
    {
      headerName: "CompanyDescriptiveDate",
      field: "CompanyDescriptiveDate",
      Header: "CompanyDescriptiveDate",
      accessor: "CompanyDescriptiveDate"
    },
    {
      headerName: "EffectiveEntryDate",
      field: "EffectiveEntryDate",
      Header: "EffectiveEntryDate",
      accessor: "EffectiveEntryDate"
    },
    {
      headerName: "OriginatorStatusCode",
      field: "OriginatorStatusCode",
      Header: "OriginatorStatusCode",
      accessor: "OriginatorStatusCode"
    },
    {
      headerName: "OriginatingDFI",
      field: "OriginatingDFI",
      Header: "OriginatingDFI",
      accessor: "OriginatingDFI"
    },
    {
      headerName: "BatchNumber",
      field: "BatchNumber",
      Header: "BatchNumber",
      accessor: "BatchNumber"
    }
  ];

  useEffect(() => {
    console.log("ACHFileRecord UseEffect");
    let ignore = false;
    async function fetchACHBatchRecord() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      //let res = await axios.get(ACHBatchRecord_Url, options);
      let res = await axios.get(ACHBatchRecord_Url+ "FileID='"+FileID+"'", options);
      console.log(res.data);
      console.log(res.data.resource);
      let achBatchRecArray = res.data.resource;
      console.log(achBatchRecArray);
      setLoading(false);
      setAchbatchrecord(achBatchRecArray);
    }
    fetchACHBatchRecord();
    return () => { ignore = true };
  }, [session_token]);
  
  if (toACHBatchRecord === true) {
    console.log("toACHBatchRecord : "+toACHBatchRecord);
    let FileID = selACHFileRecObj.FileID
    return (
      <Redirect to={{ pathname: `${process.env.PUBLIC_URL}/wireslist/${FileID}`, state: selACHFileRecObj}} />
    );
  }
  
  console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "BatchID", desc: true }]
   }; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={achbatchrecord}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );
  
  //console.log("CUSTOMER_MODIFY_CREATE : "+ CUSTOMER_MODIFY_CREATE);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">ACHBatchRecord List - File {FileID}</h3>
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

export default ACHBatchRecord;
