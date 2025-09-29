import { loadTasks } from '@/lib/contentful/apis/tasks-api';
import React from 'react';

const Home: React.FC = async () => {
    const tasks = await loadTasks();

    return (
        <div>
            <h1>Welcome to Klingende Klavierschule</h1>
            <p>Your journey to mastering the piano starts here!</p>
            {tasks.map((task) => (
                <div key={task.id}>
                    <h2>{task.name}</h2>
                    <p>{task.slug}</p>
                </div>
            ))}
        </div>
    );
};

export default Home;