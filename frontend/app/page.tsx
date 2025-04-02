'use client'

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface Dog {
  id: string;
  name: string;
  breed: string;
  birthdate: string;
}

export default function HomePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [dogsLoading, setDogsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    async function fetchDogs() {
      if (user) {
        try {
          const fetchedDogs = await api.getDogs();
          setDogs(fetchedDogs);
        } catch (error) {
          console.error('Error fetching dogs:', error);
        } finally {
          setDogsLoading(false);
        }
      }
    }
    fetchDogs();
  }, [user]);

  if (loading || dogsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Pawgress</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Dogs</h2>
              <button
                onClick={() => router.push('/dogs/new')}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Add New Dog
              </button>
            </div>

            {dogs.length === 0 ? (
              <p className="text-gray-500">No dogs added yet. Add your first dog to get started!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dogs.map((dog) => (
                  <div
                    key={dog.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/dogs/${dog.id}`)}
                  >
                    <h3 className="text-lg font-semibold">{dog.name}</h3>
                    <p className="text-gray-600">{dog.breed}</p>
                    <p className="text-sm text-gray-500">
                      Born: {new Date(dog.birthdate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 