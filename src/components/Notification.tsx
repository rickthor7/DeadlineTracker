'use client';
import { useEffect } from 'react';
import { useTaskStore } from '@/lib/store';

export default function Notification() {
  const { tasks } = useTaskStore();

  useEffect(() => {
    // Request permission
    if ('Notification' in window) {
      Notification.requestPermission();
    }

    // Check for upcoming deadlines
    const checkDeadlines = () => {
      tasks.forEach((task) => {
        const timeLeft = new Date(task.deadline).getTime() - Date.now();
        const oneDay = 24 * 60 * 60 * 1000;

        if (timeLeft > 0 && timeLeft < oneDay) {
          new Notification(`Deadline Approaching: ${task.name}`, {
            body: `Due in ${Math.round(timeLeft / (60 * 60 * 1000))} hours`,
          });
        }
      });
    };

    // Check every hour
    const interval = setInterval(checkDeadlines, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  return null;
}
