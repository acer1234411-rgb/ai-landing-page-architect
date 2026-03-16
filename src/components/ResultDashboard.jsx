import React from 'react';
import './ResultDashboard.css';

function ResultDashboard({ data }) {
  const d = data;

  const handleExportPrompt = () => {
    const aiPrompt = `안녕하세요. 당신은 수석 프론트엔드/UIUX 디자이너 겸 시니어 React 개발자입니다. 
다음 제공된 JSON 형태의 웹사이트 아키텍처 기획안 마스터 플랜을 바탕으로,
Vite + React + TypeScript 환경에서 바로 실행 가능한 전체 애플리케이션 코드를 작성해주세요.

[기획안 마스터 데이터]
${JSON.stringify(d, null, 2)}

[요구사항]
1. 모든 파일(index.css, App.tsx, main.tsx 및 각 components, pages)의 코드를 **단일 혹은 분할된 코드 블록**으로 상세히 제공해주세요.
2. 기획안에 명시된 디자인 시스템(색상 헥스코드, 글래스모피즘 효과, 폰트)을 CSS/Tailwind 등에 엄격하게 반영하세요.
3. Placeholder 이미지 링크(loremflickr 등)를 각 컴포넌트 마크업에 적절히 삽입하세요.
4. 사용자 경험을 위한 기본적인 페이드인(Fade-in) 및 호버 애니메이션 로직을 포함해주세요.
위 기획안 내용과 요구조건을 완벽하게 숙지하고 바로 코드 작성을 시작하십시오.`;

    navigator.clipboard.writeText(aiPrompt).then(() => {
      alert("✅ 완벽한 AI 개발 프롬프트가 클립보드에 복사되었습니다!\n\n이제 안티그래비티 대화창이나 구글 AI Studio에 붙여넣기만 하시면 곧바로 전체 웹사이트 코딩을 시작합니다.");
    });
  };

  if (!d) {
    return null;
  }

  const info = d.projectInfo || {};
  const design = d.designSystem || {};
  const arch = d.architecture || d.structure || {};
  const guide = d.developmentGuide || {};

  const colors = design.colors || {};
  const typography = design.typography || {};
  const moodboard = Array.isArray(design.moodboard) ? design.moodboard : (design.moodboard ? [design.moodboard] : []);

  const mainPage = arch.mainPage || {};
  const subPages = arch.subPages || [];
  const sections = mainPage.sections || [];

  return (
    <div className="result-dashboard fade-in">
      <div className="dashboard-header">
        <div className="header-titles">
          <h3>🚀 AI 웹사이트 아키텍처 기획안</h3>
          <p className="subtitle">완벽하게 구조화된 {info.topic || '프로젝트'} 마스터 플랜입니다.</p>
        </div>
        <button className="export-btn text-gradient-bg" onClick={handleExportPrompt}>
          AI 프롬프트(명령어) 복사하기
        </button>
      </div>

      <div className="dashboard-grid">
        {/* 1. 디자인 시스템 */}
        <div className="dashboard-card span-full">
          <h4 className="card-lbl">디자인 시스템 (Design System)</h4>

          {(colors.primary || colors.secondary || colors.background) && (
            <div className="color-palette">
              {colors.primary && (
                <div className="color-chip" style={{ background: colors.primary.hex || colors.primary }}>
                  <span className="color-name">{colors.primary.name || 'Primary'}</span>
                  <span className="color-hex">{colors.primary.hex || colors.primary}</span>
                </div>
              )}
              {colors.secondary && (
                <div className="color-chip" style={{ background: colors.secondary.hex || colors.secondary }}>
                  <span className="color-name">{colors.secondary.name || 'Secondary'}</span>
                  <span className="color-hex">{colors.secondary.hex || colors.secondary}</span>
                </div>
              )}
              {colors.background && (
                <div className="color-chip" style={{ background: colors.background.hex || colors.background }}>
                  <span className="color-name">{colors.background.name || 'Background'}</span>
                  <span className="color-hex">{colors.background.hex || colors.background}</span>
                </div>
              )}
            </div>
          )}

          {(typography.heading || typography.body || (typeof typography === 'string')) && (
            <div className="info-row mt-4">
              <span className="badge">Typography</span>
              {typeof typography === 'string'
                ? typography
                : `${typography.heading || ''} / ${typography.body || ''}`}
            </div>
          )}

          {moodboard.length > 0 && (
            <div className="info-row">
              <span className="badge">Moodboard</span>
              {moodboard.join(', ')}
            </div>
          )}

          {info.designIntent && (
            <p className="design-intent mt-4">
              <strong>디자인 의도:</strong> {info.designIntent}
            </p>
          )}
        </div>

        {/* 2. 목표 및 전략 */}
        <div className="dashboard-card">
          <h4 className="card-lbl">목표 및 전략 (Goal &amp; Strategy)</h4>
          <ul className="list-content">
            {info.target && <li><strong>Target:</strong> {info.target}</li>}
            {info.goal && <li><strong>Goal:</strong> <span className="highlight">{info.goal}</span></li>}
            {info.selectedStyle && <li><strong>Style:</strong> {info.selectedStyle}</li>}
            {info.structureStrategy && <li><strong>Structure:</strong> {info.structureStrategy}</li>}
          </ul>
        </div>

        {/* 3. 개발 환경 */}
        <div className="dashboard-card">
          <h4 className="card-lbl">개발 환경 (Tech Stack)</h4>
          {guide.stack && (
            <div className="info-row">
              <span className="badge tech">Stack</span>
              <strong>{guide.stack}</strong>
            </div>
          )}
          {guide.folderStructure && (
            <pre className="code-block">{guide.folderStructure}</pre>
          )}
        </div>

        {/* 4. 페이지 구조 */}
        <div className="dashboard-card span-full">
          <h4 className="card-lbl">페이지 구조 (Page Structure)</h4>
          <div className="structure-grid">
            {sections.length > 0 && (
              <div className="page-card main-page-card">
                <h5>🏠 Main Page</h5>
                <p className="desc">랜딩 페이지 핵심 구조</p>
                <ul className="mini-list">
                  {sections.map((sec, idx) => (
                    <li key={idx}>{sec}</li>
                  ))}
                </ul>
              </div>
            )}
            {subPages.map((page, idx) => (
              <div key={idx} className="page-card sub-page-card">
                <h5>🔗 {page.name || page.title}</h5>
                <p className="desc">{page.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDashboard;
