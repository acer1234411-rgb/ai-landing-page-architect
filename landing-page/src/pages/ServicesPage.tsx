const services = [
  {
    title: '전략 컨설팅',
    price: '50,000원~',
    desc: '비즈니스 현황을 분석하고 최적의 성장 전략을 수립해 드립니다.',
    features: ['1:1 심층 상담', '현황 진단 리포트', '3개월 액션 플랜', '사후 팔로업 1회'],
    highlight: false,
  },
  {
    title: '브랜드 디자인',
    price: '150,000원~',
    desc: '고객의 마음을 사로잡는 브랜드 아이덴티티(BI)를 제작합니다.',
    features: ['로고 디자인 3안', '컬러 시스템', '명함/브로셔 적용', '원본 파일 제공'],
    highlight: true,
  },
  {
    title: '마케팅 플랜',
    price: '80,000원~',
    desc: '지역 타겟에 최적화된 온/오프라인 마케팅 전략을 제안합니다.',
    features: ['채널 믹스 분석', 'SNS 콘텐츠 플랜', '광고 예산 배분', '성과 측정 KPI'],
    highlight: false,
  },
]

export default function ServicesPage() {
  return (
    <main className="pt-24 pb-20 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#2F80ED' }}>무엇을 해드릴 수 있을까요</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Services</h1>
        <p className="text-gray-500 max-w-xl mx-auto">초기 상담은 무료입니다. 부담 없이 먼저 문의해 보세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl p-8 transition-all hover:-translate-y-2 duration-300 ${
              s.highlight
                ? 'text-white shadow-2xl scale-105'
                : 'bg-white border border-gray-100 shadow-sm'
            }`}
            style={s.highlight ? { background: 'linear-gradient(135deg, #2F80ED, #1a56a8)' } : {}}
          >
            {s.highlight && (
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-white/20 mb-4">
                ⭐ 가장 인기
              </span>
            )}
            <h3 className={`text-2xl font-extrabold mb-2 ${s.highlight ? 'text-white' : 'text-gray-900'}`}>{s.title}</h3>
            <p className={`text-3xl font-bold mb-4 ${s.highlight ? 'text-blue-200' : 'text-blue-600'}`}>{s.price}</p>
            <p className={`text-sm mb-6 leading-relaxed ${s.highlight ? 'text-white/80' : 'text-gray-500'}`}>{s.desc}</p>
            <ul className="space-y-2 mb-8">
              {s.features.map((f, j) => (
                <li key={j} className={`flex items-center gap-2 text-sm ${s.highlight ? 'text-white' : 'text-gray-700'}`}>
                  <span style={{ color: s.highlight ? '#86EFAC' : '#27AE60' }}>✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              href="/contact"
              className={`block w-full text-center py-3 rounded-full font-bold transition-all hover:scale-105 ${
                s.highlight
                  ? 'bg-white text-blue-600'
                  : 'text-white'
              }`}
              style={!s.highlight ? { background: '#2F80ED' } : {}}
            >
              문의하기
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}
