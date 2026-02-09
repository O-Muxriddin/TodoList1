import React, { useState, useEffect } from "react";

export default function App() {
  const [todos, setTodo] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodo([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  function edit(index) {
    const editPort = prompt("Edit todo", todos[index].text);
    if (editPort === null || editPort.trim() === "") return;

    const newTodos = [...todos];
    newTodos[index] = {
      ...newTodos[index],
      text: editPort,
    };

    setTodo(newTodos);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="bg-white shadow-lg rounded-3xl p-16">
        <h1 className="text-3xl font-bold text-center text-amber-700 mb-6">
          Todo List
        </h1>

        <div className="mb-4 flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a new todo"
            className="grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                  setTodo(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t,
                    ),
                  )
                }
                className="mr-2 h-5 w-5"
              />

              <span
                className={`grow ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>

              <button
                onClick={() => edit(index)}
                className="ml-2 p-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                Edit
              </button>

              <button
                onClick={() => setTodo(todos.filter((t) => t.id !== todo.id))}
                className="ml-2 p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
