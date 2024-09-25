"use client"
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import { GetUser } from '../api/userApi';


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await GetUser(getCookie("token") as string)
        setUser(response.user);
      } catch (err) {
        console.log("error form useAuth hook", err)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);
  return { user, loading };
};
