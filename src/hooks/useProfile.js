import { useState, useEffect } from 'react';

export function useProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
                credentials: 'include',
                headers: token ? { 'Authorization': `Bearer ${token}` } : {}
            });
            if (res.ok) {
                const data = await res.json();
                setUserData(data);
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Failed to load profile');
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    return { userData, loading, error, refetch: fetchProfile };
}
