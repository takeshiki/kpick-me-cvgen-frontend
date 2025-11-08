'use client';

import { useRouter } from 'next/navigation';
import { MenuIcon, XIcon, ChevronRightIcon } from '@/components/ui/icons';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface NavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onGetStarted: () => void;
}

export function Navigation({ mobileMenuOpen, setMobileMenuOpen, onGetStarted }: NavigationProps) {
  const { user, login, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <>
      <div className="fixed top-3.5 right-3.5 z-50 hidden md:block">
        <LanguageSwitcher />
      </div>
      <nav className="bg-white sticky top-0 z-40 md:pr-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <a href="#top" className="flex items-center">
                <Logo className="h-7 w-auto" />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
              <>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="text-sm font-medium text-black hover:text-black/80 transition-colors"
                >
                  {t.nav.dashboard}
                </button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={logout}
                >
                  {t.nav.logout}
                </Button>
                {user?.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 border border-gray-200" 
                  />
                )}
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={login}
                  className="text-sm font-medium text-black hover:text-black/80 transition-colors"
                >
                  {t.nav.login}
                </button>
                <Button 
                  onClick={onGetStarted}
                  className="px-4 text-base rounded-full"
                >
                  {t.hero.cta}
                </Button>
              </div>
            )}
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <MobileMenu 
        isAuthenticated={isAuthenticated} 
        onGetStarted={onGetStarted} 
        onLogin={login} 
        onLogout={logout} 
        onDashboard={() => router.push('/dashboard')}
        mobileMenuOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </nav>
    </>
  );
}

function MobileMenu({ 
  isAuthenticated, 
  onGetStarted, 
  onLogin, 
  onLogout,
  onDashboard,
  mobileMenuOpen,
  onClose
}: { 
  isAuthenticated: boolean; 
  onGetStarted: () => void; 
  onLogin: () => void; 
  onLogout: () => void;
  onDashboard: () => void;
  mobileMenuOpen: boolean;
  onClose: () => void;
}) {
  const { t } = useLanguage();
  
  return (
    <>
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-6 py-4 space-y-3 flex-1 overflow-y-auto">
        {isAuthenticated ? (
          <div className="space-y-3">
            <button 
              onClick={onDashboard}
              className="w-full text-left text-base font-medium text-black/90 hover:text-black py-2"
            >
              {t.nav.dashboard}
            </button>
            <button 
              onClick={onLogout}
              className="w-full text-left text-base font-medium text-black/90 hover:text-black py-2"
            >
              {t.nav.logout}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button 
              onClick={onGetStarted}
              className="w-full bg-black text-white px-4 py-3 rounded-full font-medium text-base"
            >
              {t.hero.cta}
            </button>
            <button 
              onClick={onLogin}
              className="w-full text-center text-base font-medium text-black/90 hover:text-black py-2"
            >
              {t.nav.login}
            </button>
          </div>
        )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
