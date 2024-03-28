import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="text-white text-lg font-bold cursor-pointer">
                                HP Blogs😍
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <span className="text-gray-300 hover:text-white cursor-pointer">
                                Home
                            </span>
                        </Link>
                        <Link href="/blog">
                            <span className="text-gray-300 hover:text-white cursor-pointer">
                                Blog
                            </span>
                        </Link>
                        <Link href="/about">
                            <span className="text-gray-300 hover:text-white cursor-pointer">
                                About
                            </span>
                        </Link>
                        <Link href="/contact">
                            <span className="text-gray-300 hover:text-white cursor-pointer">
                                Contact
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
