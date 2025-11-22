"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Calendar,
  User,
  Music,
  Share2,
  MoreVertical,
  Play,
  Clock,
  LogOut,
  Plus,
  Camera,
  Smile,
  X,
  Moon,
  Sparkles
} from 'lucide-react';

// --- Animation Variants ---

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleTap = { scale: 0.95 };
const scaleHover = { scale: 1.02 };

// --- Mock Data ---

const CURRENT_USER = {
  id: 'user_1',
  username: 'alex_listener',
  displayName: 'Alex',
  profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
  bio: 'Indie rock enthusiast & vinyl collector 🎧',
  stats: {
    daysTracked: 142,
    totalPlays: 3429,
    hoursListened: 124,
    uniqueArtists: 89
  }
};

const FRIENDS = [
  { id: 'u2', username: 'sarah_j', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'u3', username: 'mike_beats', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { id: 'u4', username: 'emma_w', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
];

const POSTS = [
  {
    id: 'post_1',
    user: FRIENDS[0],
    song: {
      name: 'Midnight City',
      artist: 'M83',
      album: 'Hurry Up, We\'re Dreaming',
      art: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&h=600&fit=crop',
      duration: '4:03'
    },
    timestamp: '2h late',
    playCount: 42,
    reactions: [
      { userId: 'u3', emoji: '🔥', user: FRIENDS[1] },
      { userId: 'u4', emoji: '😍', user: FRIENDS[2] },
    ]
  },
  {
    id: 'post_2',
    user: FRIENDS[1],
    song: {
      name: 'As It Was',
      artist: 'Harry Styles',
      album: 'Harry\'s House',
      art: 'https://images.unsplash.com/photo-1621360841013-c768371e93cf?w=600&h=600&fit=crop',
      duration: '2:47'
    },
    timestamp: 'On time',
    playCount: 156,
    reactions: [
      { userId: 'u2', emoji: '⚡️', user: FRIENDS[0] },
    ]
  },
  {
    id: 'post_3',
    user: FRIENDS[2],
    song: {
      name: 'Vampire',
      artist: 'Olivia Rodrigo',
      album: 'GUTS',
      art: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=600&h=600&fit=crop',
      duration: '3:39'
    },
    timestamp: '5h late',
    playCount: 8,
    reactions: []
  }
];

// Generate Calendar Data
const generateCalendarData = () => {
  const days = [];
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    if (Math.random() > 0.3) {
      days.push({
        day: i,
        hasSong: true,
        fallbackArt: [
          'https://images.unsplash.com/photo-1619983081563-430f63602796?w=100&h=100&fit=crop',
          'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&h=100&fit=crop',
          'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&h=100&fit=crop',
          'https://images.unsplash.com/photo-1514525253440-b393452e3383?w=100&h=100&fit=crop'
        ][i % 4]
      });
    } else {
      days.push({ day: i, hasSong: false });
    }
  }
  return days;
};

const CALENDAR_DATA = generateCalendarData();

// --- Components ---

const Button = ({ children, variant = 'primary', size = 'md', className = '', onClick, disabled }: any) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  // Dark Mode Theme
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    ghost: "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white",
    outline: "border-2 border-zinc-700 text-zinc-300 hover:border-indigo-500 hover:text-white"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
    icon: "p-2.5"
  };

  return (
    <motion.button
      whileHover={scaleHover}
      whileTap={scaleTap}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

const Avatar = ({ src, alt, size = 'md', className = '' }: any) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`relative rounded-full overflow-hidden border-2 border-[#121212] shadow-sm ${sizes[size]} ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  );
};

// --- Feature Components ---

const ReactionRing = ({ reactions }: { reactions: any[] }) => {
  if (!reactions || reactions.length === 0) return null;

  const visible = reactions.slice(0, 3);

  return (
    <div className="absolute bottom-[-8px] right-[-8px] flex flex-row-reverse pointer-events-none">
      {visible.map((r, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
          className="relative ml-[-15px] z-10"
        >
          <div className="w-10 h-10 rounded-full border-2 border-[#18181b] overflow-hidden bg-zinc-800 shadow-lg">
            <img src={r.user.avatar} alt={r.user.username} className="w-full h-full object-cover opacity-90" />
          </div>
          <div className="absolute -bottom-1 -right-1 text-base bg-[#18181b] rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
            {r.emoji}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const PostCard = ({ post }: { post: any }) => {
  const [isReacting, setIsReacting] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-[#18181b] rounded-[32px] overflow-hidden mb-8 relative group shadow-lg border border-white/5 hover:border-white/10 transition-colors duration-300"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between z-20 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <Avatar src={post.user.avatar} alt={post.user.username} size="md" className="border-white/20" />
          <div>
            <div className="font-bold text-white drop-shadow-md">{post.user.username}</div>
            <div className="text-xs text-white/80 font-medium drop-shadow-md flex items-center gap-1">
              <Clock size={10} /> {post.timestamp}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:text-white">
          <MoreVertical size={24} />
        </Button>
      </div>

      {/* Content Image */}
      <div className="relative aspect-[4/5] w-full bg-zinc-900">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          src={post.song.art}
          alt={post.song.name}
          className="w-full h-full object-cover opacity-90"
        />

        {/* Song Metadata Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#18181b] via-[#18181b]/60 to-transparent pointer-events-none">
          <div className="mb-2">
            <h3 className="text-2xl font-bold text-white leading-tight tracking-wide">{post.song.name}</h3>
            <p className="text-zinc-400 font-medium">{post.song.artist}</p>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full mt-2 border border-white/5">
            <Play size={12} className="fill-white text-white" />
            <span className="text-xs font-bold text-white">{post.playCount} plays</span>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 z-30">
          <ReactionRing reactions={post.reactions} />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between py-4 px-4">
        <motion.button
          onClick={() => setIsReacting(!isReacting)}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full"
        >
          {isReacting ? (
            <div className="flex gap-3">
              {['⚡️', '🔥', '😍'].map((emoji, i) => (
                <motion.span
                  key={emoji}
                  initial={{ scale: 0, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-2xl hover:scale-125 transition-transform cursor-pointer"
                >
                  {emoji}
                </motion.span>
              ))}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/10 p-1.5 rounded-full"
              >
                <Camera size={18} className="text-white" />
              </motion.div>
            </div>
          ) : (
            <>
              <Smile size={20} />
              <span>React</span>
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
        >
          <Share2 size={22} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const CalendarGrid = ({ onDayClick }: { onDayClick: (day: any) => void }) => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold text-white tracking-tight">Memories</h2>
          <p className="text-zinc-500 text-sm font-medium">November 2025</p>
        </div>
        <div className="w-10 h-10 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400">
          <Calendar size={20} />
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-7 gap-3"
      >
        {weekDays.map(d => (
          <div key={d} className="text-center text-zinc-600 text-xs font-bold py-2">{d}</div>
        ))}
        {CALENDAR_DATA.map((day: any) => (
          <motion.div
            key={day.day}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => day.hasSong && onDayClick(day)}
            className={`
              aspect-square relative overflow-hidden cursor-pointer rounded-2xl transition-colors duration-300
              ${day.hasSong
                ? 'bg-zinc-800 shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 border border-white/5'
                : 'bg-transparent border border-dashed border-zinc-800'}
            `}
          >
            {day.hasSong ? (
              <>
                <img
                  src={day.fallbackArt}
                  alt={`Song for day ${day.day}`}
                  className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-1 left-1 w-6 h-6 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-full shadow-sm">
                  <span className="text-white font-bold text-[10px]">{day.day}</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700 text-xs font-medium">
                {day.day}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// --- Main App Component ---

export default function DemoPage() {
  const [currentRoute, setCurrentRoute] = useState('feed');
  const [selectedDay, setSelectedDay] = useState<any>(null);

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white pb-28 md:pb-0 md:pl-72 font-sans selection:bg-indigo-500/30 overflow-x-hidden">

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-white/5 bg-[#09090b]/95 backdrop-blur-xl fixed top-0 left-0 h-screen z-50 py-8 px-6">
        <div className="flex items-center gap-3 mb-12">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20"
          >
            <Moon size={24} fill="currentColor" />
          </motion.div>
          <span className="font-bold text-2xl text-white">Replay.</span>
        </div>

        <nav className="flex-1 flex flex-col gap-3">
          {[
            { id: 'feed', icon: Home, label: 'Feed' },
            { id: 'calendar', icon: Calendar, label: 'Memories' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
                currentRoute === item.id
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-zinc-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={24} strokeWidth={currentRoute === item.id ? 2.5 : 2} />
              {item.label}
            </motion.button>
          ))}
        </nav>

        <div className="mt-auto">
          <motion.button
            whileHover={{ x: 5, color: "#ef4444" }}
            onClick={() => navigate('login')}
            className="flex items-center gap-3 px-4 py-3 text-zinc-500 rounded-xl transition-colors w-full font-medium"
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </motion.button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-6 sticky top-0 bg-[#09090b]/80 backdrop-blur-xl z-40 border-b border-white/5">
        <div className="font-bold text-2xl text-white flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          >
            <Moon className="text-indigo-500 fill-indigo-500" size={24} />
          </motion.div>
          Replay.
        </div>
        <div className="flex gap-4">
          <Avatar src={CURRENT_USER.profilePicture} alt="Me" size="sm" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-lg mx-auto p-4 pt-2 md:pt-12 min-h-screen">
        <AnimatePresence mode="wait">

          {/* FEED VIEW */}
          {currentRoute === 'feed' && (
            <motion.div
              key="feed"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              variants={staggerContainer}
              className="space-y-10"
            >
              <motion.div variants={fadeInUp} className="flex justify-between items-center px-2">
                <div>
                  <h1 className="text-3xl font-bold text-white">Tonight</h1>
                  <p className="text-zinc-500 font-medium">Capture the vibe.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-[#18181b] rounded-full p-3 shadow-lg border border-white/10 hover:border-indigo-500/50 transition-colors"
                >
                  <Plus size={24} className="text-zinc-400 hover:text-indigo-400" />
                </motion.button>
              </motion.div>

              <div>
                {POSTS.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              <motion.div variants={fadeInUp} className="py-16 flex flex-col items-center justify-center gap-4 text-center opacity-40">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-zinc-500"
                >
                  <Music size={32} />
                </motion.div>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">All Caught Up</p>
              </motion.div>
            </motion.div>
          )}

          {/* CALENDAR VIEW */}
          {currentRoute === 'calendar' && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarGrid onDayClick={setSelectedDay} />
            </motion.div>
          )}

          {/* PROFILE VIEW */}
          {currentRoute === 'profile' && (
            <motion.div
              key="profile"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              variants={staggerContainer}
              className="pt-4"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-[#18181b] rounded-[40px] p-8 shadow-lg border border-white/5 text-center mb-8 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none" />

                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-32 h-32 mx-auto rounded-full border-4 border-[#18181b] outline outline-2 outline-indigo-500/50 shadow-xl overflow-hidden mb-6"
                  >
                    <img src={CURRENT_USER.profilePicture} alt={CURRENT_USER.username} className="w-full h-full object-cover" />
                  </motion.div>
                  <h1 className="text-3xl font-bold text-white mb-1">{CURRENT_USER.displayName}</h1>
                  <p className="text-zinc-500 font-medium">@{CURRENT_USER.username}</p>
                  <p className="mt-4 text-zinc-400 max-w-xs mx-auto leading-relaxed">{CURRENT_USER.bio}</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 mb-10">
                <motion.div whileHover={{ y: -5 }} className="bg-[#18181b] p-6 rounded-3xl text-center shadow-lg border border-white/5">
                  <div className="text-3xl font-bold text-white mb-1">{CURRENT_USER.stats.totalPlays}</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Total Plays</div>
                </motion.div>
                <motion.div whileHover={{ y: -5 }} className="bg-[#18181b] p-6 rounded-3xl text-center shadow-lg border border-white/5">
                  <div className="text-3xl font-bold text-indigo-400 mb-1">{CURRENT_USER.stats.daysTracked}</div>
                  <div className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Streak</div>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6 px-2">
                <Sparkles className="text-indigo-500 w-5 h-5" />
                <h2 className="text-xl font-bold text-white">Recent Vibes</h2>
              </motion.div>

              <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square rounded-2xl overflow-hidden relative group cursor-pointer shadow-md bg-[#18181b] border border-white/5 hover:border-indigo-500/30 transition-colors"
                  >
                    <img
                      src={`https://images.unsplash.com/photo-${i % 2 ? '1470225620780-dba8ba36b745' : '1493225255756-d9584f8606e9'}?w=300&h=300&fit=crop`}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500"
                      alt="Memory"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-[#18181b]/90 backdrop-blur-xl rounded-full shadow-2xl shadow-black/50 border border-white/10 z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {[
            { id: 'feed', icon: Home },
            { id: 'calendar', icon: Calendar },
            { id: 'profile', icon: User },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.id)}
              whileTap={{ scale: 0.8 }}
              className={`p-3 rounded-full transition-all duration-300 ${
                currentRoute === item.id
                  ? 'text-white bg-indigo-600 shadow-lg shadow-indigo-500/40 scale-110'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <item.icon size={24} strokeWidth={currentRoute === item.id ? 2.5 : 2} />
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-lg p-6"
            onClick={() => setSelectedDay(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="w-full max-w-sm bg-[#18181b] rounded-[40px] p-6 shadow-2xl shadow-black border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                  <span className="text-indigo-400 text-xs font-bold uppercase tracking-wide">November 2025</span>
                  <span className="text-2xl font-bold text-white">Day {selectedDay.day}</span>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedDay(null)}
                  className="bg-white/5 p-2 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="aspect-square rounded-3xl overflow-hidden mb-6 shadow-lg relative group bg-black">
                <img src={selectedDay.fallbackArt} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Album Art" />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors"
                >
                   <div className="bg-white/10 backdrop-blur-md p-4 rounded-full shadow-lg cursor-pointer border border-white/20">
                     <Play size={32} className="text-white fill-white ml-1" />
                   </div>
                </motion.div>
              </div>

              <div className="text-center mb-8">
                <p className="text-white font-bold text-lg">Top Track</p>
                <p className="text-zinc-500">42 plays • 3h listened</p>
              </div>

              <Button variant="primary" className="w-full py-4 shadow-indigo-900/50 shadow-lg">Share Memory</Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
