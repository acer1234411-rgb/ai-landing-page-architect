import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: '홈', path: '/' },
  { label: '소개', path: '/about' },
  { label: '서비스', path: '/services' },
  { label: '문의하기', path: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-extrabold" style={{ color: '#2F80ED' }}>
          🏪 BrandMate
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex gap-8">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-semibold transition-colors hover:text-blue-500 ${
                pathname === item.path ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="/contact"
          className="hidden md:inline-block text-sm font-bold text-white px-5 py-2 rounded-full transition-transform hover:scale-105"
          style={{ background: '#2F80ED' }}
        >
          무료 상담 신청
        </a>

        {/* 모바일 햄버거 */}
        <button className="md:hidden text-gray-700 text-2xl" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 pt-2 pb-6 flex flex-col gap-4">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-700 font-semibold py-2 border-b border-gray-100"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/contact"
            className="text-center text-white py-2 rounded-full font-bold"
            style={{ background: '#2F80ED' }}
            onClick={() => setOpen(false)}
          >
            무료 상담 신청
          </a>
        </div>
      )}
    </header>
  )
}
