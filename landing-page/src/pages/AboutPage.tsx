export default function AboutPage() {
  return (
    <main className="pt-24 pb-20 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-sm font-semibold tracking-widest mb-2" style={{ color: '#2F80ED' }}>우리의 이야기</p>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h1>
        <p className="text-gray-500 max-w-xl mx-auto">BrandMate는 2019년부터 지역 기반 서비스로 시작하여, 수천 명의 고객과 함께 성장해 왔습니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <img
          src="https://loremflickr.com/600/400/team,office,meeting"
          alt="팀 사진"
          className="rounded-2xl shadow-lg w-full"
        />
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">우리의 미션</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            모든 지역 고객이 최고 수준의 전문 서비스를 쉽게 접할 수 있도록 하는 것,
            그것이 BrandMate의 존재 이유입니다.
          </p>
          <h2 className="text-2xl font-extrabold text-gray-900 mb-4">핵심 가치</h2>
          <ul className="space-y-3 text-gray-600">
            {['신뢰 — 고객과의 약속을 가장 중요하게 여깁니다.', '전문성 — 끊임없는 연구와 학습으로 최고를 지향합니다.', '지역 친화 — 우리 지역 고객을 가장 잘 이해합니다.', '문제 해결 — 고객의 문제가 완전히 해결될 때까지 함께합니다.'].map((v, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#2F80ED' }} />
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center bg-gray-50 rounded-2xl p-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-3">팀 소개</h2>
        <p className="text-gray-500 mb-10">각 분야 전문가로 구성된 최고의 팀을 소개합니다.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['CEO 김지훈', '디자인 이수현', '전략 박민서', '고객팀 최재원'].map((m, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <img
                src={`https://loremflickr.com/120/120/person,portrait?lock=${i}`}
                alt={m}
                className="w-20 h-20 rounded-full object-cover shadow"
              />
              <p className="text-sm font-semibold text-gray-900">{m}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
