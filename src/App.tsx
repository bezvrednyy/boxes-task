import { SimpleTable } from '@appscience/simple-table';
import * as React from 'react';
import { useState } from 'react';
import { SplitQuantityPopup } from './popup';
import './style.css';

export default function App() {
  const [show, setShow] = useState(true)
 
  return (
    <div>
      <h1>Boxes from the store</h1>
      <button type="button" onClick={() => setShow(true)}>
        Open dialog
      </button>
      <SimpleTable
        columns={[]}
        rowsData={{fragments: DATA.map(x => <RowFragment key={x.id}/>)}}
      />
      <SplitQuantityPopup
        show={show}
        total={9}
        onCancel={() => setShow(false)}
        onSuccess={parts => {
          console.log(parts)
          setShow(false)
          return Promise.resolve()
        }}
      />
    </div>
  )
}

const DATA = [
  {id: 1, track: 'GHDFTR12', quantity: 24},
  {id: 2, track: 'GHFG3423', quantity: 37},
  {id: 3, track: 'GHAAAR34', quantity: 9},
]

const COLUMNS = [
  {id: 'id', title: 'ID'},
  {id: 'track', title: 'Track'},
  {id: 'quantity', title: 'Quantity'},
]

function RowFragment({}) {
  return <>
    <div></div>
    <div></div>
    <div></div>
  </>
}