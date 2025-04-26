// src/app/api-docs/page.tsx 수정
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// Swagger UI를 클라이언트 사이드에서만 렌더링하기 위해 dynamic import 사용
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    // API 라우트에서 Swagger 스펙 가져오기
    fetch('/api/docs')
      .then(response => response.json())
      .then(data => setSpec(data));
  }, []);

  if (!spec) {
    return <div className="p-8">Loading API documentation...</div>;
  }

  // Strict Mode 경고를 무시하기 위해 ErrorBoundary 또는 비슷한 방법 사용 가능
  return (
    // React.StrictMode 비활성화 - Next.js에서는 전역 설정이므로 이 컴포넌트에서는 비활성화 불가
    <div suppressHydrationWarning>
      <SwaggerUI spec={spec} />
    </div>
  );
}