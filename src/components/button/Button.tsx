import { useAppDispatch } from '../../app/store'
import {
  deleteTodo,
  toggleImportant,
  Todo,
} from '../../features/todos/todosSlice'
import styled from './button.module.css'

interface ButtonProps {
  item: Todo
}

function Button({ item }: ButtonProps) {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteTodo(item.id))
  }

  const handleImportance = () => {
    dispatch(toggleImportant(item))
  }

  return (
    <div className={styled.container}>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleImportance}>
        {item.important ? 'set to not important' : 'set to important'}
      </button>
    </div>
  )
}

export default Button
