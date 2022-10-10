import {CheckCircleIcon, TrashIcon, XCircleIcon} from '@heroicons/react/24/outline'
import {Modal, TextInput, ActionIcon, Button} from '@mantine/core'
import * as React from 'react'
import {useState} from 'react'
import {joinStrings} from '../utils'

//- Реализовать контролируемые инпуты с возможностью ввода значений > 0
//- Добавить удаление строк
//- Реализовать валидацию
//- Добавить автофокус при добавлении новой строки

interface Line {
  id: number,
  quantity: number|null,
}

export interface SplitQuantityPopupProps {
  opened: boolean,
  total: number,
  onClose: () => void,
  onSuccess: (parts: Array<number|null>) => Promise<void>,
}

export function SplitQuantityPopup({
  opened,
  total,
  onClose,
  onSuccess,
}: SplitQuantityPopupProps) {
  const [lines, setLines] = useState<Array<Line>>([
    {id: 1, quantity: null}
  ])

  const onAddLine = () => setLines(prev => ([...prev, { id: prev.length + 1, quantity: null }]))
  const canSave = true

  return (
    <Modal opened={opened} onClose={onClose} title="Split quantity" size='xs'>
      <div className='flex items-center justify-center mb-1 pr-2 text-md font-medium flex-wrap'>
        {canSave ? <CheckCircleIcon className='h-6' color='green' /> : <XCircleIcon className='h-6' color='red' />}
        <span className='ml-1.5'>
          {`Distributed: ${0} of ${total}`}
        </span>
      </div>
      <div className='max-h-[320px] space-y-2 py-2.5 overflow-y-auto'>
        {lines.map((line, index) => <BoxField
          index={index}
          onRemove={() => {}}
        />)}
        <BoxField
          index={lines.length}
          onRemove={() => {}}
          onAddLine={onAddLine}
        />
      </div>
      <div className='flex space-x-2 justify-end mt-4'>
        <Button onClick={onClose} variant='outline'>Close</Button>
        <Button onClick={() => onSuccess(lines.map(x => x.quantity))}>Save</Button>
      </div>
    </Modal>
  )
}


interface BoxFieldProps {
  index: number,
  onRemove?: () => void,
  onAddLine?: () => void,
}

export const BoxField = ({
  index,
  onRemove,
  onAddLine,
}: BoxFieldProps) => {
  const isNewInput = !!onAddLine

  return (
    <div className={joinStrings(
      'flex justify-between items-center pl-4 pr-3.5',
      isNewInput && 'opacity-50',
    )}>
      <label className='mr-auto'>
        {`Box ${index + 1}`}
      </label>
      <TextInput
        type='number'
        required
        className='ml-2 mr-1 w-[100px]'
      />
      <ActionIcon
        onClick={onRemove}
        disabled={isNewInput || !onRemove}
        className='bg-transparent text-red-500 hover:bg-transparent disabled:bg-transparent border-0 disabled:text-gray-500'
      >
        <TrashIcon className='w-5 h-5' />
      </ActionIcon>
    </div>
  )
}