'use client'

import { useAuthContext } from '@/components/providers/AuthProvider'
import { useAuth } from '@/hooks/useAuth'

export default function ProjectsPage() {
  const { user } = useAuthContext()
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Projects Dashboard</h1>
          <p className="text-gray-600 mb-4">
            Welcome {user?.email}! This is a protected page.
          </p>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}