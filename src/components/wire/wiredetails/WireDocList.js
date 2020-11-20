import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./WireDetailForm.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {WireDocList_Url} from './../../../const';
import {API_KEY} from './../../../const';

function WireDocList(props) {
  //let history = useHistory();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  const { wireDocList } = useSelector(state => {
    return {
        ...state.wireDocReducer
    }
  });

  let { wireID } = props;
  console.log("wireID : "+wireID);

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
      headerName: "wireDocID",
      field: "wireDocID",
      Header: "wireDocID",
      accessor: "wireDocID"
    },
    {
      headerName: "primaryDocumentTypeCode",
      field: "primaryDocumentTypeCode",
      Header: "primaryDocumentTypeCode",
      accessor: "primaryDocumentTypeCode"
    },
    {
      name: "primaryDocumentProprietary",
      field: "primaryDocumentProprietary",
      Header: "primaryDocumentProprietary",
      accessor: "primaryDocumentProprietary"
    },
    {
      name: "primaryDocumentID",
      field: "primaryDocumentID",
      Header: "primaryDocumentID",
      accessor: "primaryDocumentID"
    },
    {
      headerName: "primaryDocumentIssuer",
      field: "primaryDocumentIssuer",
      Header: "primaryDocumentIssuer",
      accessor: "primaryDocumentIssuer"
    },
    {
      name: "actualPaidCurrency",
      field: "actualPaidCurrency",
      Header: "actualPaidCurrency",
      accessor: "actualPaidCurrency"
    },
    {
      name: "actualPaidAmount",
      field: "actualPaidAmount",
      Header: "actualPaidAmount",
      accessor: "actualPaidAmount"
    }/*,
    {
      name: "CFEntryDetailSEQ",
      field: "CFEntryDetailSEQ",
      Header: "CFEntryDetailSEQ",
      accessor: "CFEntryDetailSEQ"
    }*/
  ];
  
  /*
  useEffect(() => {
    console.log("Wire Doc List UseEffect");
    let ignore = false;
    async function fetchWireDocList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      //let res = await axios.get(WireDocList_Url, options);
      let res = await axios.get(WireDocList_Url+ "wireID='"+wireID+"'", options);
      //console.log(res.data);
      console.log(res.data.resource);
      let wireDocList = res.data.resource;
      console.log(wireDocList);
      dispatch({
        type:'SETWireDocList',
        payload:wireDocList
      });
      setLoading(false);
      //setAchdetailentry(achDetailEntryArray);
    }
    fetchWireDocList();
    return () => { ignore = true };
  }, [wireID, dispatch, session_token]);
  */

  console.log("Properties", props);
  const initialSortState = {}; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={wireDocList}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );
  
  return (
    <React.Fragment>
        {wireDocList.length !== 0 ? (
          <div className="container" style={{marginLeft:"0px", paddingLeft: "0px", paddingRight: "0px"}}>
            <div className="row">
              <div className="col-md-offset-3">
                <h3 className="title-center">WireDoc List</h3>
                {disCmp}
              </div>
            </div>
          </div>
          ) : null
      }
    </React.Fragment>
  );
}

export default WireDocList;
