'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

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
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">페이지를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }
  
  // 인증된 경우에만 자식 컴포넌트 렌더링
  return isAuthenticated ? <>{children}</> : null;
}