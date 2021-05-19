//import {API_KEY, API_URL} from './../../const';
const {API_KEY, API_URL} = window.constVar;

const toCurrency = (val) => {
  return new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(val);
}

const buildSortByUrl = (sortArr) => {
    let sortUrl = "";
    sortArr.forEach(function(sortObj) {
      let sortDir = "ASC";
      if(sortObj.desc){
        sortDir = "DESC";
      }
      sortUrl += "&order="+sortObj.id+" "+sortDir;
    });
    return sortUrl;
 }

const buildFilterUrl = (filterArr) => {
  let filterUrl = "";
  filterArr.forEach(function(filterObj) {
    let filterOpr = "=";
    filterOpr = "like";
    let filterClm = filterObj.id;
    let filterVal = filterObj.value;
    let fieldTypeVal = filterObj.fieldType;
    let fieldOpVal   = filterObj.fieldOp;
    if(Array.isArray(filterVal) && filterVal.length > 0){
      let multifilterOpr = "IN";
      let isNullFlag = false;
      let selOptionSt = Array.from(filterVal).map(o => { 
        if(o.value==="is NULL"){
          isNullFlag = true;
        } else {
          return ("'"+o.value+"'");
        }
      }).filter(Boolean).join(",");
      if(selOptionSt.length > 0 && isNullFlag===false){
        filterUrl += " and ("+filterClm+" "+multifilterOpr+" ("+selOptionSt+"))";
      }
      ///
      if(selOptionSt.length > 0 && isNullFlag===true){
        filterUrl += " and (("+filterClm+" "+multifilterOpr+" ("+selOptionSt+"))";
        filterUrl += " or ("+filterClm+" is null))";
      }
      ////
      if(isNullFlag===true && selOptionSt.length === 0){
        filterUrl += " and ("+filterClm+" is null)";
      }
    } else {
      if(filterClm==="ALDLoanApplicationNumberOnly" || filterClm==="TaxID"){
        filterOpr = "=";
        filterUrl += " and ("+filterClm+" "+filterOpr+" "+filterVal+")";
      } else if(filterClm==="sentDateTime"){
        /*
        filterOpr = "=";
        filterUrl += " and ("+filterClm+" "+filterOpr+" "+filterVal+")";
        */
        filterUrl += " and ("+filterClm+" > "+filterVal+" 00:00:00) and ("+filterClm+" < "+filterVal+" 23:59:59)";
      } else if(filterClm==="SBALoanNumber" && filterObj.filterOpr===">" && filterObj.defFilter==="teamc"){
        filterOpr = filterObj.filterOpr;
        filterUrl += " and ("+filterClm+" "+filterOpr+" "+filterVal+")";
      } else {
        if(fieldTypeVal === "string"){
          let valSt = "";
          if(fieldOpVal === "equal"){
            filterOpr = "=";
            valSt = filterVal;
          } else if(fieldOpVal === "endwith"){
            valSt = "%"+filterVal;
          } else if(fieldOpVal === "startwith"){
            valSt = filterVal+"%";
          } else if(fieldOpVal === "contain"){
            valSt = "%"+filterVal+"%";
          }
          filterUrl += " and ("+filterClm+" "+filterOpr+" "+valSt+")";
        } else if(fieldTypeVal === "integer"){
          let valSt = "";
          if(fieldOpVal === "equal"){
            filterOpr = "=";
            valSt = filterVal;
          } else if(fieldOpVal === "less"){
            filterOpr = "<";
            valSt = filterVal;
          } else if(fieldOpVal === "greater"){
            filterOpr = ">";
            valSt = filterVal;
          }
          valSt = valSt.replace("$", "");
          valSt = valSt.replace(",", "");
          filterUrl += " and ("+filterClm+" "+filterOpr+" "+valSt+")";
        } else if(fieldTypeVal === "boolean"){
          let valSt = "";
          if(fieldOpVal === "equal"){
            filterOpr = "=";
            valSt = filterVal;
          }
          filterUrl += " and ("+filterClm+" "+filterOpr+" "+valSt+")";
        } else {
          filterUrl += " and ("+filterClm+" "+filterOpr+" %"+filterVal+"%)";
        }
      }
    }
  });
  if(filterUrl.length>0){
    filterUrl = filterUrl.substring(5);
  }
  filterUrl = encodeURIComponent(filterUrl);
  console.log("filterUrl : "+filterUrl);
  return filterUrl;
}

