import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, Lock, ShieldCheck, LogOut } from 'lucide-react';
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

  const publicNavItems: NavItem[] = [
    { path: '/', label: 'Home' },
    { path: '/poetry', label: 'One-Jar' },
    { path: '/writing', label: 'Journal' },
    { path: '/videos', label: 'Film' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const navItems: NavItem[] = adminUser
    ? [
        ...publicNavItems,
        {
          path: '/admin',
          label: 'Admin',
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
    <header 
      className="sticky top-0 z-40 bg-[#FFF6EC] text-[#3A1208] border-b-[3px] border-[#D81B7A] transition-all print:hidden"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
        
        {/* Brand Logo matching sample .logo: font: 1.6rem var(--serif); color: var(--fu); */}
        <Link 
          id="nav-brand-logo"
          to="/"
          className="font-serif text-[1.65rem] tracking-normal text-[#D81B7A] hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B7A]"
          aria-label="Wanja Writes Home"
        >
          Wanja Writes
        </Link>

        {/* Desktop Navigation matching sample nav links with bottom border indicator */}
        <nav className="hidden lg:flex items-center space-x-6" role="navigation" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.path}
                aria-current={active ? 'page' : undefined}
                className={`py-1 text-sm font-medium transition-all border-b-[3px] ${
                  active
                    ? 'border-[#D81B7A] text-[#D81B7A] font-semibold'
                    : 'border-transparent text-[#3A1208] hover:border-[#D81B7A] hover:text-[#D81B7A]'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 ${
                    item.isRestricted
                      ? 'bg-[#FFD9E6] text-[#D81B7A]'
                      : 'bg-[#D81B7A] text-white'
                  }`}>
                    {item.isRestricted && <Lock className="w-2.5 h-2.5 shrink-0" />}
                    <span>{item.badge}</span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action: Pill button matching sample .btn */}
        <div className="hidden lg:flex items-center space-x-3">
          {adminUser && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD9E6] text-[#3A1208] text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D81B7A]" />
              <span>{adminUser.displayName}</span>
              <button
                onClick={handleLogout}
                title="Sign out of Administrator Session"
                className="ml-1 text-[#3A1208]/60 hover:text-[#D81B7A] p-0.5 cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          )}

          <button
            id="nav-book-btn"
            onClick={onOpenBooking}
            className="btn-wanja text-sm py-2 px-5 cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>Say Hello</span>
          </button>
        </div>

        {/* Mobile / Tablet Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {adminUser && (
            <Link
              to="/admin"
              className="px-2.5 py-1 rounded-full bg-[#FFD9E6] text-[#D81B7A] text-xs font-semibold flex items-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-[#D81B7A]" />
              <span>Admin</span>
            </Link>
          )}

          <button
            id="mobile-book-btn"
            onClick={onOpenBooking}
            className="btn-wanja text-xs py-1.5 px-3.5 cursor-pointer"
          >
            Say Hello
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#3A1208] hover:bg-[#FFD9E6]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D81B7A] cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFF6EC] border-t border-[#FFD9E6] px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                id={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                  active
                    ? 'bg-[#D81B7A] text-white font-semibold'
                    : 'text-[#3A1208] hover:bg-[#FFD9E6]/40'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    active 
                      ? 'bg-white text-[#D81B7A]' 
                      : 'bg-[#FFD9E6] text-[#D81B7A]'
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
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-[#D81B7A] hover:bg-[#FFD9E6]/40 flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out ({adminUser.displayName})</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
