"use client";

import { useEffect } from 'react';
import axios from 'axios';

export default function Page({ params }: { params: { curl: string } }) {
    const { curl } = params;

    useEffect(() => {
        if (curl) {
            const fetchData = async () => {
                try {
                    const response = await axios.post('http://localhost:3000/api', {
                        customUrl: curl,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.status === 200) {
                        window.location.href = response.data;
                    }
                } catch (error) {
                    alert("page not found")
                    console.error('Error making POST request:', error);
                }
            };

            fetchData();
        }
    }, [curl]);

    return null;
}
