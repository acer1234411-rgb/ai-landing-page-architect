import { GoogleGenAI } from '@google/genai';

// API 키 검증
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let aiClient = null;
if (API_KEY) {
  aiClient = new GoogleGenAI({ apiKey: API_KEY });
}

/**
 * 텍스트 블록 안에서 순수 JSON String만 찾아 파싱하는 안정성 유틸리티 함수
 */
function extractJsonFromText(text) {
  try {
    // 1. 혹시 AI가 ```json ~ ``` 마크다운으로 감싸서 준 경우 정규식으로 내용만 발라내기
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    
    // 2. 그냥 순수 JSON만 던졌을 경우 바로 파싱 시도
    return JSON.parse(text);
  } catch (error) {
    console.error("JSON 파싱 에러. 원본 텍스트:", text);
    throw new Error("AI가 올바른 JSON 포맷을 반환하지 않았습니다. 다시 시도해주세요.");
  }
}

/**
 * 사용자의 입력값을 바탕으로 완벽한 JSON 아키텍처를 생성해달라고 AI에 요청하는 메인 함수
 */
export async function generateLandingPlan(topic, targetAudience, coreGoal) {
  if (!aiClient) {
    throw new Error("API 키가 설정되지 않았습니다. .env 폴더에 VITE_GEMINI_API_KEY 를 입력해주세요.");
  }

  try {
    // 가장 성능이 좋고 빠르면서 구조적 출력을 잘하는 Flash 모델 사용
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
당신은 최고 수준의 시니어 웹/UIUX 기획자 및 아키텍처 디자이너입니다.
다음 프로젝트 정보를 바탕으로 완벽하게 구조화된 랜딩 페이지 아키텍처 마스터 플랜(JSON)을 작성해야 합니다.

[사용자 입력 정보]
- 웹사이트 주제: ${topic}
- 타겟 고객: ${targetAudience}
- 핵심 목표: ${coreGoal}

[절대 규칙]
1. 당신의 대답은 어떠한 인사말이나 부연 설명 없이, 오직 하나의 유효한 JSON 객체(Object) 형식이어야만 합니다.
2. 마크다운(\`\`\`json)으로 감싸지 않아도 무방합니다. 무조건 첫 글자는 { 로 시작하고 } 로 끝나야 합니다.
3. 반드시 아래 제공되는 구조(Schema)의 Key들을 100% 동일하게 유지해야 합니다.

[반드시 생성해야 할 JSON 스키마 예시 규격]
{
  "projectInfo": {
    "topic": "${topic}",
    "target": "${targetAudience}",
    "goal": "${coreGoal}",
    "language": "Korean (한국어)",
    "selectedStyle": "직관적인 주제에 맞는 대표적인 스타일(예: Card Type, Single Scroll 등 짧은 명사형)",
    "structureStrategy": "전체 페이지 구조 전략 요약 (예: Main: 핵심 요약 / Sub 1: ... 등)",
    "designIntent": "이 디자인과 아키텍처를 선택한 전문적인 기획 의도 서술 (3~4문장)"
  },
  "designSystem": {
    "colors": {
      "primary": { "hex": "#주력색상코드", "name": "색상이름(예: Sky Blue)" },
      "secondary": { "hex": "#보조색상코드", "name": "색상이름" },
      "background": { "hex": "#배경색상코드", "name": "색상이름" },
      "text": { "hex": "#글자색상코드", "name": "색상이름" }
    },
    "typography": {
      "heading": "사용할 폰트명 (예: Pretendard)",
      "body": "사용할 폰트명 (예: Inter)"
    },
    "moodboard": ["키워드1", "키워드2", "키워드3", "키워드4"]
  },
  "architecture": {
    "mainPage": {
      "sections": [
        "Hero Section: 가장 먼저 보이는 곳의 핵심 카피라이팅 및 버튼(CTA) 묘사",
        "Feature Section: 묘사...",
        "Social Proof: 묘사...",
        "CTA Section: 묘사...",
        "Footer"
      ]
    },
    "subPages": [
      { "name": "서브페이지 이름(예: About)", "purpose": "이 페이지의 생성 목적과 들어갈 내용" },
      { "name": "서브페이지 2", "purpose": "목적" }
    ]
  },
  "developmentGuide": {
    "stack": "Vite + React + TypeScript + TailwindCSS 등 추천 스택",
    "folderStructure": "src/ \\n ├── assets/ \\n │   └── images/ \\n ├── components/ \\n │   ├── ... \\n ├── pages/ ... 형식으로 꼼꼼히 작성",
    "vercelDeploymentConfig": {
      "instruction": "배포 지침",
      "indexHtmlSetup": "index.html 세팅 가이드"
    },
    "imageConfiguration": {
      "storagePath": "이미지 저장 경로",
      "manifestFile": "파일명 목록 명시 방법"
    }
  }
}

위의 포맷과 입력 정보를 완벽히 분석하여, 실제 코딩에 즉시 투입 가능한 퀄리티 높은 기획 시나리오와 디자인 값들로 빈칸을 창의적이고 전문적으로 꽉꽉 채워 완성된 JSON 코드를 반환하십시오.
      `
    });

    const aiText = response.text;
    console.log("AI Raw Text:", aiText);

    // 유틸리티 함수를 거쳐 안전하게 객체로 변환 반환
    return extractJsonFromText(aiText);

  } catch (error) {
    console.error("Gemini API 통신 실패:", error);
    throw new Error("AI와 통신하는 중 문제가 발생했습니다. \n\n" + error.message);
  }
}

