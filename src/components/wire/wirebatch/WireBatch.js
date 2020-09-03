import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Listview from "./../Listview";
import * as Icon from "react-feather";
import "./WireBatch.css";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {WireBatch_Url} from './../../../const';
import {API_KEY} from './../../../const';

function WireBatch(props) {
  const [loading, setLoading] = useState(true);
  const [custlist, setCustlist] = useState([]);
  const [wirebatchlist, setWirebatchlist] = useState([]);
  const [selWireBatchObj, setSelWireBatchObj] = useState({});
  const [toEditcustomer, setToEditcustomer] = useState(false);
  const [toWireslist, setToWireslist] = useState(false);
  const button = <button className="btn btn-primary btn-sm">Edit</button>;

  const { session_token, name, email, host, CUSTOMER_ENABLER, CUSTOMER_MODIFY_CREATE} = useSelector(state => {
      return {
          ...state.userReducer
      }
  });

  function handleActiveCustomerList(id,activeVal) {
    const newList = custlist.map((item) => {
      if (item.ID === id) {
        const updatedItem = {
          ...item,
          IsActiveCustomer: activeVal,
        };
        return updatedItem;
      }
      return item;
    });
    setCustlist(newList);
  }

  async function activeCustomerChange(currObj, e) {
    console.log("Option Change Checkbox Click");
    if(CUSTOMER_ENABLER){
      //console.log(e);
      let optAction = "activate";
      let activeVal = true;
      if (currObj.IsActiveCustomer) {
        optAction = "deactivate";
        activeVal = false;
      }
      
      let confMsg =
        "Are you sure you want to " +
        optAction +
        " this customer" +
        "?";
      
      if (window.confirm(confMsg)) {
        //Perform Opration
        try {
          let custObj = currObj;
          custObj.active = activeVal;

          const options = {
            headers: {
              'X-DreamFactory-API-Key': API_KEY,
              'X-DreamFactory-Session-Token': session_token
            }
          };
          let postObj = {
            "IsActiveCustomer" : activeVal
          };
          let res = await axios.put(WireBatch_Url+"/"+custObj.ID, postObj, options);
          console.log(res);
          
          handleActiveCustomerList(custObj.ID,activeVal);

          alert("Customer "+optAction+" successfully!");
        } catch (error) {
          console.log(error.response);
          if (401 === error.response.status) {
              // handle error: inform user, go to login, etc
              let res = error.response.data;
              alert(res.error.message);
          } else {
            alert(error);
          }
        }
      } else {
        handleActiveCustomerList(currObj.ID,currObj.IsActiveCustomer);
        return false;
      }
    } else {
      handleActiveCustomerList(currObj.ID,currObj.IsActiveCustomer);
      return false;
    }
  }

  const columnDefs = [
    {
      Header: "Edit",
      show : CUSTOMER_MODIFY_CREATE, 
      width: 40,
      id: 'colEdit',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        return (
          <Link
            to={{
              pathname: "/editcustomer",
              state: obj.row.original
            }}
          >
            <Icon.Edit />
          </Link>
        );
      }
    },
    {
      Header: "Clone",
      width: 40,
      show : CUSTOMER_MODIFY_CREATE,
      id: 'colCopy',
      accessor: row => row.attrbuiteName,
      filterable: false, // Overrides the table option
      Cell: obj => {
        //console.log("Edit");
        //console.log(obj.row);
        let custObj = obj.row.original;
        //custObj.key = null;
        return (
          <Link
            to={{
              pathname: "/clonecustomer",
              state: custObj
            }}
          >
            <Icon.Copy />
          </Link>
        );
      }
    },
    {
      name: "status",
      field: "status",
      Header: "status",
      accessor: "status"
    },
    {
      headerName: "batchId",
      field: "batchId",
      Header: "batchId",
      accessor: "batchId"
    }
  ];

  useEffect(() => {
    let ignore = false;
    async function fetchWireBatchList() {
      const options = {
        headers: {
          'X-DreamFactory-API-Key': API_KEY,
          'X-DreamFactory-Session-Token': session_token
        }
      };
      let res = await axios.get(WireBatch_Url, options);
      console.log(res.data);
      console.log(res.data.resource);
      let wireArray = res.data.resource;
      console.log(wireArray);
      setLoading(false);
      setWirebatchlist(wireArray);
    }
    fetchWireBatchList();
    return () => { ignore = true };
  }, [session_token]);

  function handleEditCustomer(key) {
    console.log("handle Edit Customer : " + key);
    setToEditcustomer(true);
  }

  if (toWireslist === true) {
    console.log("toWireslist : "+toWireslist);
    let selBatchId = selWireBatchObj.batchId
    return (
      <Redirect to={{ pathname: `${process.env.PUBLIC_URL}/wireslist/${selBatchId}`, state: selWireBatchObj}} />
    );
  }

  if (toEditcustomer === true) {
    return (
      <Redirect to={{ pathname: "/editcustomer", state: props.original }} />
    );
  }

  function onWireBatchListItemClick(batchItem){
    console.log(batchItem);
    console.log("Display Wires List for this Batch");
    setSelWireBatchObj(batchItem);
    setToWireslist(true);
  }

  function WireBatchList(props) {
    const wireItems = props.items;
    const listItems = wireItems.map((item) =>
      <li onClick={e => onWireBatchListItemClick(item)} className="list-group-item list-group-item-action" key={item.batchId}>
        {item.status}
      </li>
    );
    return (
      <ul className="list-group">{listItems}</ul>
    );
  }
  
  console.log("Properties", props);
  let disCmp =
    loading === true ? (
      <h3> LOADING... </h3>
    ) : (
      <WireBatchList items={wirebatchlist} />
      /*<Listview
        items={wirebatchlist}
        columnDefs={columnDefs}
      />*/
    );
  
  //console.log("CUSTOMER_MODIFY_CREATE : "+ CUSTOMER_MODIFY_CREATE);
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-offset-3">
            <h3 className="title-center">WireBatch List</h3>
            {disCmp}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default WireBatch;
