import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const timer = setTimeout(() => el.classList.add('visible'), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '80px' }}
    >
      {/* 배경 이미지 */}
      <img
        src="https://loremflickr.com/1600/900/store,interior,shop?lock=42"
        alt="매장 전경"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-black/60" />

      <div ref={ref} className="fade-in relative z-10 text-center text-white max-w-3xl mx-auto px-6">
        <span className="inline-block text-sm font-semibold tracking-widest mb-4 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm">
          ✨ 지역 No.1 프리미엄 서비스
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          당신의 <span style={{ color: '#7DD3FC' }}>고민</span>을<br />
          해결해 줄 <span style={{ color: '#86EFAC' }}>BrandMate</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
          지역 맞춤형 전문 서비스로 여러분의 문제를 빠르고 확실하게 해결합니다.<br />
          지금 바로 무료 상담을 신청해 보세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="px-8 py-4 rounded-full font-bold text-white text-lg transition-all hover:scale-105 shadow-lg"
            style={{ background: '#2F80ED' }}
          >
            무료 상담 신청하기 →
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full font-bold text-white text-lg border-2 border-white/50 hover:bg-white/10 transition-all"
          >
            서비스 알아보기
          </a>
        </div>
        <p className="mt-6 text-sm text-white/60">⭐ 이미 2,000명 이상이 경험했습니다</p>
      </div>

      {/* 스크롤 화살표 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
        ↓
      </div>
    </section>
  )
}
