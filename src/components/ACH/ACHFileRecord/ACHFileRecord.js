import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Listview from "./../../Listview/Listview";
import * as Icon from "react-feather";
import "./ACHFileRecord.css";
import axios from 'axios';
import { useSelector } from 'react-redux';
import {ACHFileRecord_Url} from './../../../const';
import {API_KEY} from './../../../const';

function ACHFileRecord(props) {
  const [loading, setLoading] = useState(true);
  const [achfilerecord, setAchfilerecord] = useState([]);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token } = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

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
        let achFileRecordObj = obj.row.original;
        return (
          <Link
            to={{
              pathname: `${process.env.PUBLIC_URL}/ACHBatchRecord/${achFileRecordObj.FileID}`,
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    {
      headerName: "FileID",
      field: "FileID",
      Header: "FileID",
      accessor: "FileID"
    },
    {
      name: "PriorityCode",
      field: "PriorityCode",
      Header: "PriorityCode",
      accessor: "PriorityCode"
    },
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
    }
  ];

  useEffect(() => {
    console.log("ACHFileRecord UseEffect");
    let ignore = false;
    async function fetchACHFileRecord() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let res = await axios.get(ACHFileRecord_Url, options);
      console.log(res.data);
      //console.log(res.data.resource);
      let achFileRecArray = res.data.resource;
      //console.log(achFileRecArray);
      setLoading(false);
      setAchfilerecord(achFileRecArray);
    }
    fetchACHFileRecord();
    return () => { ignore = true };
  }, [session_token]);
  
  //console.log("Properties", props);
  const initialSortState = {
    sortBy: [{ id: "FileCreationDateTime", desc: true }]
   }; 
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <Listview
        items={achfilerecord}
        columnDefs={columnDefs}
        sortBy={initialSortState}
      />
    );
  
  return (
    <React.Fragment>
      <div className="container" style={{marginLeft:"0px"}}>
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">ACHFileRecord List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ACHFileRecord;