const buildExternalFilterUrl = (filterArr) => {
  let filterUrl = "";
  filterArr.forEach(function(filterObj) {
    let filterOpr = "=";
    filterOpr = "like";
    let filterClm = filterObj.id;
    let filterVal = filterObj.value;
    let filterEndVal = filterObj.endvalue;
    let fieldTypeVal = filterObj.fieldType;
    let fieldOpVal   = filterObj.fieldOp;
    if(Array.isArray(filterVal) && filterVal.length > 0){
      let multifilterOpr = "IN";
      let isNullFlag = false;
      let selOptionSt = Array.from(filterVal).map(o => { 
        if(o.value==="is NULL"){
          isNullFlag = true;
        } else {
          return ("'"+o.value+"'");
        }
      }).filter(Boolean).join(",");
      if(selOptionSt.length > 0 && isNullFlag===false){
        filterUrl += " and ("+filterClm+" "+multifilterOpr+" ("+selOptionSt+"))";
      }
      ///
      if(selOptionSt.length > 0 && isNullFlag===true){
        filterUrl += " and (("+filterClm+" "+multifilterOpr+" ("+selOptionSt+"))";
        filterUrl += " or ("+filterClm+" is null))";
      }
      ////
      if(isNullFlag===true && selOptionSt.length === 0){
        filterUrl += " and ("+filterClm+" is null)";
      }
    } else {
      if(filterClm==="ALDLoanApplicationNumberOnly" || filterClm==="TaxID"){
        filterOpr = "=";
        filterUrl += " and ("+filterClm+" "+filterOpr+" "+filterVal+")";
      } else if(filterClm==="sentDateTime"){
        /*
        filterOpr = "=";
        filterUrl += " and ("+filterClm+" "+filterOpr+" "+filterVal+")";
        */
        filterUrl += " and ("+filterClm+" > "+filterVal+" 00:00:00) and ("+filterClm+" < "+filterVal+" 23:59:59)";
      } else if(filterClm==="SBALoanNumber" && filterObj.filterOpr===">" && filterObj.defFilter==="teamc"){
        filterOpr = filterObj.filterOpr;
        filterUrl += " and ("+filterClm+" "+filterOpr+" "+filterVal+")";
      } else {
        if(fieldTypeVal === "string"){
          let valSt = "";
          if(fieldOpVal === "equal"){
            filterOpr = "=";
            valSt = filterVal;
          } else if(fieldOpVal === "endwith"){
            valSt = "%"+filterVal;
          } else if(fieldOpVal === "startwith"){
            valSt = filterVal+"%";
          } else if(fieldOpVal === "contain"){
            valSt = "%"+filterVal+"%";
          }
          filterUrl += " and ("+filterClm+" "+filterOpr+" "+valSt+")";
        } else if(fieldTypeVal === "integer"){
          let valSt = "", endvalSt="";
          if(fieldOpVal === "between"){
            valSt = filterVal.replace("$", "");
            valSt = filterVal.replace(",", "");
            endvalSt = filterEndVal.replace("$", "");
            endvalSt = filterEndVal.replace(",", "");
            filterUrl += " and ("+filterClm+" > "+valSt+") and ("+filterClm+" < "+endvalSt+")";
          } else {
            valSt = filterVal;
            if(fieldOpVal === "equal"){
              filterOpr = "=";
            } else if(fieldOpVal === "less"){
              filterOpr = "<";
            } else if(fieldOpVal === "greater"){
              filterOpr = ">";
            }
            valSt = valSt.replace("$", "");
            valSt = valSt.replace(",", "");
            filterUrl += " and ("+filterClm+" "+filterOpr+" "+valSt+")";
          }
        } else if(fieldTypeVal === "boolean"){
          let valSt = "";
          if(fieldOpVal === "equal"){
            filterOpr = "=";
            valSt = filterVal;
          }
          filterUrl += " and ("+filterClm+" "+filterOpr+" "+valSt+")";
        } else if(fieldTypeVal === "datetime"){
          let filterValSt = "";
          if(fieldOpVal === "equal"){
            filterValSt = " and ("+filterClm+" > "+filterVal+" 00:00:00) and ("+filterClm+" < "+filterVal+" 23:59:59)";
          } else if(fieldOpVal === "less"){
            filterValSt = " and ("+filterClm+" < "+filterVal+" 00:00:00)";
          } else if(fieldOpVal === "greater"){
            filterValSt = " and ("+filterClm+" > "+filterVal+" 00:00:00)";
          } else if(fieldOpVal === "between"){
            filterValSt = " and ("+filterClm+" > "+filterVal+" 00:00:00) and ("+filterClm+" < "+filterEndVal+" 23:59:59)";
          } 
          filterUrl += filterValSt;
        } else {
          filterUrl += " and ("+filterClm+" "+filterOpr+" %"+filterVal+"%)";
        }
      }
    }
  });
  if(filterUrl.length>0){
    filterUrl = filterUrl.substring(5);
  }
  filterUrl = encodeURIComponent(filterUrl);
  console.log("filterUrl : "+filterUrl);
  return filterUrl;
}

 const buildPageUrl = (pageSize, pageIndex) => {
    let pageUrl = "";
    //let startRow = (pageSize * pageIndex) + 1;
    let startRow = pageSize * pageIndex;
    //const endRow = startRow + pageSize;
    pageUrl += "?limit="+pageSize;
    pageUrl += "&offset="+startRow;
    return pageUrl;
 }

 const download = (url, name) => {
  console.log("Download Files as blob");
  if (!url) {
    throw new Error("Resource URL not provided! You need to provide one");
  }
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const blobURL = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobURL;
      a.style = "display: none";

      if (name && name.length) a.download = name;
      document.body.appendChild(a);
      a.click();
    })
    .catch(() => {
      console.log("Error while fetching URL");
    });
};

const getFieldType = (key) => {
  console.log("getFieldType");
  let fldType = "string";
  let strIntFieldName = "wireID wireBatchID wireDoc_by_wireID wireRemittance_by_wireID amount sendersChargesAmount1 sendersChargesAmount2 sendersChargesAmount3 sendersChargesAmount4 instructedAmount exchangeRate unstructuredAddendaLength";
  if(strIntFieldName.includes(key)){
      fldType = "integer";
  }
  let boolFieldName = "excludeOFAC excludeFISERV excludeFiserv overrideFlag";
  if(boolFieldName.includes(key)){
      fldType = "boolean";
  }
  let dateFieldName = "createDateTime completeDateTime outputDate";
  if(dateFieldName.includes(key)){
      fldType = "datetime";
  }
  return fldType;
}

 export { buildSortByUrl, buildPageUrl, buildFilterUrl, download, buildExternalFilterUrl, getFieldType } ; 