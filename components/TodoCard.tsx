import React, { ReactNode, useState } from 'react';

interface TodoCardProps {
  children: ReactNode;
  edit: string | null;
  handleAddEdit: (todoKey: string) => () => void;
  edittedValue: string;
  setEdittedValue: React.Dispatch<React.SetStateAction<string>>;
  todoKey: string;
  handleEditTodo: () => void;
  handleDelete: (todoKey: string) => () => void;
}

export default function TodoCard(props: TodoCardProps) {
  const {
    children,
    edit,
    handleAddEdit,
    edittedValue,
    setEdittedValue,
    todoKey,
    handleEditTodo,
    handleDelete,
  } = props;

  const [completed, setCompleted] = useState(false); // State to track completion status

  const toggleCompletion = () => {
    setCompleted(!completed);
  };

  const todoTextStyle = completed ? 'line-through text-gray-400' : ''; // Apply line-through style if completed

  return (
    <div className={`p-2 relative sm:p-3 border flex items-stretch border-white border-solid ${todoTextStyle}`}>
      <div className='flex-1 flex'>
        {!(edit === todoKey) ? (
          <>{children}</>
        ) : (
          <input
            className='bg-inherit flex-1 text-white outline-none'
            value={edittedValue}
            onChange={(e) => setEdittedValue(e.target.value)}
          />
        )}
      </div>
      <div className='flex items-center'>
        <input
          type='checkbox'
          checked={completed}
          onChange={toggleCompletion}
          className='mr-2 cursor-pointer' // You can style the checkbox as needed
        />
        {(edit === todoKey) ? (
          <i onClick={handleEditTodo} className="fa-solid fa-check px-2 duration-300 hover:scale-125 cursor-pointer"></i>
        ) : (
          <i onClick={handleAddEdit(todoKey)} className="fa-solid fa-pencil px-2 duration-300 hover:rotate-45 cursor-pointer"></i>
        )}
        <i onClick={handleDelete(todoKey)} className="fa-solid fa-trash-can px-2 duration-300 hover:scale-125 cursor-pointer"></i>
      </div>
    </div>
  );
}