/**
 * 사용자의 주제 정보를 바탕으로 구체적인 타겟 고객과 핵심 목표를 생성해달라고 AI에 요청하는 함수
 */
export async function generateTargetAndGoal(topic) {
  if (!aiClient) {
    throw new Error("API 키가 설정되지 않았습니다. .env 폴더에 VITE_GEMINI_API_KEY 를 입력해주세요.");
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
당신은 최고 수준의 시니어 웹/UIUX 마케팅 기획자입니다.
다음 프로젝트 주제 정보를 바탕으로 이 웹사이트를 위한 아주 구체적이고 연관성이 높은 [타겟 고객]과 [핵심 목표]를 도출해야 합니다.

[사용자 입력 정보]
- 웹사이트 주제: ${topic}

[요구사항]
- 타겟 고객: 성별, 연령대, 직업, 관심사 등을 포함하여 매우 상세하고 생생하게 묘사해주세요. (예: 부산의 문화예술 발전에 관심이 많고 후원과 자원봉사를 통해 지역 사회에 선한 영향력을 나누고자 하는 30~40대 시민)
- 핵심 목표: 달성 가능하면서 구체적인 수치를 포함한 매력적인 목표를 설정해주세요. (예: 온라인 캠페인을 통한 신규 정기 후원자 매월 50명 확보 및 주요 문화 행사 참관객 전환율 15% 달성)

[절대 규칙]
1. 대답은 오직 하나의 유효한 JSON 객체(Object) 형식이어야 합니다.
2. 마크다운(\`\`\`json)으로 감싸지 않아도 무방합니다. 무조건 첫 글자는 { 로 시작하고 } 로 끝나야 합니다.

[JSON 스키마 예시 규격]
{
  "targetAudience": "구체적이고 상세한 타겟 고객 묘사",
  "coreGoal": "구체적이고 수치화된 핵심 행동 목표"
}

위 포맷과 입력 정보를 완벽히 분석하여, 실제 프로젝트에 즉시 투입 가능한 고민하고 생각한 깊이 있는 JSON 결과를 반환하십시오.
      `
    });

    const aiText = response.text;
    console.log("AI Target & Goal Text:", aiText);

    return extractJsonFromText(aiText);

  } catch (error) {
    console.error("Gemini API 통신 (Target/Goal) 실패:", error);
    throw new Error("AI와 통신하는 중 문제가 발생했습니다. \n\n" + error.message);
  }
}

