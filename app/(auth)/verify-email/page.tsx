'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user?.email_confirmed_at) {
        setIsVerified(true)
        // Redirect to projects page after a short delay
        setTimeout(() => {
          router.push('/projects')
        }, 2000)
      }
    }

    // Check immediately
    checkVerificationStatus()

    // Set up interval to check every 2 seconds
    const interval = setInterval(checkVerificationStatus, 2000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [router])

  const handleResendEmail = async () => {
    setIsResending(true)
    setError(null)
    setResendMessage(null)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user?.email) {
        throw new Error('No user email found')
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        throw error
      }

      setResendMessage('Verification email sent! Please check your inbox.')
    } catch (error: any) {
      setError(error.message || 'Failed to resend verification email')
    } finally {
      setIsResending(false)
    }
  }

  if (isVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="rounded-lg bg-green-50 p-8">
            <svg
              className="mx-auto h-12 w-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Email verified successfully!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Redirecting you to your projects...
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-google-blue"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We&apos;ve sent a verification email to your inbox. Please click the link in the email to verify your account.
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-6">
          <h3 className="text-sm font-medium text-blue-900">
            Waiting for verification...
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>This page will automatically redirect once your email is verified.</p>
          </div>
        </div>

        {resendMessage && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{resendMessage}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-google-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isResending ? 'Resending...' : 'Resend verification email'}
          </button>
          
          <div className="text-center">
            <a
              href="/login"
              className="text-sm text-google-blue hover:text-blue-500"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}