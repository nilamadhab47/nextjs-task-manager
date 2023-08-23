import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

interface Todo {
  [key: string]: string;
}

interface FetchTodosResult {
  loading: boolean;
  error: string | null;
  todos: Todo | null;
  setTodos: (todos: Todo | null) => void;
}

export default function useFetchTodos(): FetchTodosResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo | null>(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'users', currentUser?.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodos(docSnap.data()?.todos || {});
        } else {
          setTodos({});
        }
      } catch (err: any) {
        setError('Failed to load todos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  return { loading, error, todos, setTodos };
}
