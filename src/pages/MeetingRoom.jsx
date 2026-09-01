import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import {
    dummyUser,
    dummyMeetingDetails,
    dummyRemoteParticipants,
    dummyInitialChatMessages,
} from '../assets/asset';
import {
    Mic,
    MicOff,
    Video,
    VideoOff,
    MonitorUp,
    MessageSquareText,
    Users,
    PhoneOff,
    Copy,
    Check,
    Send,
    X,
    Shield,
    Maximize,
    Minimize,
    MoreVertical,
    Hand,
    Smile,
    Clock,
    ChevronDown,
} from 'lucide-react';
import toast from 'react-hot-toast';

const MeetingRoom = () => {
    const { meetingId } = useParams();
    const navigate = useNavigate();
    const clerkAuth = useUser();
    const { user } = clerkAuth?.isLoaded && clerkAuth?.isSignedIn
        ? clerkAuth
        : { user: dummyUser };

    const userName = user?.fullName || user?.firstName || 'You';

    // State
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [screenSharing, setScreenSharing] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [participantsOpen, setParticipantsOpen] = useState(false);
    const [messages, setMessages] = useState(dummyInitialChatMessages);
    const [newMessage, setNewMessage] = useState('');
    const [copied, setCopied] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [handRaised, setHandRaised] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);

    const chatEndRef = useRef(null);
    const chatInputRef = useRef(null);

    // Meeting timer
    useEffect(() => {
        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // All participants (local + remote)
    const allParticipants = [
        {
            socketId: 'local',
            userId: user?.id || 'user_mock_001',
            userName: userName,
            audioEnabled: micOn,
            videoEnabled: cameraOn,
            isLocal: true,
        },
        ...dummyRemoteParticipants.map((p) => ({ ...p, isLocal: false })),
    ];

    // Grid layout based on participant count
    const getGridClass = () => {
        const count = allParticipants.length;
        if (count === 1) return 'grid-cols-1';
        if (count === 2) return 'grid-cols-1 md:grid-cols-2';
        if (count <= 4) return 'grid-cols-2';
        if (count <= 6) return 'grid-cols-2 md:grid-cols-3';
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: `chat_${Date.now()}`,
            senderId: user?.id || 'user_mock_001',
            senderName: userName,
            text: newMessage.trim(),
            time: new Date().toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };
        setMessages((prev) => [...prev, msg]);
        setNewMessage('');
        chatInputRef.current?.focus();
    };

    const copyMeetingLink = () => {
        const link = `${window.location.origin}/meeting/${meetingId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        toast.success('Meeting link copied!');
        setTimeout(() => setCopied(false), 2000);
    };

    const leaveMeeting = () => {
        toast('You left the meeting', { icon: '👋' });
        navigate('/dashboard');
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Close panels when opening the other
    const toggleChat = () => {
        setChatOpen((prev) => !prev);
        if (participantsOpen) setParticipantsOpen(false);
    };

    const toggleParticipants = () => {
        setParticipantsOpen((prev) => !prev);
        if (chatOpen) setChatOpen(false);
    };

    return (
        <div className="h-screen w-screen bg-slate-950 flex flex-col overflow-hidden select-none">
            {/* ─── Top Bar ─── */}
            <header className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 backdrop-blur border-b border-slate-800/60 z-20">
                {/* Left: Meeting Info */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <img src="/logo.svg" alt="MeetUp" className="size-5 brightness-0 invert" />
                        <span className="text-sm font-bold text-white tracking-tight hidden sm:inline">
                            MeetUp<span className="text-primary">.</span>
                        </span>
                    </div>

                    <div className="h-5 w-px bg-slate-700 hidden sm:block" />

                    <div className="flex items-center gap-2 min-w-0">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/15 rounded-full">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[11px] font-medium text-emerald-400">Live</span>
                        </div>
                        <span className="text-sm text-slate-300 font-medium truncate max-w-40 sm:max-w-60">
                            {dummyMeetingDetails.title}
                        </span>
                    </div>
                </div>

                {/* Center: Timer */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg">
                    <Clock className="size-3.5 text-slate-400" />
                    <span className="text-sm font-mono text-slate-300 tabular-nums">
                        {formatTime(elapsedTime)}
                    </span>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800/80 rounded-lg">
                        <Shield className="size-3.5 text-primary" />
                        <span className="text-[11px] text-slate-400 font-medium">Encrypted</span>
                    </div>

                    <button
                        onClick={copyMeetingLink}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                        title="Copy meeting link"
                    >
                        {copied ? (
                            <Check className="size-3.5 text-emerald-400" />
                        ) : (
                            <Copy className="size-3.5 text-slate-400" />
                        )}
                        <span className="text-xs text-slate-300 hidden sm:inline">
                            {meetingId}
                        </span>
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        className="size-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                    >
                        {isFullscreen ? <Minimize className="size-4" /> : <Maximize className="size-4" />}
                    </button>
                </div>
            </header>

            {/* ─── Main Content ─── */}
            <div className="flex-1 flex overflow-hidden">
                {/* ─── Video Grid ─── */}
                <main className="flex-1 p-3 overflow-hidden">
                    <div className={`grid ${getGridClass()} gap-3 h-full auto-rows-fr`}>
                        {allParticipants.map((participant) => (
                            <div
                                key={participant.socketId}
                                className={`relative rounded-2xl overflow-hidden group transition-all ${
                                    participant.videoEnabled
                                        ? 'bg-gradient-to-br from-slate-800 to-slate-900'
                                        : 'bg-slate-900'
                                } ${participant.isLocal ? 'ring-2 ring-primary/30' : 'ring-1 ring-slate-800'}`}
                            >
                                {/* Video / Avatar */}
                                {participant.videoEnabled ? (
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
                                        {/* Simulated video feed pattern */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="size-24 sm:size-28 rounded-full bg-gradient-to-br from-primary/30 to-blue-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
                                                <span className="text-3xl sm:text-4xl font-bold text-white/90">
                                                    {participant.userName.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                                        <div className="size-20 sm:size-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-700">
                                            <span className="text-2xl sm:text-3xl font-bold text-slate-400">
                                                {participant.userName.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Name Tag */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-white truncate">
                                                {participant.isLocal ? `${participant.userName} (You)` : participant.userName}
                                            </span>
                                            {participant.isLocal && handRaised && (
                                                <span className="text-base animate-bounce">✋</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            {!participant.audioEnabled && (
                                                <div className="size-6 rounded-full bg-red-500/90 flex items-center justify-center">
                                                    <MicOff className="size-3 text-white" />
                                                </div>
                                            )}
                                            {participant.audioEnabled && (
                                                <div className="size-6 rounded-full bg-slate-800/80 flex items-center justify-center">
                                                    <Mic className="size-3 text-emerald-400" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Host Badge */}
                                {participant.userId === dummyMeetingDetails.host.id && (
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2 py-0.5 bg-primary/90 rounded-md text-[10px] font-semibold text-white uppercase tracking-wider">
                                            Host
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>

                {/* ─── Side Panel (Chat / Participants) ─── */}
                {(chatOpen || participantsOpen) && (
                    <aside className="w-80 lg:w-96 bg-slate-900 border-l border-slate-800/60 flex flex-col animate-in slide-in-from-right duration-200">
                        {/* Panel Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/60">
                            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                {chatOpen ? (
                                    <>
                                        <MessageSquareText className="size-4 text-primary" />
                                        In-Meeting Chat
                                    </>
                                ) : (
                                    <>
                                        <Users className="size-4 text-primary" />
                                        Participants ({allParticipants.length})
                                    </>
                                )}
                            </h3>
                            <button
                                onClick={() => { setChatOpen(false); setParticipantsOpen(false); }}
                                className="size-7 flex items-center justify-center rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        {/* Chat Panel */}
                        {chatOpen && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    {messages.length === 0 && (
                                        <div className="flex flex-col items-center justify-center h-full text-center">
                                            <MessageSquareText className="size-10 text-slate-700 mb-3" />
                                            <p className="text-sm text-slate-500">No messages yet</p>
                                            <p className="text-xs text-slate-600 mt-1">Be the first to say hello!</p>
                                        </div>
                                    )}
                                    {messages.map((msg) => {
                                        const isMe = msg.senderId === (user?.id || 'user_mock_001');
                                        return (
                                            <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <span className="text-xs font-medium text-slate-400">
                                                        {isMe ? 'You' : msg.senderName}
                                                    </span>
                                                    <span className="text-[10px] text-slate-600">{msg.time}</span>
                                                </div>
                                                <div
                                                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                                        isMe
                                                            ? 'bg-primary text-white rounded-br-md'
                                                            : 'bg-slate-800 text-slate-200 rounded-bl-md'
                                                    }`}
                                                >
                                                    {msg.text}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={chatEndRef} />
                                </div>

                                {/* Chat Input */}
                                <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800/60">
                                    <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-1.5">
                                        <button
                                            type="button"
                                            className="size-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
                                        >
                                            <Smile className="size-4" />
                                        </button>
                                        <input
                                            ref={chatInputRef}
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none py-1.5"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim()}
                                            className="size-8 flex items-center justify-center rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                        >
                                            <Send className="size-3.5" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {/* Participants Panel */}
                        {participantsOpen && (
                            <div className="flex-1 overflow-y-auto p-3 space-y-1">
                                {allParticipants.map((p) => (
                                    <div
                                        key={p.socketId}
                                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/60 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="size-9 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                                {p.userName.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-slate-200 truncate">
                                                    {p.userName}
                                                    {p.isLocal && (
                                                        <span className="ml-1.5 text-[10px] text-primary font-semibold">(You)</span>
                                                    )}
                                                </p>
                                                {p.userId === dummyMeetingDetails.host.id && (
                                                    <p className="text-[11px] text-slate-500">Host</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className={`size-7 rounded-full flex items-center justify-center ${
                                                p.audioEnabled ? 'bg-slate-800 text-slate-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {p.audioEnabled ? <Mic className="size-3.5" /> : <MicOff className="size-3.5" />}
                                            </div>
                                            <div className={`size-7 rounded-full flex items-center justify-center ${
                                                p.videoEnabled ? 'bg-slate-800 text-slate-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                                {p.videoEnabled ? <Video className="size-3.5" /> : <VideoOff className="size-3.5" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </aside>
                )}
            </div>

            {/* ─── Bottom Controls Bar ─── */}
            <footer className="px-4 py-3 bg-slate-900/80 backdrop-blur border-t border-slate-800/60 z-20">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    {/* Left: Meeting Info (mobile) */}
                    <div className="flex items-center gap-2 md:hidden">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded-lg">
                            <Clock className="size-3 text-slate-400" />
                            <span className="text-xs font-mono text-slate-300 tabular-nums">
                                {formatTime(elapsedTime)}
                            </span>
                        </div>
                    </div>

                    {/* Hidden spacer for desktop */}
                    <div className="hidden md:block w-20" />

                    {/* Center: Main Controls */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Mic Toggle */}
                        <button
                            onClick={() => {
                                setMicOn(!micOn);
                                toast(micOn ? 'Microphone off' : 'Microphone on', { icon: micOn ? '🔇' : '🎤' });
                            }}
                            className={`size-11 sm:size-12 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                                micOn
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                            }`}
                            title={micOn ? 'Mute' : 'Unmute'}
                        >
                            {micOn ? <Mic className="size-5" /> : <MicOff className="size-5" />}
                        </button>

                        {/* Camera Toggle */}
                        <button
                            onClick={() => {
                                setCameraOn(!cameraOn);
                                toast(cameraOn ? 'Camera off' : 'Camera on', { icon: cameraOn ? '📷' : '🎥' });
                            }}
                            className={`size-11 sm:size-12 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                                cameraOn
                                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                                    : 'bg-red-500 hover:bg-red-600 text-white'
                            }`}
                            title={cameraOn ? 'Turn off camera' : 'Turn on camera'}
                        >
                            {cameraOn ? <Video className="size-5" /> : <VideoOff className="size-5" />}
                        </button>

                        {/* Screen Share */}
                        <button
                            onClick={() => {
                                setScreenSharing(!screenSharing);
                                toast(screenSharing ? 'Stopped sharing' : 'Sharing your screen', { icon: '🖥️' });
                            }}
                            className={`size-11 sm:size-12 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                                screenSharing
                                    ? 'bg-primary hover:bg-primary-hover text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                            }`}
                            title="Share screen"
                        >
                            <MonitorUp className="size-5" />
                        </button>

                        {/* Raise Hand */}
                        <button
                            onClick={() => {
                                setHandRaised(!handRaised);
                                toast(handRaised ? 'Hand lowered' : 'Hand raised', { icon: '✋' });
                            }}
                            className={`size-11 sm:size-12 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                                handRaised
                                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                            }`}
                            title="Raise hand"
                        >
                            <Hand className="size-5" />
                        </button>

                        {/* Separator */}
                        <div className="h-8 w-px bg-slate-700 mx-1 hidden sm:block" />

                        {/* Chat Toggle */}
                        <button
                            onClick={toggleChat}
                            className={`size-11 sm:size-12 flex items-center justify-center rounded-full transition-all cursor-pointer relative ${
                                chatOpen
                                    ? 'bg-primary hover:bg-primary-hover text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                            }`}
                            title="Chat"
                        >
                            <MessageSquareText className="size-5" />
                            {messages.length > 0 && !chatOpen && (
                                <span className="absolute -top-0.5 -right-0.5 size-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                    {messages.length}
                                </span>
                            )}
                        </button>

                        {/* Participants Toggle */}
                        <button
                            onClick={toggleParticipants}
                            className={`size-11 sm:size-12 flex items-center justify-center rounded-full transition-all cursor-pointer relative ${
                                participantsOpen
                                    ? 'bg-primary hover:bg-primary-hover text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                            }`}
                            title="Participants"
                        >
                            <Users className="size-5" />
                            <span className="absolute -top-0.5 -right-0.5 size-4 bg-slate-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                {allParticipants.length}
                            </span>
                        </button>

                        {/* Separator */}
                        <div className="h-8 w-px bg-slate-700 mx-1 hidden sm:block" />

                        {/* Leave Meeting */}
                        <button
                            onClick={leaveMeeting}
                            className="h-11 sm:h-12 px-5 sm:px-6 flex items-center justify-center gap-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all cursor-pointer hover:shadow-lg hover:shadow-red-500/25"
                            title="Leave meeting"
                        >
                            <PhoneOff className="size-5" />
                            <span className="text-sm font-semibold hidden sm:inline">Leave</span>
                        </button>
                    </div>

                    {/* Right: Participant count (desktop) */}
                    <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg">
                        <Users className="size-3.5 text-slate-400" />
                        <span className="text-xs text-slate-300 font-medium">
                            {allParticipants.length}
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MeetingRoom;
