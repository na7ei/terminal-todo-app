'use client';

import { Todo } from '@/lib/validate';
import { toggleTodoAction, deleteTodoAction } from '@/app/actions';

// 音声ファイルの初期化
const sounds = {
  check: typeof window !== 'undefined' ? new Audio('/sounds/check.mp3') : null,
  delete:
    typeof window !== 'undefined' ? new Audio('/sounds/delete.mp3') : null,
};

// 音声ファイルのロードエラーをチェック
Object.keys(sounds).forEach((key) => {
  const sound = sounds[key as keyof typeof sounds];
  if (sound) {
    sound.onerror = () => {
      console.error(`Failed to load sound: ${key}`);
    };
  }
});

export function TodoList({ todos }: { todos: Todo[] }) {
  const playSound = (soundName: keyof typeof sounds) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(console.error);
    }
  };

  return (
    <ul
      className="mt-4 bg-black p-4 rounded-lg shadow-xl font-mono text-green-500"
      data-testid="todo-items"
    >
      {todos.length === 0 ? (
        <li className="text-center text-green-500">
          <p>
            No tasks found. Type{' '}
            <span className="text-yellow-500">&rdquo;add task&quot;</span> to
            create a new todo.
          </p>
        </li>
      ) : (
        todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between mb-2 p-2 bg-black rounded-md hover:bg-gray-700 transition-colors duration-300 cursor-pointer"
            data-testid="todo-item"
            onClick={async () => {
              await toggleTodoAction(todo.id!, !todo.completed);
              playSound('check');
            }}
          >
            <span
              className={`flex-1 ${
                todo.completed ? 'line-through opacity-70' : ''
              }`}
            >
              [{todo.completed ? 'x' : ' '}] {todo.title}
            </span>
            <form
              action={async () => {
                await deleteTodoAction(todo.id!);
                playSound('delete');
              }}
              onClick={(e) => e.stopPropagation()} // 親のクリックイベントを防ぐ
            >
              <button
                type="submit"
                className="ml-3 text-red-500 hover:text-red-700 font-bold transition-colors duration-300"
              >
                Delete
              </button>
            </form>
          </li>
        ))
      )}
    </ul>
  );
}
