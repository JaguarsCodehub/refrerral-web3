'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const LeaderboardPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Leaderboard</h1>
            <ul>
                {users.map((user: any) => (
                    <li key={user.id}>
                        {user.email}: {user.points} points
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeaderboardPage;
