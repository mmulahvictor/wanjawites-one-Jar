import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { OneJarLogo } from './OneJarLogo';
import { getCurrentAdmin, logoutAdmin, AUTH_CHANGE_EVENT, AdminUser } from '../lib/authService';

interface NavbarProps {
  onOpenBooking: () => void;
}

interface NavItem {
  path: string;
  label: string;
  badge?: string;
  isRestricted?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getCurrentAdmin());

  useEffect(() => {
    const handleAuth = () => {
      setAdminUser(getCurrentAdmin());
    };
    window.addEventListener(AUTH_CHANGE_EVENT, handleAuth);
    return () => window.removeEventListener(AUTH_CHANGE_EVENT, handleAuth);
  }, []);

  // Standard public navigation items for all visitors and guests
  const publicNavItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/poetry', label: 'Poetry', badge: 'One-Jar' },
    { path: '/writing', label: 'Writing' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/videos', label: 'Videos' },
    { path: '/contact', label: 'Contact' },
  ];

  // ONLY include the admin portal in navItems if the user is an authenticated administrator
  const navItems: NavItem[] = adminUser
    ? [
        ...publicNavItems,
        {
          path: '/admin',
          label: 'Admin Studio',
          badge: adminUser.role === 'super_admin' ? 'Super Admin' : 'Editor',
          isRestricted: true,
        },
      ]
    : publicNavItems;

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logoutAdmin();
    setAdminUser(null);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-xs" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identifiers with Official One-Jar Poetry Logo */}
        <Link 
          id="nav-brand-logo"
          to="/"
          className="flex items-center gap-2 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
          aria-label="Faith Wanja One-Jar Poetry Home"
        >
          <OneJarLogo size="sm" showText={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1" role="navigation" aria-label="Main Desktop Navigation">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.path}
                aria-current={active ? 'page' : undefined}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-1 ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold flex items-center gap-1 ${
                    item.isRestricted
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {item.isRestricted && <Lock className="w-2.5 h-2.5 shrink-0" />}
                    <span>{item.badge}</span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Authenticated admin quick badge or standard booking button */}
        <div className="hidden xl:flex items-center space-x-3">
          {adminUser && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span className="font-semibold">{adminUser.displayName}</span>
              <button
                onClick={handleLogout}
                title="Sign out of Administrator Session"
                className="ml-1 text-slate-500 hover:text-red-600 p-0.5 rounded cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            id="nav-book-btn"
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            <span>Book / Collaborate</span>
          </button>
        </div>

        {/* Mobile / Tablet Menu Toggle Button */}
        <div className="flex xl:hidden items-center gap-2">
          {adminUser && (
            <Link
              to="/admin"
              className="p-1.5 rounded-lg bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>Admin</span>
            </Link>
          )}

          <button
            id="mobile-book-btn"
            onClick={onOpenBooking}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white cursor-pointer"
          >
            Book
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-fadeIn" role="navigation" aria-label="Mobile Navigation Drawer">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-100'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    item.isRestricted 
                      ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    {item.isRestricted && <Lock className="w-3 h-3 shrink-0" />}
                    <span>{item.badge}</span>
                  </span>
                )}
              </Link>
            );
          })}

          {adminUser && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out ({adminUser.displayName})</span>
            </button>
          )}

          <div className="pt-2">
            <button
              id="mobile-menu-booking-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Book Wanja for Event / Campaign</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
