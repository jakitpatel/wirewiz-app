import React from "react";
import * as Icon from "react-feather";

function DateRangeColumnFilter({
    column: { filterValue , preFilteredRows, setFilter, id }
    }) {
    const [value, setValue] = React.useState(filterValue || '');
    /*
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]).getTime() : 0;
        let max = preFilteredRows.length ? new Date(preFilteredRows[0].values[id]).getTime() : 0;

        preFilteredRows.forEach((row) => {
            min = Math.min(new Date(row.values[id]).getTime(), min);
            max = Math.max(new Date(row.values[id]).getTime(), max);
        });
        return [min, max];
    }, [id, preFilteredRows]);
    */
    return (
        <div style={{display: "flex"}}>
            <input
            value={value}
            type="date"
            onChange={(e) => {
                const val = e.target.value;
                console.log(val);
                setValue(e.target.value || undefined);
                setFilter(e.target.value || undefined);
                //setFilter((old = []) => [val || undefined, old[1]]);
            }}
            />
            {value ?
            <button onClick={(e) => {
                console.log("Clear Date");
                setValue("");
                setFilter("");
            }}><Icon.XCircle /></button>
            : null }
        </div>
    );
    /*
    return (
        <div style={{display: "flex"}}>
            <input
            value={filterValue[0] || ""}
            type="date"
            onChange={(e) => {
                const val = e.target.value;
                console.log(val);
                setFilter(e.target.value || undefined);
                //setFilter((old = []) => [val || undefined, old[1]]);
            }}
            style={{
                width: "70px",
                marginRight: "0.5rem"
            }}
            />
            to
            <input
            value={filterValue[1] || ""}
            type="date"
            onChange={(e) => {
                const val = e.target.value;
                console.log(val);
                setFilter(e.target.value || undefined);
                //setFilter((old = []) => [old[0], val || undefined]);
            }}
            style={{
                width: "70px",
                marginLeft: "0.5rem"
            }}
            />
        </div>
    );
    */
}

export default DateRangeColumnFilter;