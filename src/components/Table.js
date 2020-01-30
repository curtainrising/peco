import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from "react-router-dom";
import styled from 'styled-components';

const TableMain = styled.div`
  /* display: grid; */
  /* grid-template-columns: repeat(${props=>props.columns}, minmax(150px, 1fr) [col-start]) */
`;
const Header = styled.div`
  position: sticky;
  top: 0;
  background: #6c7ae0;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: white;
  padding-top: 8px;
  padding-bottom: 8px;
`;
const TableHeaderRow = styled.div`
  position: sticky;
  top: 0;
  justify-self: stretch;
  grid-column: 1 / end;
  display: grid;
  grid-template-columns: repeat(${props=>props.columns}, minmax(150px, 1fr) [col-start])
`;

const TableRow = styled.div`
  justify-self: stretch;
  grid-column: 1 / end;
  display: grid;
  grid-template-columns: repeat(${props=>props.columns}, minmax(150px, 1fr) [col-start])
`;

const Table = ({columns = [], dataList = [], options, onPressed, buttonAction, buttonText}) => {
  console.log(dataList);
  return (
    <TableMain
      columns={columns.length}
    >
      <TableHeaderRow
        columns={columns.length}
      >
        {columns.map((c, ind) => <Header>{c}</Header>)}
      </TableHeaderRow>
      {dataList.map((row, ind1) => {
        console.log('row',row);
        return (
        <TableRow
          className={options.type}
          onClick={()=>onPressed && onPressed(row.key)}
          columns={columns.length}
        >
          {row.data.map((v, ind2) => <div>{v}</div>)}
          {row.buttons && row.buttons.map(button => {
            console.log('button', button);
            if (!button.name) return ''
            return (
              <button onClick={() => button.action()}>{button.name}</button>
            )
          })}
          {buttonAction && (
            <button onClick={() => buttonAction(ind1)}>{buttonText}</button>
          )}
        </TableRow>
      )})}
    </TableMain>
  )
}


export default Table;
