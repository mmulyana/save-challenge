import { useState, useEffect } from 'react'
import { savesI } from './types'
import { initValue } from './utils'

function App() {
  const [saves, setSaves] = useState<savesI[]>(() => {
    const local = localStorage.getItem('DATA')
    return local ? JSON.parse(local) : initValue
  })

  useEffect(() => {
    localStorage.setItem('DATA', JSON.stringify(saves))
  }, [saves])

  function handleSaves(id: number) {
    const newSaves = saves.map((save) => {
      if (save.id === id) {
        return { ...save, isCheck: !save.isCheck }
      }
      return save
    })
    setSaves(newSaves)
  }

  return (
    <div className='py-20 container max-w-[800px] '>
      <h1 className='text-center mb-10 text-3xl text-gray-800'>Rp 20 juta dalam 52 minggu</h1>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4'>
        {saves.map(({ id, title, isCheck }) => (
          <div
            onClick={() => handleSaves(id)}
            key={id}
            className={[
              'h-20 flex items-center justify-center cursor-pointer',
              isCheck ? 'bg-blue-500 text-white' : 'bg-gray-50 text-gray-800',
            ].join(' ')}
          >
            <p className={isCheck ? 'line-through' : ''}>{title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
