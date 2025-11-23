"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Music,
  Moon,
  Sparkles,
  Clock,
  Camera,
  Calendar,
  ArrowRight,
  Github,
  Twitter
} from 'lucide-react';

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// --- Components ---

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -5 }}
    className="bg-[#18181b] border border-white/5 p-8 rounded-[32px] relative group overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-zinc-400 leading-relaxed">{description}</p>
  </motion.div>
);

const DemoCard = () => (
  <motion.div
    initial={{ rotate: -5, y: 20, opacity: 0 }}
    animate={{ rotate: -2, y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative z-10 w-full max-w-xs mx-auto"
  >
    {/* Floating Badges */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -top-6 -right-6 bg-[#18181b] border border-white/10 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
    >
      <div className="bg-indigo-500/20 p-2 rounded-full text-indigo-400">
        <Music size={16} />
      </div>
      <div>
        <p className="text-xs text-zinc-400 font-medium">Now Playing</p>
        <p className="text-sm text-white font-bold">Midnight City</p>
      </div>
    </motion.div>

    {/* Main Card */}
    <div className="bg-[#18181b] rounded-[32px] overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
      <div className="relative aspect-[4/5] bg-zinc-900">
        <img
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop"
          alt="Album Art"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
          <h3 className="text-xl font-bold text-white">M83</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-full text-[10px] font-bold text-white">42 plays</span>
            <span className="text-zinc-400 text-xs">2h late</span>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center bg-[#18181b]">
        <div className="flex -space-x-2">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#18181b] bg-zinc-700" />
          ))}
        </div>
        <div className="text-zinc-500">
          <Camera size={20} />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white font-sans selection:bg-indigo-500/30 overflow-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Moon size={24} fill="currentColor" />
            </div>
            <span className="font-bold text-2xl tracking-tight">Replay.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
            <Link href="/auth/login">
              <button className="bg-white/10 text-white px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors font-bold">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-40 right-20 w-80 h-80 bg-violet-600/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8 text-center md:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              <span>Now Available in Dark Mode</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Your music diary. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                Midnight vibes only.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl text-zinc-400 leading-relaxed max-w-md mx-auto md:mx-0">
              Connect Spotify. Track your daily anthems. Share the late-night energy with real friends. No likes, no comments, just music.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="/auth/login">
                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2">
                  <Music size={20} />
                  Connect Spotify
                </button>
              </Link>
              <Link href="/demo">
                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/5 transition-colors">
                  View Demo
                </button>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-8 flex items-center gap-4 justify-center md:justify-start text-zinc-500 text-sm">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" className="w-8 h-8 rounded-full border-2 border-[#09090b]" />
                ))}
              </div>
              <p>Joined by 10,000+ listeners</p>
            </motion.div>
          </motion.div>

          <div className="relative hidden md:block">
            <DemoCard />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-[#09090b] relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-5xl font-bold">Anti-social media.</h2>
            <p className="text-zinc-400 text-xl">Built for music lovers, not algorithms.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            <FeatureCard
              icon={Moon}
              title="The 9:30 PM Ritual"
              description="Every night, get notified to check your daily recap. It's a moment of reflection, not a doomscroll."
            />
            <FeatureCard
              icon={Camera}
              title="Real Reactions"
              description="React with a selfie or an emoji. No comments sections, no performative likes. Just genuine connection."
            />
            <FeatureCard
              icon={Calendar}
              title="Visual Archives"
              description="Watch your music taste evolve over time. Your calendar becomes a beautiful mosaic of your life in songs."
            />
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-[80px]" />
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 mt-12">
                  <div className="bg-[#18181b] p-4 rounded-2xl border border-white/5 shadow-xl">
                    <div className="h-32 bg-zinc-800 rounded-xl mb-3 animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-zinc-800 rounded" />
                  </div>
                  <div className="bg-[#18181b] p-4 rounded-2xl border border-white/5 shadow-xl">
                    <div className="h-32 bg-zinc-800 rounded-xl mb-3 animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-zinc-800 rounded" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#18181b] p-4 rounded-2xl border border-white/5 shadow-xl">
                    <div className="h-32 bg-zinc-800 rounded-xl mb-3 animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-zinc-800 rounded" />
                  </div>
                  <div className="bg-[#18181b] p-4 rounded-2xl border border-white/5 shadow-xl">
                    <div className="h-32 bg-zinc-800 rounded-xl mb-3 animate-pulse" />
                    <div className="h-4 w-2/3 bg-zinc-800 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-zinc-800 rounded" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 order-1 md:order-2">
              <h2 className="text-4xl font-bold">Zero effort. <br />Maximum vibe.</h2>
              <div className="space-y-6">
                {[
                  { step: "01", title: "Connect", desc: "Link your Spotify account once. We handle the tracking in the background." },
                  { step: "02", title: "Listen", desc: "Go about your day. Listen to your favorite tunes on any device." },
                  { step: "03", title: "Reveal", desc: "At 9:30 PM, your song of the day is unlocked. Share it with friends." }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="text-indigo-500 font-mono font-bold text-lg pt-1">{item.step}</span>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-indigo-900/10 to-[#09090b]" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Ready to Replay?</h2>
          <p className="text-xl text-zinc-400 mb-10">
            Join the community of music lovers reclaiming their listening history.
            Free forever. No ads. Just music.
          </p>
          <Link href="/auth/login">
            <button className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-2xl shadow-white/10">
              Get Started Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-[#09090b]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Moon size={20} className="text-indigo-500" fill="currentColor" />
            <span className="font-bold text-xl">Replay.</span>
          </div>

          <div className="flex gap-8 text-zinc-500 text-sm font-medium">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>

          <div className="text-zinc-600 text-sm">
            © 2025 Replay App.
          </div>
        </div>
      </footer>
    </div>
  );
}
