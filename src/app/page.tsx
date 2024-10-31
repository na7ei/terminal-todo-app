import { prisma } from '../lib/prisma';
import { TodoList } from '../components/TodoList';
import { AddTodoForm } from '../components/AddTodoForm';
import { Todo } from '../lib/validate';

export default async function Home() {
  let todos: Todo[] = [];

  try {
    todos = (await prisma.todo.findMany()) as Todo[];
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <main className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-500 mb-2 font-mono">
            {'> '}Terminal Todo List
          </h1>
          <p className="text-gray-400 font-mono">
            Your command-line style task manager
          </p>
        </div>

        <div className="space-y-10">
          <section className="bg-black/50 backdrop-blur-sm rounded-lg shadow-xl p-6 border border-green-500/30">
            <div className="mb-6">
              <div className="flex items-center mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <AddTodoForm />
            </div>

            <div>
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-green-500 mr-2"></div>
                <h2 className="text-green-500 font-mono text-lg">
                  Current Tasks ({todos.length})
                </h2>
              </div>
              <TodoList todos={todos} />
            </div>
          </section>

          <footer className="text-center text-gray-500 font-mono text-sm py-4">
            <p>Type your task and press Enter to add</p>
            <p>Click on task to toggle status • Click delete to remove</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
