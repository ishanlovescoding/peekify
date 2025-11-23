"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Music,
  Moon,
  ArrowRight,
  ShieldCheck,
  Info,
  Loader2
} from 'lucide-react'
import { authApi } from '@/lib/api'
import { useAuth } from '@/contexts/auth-context'

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const spinTransition = {
  repeat: Infinity,
  ease: "linear" as const,
  duration: 10
}

// --- Components ---

const SpinningRecord = () => (
  <div className="relative w-64 h-64 mx-auto mb-12">
    {/* Glow Effect behind record */}
    <div className="absolute inset-0 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />

    {/* The Record */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={spinTransition}
      className="relative w-full h-full rounded-full bg-[#18181b] border-8 border-[#09090b] shadow-2xl flex items-center justify-center overflow-hidden"
    >
      {/* Vinyl Grooves */}
      <div className="absolute inset-2 border border-white/5 rounded-full" />
      <div className="absolute inset-4 border border-white/5 rounded-full" />
      <div className="absolute inset-8 border border-white/5 rounded-full" />

      {/* Album Art Label */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 p-1 shadow-inner">
        <img
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop"
          alt="Album Art"
          className="w-full h-full rounded-full object-cover border-2 border-white/10"
        />
      </div>

      {/* Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-full" />
    </motion.div>

    {/* Floating Music Note */}
    <motion.div
      animate={{
        y: [-10, 10, -10],
        x: [-5, 5, -5],
        rotate: [0, 10, -10, 0],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/10 text-indigo-400 shadow-lg"
    >
      <Music size={20} fill="currentColor" />
    </motion.div>
  </div>
)

export default function LoginPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && user) {
      router.push('/feed')
    }
  }, [user, loading, router])

  const handleSpotifyLogin = async () => {
    try {
      await authApi.initiateSpotifyAuth()
    } catch (err) {
      console.error('Failed to initiate Spotify login:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-indigo-500/30 flex flex-col relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[120px]" />
      </div>

      {/* Navbar (Simplified) */}
      <nav className="w-full p-6 flex justify-center z-10">
        <div className="flex items-center gap-2 opacity-80">
          <Moon size={20} className="text-indigo-500" fill="currentColor" />
          <span className="font-bold text-xl tracking-tight">Replay.</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-2xl"
        >
          {/* Login Card */}
          <div className="bg-[#18181b]/80 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl shadow-black/50 text-center">

            <motion.div variants={fadeInUp}>
              <SpinningRecord />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Unlock your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                  Midnight Vibe.
                </span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Connect your Spotify to start tracking your daily anthems and building your calendar.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-4">
              <button
                className="group w-full py-4 px-6 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-[#1DB954]/20 flex items-center justify-center gap-3"
                onClick={handleSpotifyLogin}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                <span>Continue with Spotify</span>
                <ArrowRight size={20} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-2">
                <ShieldCheck size={14} />
                <span>We only access your listening history.</span>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          <motion.div
            variants={fadeInUp}
            className="mt-8 flex justify-center gap-6 text-sm text-zinc-500 font-medium"
          >
            <a href="/terms" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="/support" className="hover:text-zinc-300 transition-colors flex items-center gap-1">
              <Info size={14} /> Help
            </a>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
