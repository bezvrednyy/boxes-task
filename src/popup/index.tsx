import { CheckCircleIcon, TrashIcon, XCircleIcon } from '@heroicons/react/outline';
import * as React from 'react';
import { useState } from 'react';
import ReactModal from 'react-modal'
import { joinStrings } from '../utils';

//- Реализовать контролируемые инпуты с возможность ввода значений > 0
//- Добавить удаление строк
//- Реализовать валидацию
//- Добавить автофокус при добавлении новой строки

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Line {
  id: number,
  quantity: number|null,
}

interface SplitQuantityPopupProps {
  show: boolean,
  total: number,
  onCancel: () => void,
  onSuccess: (parts: Array<number>) => Promise<void>,
}

export function SplitQuantityPopup({
  show,
  total,
  onCancel,
  onSuccess,
}: SplitQuantityPopupProps) {
  const [lines, setLines] = useState<Array<Line>>([
    {id: 1, quantity: null}
  ])

  const onAddLine = () => setLines(prev => ([...prev, { id: prev.length + 1, quantity: null }]))
  const canSave = true

  return (
    <ReactModal isOpen={show} style={customStyles}>
      <div className='flex items-center justify-center mb-1 pr-2 text-md font-medium flex-wrap'>
        {canSave ? <CheckCircleIcon className='h-6' color='green' /> : <XCircleIcon className='h-6' color='red' />}
        <span className='ml-1.5'>
          {`Распределено: ${0} из ${total}`}
        </span>
      </div>
      <div className='max-h-[320px] space-y-2 py-2.5 overflow-y-auto'>
        {lines.map((line, index) => <LineField
          index={index}
          onRemove={() => {}}
        />)}
        <LineField
          index={lines.length}
          onRemove={() => {}}
          onAddLine={onAddLine}
        />
      </div>
      <div className='flex space-x-2 justify-end mt-4'>
        <button onClick={onCancel}>Close</button>
        <button onClick={() => onSuccess(lines.map(x => x.quantity))}>Save</button>
      </div>
    </ReactModal>
  )
}


interface LineFieldProps {
  index: number,
  onRemove?: () => void,
  onAddLine?: () => void,
}

export const LineField = ({
  index,
  onRemove,
  onAddLine,
}: LineFieldProps) => {
  const isNewInput = !!onAddLine

  return (
    <div className={joinStrings(
      'flex justify-between items-center pl-4 pr-3.5',
      isNewInput && 'opacity-50',
    )}>
      <label className='mr-auto'>
        {`Line ${index + 1}`}
      </label>
      <input
        type='number'
        required
        className='ml-2 mr-1 w-[100px]'
      />
      <button
        onClick={onRemove}
        disabled={isNewInput || !onRemove}
      >
        <TrashIcon className='w-5 h-5' />
      </button>
    </div>
  )
}