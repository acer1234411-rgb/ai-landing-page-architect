import React, { useState } from 'react';
import './ProjectForm.css';

import ResultDashboard from './ResultDashboard';
import { generateLandingPlan, generateTargetAndGoal } from '../services/geminiService';

function ProjectForm() {
  const [formData, setFormData] = useState({
    topic: '',
    targetAudience: '',
    coreGoal: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedData, setGeneratedData] = useState(null);
  const [isAutoFilling, setIsAutoFilling] = useState(false);

  const [showExamples, setShowExamples] = useState(false);

  const topicExamples = [
    "개인 홈피(About Me)",
    "프로필 카드(링크 인 바이오)",
    "이력서/경력 소개(온라인 CV)",
    "포트폴리오(디자이너/개발자/작가)",
    "회사, 병원, 기업, 가게 등의 홍보 페이지",
    "프리랜서 서비스(디자인/개발/번역 등)",
    "수업/클래스/워크숍 접수",
    "지역 소규모 서비스(사진 촬영, 홈튜터, 헤어 등)",
    "후원/기부(크리에이터 후원, 프로젝트 펀딩)",
    "뉴스레터 구독",
    "콘텐츠 허브(블로그/유튜브/팟캐스트 모음)",
    "디지털 굿즈 판매(템플릿, 전자책, 코드 스니펫)",
    "컨설팅/멘토링 예약",
    "웹도구 모음(개발·마케팅 툴북마크/본인 제작 툴)",
    "바로가기(즐겨찾기/리소스 링크 허브)",
    "미니 웹앱/게임/계산기/체크리스트",
    "오픈소스/프로젝트 랜딩",
    "대기자 명단(앱/사이드 프로젝트)",
    "설문/피드백 수집",
    "기타(사용자입력)"
  ];

  const autoFillMapping = {
    "개인 홈피(About Me)": { targetAudience: "실력 있는 인재를 찾고 있는 3040 IT 업계 채용 담당자", coreGoal: "이력서 열람 및 커피챗 제안 이메일 월 5건 달성" },
    "프로필 카드(링크 인 바이오)": { targetAudience: "크리에이터의 SNS 팔로워 및 잠재 광고주", coreGoal: "다양한 채널로의 트래픽 라우팅 및 비즈니스 문의 20% 증가" },
    "이력서/경력 소개(온라인 CV)": { targetAudience: "스타트업 CEO 및 헤드헌터", coreGoal: "전문성 어필 및 서류 합격률 30% 향상" },
    "포트폴리오(디자이너/개발자/작가)": { targetAudience: "외주 작업을 의뢰하려는 에이전시 및 기업 실무자", coreGoal: "포트폴리오 열람 시간 증대 및 프로젝트 의뢰 전환율 15% 달성" },
    "회사, 병원, 기업, 가게 등의 홍보 페이지": { targetAudience: "해당 지역 내 오프라인 매장 방문 가능성이 높은 잠재 고객", coreGoal: "브랜드 신뢰도 제고 및 방문 예약/상담 문의 20% 전환" },
    "프리랜서 서비스(디자인/개발/번역 등)": { targetAudience: "단기 외주 인력이 긴급히 필요한 중소기업 프로젝트 매니저", coreGoal: "서비스 상세 단가 확인 및 견적 요청서 작성률 10% 달성" },
    "수업/클래스/워크숍 접수": { targetAudience: "자기계발과 직무 역량 강화에 관심 있는 2030 직장인", coreGoal: "얼리버드 할인 티켓 매진 및 정규 클래스 수강생 50명 확보" },
    "지역 소규모 서비스(사진 촬영, 홈튜터, 헤어 등)": { targetAudience: "반경 5km 이내 거주하며 합리적인 지역 서비스를 찾는 주민", coreGoal: "인스타그램 연동을 통한 포트폴리오 노출 및 카카오톡 채널 상담 30% 증가" },
    "후원/기부(크리에이터 후원, 프로젝트 펀딩)": { targetAudience: "가치 소비를 지향하고 크리에이터의 비전에 공감하는 진성 팬덤", coreGoal: "목표 펀딩 금액 100% 조기 달성 및 후원자 이메일 리스트 500명 확보" },
    "뉴스레터 구독": { targetAudience: "업계 최신 동향과 인사이트를 빠르게 얻고 싶어 하는 주니어/미들급 실무자", coreGoal: "랜딩 페이지 이탈 전 이메일 구독 전환율 15% 달성" },
    "콘텐츠 허브(블로그/유튜브/팟캐스트 모음)": { targetAudience: "특정 니치 주제(예: IT, 재테크)에 꾸준히 관심을 가지는 구독자", coreGoal: "페이지 체류 시간 증대 및 타 플랫폼 구독자 수 10% 유입 전환" },
    "디지털 굿즈 판매(템플릿, 전자책, 코드 스니펫)": { targetAudience: "시간 단축과 성과 향상을 원하는 실무진 및 사이드 프로젝트 팀", coreGoal: "무료 샘플 다운로드 리드 확보 및 유료 결제 전환율 5% 신장" },
    "컨설팅/멘토링 예약": { targetAudience: "경력 이직 및 사업 확장에 어려움을 겪고 전문가의 조언이 필요한 사람", coreGoal: "전문성 입증 세일즈 카피를 통한 1:1 유료 멘토링 결제 완료" },
    "웹도구 모음(개발·마케팅 툴북마크/본인 제작 툴)": { targetAudience: "업무 생산성 향상 툴을 적극 탐색하는 기획자 및 개발자", coreGoal: "북마크 추가 유도 및 툴킷 공유를 통한 바이럴 트래픽 일 1,000명 달성" },
    "바로가기(즐겨찾기/리소스 링크 허브)": { targetAudience: "다양한 자료와 링크를 한 곳에서 관리/참고하고 싶은 학생 및 연구자", coreGoal: "초기 화면 로딩 속도 최적화 및 지속적인 재방문율 40% 유지" },
    "미니 웹앱/게임/계산기/체크리스트": { targetAudience: "가벼운 즐거움이나 일상적인 간단한 계산이 필요한 모바일 유저", coreGoal: "직관적이고 빠른 사용 경험 제공을 통한 앱 잔존율(Retention) 개선" },
    "오픈소스/프로젝트 랜딩": { targetAudience: "새로운 기술 스택을 프로젝트에 도입하려는 시니어 개발자 및 테크 리드", coreGoal: "GitHub 레포지토리 Star 수 증가 및 설치/사용법 문서(Docs) 접근성 강화" },
    "대기자 명단(앱/사이드 프로젝트)": { targetAudience: "문제 해결 능력을 갖춘 혁신적인 신규 서비스 출시를 기다리는 얼리어답터", coreGoal: "출시 전 잠재 고객 이메일 리스트 2,000명 달성 및 커뮤니티 가입 유도" },
    "설문/피드백 수집": { targetAudience: "기존 서비스를 이용해 본 리텐션 고객 및 시장 조사 타겟 대상자", coreGoal: "경품 추첨 이벤트를 활용한 설문조사 응답률 20% 이상 달성" },
    "기타(사용자입력)": { targetAudience: "사용자가 런칭하고자 하는 특정 서비스 및 제품의 고유 잠재 수요층", coreGoal: "프로젝트 성격에 맞는 핵심 가치 전달 및 최소 요구 기능(MVP) 검증 완료" }
  };

  const handleExampleSelect = (example) => {
    setFormData(prev => ({ ...prev, topic: example }));
    setShowExamples(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAutoFill = async () => {
    if (!formData.topic) {
      alert("먼저 웹사이트 주제를 입력(또는 예시에서 선택)해주세요!");
      return;
    }

    setIsAutoFilling(true); // AI 생각 중 모드 온!

    try {
      // AI를 호출해 구체적이고 연관성 높은 결과 도출
      const aiResponse = await generateTargetAndGoal(formData.topic);
      
      setFormData(prev => ({
        ...prev,
        targetAudience: aiResponse.targetAudience || "타겟 고객 분석 실패",
        coreGoal: aiResponse.coreGoal || "핵심 목표 분석 실패"
      }));
    } catch (error) {
      console.error(error);
      alert("자동 완성 실패: " + error.message);
    } finally {
      setIsAutoFilling(false); // 생각 중 모드 오프!
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.topic) return;

    setIsLoading(true);
    setIsSuccess(false);
    setGeneratedData(null);

    try {
      // 진짜 Gemini API 호출
      const aiResultData = await generateLandingPlan(
        formData.topic, 
        formData.targetAudience, 
        formData.coreGoal
      );
      
      setGeneratedData(aiResultData);
      setIsSuccess(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="project-form-card glass-panel">
      <div className="card-header">
        <h2 className="card-title">프로젝트 정의</h2>
      </div>
      
      <form className="form-content" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="label-row relative-container">
            <label htmlFor="topic">웹사이트 주제 (Topic)</label>
            <div className="dropdown-wrapper">
              <button 
                type="button" 
                className="action-link" 
                onClick={() => setShowExamples(!showExamples)}
              >
                <span className="icon">📄</span> 주제 예시 선택
              </button>
              
              {showExamples && (
                <div className="examples-dropdown">
                  {topicExamples.map((example, index) => (
                    <div 
                      key={index} 
                      className="example-item"
                      onClick={() => handleExampleSelect(example)}
                    >
                      {example}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="예: 개인 홈피(About Me)"
            className="text-input"
          />
        </div>

        <div className="form-group">
          <div className="label-row justify-end">
            <button 
              type="button" 
              className={`action-link outline ${isAutoFilling ? 'thinking-btn' : ''}`} 
              onClick={handleAutoFill}
              disabled={isAutoFilling}
            >
              <span className="icon">{isAutoFilling ? '🤔' : '🪄'}</span> 
              {isAutoFilling ? '타겟과 목표를 분석 중입니다...' : '타겟/목표 자동 완성'}
            </button>
          </div>
          <label htmlFor="targetAudience" className="mt-2">타겟 고객 (Target Audience)</label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            placeholder="[✨팁] 주제 선택 후 '자동 완성' 버튼을 누르면 AI가 알아서 채워줍니다"
            className={`text-input ${isAutoFilling ? 'thinking-input' : ''}`}
            readOnly={isAutoFilling}
          />
        </div>

        <div className="form-group">
          <label htmlFor="coreGoal">핵심 목표 (Core Goal)</label>
          <input
            type="text"
            id="coreGoal"
            name="coreGoal"
            value={formData.coreGoal}
            onChange={handleChange}
            placeholder="[✨팁] 주제 선택 후 '자동 완성' 버튼을 누르면 AI가 알아서 채워줍니다"
            className={`text-input ${isAutoFilling ? 'thinking-input' : ''}`}
            readOnly={isAutoFilling}
          />
        </div>

        <button 
          type="submit" 
          className={`submit-btn text-gradient-bg ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-content">
              <span className="spinner"></span> 프롬프트 생성 중...
            </span>
          ) : '기획안 생성 시작'}
        </button>
      </form>

      {/* 결과 화면 컴포넌트에 실제 API 결과 데이터 주입 */}
      {isSuccess && generatedData && <ResultDashboard data={generatedData} />}
    </div>
  );
}

export default ProjectForm;
