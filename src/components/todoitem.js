import React from 'react';

const TodoItem = (props) => {
  return (
    <div className="shadow-md m-1">
      <div className="flex mb-4 items-center p-2">
        <p className={props.data.status === "pending" ? "w-full text-gray-800" : "w-full line-through text-green-600"}>{props.data.todo}</p>
        {props.data.status === "pending" ? <button className="flex-no-shrink h-8 px-4 mr-1 text-sm transition-colors duration-150 rounded-lg hover:text-white text-green-600 border-green-600 hover:bg-green-600" onClick={() => {
          props.setStatus({
            variables: {
              id: props.data.id,
              status: "done"
            }
          })
        }}>Done</button> : null}
        <button className="flex-no-shrink h-8 px-4 text-sm transition-colors duration-150 rounded-lg hover:text-white text-red-600 hover:bg-red-600">x</button>
      </div>
    </div>
  )
}
export default TodoItem