import { useState } from 'react';

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

export default function App() {
    const [inputValue, setInputValue] = useState<string>('');
    const [task, setTask] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    function addTask() {
        if (inputValue.trim() === '') {
            setError('Please Write a Task');
            return;
        }
        setError('');
        const newTask: Task = {
            id: Date.now().toString(),
            title: inputValue.trim(),
            completed: false
        };
        setTask([...task, newTask]);
        setInputValue('');
        setIsModalOpen(false);
    }

    const deleteTask = (id: string): void => {
        const updatedTask = task.filter(t => t.id !== id);
        setTask(updatedTask);
    };

    const toggleTask = (id: string): void => {
        const updatedTask = task.map(t => {
            if (t.id === id) {
                return {...t, completed: !t.completed};
            }
            return t;
        });
        setTask(updatedTask);
    };

    return (
        <div className='font-sans bg-main text-text-main m-0 p-0 w-screen h-screen overflow-x-hidden relative'>
            <h1 className='text-2xl text-text-main font-bold ml-3 pt-4'>To-Do List</h1>
            <div className='my-10 mx-auto p-4 md:max-w-md'>
                {error && (
                    <p className='flex flex-col justify-center p-2 mb-3 text-sm text-red-800 bg-red-400 border-none rounded-lg w-full'>{error}</p>
                )}
                <ul className='flex flex-col gap-2'>
                    {task.map(t => (
                        <li key={t.id} className='flex items-center justify-between bg-main text-text-main p-3 rounded-xl border border-gray-500 shadow-main'>
                            <div className='flex items-center gap-3 w-full justify-between'>
                                <div className='flex items-center gap-3'>
                                    <input type='checkbox' checked={t.completed} onChange={() => toggleTask(t.id)} className='w-4 h-4 rounded cursor-pointer accent-text-main'/>
                                    <p className={t.completed ? 'line-through text-gray-500' : ''}>{t.title}</p>
                                </div>
                                <button onClick={() => deleteTask(t.id)} className='text-sm px-2 py-1 rounded-full border-red-700 border-2 bg-red-400 hover:text-red-500 hover:scale-[1.03] active:scale-95 transition-all duration-200 ease-in-out cursor-pointer'>X</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={() => setIsModalOpen(true)} className='fixed bottom-6 right-6 w-14 h-14 bg-button border-none rounded-3xl shadow-button hover:scale-[1.05] hover:shadow-button-hover transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center'>
                <p className='text-3xl font-black text-white leading-none pb-2'>+</p>
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className='flex flex-col gap-6 w-11/12 md:w-3/4 max-w-2xl h-auto p-8 relative overflow-hidden rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-modal transition-all duration-300'>
                        <div className='absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none' />
                        <button onClick={() => setIsModalOpen(false)} className='absolute top-4 right-4 z-50 text-white/60 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 text-sm font-bold cursor-pointer'>X</button>
                        <div className='relative z-10'>
                            <h2 className='text-xl font-semibold text-white mb-4'>Add New Task</h2>
                            <div className='flex flex-row gap-2'>
                                <input type='text' value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTask()} placeholder='Type your task...' className='bg-black/20 text-white placeholder-white/40 rounded-lg p-3 flex-1 border border-white/10 focus:outline-none focus:border-white/30'/>
                                <button onClick={addTask} className='bg-button px-4 py-2 text-white rounded-xl border-none transition-all duration-200 hover:scale-[1.03] active:scale-95 font-medium text-base cursor-pointer'>Add</button>   
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}