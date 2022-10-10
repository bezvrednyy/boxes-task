import {MantineProvider, createEmotionCache} from '@mantine/core'
import * as React from 'react'
import { useState } from 'react'
import {BoxesTable} from './boxes-table'
import { SplitQuantityPopup } from './popup'
import './style.css'

const DATA = [
  {id: 1, track: 'GHDFTR12', quantity: 24},
  {id: 2, track: 'GHFG3423', quantity: 37},
  {id: 3, track: 'GHAAAR34', quantity: 9},
]

const myCache = createEmotionCache( { key : 'mantine' } )

export default function App() {
  const [popupTotalQuantity, setPopupTotalQuantity] = useState<null|number>(null)
 
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS emotionCache={myCache} theme={{fontFamily: 'Montserrat'}}>
      <div className='w-[640px] mx-auto'>
        <h1 className='text-3xl mb-2'>Boxes from the store</h1>
        <BoxesTable
          rows={DATA}
          onClick={row => setPopupTotalQuantity(row.quantity)}
        />
        <SplitQuantityPopup
          opened={popupTotalQuantity !== null}
          total={popupTotalQuantity || 0}
          onClose={() => setPopupTotalQuantity(null)}
          onSuccess={parts => {
            console.log(parts)
            setPopupTotalQuantity(null)
            return Promise.resolve()
          }}
        />
      </div>
    </MantineProvider>
  )
}
