import { useState, ChangeEvent, FormEvent } from 'react'
import { useAppDispatch } from '../../app/store'
import { postTodo, Todo } from '../../features/todos/todosSlice'

const Form = () => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    author: '',
  })

  const { title, text, author } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const randomNumber = Math.floor(Math.random() * 100000) + 1
    const newTodo: Todo = {
      id: randomNumber.toString(),
      title,
      text,
      author,
      important: true,
    }
    dispatch(postTodo(newTodo))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor='title'>Title</label>
        </div>
        <input
          type='text'
          id='title'
          name='title'
          value={title}
          onChange={onChange}
        />
      </div>
      <div>
        <div>
          <label htmlFor='text'>Text</label>
        </div>
        <input
          type='text'
          id='text'
          name='text'
          value={text}
          onChange={onChange}
        />
      </div>
      <div>
        <div>
          <label htmlFor='author'>Author</label>
        </div>
        <input
          type='text'
          id='author'
          name='author'
          value={author}
          onChange={onChange}
        />
      </div>

      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default Form
