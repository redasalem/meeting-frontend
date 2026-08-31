import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { dummyUser, dummyStats, dummySessions } from '../assets/asset';
import {
    Video,
    Plus,
    Link2,
    Calendar,
    Clock,
    Users,
    ArrowRight,
    Shield,
    Copy,
    Check,
    Sparkles,
    TrendingUp,
    Zap,
    Globe,
} from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const clerkAuth = useUser();
    const { user } = clerkAuth?.isLoaded && clerkAuth?.isSignedIn
        ? clerkAuth
        : { user: dummyUser };
    const navigate = useNavigate();

    const userName = user?.fullName || user?.firstName || 'User';
    const [meetingCode, setMeetingCode] = useState('');
    const [copiedId, setCopiedId] = useState(null);

    // Get greeting based on time of day
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    // Quick actions
    const quickActions = [
        {
            id: 'instant',
            title: 'New Meeting',
            description: 'Start an instant meeting now',
            icon: Video,
            color: 'bg-primary text-white',
            hoverColor: 'hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/25',
            action: () => {
                const id = `${randomSegment()}-${randomSegment()}-${randomSegment()}`;
                navigate(`/meeting/${id}`);
            },
        },
        {
            id: 'join',
            title: 'Join Meeting',
            description: 'Enter a meeting code to join',
            icon: Plus,
            color: 'bg-blue-600 text-white',
            hoverColor: 'hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25',
            action: null, // handled by form
        },
        {
            id: 'schedule',
            title: 'Schedule',
            description: 'Plan a future meeting',
            icon: Calendar,
            color: 'bg-indigo-500 text-white',
            hoverColor: 'hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/25',
            action: () => toast('Scheduling coming soon!', { icon: '📅' }),
        },
        {
            id: 'share',
            title: 'Share Link',
            description: 'Get a meeting link to share',
            icon: Link2,
            color: 'bg-sky-500 text-white',
            hoverColor: 'hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/25',
            action: () => {
                const id = `${randomSegment()}-${randomSegment()}-${randomSegment()}`;
                const link = `${window.location.origin}/meeting/${id}`;
                navigator.clipboard.writeText(link);
                toast.success('Meeting link copied!');
            },
        },
    ];

    // Features list
    const features = [
        {
            icon: Shield,
            title: 'End-to-End Encrypted',
            description: 'Your meetings are secured with advanced encryption protocols.',
            gradient: 'from-blue-500/10 to-cyan-500/10',
            iconColor: 'text-blue-500',
        },
        {
            icon: Zap,
            title: 'Ultra-Low Latency',
            description: 'Crystal clear video with real-time peer-to-peer connections.',
            gradient: 'from-indigo-500/10 to-blue-500/10',
            iconColor: 'text-indigo-500',
        },
        {
            icon: Globe,
            title: 'Connect Anywhere',
            description: 'Join from any device, any browser, anywhere in the world.',
            gradient: 'from-sky-500/10 to-blue-500/10',
            iconColor: 'text-sky-500',
        },
    ];

    const randomSegment = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        return Array.from({ length: 3 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    };

    const handleJoinMeeting = (e) => {
        e.preventDefault();
        if (meetingCode.trim()) {
            navigate(`/meeting/${meetingCode.trim()}`);
        } else {
            toast.error('Please enter a meeting code');
        }
    };

    const copyMeetingId = (id) => {
        navigator.clipboard.writeText(`${window.location.origin}/meeting/${id}`);
        setCopiedId(id);
        toast.success('Link copied!');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getTimeDuration = (start, end) => {
        if (!end) return 'In progress';
        const diff = new Date(end) - new Date(start);
        const mins = Math.floor(diff / 60000);
        if (mins < 60) return `${mins} min`;
        return `${Math.floor(mins / 60)}h ${mins % 60}m`;
    };

    // Recent sessions (last 3)
    const recentSessions = dummySessions.slice(0, 3);

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <section className="mb-10">
                {/* Greeting */}
                <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 border border-primary/15 rounded-full text-xs font-medium text-primary mb-4">
                        <Shield className="size-3.5" />
                        Secure Peer-to-Peer Encryption
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-2">
                        {getGreeting()},
                        <br />
                        <span className="text-primary">{userName}</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-lg">
                        Connect, collaborate, and celebrate from anywhere with ultra-low latency video, screen sharing, and real-time chat.
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActions.map((action) => (
                        <button
                            key={action.id}
                            onClick={action.id === 'join' ? undefined : action.action}
                            className={`group relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300 cursor-pointer ${action.color} ${action.hoverColor} hover:-translate-y-1`}
                        >
                            <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <action.icon className="size-6" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-sm">{action.title}</p>
                                <p className="text-xs opacity-80 mt-0.5 hidden sm:block">{action.description}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Join Meeting + Stats Row */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Join Meeting Card */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Plus className="size-4 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Join a Meeting</h2>
                    </div>
                    <form onSubmit={handleJoinMeeting} className="flex gap-3">
                        <input
                            type="text"
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                            placeholder="Enter meeting code (e.g. abc-def-ghi)"
                            className="flex-1 px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-400"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer whitespace-nowrap"
                        >
                            Join Now
                        </button>
                    </form>
                </div>

                {/* Stats Mini Card */}
                <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-white/90">This Month</h3>
                        <TrendingUp className="size-5 text-white/70" />
                    </div>
                    <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-4xl font-bold">{dummyStats.monthlyCount}</span>
                        <span className="text-white/70 text-sm">meetings</span>
                    </div>
                    <p className="text-sm text-white/60">
                        {dummyStats.plan === 'premium' ? '∞ Unlimited plan' : `of ${dummyStats.monthlyLimit}`}
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/15 flex items-center gap-2">
                        <Users className="size-4 text-white/70" />
                        <span className="text-sm text-white/80">Up to {dummyStats.maxParticipants} participants</span>
                    </div>
                </div>
            </section>

            {/* Recent Sessions */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Clock className="size-4 text-primary" />
                        </div>
                        <h2 className="text-lg font-semibold text-slate-900">Recent Sessions</h2>
                    </div>
                    <Link
                        to="/sessions"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors group"
                    >
                        View all
                        <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recentSessions.map((session) => (
                        <div
                            key={session.id}
                            className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all"
                        >
                            {/* Status Badge */}
                            <div className="flex items-center justify-between mb-3">
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                                        session.status === 'active'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                                    }`}
                                >
                                    <span
                                        className={`size-1.5 rounded-full ${
                                            session.status === 'active'
                                                ? 'bg-emerald-500 animate-pulse'
                                                : 'bg-slate-400'
                                        }`}
                                    />
                                    {session.status === 'active' ? 'Live' : 'Ended'}
                                </span>
                                <button
                                    onClick={() => copyMeetingId(session.meetingId)}
                                    className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                                    title="Copy meeting link"
                                >
                                    {copiedId === session.meetingId ? (
                                        <Check className="size-4 text-emerald-500" />
                                    ) : (
                                        <Copy className="size-4" />
                                    )}
                                </button>
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-slate-900 mb-2 leading-snug line-clamp-1">
                                {session.title}
                            </h3>

                            {/* Meta Info */}
                            <div className="space-y-2 text-sm text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Calendar className="size-3.5" />
                                    <span>{formatDate(session.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="size-3.5" />
                                    <span>{getTimeDuration(session.createdAt, session.endedAt)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="size-3.5" />
                                    <span>{session.participants.length} participants</span>
                                </div>
                            </div>

                            {/* Participants Avatars */}
                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex -space-x-2">
                                    {session.participants.slice(0, 4).map((p, i) => (
                                        <div
                                            key={i}
                                            className="size-7 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white"
                                            title={p.name}
                                        >
                                            {p.name.charAt(0)}
                                        </div>
                                    ))}
                                    {session.participants.length > 4 && (
                                        <div className="size-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-medium ring-2 ring-white">
                                            +{session.participants.length - 4}
                                        </div>
                                    )}
                                </div>
                                {session.status === 'active' ? (
                                    <Link
                                        to={`/meeting/${session.meetingId}`}
                                        className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                                    >
                                        Rejoin →
                                    </Link>
                                ) : (
                                    <span className="text-xs text-slate-400">
                                        {session.host.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-6">
                <div className="flex items-center gap-2 mb-5">
                    <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="size-4 text-primary" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Why MeetUp?</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className={`group bg-gradient-to-br ${feature.gradient} rounded-2xl border border-slate-200/50 p-6 hover:shadow-md transition-all`}
                        >
                            <div className={`size-10 rounded-xl bg-white/80 flex items-center justify-center mb-4 shadow-sm ${feature.iconColor}`}>
                                <feature.icon className="size-5" />
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-1.5">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
