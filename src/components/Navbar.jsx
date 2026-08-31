import React from 'react'
import { dummyUser } from '../assets/asset'
import { Link, useLocation } from 'react-router-dom'
import { useUser, UserButton } from '@clerk/react'

const Navbar = () => {
    // Switch to Clerk user if available, fallback to dummyUser
    const clerkAuth = useUser();
    const { isSignedIn, user } = clerkAuth?.isLoaded && clerkAuth?.isSignedIn 
        ? clerkAuth 
        : { user: dummyUser, isSignedIn: true };

    const location = useLocation()
    const userName = user?.fullName || user?.firstName || user?.primaryEmailAddress?.emailAddress?.split("@")[0] || "User";

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Sessions', path: '/sessions' },
        { name: 'Pricing', path: '/pricing' },
    ];

    return (
        <header className="w-full max-w-7xl mx-auto bg-white/90 backdrop-blur xl:rounded-b-xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between border border-slate-200 shadow-xs">
            {/* Brand Logo & Navigation Links */}
            <div className='flex items-center gap-8'>
                <Link to='/dashboard' className='flex items-center gap-1.5 transition-opacity hover:opacity-90'>
                    <img src="/logo.svg" alt="MeetUp Logo" className="size-6.5"/>
                    <span className='text-2xl font-bold tracking-tight text-slate-900 flex items-center'>
                        MeetUp<span className="text-primary">.</span>
                    </span>
                </Link>

                {/* Navigation Items */}
                <nav className='hidden md:flex items-center gap-1 text-sm font-medium'>
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                                    isActive
                                        ? 'bg-primary/10 text-primary font-semibold'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Right Side: User Profile & Auth */}
            <div className='flex items-center gap-4'>
                {isSignedIn ? (
                    <div className='flex items-center gap-3'>
                        <span className='hidden sm:inline-block text-sm font-medium text-slate-700'>
                            {userName}
                        </span>
                        {clerkAuth?.isSignedIn ? (
                            <UserButton afterSignOutUrl="/login" />
                        ) : (
                            <img
                                src={user?.imageUrl}
                                alt={userName}
                                className="size-9 rounded-full object-cover ring-2 ring-primary/20"
                            />
                        )}
                    </div>
                ) : (
                    <Link
                        to='/login'
                        className='px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-colors shadow-xs'
                    >
                        Sign In
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Navbar
