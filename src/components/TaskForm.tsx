'use client';
import { useState } from 'react';
import { useTaskStore } from '@/lib/store';

export default function TaskForm() {
  const { addTask, editTask, tasks } = useTaskStore();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const taskData = {
      name: formData.get('name') as string,
      course: formData.get('course') as string,
      deadline: new Date(formData.get('deadline') as string),
      priority: formData.get('priority') as Priority,
    };

    if (editingTask) {
      editTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }

    setIsOpen(false);
    setEditingTask(null);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 p-4 bg-cyan-500 rounded-full shadow-lg hover:bg-cyan-400 transition-all hover:scale-110"
      >
        <PlusIcon className="w-6 h-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl border border-cyan-500/20 w-full max-w-md">
            <h2 className="text-xl font-bold text-cyan-300 mb-4">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                defaultValue={editingTask?.name || ''}
                placeholder="Task Name"
                className="w-full p-2 mb-4 bg-gray-700 rounded"
                required
              />
              <input
                type="text"
                name="course"
                defaultValue={editingTask?.course || ''}
                placeholder="Course"
                className="w-full p-2 mb-4 bg-gray-700 rounded"
                required
              />
              <input
                type="datetime-local"
                name="deadline"
                defaultValue={editingTask?.deadline.toISOString().slice(0, 16) || ''}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
                required
              />
              <select
                name="priority"
                defaultValue={editingTask?.priority || 'medium'}
                className="w-full p-2 mb-4 bg-gray-700 rounded"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setEditingTask(null);
                  }}
                  className="px-4 py-2 bg-gray-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 rounded hover:bg-cyan-400"
                >
                  {editingTask ? 'Update' : 'Add'} Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
