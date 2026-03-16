import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 mt-0">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-3">🏪 BrandMate</h3>
          <p className="text-sm leading-relaxed">
            지역 최고의 서비스로<br />
            여러분의 고민을 해결해 드립니다.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">빠른 링크</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">홈</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">소개</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">서비스</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">문의하기</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">연락처</h4>
          <ul className="text-sm space-y-2">
            <li>📍 서울특별시 강남구 테헤란로 123</li>
            <li>📞 02-1234-5678</li>
            <li>📧 hello@brandmate.kr</li>
            <li>🕐 평일 09:00–18:00</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between text-xs gap-4">
        <span>© 2025 BrandMate. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
        </div>
      </div>
    </footer>
  )
}
