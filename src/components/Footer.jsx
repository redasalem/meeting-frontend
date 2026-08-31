import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Sessions', path: '/sessions' },
            { name: 'Meeting Room', path: '/dashboard' },
            { name: 'Pricing', path: '/pricing' },
        ],
        company: [
            { name: 'About Us', path: '#' },
            { name: 'Careers', path: '#' },
            { name: 'Blog', path: '#' },
            { name: 'Contact', path: '#' },
        ],
        support: [
            { name: 'Help Center', path: '#' },
            { name: 'Community', path: '#' },
            { name: 'Status', path: '#' },
            { name: 'API Docs', path: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', path: '#' },
            { name: 'Terms of Service', path: '#' },
            { name: 'Cookie Policy', path: '#' },
        ],
    };

    const socialLinks = [
        {
            name: 'X (Twitter)',
            href: '#',
            icon: (
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: 'GitHub',
            href: '#',
            icon: (
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            ),
        },
        {
            name: 'LinkedIn',
            href: '#',
            icon: (
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: 'YouTube',
            href: '#',
            icon: (
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="mt-auto w-full border-t border-slate-200 bg-white/80 backdrop-blur-sm">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link to="/dashboard" className="flex items-center gap-1.5 transition-opacity hover:opacity-90 mb-4">
                            <img src="/logo.svg" alt="MeetUp Logo" className="size-7" />
                            <span className="text-2xl font-bold tracking-tight text-slate-900 flex items-center">
                                MeetUp<span className="text-primary">.</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
                            Connect, collaborate, and communicate seamlessly with HD video meetings for teams of all sizes.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="size-9 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all hover:bg-primary hover:text-white hover:scale-105 hover:shadow-md"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 tracking-wide uppercase">
                            Product
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-slate-500 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 tracking-wide uppercase">
                            Company
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-slate-500 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 tracking-wide uppercase">
                            Support
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-slate-500 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 mb-4 tracking-wide uppercase">
                            Legal
                        </h3>
                        <ul className="space-y-2.5">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-slate-500 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-10 pt-8 border-t border-slate-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-1">
                                Stay up to date
                            </h3>
                            <p className="text-sm text-slate-500">
                                Get the latest updates and news delivered to your inbox.
                            </p>
                        </div>
                        <form
                            className="flex items-center gap-2 w-full sm:w-auto"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all w-full sm:w-64 placeholder:text-slate-400"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap cursor-pointer"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-200 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-sm text-slate-400">
                        &copy; {currentYear} MeetUp. All rights reserved.
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                        <span>Made with</span>
                        <svg className="size-4 text-red-400 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                        <span>for better meetings</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
