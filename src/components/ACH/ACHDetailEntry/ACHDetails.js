import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import { useParams, useHistory } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import ACHDetailForm from "./ACHDetailForm";
import { useSelector } from 'react-redux';
import ACHAddendaList from './ACHAddendaList';

function ACHDetails(props) {
  let initialstateObj = {};
  let stateObj = initialstateObj;
  let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [achDetailsObj, setAchDetailsObj] = useState(stateObj);

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

  let { DetailID } = useParams();

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
              pathname: `${process.env.PUBLIC_URL}/ACHAddendaDetails/${achDetailRecordObj.entryDetailID}`,
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
    console.log("DetailID : "+DetailID);
    let ignore = false;
   //console.log("wires");
   //console.log(wires);
   let achDetailsObj = achdetails.find((achdetail) => achdetail.entryDetailID === parseInt(DetailID));
   //console.log("wireDetailsObj");
   if(achDetailsObj){
    console.log(achDetailsObj);
    setAchDetailsObj(achDetailsObj);
   }
    return () => { ignore = true };
  }, [session_token, DetailID, achdetails]);

  function handleChange(e) {
    /*
    console.log("On Handle Change : "+ e.target.name);
    let targetVal = "";
    if(e.target.type === "checkbox"){
      targetVal = e.target.checked;
    } else {
      targetVal = e.target.value;
    }
    setWireDetailsObj({ ...wireDetailsObj, [e.target.name]: targetVal });
    */
  }

  function getTitle() {
    //console.log("Get Title : " + props.disType);
    switch ("view") {
      case "add":
        return "Add New Customer";
      case "edit":
        return "Edit Customer";
      default:
        return "ACH Details";
    }
  }
  const initialSortState = {};
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
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="text-center">{getTitle()} - {DetailID}</h3>
            <div className="btnCls">
              <button style={{ float: "left" }} type="button" onClick={() => history.goBack()} className="btn btn-primary btn-sm">
                Back
              </button>
              <div style={{ clear:"both"}}></div>
            </div>
            <div className="col-sm-12">
              <ACHDetailForm formMode={props.disType} custstate={achDetailsObj} oncustinputchange={handleChange} />
            </div>
          </div>
        </div>
        <ACHAddendaList entryDetailID={DetailID} />
      </div>
    </React.Fragment>
  );
}

export default ACHDetails;
