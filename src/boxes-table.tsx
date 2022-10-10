import {RectangleStackIcon} from '@heroicons/react/24/outline'
import {Table} from '@mantine/core'

interface BoxData {
  id: number,
  track: string,
  quantity: number,
}

interface BoxesTableProps {
  rows: Array<BoxData>,
  onClick: (row: BoxData) => void,
}

export function BoxesTable({ rows, onClick }: BoxesTableProps) {
  return (
    <Table>
      <thead>
      <tr>
        <th>ID</th>
        <th>TRACK</th>
        <th>QUANTITY</th>
        <th className='w-[50px]'>ACTIONS</th>
      </tr>
      </thead>
      <tbody>
      {rows.map(row => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.track}</td>
          <td>{row.quantity}</td>
          <td>
            <div className='flex justify-center'>
              <RectangleStackIcon className='w-5 h-5 cursor-pointer text-blue-500 hover:text-blue-400 duration-200' onClick={() => onClick(row)} />
            </div>
          </td>
        </tr>
      ))}
      </tbody>
    </Table>
  )
}

const DATA = [
  {id: 1, track: 'GHDFTR12', quantity: 24},
  {id: 2, track: 'GHFG3423', quantity: 37},
  {id: 3, track: 'GHAAAR34', quantity: 9},
]