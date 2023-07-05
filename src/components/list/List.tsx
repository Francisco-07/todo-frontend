import { useState, useEffect } from 'react'
import { useAppSelector } from '../../app/store'
import { useAppDispatch, RootState } from '../../app/store'
import { getTodos, Todo } from '../../features/todos/todosSlice'
import Button from '../button/Button'
import styled from './list.module.css'

function List() {
  const dispatch = useAppDispatch()
  const [showAll, setShowAll] = useState(true)
  const { data, loading, error } = useAppSelector(
    (state: RootState) => state.todos
  )

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])

  const todoToShow: Todo[] = showAll
    ? data
    : data.filter((todo) => todo.important === true)

  if (loading.get) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <div className={styled.listContainer}>
        {todoToShow.map((item: Todo, index: number) => (
          <ul key={index} className={styled.list}>
            <li className={styled.listItem}>
              <h2>{item.title}</h2>
            </li>
            <li>{item.text}</li>
            <li>{item.author}</li>
            <Button item={item} />
          </ul>
        ))}
      </div>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
    </div>
  )
}

export default List
