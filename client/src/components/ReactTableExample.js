import ReactTable from 'react-table';
import React, { Component } from "react";
// import matchSorter from 'match-sorter'

class ExampleReactTable extends Component {
    render() {
        const data = [{
            name: 'Tanner Linsley',
            age: 26,
            friend: {
                name: 'Jason Maurer',
                age: 23,
            }
        }, {
            name: 'John',
            age: 36,
            friend: {
                name: 'Brian',
                age: 35,
            }
        }]


        const columns = [{
            Header: 'Name',
            accessor: 'name', // String-based value accessors!
            filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value)
                
        }, {
            Header: 'Age',
            accessor: 'age',
            filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value)
                ,
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
            id: 'friendName', // Required because our accessor is not a string
            Header: 'Friend Name',
            accessor: d => d.friend.name ,// Custom value accessors!
            
        }, {
            Header: props => <span>Friend Age</span>, // Custom header components!
            accessor: 'friend.age',
            filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value) &&
                    row[filter.id].endsWith(filter.value)
                
        }]
        return (
            <div>
                <ReactTable
                    data={data}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                      String(row[filter.id]) === filter.value}
                    columns={columns}
           
                />
            </div>
        )
    }
}

export default ExampleReactTable;