'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // 로딩이 완료되고 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);
  
  // 로딩 중인 경우 로딩 UI 표시
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              로딩 중...
            </span>
          </div>
          <p className="mt-2 text-gray-600">페이지를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }
  
  // 인증된 경우에만 자식 컴포넌트 렌더링
  return isAuthenticated ? <>{children}</> : null;
}