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
    let filterClm = filterObj.id;
    let filterVal = filterObj.value;
    filterUrl += "&"+filterClm+filterOpr+"'"+filterVal+"'";
  });
  if(filterUrl.length>0){
    filterUrl = filterUrl.substring(1);
  }
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

 export { buildSortByUrl, buildPageUrl, buildFilterUrl } ; 