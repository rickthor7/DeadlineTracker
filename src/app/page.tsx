'use client';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import Notification from '@/components/Notification';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <header className="p-8 text-center">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500">
          DEADLINE TRACKER
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <TaskForm />
        <TaskList />
      </main>

      <Notification />
    </div>
  );
}
