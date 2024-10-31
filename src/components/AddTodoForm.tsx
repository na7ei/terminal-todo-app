'use client';

import { addTodoAction } from '@/app/actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TodoFormSchema, TodoFormData } from '@/lib/validate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const sounds = {
  error: typeof window !== 'undefined' ? new Audio('/sounds/error.mp3') : null,
  add: typeof window !== 'undefined' ? new Audio('/sounds/add.mp3') : null,
  typing:
    typeof window !== 'undefined' ? new Audio('/sounds/typing.mp3') : null,
};

Object.keys(sounds).forEach((key) => {
  const sound = sounds[key as keyof typeof sounds];
  if (sound) {
    sound.onerror = () => {
      console.error(`Failed to load sound: ${key}`);
    };
  }
});

export function AddTodoForm() {
  const [showEmptyError, setShowEmptyError] = useState(false);
  //   const [errorKey, setErrorKey] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(TodoFormSchema),
  });

  const playSound = (soundName: keyof typeof sounds) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((error) => {
        console.error(`Failed to play sound: ${soundName}`, error);
      });
    }
  };

  const onBeforeSubmit = (e: React.FormEvent) => {
    const title = watch('title');
    if (!title || title.trim() === '') {
      e.preventDefault();
      playSound('error');
      setShowEmptyError(true);
      //   setErrorKey((prev) => prev + 1);
      return;
    }
    setShowEmptyError(false);
  };

  const onSubmit = async (data: TodoFormData) => {
    try {
      await addTodoAction(data);
      playSound('add');
      reset();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };
  return (
    <div className="relative">
      {/* エラーメッセージを入力欄の近くに配置 */}
      <div className="absolute -top-10 left-0 right-0 flex justify-center">
        {' '}
        {/* -top-14 → -top-10 */}
        {showEmptyError && <ErrorMessage message="Input field is empty!" />}
        {errors.title && errors.title.type !== 'too_small' && (
          <ErrorMessage message={errors.title.message || 'Invalid input'} />
        )}
      </div>

      {/* フォーム本体 */}
      <form
        onSubmit={(e) => {
          onBeforeSubmit(e);
          handleSubmit(onSubmit)(e);
        }}
        className="flex flex-col gap-3 items-center bg-black text-green-500 p-4 rounded-md shadow-lg font-mono"
      >
        <div className="w-full flex gap-3 items-center">
          <input
            {...register('title')}
            placeholder="Pleses type your task here..."
            className="flex-grow px-3 py-2 border border-green-500 rounded bg-black text-green-500 placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            aria-label="New todo"
            onInput={() => {
              playSound('typing');
              setShowEmptyError(false);
            }}
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-black rounded hover:bg-green-600 active:bg-green-800 transform hover:scale-105 active:scale-95 transition-all duration-150"
          >
            <FontAwesomeIcon icon={faPlus} className="animate-spin-once" />
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center bg-black text-red-500 px-4 py-2 rounded-lg shadow-lg animate-slide-down">
      <FontAwesomeIcon
        icon={faExclamationCircle}
        className="mr-2 animate-pulse"
        size="lg"
      />
      <p className="text-sm font-mono relative overflow-hidden whitespace-nowrap">
        <span className="animate-typing inline-block">
          [ERROR]: {message}
          <span className="animate-terminal-blink">█</span>
        </span>
      </p>
    </div>
  );
};
