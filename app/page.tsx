'use client'

import Link from 'next/link'
import { useAuthContext } from '@/components/providers/AuthProvider'

export default function Home() {
  const { user, loading } = useAuthContext()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-fluid-4xl font-bold text-gradient mb-4">
          SandPix
        </h1>
        <p className="text-fluid-xl text-gray-600 mb-8">
          Create beautiful landing pages with AI
        </p>
        
        {loading ? (
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-32 mx-auto"></div>
          </div>
        ) : user ? (
          <div className="space-y-4">
            <p className="text-gray-600">Welcome back, {user.email}!</p>
            <Link
              href="/projects"
              className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
      
      {/* Test animations */}
      <div className="mt-16 space-y-4">
        <div className="animate-fade-in bg-google-blue text-white px-4 py-2 rounded">
          Fade In Animation
        </div>
        <div className="animate-slide-up bg-google-red text-white px-4 py-2 rounded">
          Slide Up Animation
        </div>
        <div className="animate-spring bg-google-green text-white px-4 py-2 rounded">
          Spring Animation
        </div>
      </div>
    </main>
  );
}
