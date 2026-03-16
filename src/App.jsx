import React from 'react';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <section className="hero-section">
          <h1 className="hero-title text-gradient">
            아이디어만 있으면<br />
            기획과 코드가 완성됩니다
          </h1>
          <p className="hero-subtitle">
            주제와 타겟만 입력하세요. AI Studio Build에 바로 사용할 수 있는 최적화된 프롬프트를 생성해드립니다.
          </p>
        </section>

        <ProjectForm />
      </main>
      
      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.875rem', color: '#64748b' }}>
        This app was developed by another user. It may be inaccurate or unsafe. <a href="#" style={{ color: '#3b82f6' }}>Report legal issue</a>
      </footer>
    </div>
  );
}

export default App;
