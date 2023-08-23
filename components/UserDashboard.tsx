import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import TodoCard from './TodoCard';
import { doc, setDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';
import useFetchTodos from '../hooks/fetchTodos';

interface UserDashboardProps {}

export default function UserDashboard(props: UserDashboardProps) {
  const { currentUser } = useAuth();
  const [edit, setEdit] = useState<string | null>(null);
  const [todo, setTodo] = useState<string>('');
  const [edittedValue, setEdittedValue] = useState<string>('');

  const { todos, setTodos, loading, error } = useFetchTodos();

  console.log(todos);

  async function handleAddTodo() {
    if (!todo) {
      return;
    }
    const newKey = Object.keys(todos).length === 0 ? '1' : (Math.max(...Object.keys(todos).map(Number)) + 1).toString();
    setTodos({ ...todos, [newKey]: todo });
    const userRef = doc(db, 'users', currentUser?.uid);
    await setDoc(userRef, {
      todos: {
        [newKey]: todo,
      },
    }, { merge: true });
    setTodo('');
  }

  async function handleEditTodo() {
    if (!edittedValue) {
      return;
    }
    const newKey = edit;
    setTodos({ ...todos, [newKey]: edittedValue });
    const userRef = doc(db, 'users', currentUser?.uid);
    await setDoc(userRef, {
      todos: {
        [newKey]: edittedValue,
      },
    }, { merge: true });
    setEdit(null);
    setEdittedValue('');
  }

  function handleAddEdit(todoKey: string) {
    return () => {
      setEdit(todoKey);
      setEdittedValue(todos[todoKey]);
    };
  }

  function handleDelete(todoKey: string) {
    return async () => {
      const tempObj = { ...todos };
      delete tempObj[todoKey];

      setTodos(tempObj);
      const userRef = doc(db, 'users', currentUser?.uid);
      await setDoc(userRef, {
        todos: {
          [todoKey]: deleteField(),
        },
      }, { merge: true });
    };
  }

  return (
    <div className='w-full max-w-[65ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5'>
      <div className='flex items-stretch'>
        <input type='text' placeholder="Enter todo" value={todo} onChange={(e) => setTodo(e.target.value)} className="outline-none p-3 text-base sm:text-lg text-slate-900 flex-1" />
        <button onClick={handleAddTodo} className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base duration-300 hover:opacity-40'>ADD</button>
      </div>
      {(loading) && (<div className='flex-1 grid place-items-center'>
        <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
      </div>)}
      {(!loading) && (
        <>
          {Object.keys(todos).map((todoKey, i) => {
            return (
              <TodoCard handleEditTodo={handleEditTodo} key={i} handleAddEdit={handleAddEdit} edit={edit} todoKey={todoKey} edittedValue={edittedValue} setEdittedValue={setEdittedValue} handleDelete={handleDelete}>
                {todos[todoKey]}
              </TodoCard>
            );
          })}
        </>
      )}
    </div>
  );
}
