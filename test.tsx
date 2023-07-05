import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postTodo } from '../../features/todos/todosSlice'

const Form = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    author: '',
  })

  const { title, text, author } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const randomNumber = Math.floor(Math.random() * 100000) + 1
    dispatch(postTodo({ ...formData, id: randomNumber, important: true }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label>title</label>
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
          <label>Text</label>
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
          <label>Author</label>
        </div>
        <input
          type='string'
          id='author'
          name='author'
          value={author}
          onChange={onChange}
        />
      </div>

      <div>
        <button type={'submit'}>mandar</button>
      </div>
    </form>
  )
}
export default Form
