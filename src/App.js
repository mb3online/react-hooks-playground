import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const Form = ({ addTodo }) => {
  const [todo, setTodo] = useState('');

  return (
    <React.Fragment>
      <input type="text" value={todo} onChange={e => setTodo(e.target.value)} />
      <button
        onClick={() => {
          addTodo(todo);
          setTodo('');
        }}
      >
        Add
      </button>
    </React.Fragment>
  );
};

//////////////////////////////////////////////////////////////////////
const TodoItem = props => (
  <li style={{ textDecoration: props.todo.complete ? 'underline' : 'none' }}>
    {props.todo.text}
    &nbsp;
    {!props.isFirst && (
      <button onClick={() => props.moveUp(props.index)}>UP</button>
    )}
    {!props.isLast && (
      <button onClick={() => props.moveDown(props.index)}>DOWN</button>
    )}
    <button onClick={() => props.complete(props.index)}>complete</button>
  </li>
);
//////////////////////////////////////////////////////////////////////

const Todo = props => {
  const [todos, move, complete, addTodo] = useTodo();

  return (
    <div>
      <Form addTodo={addTodo} />
      <ol>
        {todos.map((todo, index) => (
          <TodoItem
            isFirst={index === 0}
            isLast={todos.length - 1 === index}
            todo={todo}
            index={index}
            key={index}
            moveUp={move(-1)}
            moveDown={move(1)}
            complete={complete}
          />
        ))}
      </ol>
    </div>
  );
};

function useTodo() {
  const [todos, setTodos] = useState([
    { text: 'oh what', complete: false },
    { text: 'foo', complete: false },
    { text: 'bar', complete: false },
  ]);

  const move = dir => i => {
    if ((dir === -1 && !i) || (dir === 1 && i === todos.length - 1)) return;
    let ltodos = todos;
    let temp = todos[i];
    ltodos[i] = ltodos[i + dir];
    ltodos[i + dir] = temp;
    setTodos(ltodos);
  };

  const complete = i => {
    let temp = todos;
    temp[i].complete = !temp[i].complete;
    setTodos(todos);
  };

  const addTodo = text => {
    setTodos([...todos, { text, complete: false }]);
  };

  return [todos, move, complete, addTodo];
}

export default Todo;
