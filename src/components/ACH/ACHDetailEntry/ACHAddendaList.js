import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./ACHDetailEntry.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {API_KEY, ACHAddendaList_Url, env} from './../../../const';

function ACHAddendaList(props) {
  //let history = useHistory();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { achAddendaList } = useSelector(state => {
    return {
        ...state.achAddendaReducer
    }
  });

  let { entryDetailID } = props;
  console.log("entryDetailID : "+entryDetailID);

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
        let achAddendaRecordObj = obj.row.original;
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/ACHDetails/${achAddendaRecordObj.entryDetailID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },*/
    {
      headerName: "DetailID",
      field: "entryDetailID",
      Header: "DetailID",
      accessor: "entryDetailID"
    },
    {
      headerName: "AddendaTypeCode",
      field: "AddendaTypeCode",
      Header: "AddendaTypeCode",
      accessor: "AddendaTypeCode"
    },
    {
      name: "ReturnCorrectionCode",
      field: "ReturnCorrectionCode",
      Header: "ReturnCorrectionCode",
      accessor: "ReturnCorrectionCode"
    },
    {
      name: "PaymentInfo",
      field: "PaymentInfo",
      Header: "PaymentInfo",
      accessor: "PaymentInfo"
    },
    {
      headerName: "AddendaSEQ",
      field: "AddendaSEQ",
      Header: "AddendaSEQ",
      accessor: "AddendaSEQ"
    },
    {
      name: "EntryDetailSEQ",
      field: "EntryDetailSEQ",
      Header: "EntryDetailSEQ",
      accessor: "EntryDetailSEQ"
    },
    {
      name: "RawDataRecord7",
      field: "RawDataRecord7",
      Header: "RawDataRecord7",
      accessor: "RawDataRecord7"
    },
    {
      name: "CFEntryDetailSEQ",
      field: "CFEntryDetailSEQ",
      Header: "CFEntryDetailSEQ",
      accessor: "CFEntryDetailSEQ"
    }
  ];

  useEffect(() => {
    console.log("ACHAddenda List UseEffect");
    let ignore = false;
    async function fetchACHAddendaList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let url = ACHAddendaList_Url+ "entryDetailID='"+entryDetailID+"'";
      if(env==="DEV"){
        url = ACHAddendaList_Url;
      }
      let res = await axios.get(url, options);
      console.log(res.data);
      console.log(res.data.resource);
      let achAddendaList = res.data.resource;
      console.log(achAddendaList);
      dispatch({
        type:'SETACHAddendaList',
        payload:achAddendaList
      });
      setLoading(false);
      //setAchdetailentry(achDetailEntryArray);
    }
    fetchACHAddendaList();
    return () => { ignore = true };
  }, [entryDetailID, dispatch, session_token]);
  
  console.log("Properties", props);
  const initialSortState = {}; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={achAddendaList}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );

  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px"}}>
        <div className="row">
          <div className="col-md-offset-3">
            <h3 className="title-center">ACHAddenda List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ACHAddendaList;
