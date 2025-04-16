'use client';
import { useState } from 'react';
import { useTaskStore } from '@/lib/store';
import TaskCard from './TaskCard';

export default function TaskList() {
  const { tasks, deleteTask } = useTaskStore();
  const [filter, setFilter] = useState<'all' | Priority>('all');
  const [courseFilter, setCourseFilter] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch = filter === 'all' || task.priority === filter;
    const courseMatch = courseFilter === '' || 
      task.course.toLowerCase().includes(courseFilter.toLowerCase());
    return priorityMatch && courseMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | Priority)}
          className="p-2 bg-gray-700 rounded"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          placeholder="Filter by course..."
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="p-2 bg-gray-700 rounded flex-1 min-w-[200px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
