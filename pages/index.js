import { gql, useLazyQuery } from '@apollo/react-hooks';
import Head from 'next/head'
import { useEffect, useState } from 'react'
import TodoItem from '../src/components/todoitem'

const GET_TODO = gql`
query($arg:TodoArgs){
  todos(args:$arg){
    items{
      id
      todo
      status
    }
    count
  }
}
`

export default function Home() {
  const [todo, setTodo] = useState('');
  const [search, setSearch] = useState('');

  const handleTodoChange = (e) => {
    setTodo(e.target.value)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const [getTodos, { loading, data }] = useLazyQuery(GET_TODO, {
    onCompleted: (cdata) => {
      console.log(cdata)
    }
  });

  useEffect(() => {
    getTodos({
      variables: {
        arg: {
          offset: 0,
          first: 100,
          search: ""
        }
      }
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="min-h-100 w-full flex items-center justify-center font-sans">
          <div className=" bg-gray-100 rounded shadow p-4 mt-3 w-full lg:w-4/5 lg:max-w-lg">
            <div className="mb-4">
              <h1 className="text-grey-darkest">Todo List</h1>
              <div className="flex mt-4">
                <input value={todo} onChange={handleTodoChange} className="shadow appearance-none border border-gray-200 rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                <button className="flex-no-shrink p-2 border-2 rounded text-teal border-green-300 hover:text-white hover:bg-green-300">Add</button>
              </div>
            </div>
            <div>
              <div className="relative text-gray-600 focus-within:text-gray-400">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2 pt-2">
                  <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </button>
                </span>
                <input type="search" value={search} name="q" onChange={handleSearch} className="py-2 text-sm text-white bg-gray-100 rounded-md pl-10 focus:outline-none focus:bg-gray-200 focus:text-gray-900 w-full mt-1" placeholder="Search..." autocomplete="off" />
              </div>

              {data && data.todos && data.todos.items ? [...data.todos.items].filter(item => {
                return item.todo.indexOf(search) > -1
              }).map(item => {
                return <TodoItem key={'todo-item' + item.id} data={item} />
              }) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
