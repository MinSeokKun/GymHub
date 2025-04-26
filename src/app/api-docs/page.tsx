// src/app/api-docs/page.tsx
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

  return <SwaggerUI spec={spec} />;
}