import axios, { AxiosResponse } from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  id: string
  title: string
  text: string
  author: string
  important: boolean
}

interface TodosState {
  data: Todo[]
  loading: {
    get: boolean
    delete: boolean
    post: boolean
    importance: boolean
  }
  error: string | null
}

// get todos
export const getTodos = createAsyncThunk<Todo[]>('todos/get', async () => {
  const response: AxiosResponse<Todo[]> = await axios.get(
    'http://localhost:3001/todos'
  )
  if (response.status !== 200) {
    throw new Error('Failed to fetch data')
  }
  return response.data
})

// post todo
export const postTodo = createAsyncThunk<Todo, Todo>(
  'todo/post',
  async (todo, thunkAPI) => {
    try {
      const response: AxiosResponse<Todo> = await axios.post(
        'http://localhost:3001/todos',
        todo
      )
      if (response.status !== 201) {
        return thunkAPI.rejectWithValue('Failed to create todo')
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message })
    }
  }
)

// toggle importance
export const toggleImportant = createAsyncThunk<Todo, Todo>(
  'important/put',
  async (item, thunkAPI) => {
    try {
      const response: AxiosResponse<Todo> = await axios.put(
        `http://localhost:3001/todos/${item.id}`,
        { ...item, important: !item.important }
      )
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue('Failed to toggle importance')
      }
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message })
    }
  }
)

// delete single todo
export const deleteTodo = createAsyncThunk<string, string>(
  'todo/delete',
  async (id, thunkAPI) => {
    try {
      const response: AxiosResponse<void> = await axios.delete(
        `http://localhost:3001/todos/${id}`
      )
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue('Failed to delete todo')
      }
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: (error as Error).message })
    }
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    loading: { get: false, delete: false, post: false, importance: false },
    error: null,
  } as TodosState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // cases get todos
      .addCase(getTodos.pending, (state) => {
        state.loading.get = true
      })
      .addCase(getTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading.get = false
        state.data = action.payload
        state.error = null
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading.get = false
        state.error = action.error.message as string
      })
      // cases post todo
      .addCase(postTodo.pending, (state) => {
        state.loading.post = true
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        state.loading.post = false
        state.data = state.data.concat(action.payload)
        state.error = null
      })
      .addCase(postTodo.rejected, (state, action) => {
        state.loading.post = false
        state.error = action.error.message as string
      })
      // cases toggle importance
      .addCase(toggleImportant.pending, (state) => {
        state.loading.importance = true
      })
      .addCase(toggleImportant.fulfilled, (state, action) => {
        state.loading.importance = false
        state.data = state.data.map((item) =>
          item.id === action.payload.id
            ? { ...item, important: !item.important }
            : item
        )
        state.error = null
      })
      .addCase(toggleImportant.rejected, (state, action) => {
        state.loading.importance = false
        state.error = action.error.message as string
      })
      // cases delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading.delete = true
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading.delete = false
        state.data = state.data.filter((item) => item.id !== action.payload)
        state.error = null
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading.delete = false
        state.error = action.error.message as string
      })
  },
})

export default todosSlice.reducer
