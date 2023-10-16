import { FormEvent, useState } from "react";
import './App.css';

export const ToDo = () => {
  const [todos, setToDos] = useState<string[]>(['Taylor Swift']);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === '') {
      alert('Empty ToDos Not allowed');
    }
    else {
      setToDos([...todos, inputValue]);
      setInputValue(''); // Clear the input field after submitting. 
    }
  };

  return (
    <div className="overlay">
      <h1>TO DO LIST</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {
        todos.map((item, index) => (
          <div key={index}>
            <h1>{item}</h1>
            <button onClick={() => setToDos(todos ? todos.filter((_, i) => i !== index) : [])}>
              Delete
            </button>
            <br />
            <br />
          </div>
        ))
      }
    </div>
  )
}
