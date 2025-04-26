'use client';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { getWithAuth } from '@/lib/api';

// Gym 인터페이스 정의
interface Gym {
  id: number;
  name: string;
  dbName: string;
  ownerId?: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [gymList, setGymList] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로그인한 사용자의 헬스장 목록 가져오기
    const fetchGyms = async () => {
      try {
        // api-utils에서 가져온 함수 사용
        const data = await getWithAuth('/api/gyms');
        setGymList(data.gyms || []);
      } catch (error) {
        console.error('헬스장 목록 조회 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchGyms();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* 사용자 정보 */}
          <div className="bg-white overflow-hidden shadow rounded-lg mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900">사용자 정보</h2>
              {user && (
                <div className="mt-4 text-sm text-gray-600">
                  <p><span className="font-medium">이름:</span> {user.name}</p>
                  <p><span className="font-medium">이메일:</span> {user.email}</p>
                  <p><span className="font-medium">권한:</span> {user.role === 'admin' ? '관리자' : '슈퍼 관리자'}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* 헬스장 목록 */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-lg font-medium text-gray-900">내 헬스장 목록</h2>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  헬스장 추가
                </button>
              </div>
              
              {loading ? (
                <p className="text-gray-500">로딩 중...</p>
              ) : gymList.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {gymList.map((gym) => (
                    <div 
                      key={gym.id} 
                      className="border p-4 rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => window.location.href = `/gyms/${gym.id}`}
                    >
                      <h3 className="text-lg font-medium">{gym.name}</h3>
                      <p className="text-sm text-gray-500">DB: {gym.dbName}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 mb-4">아직 등록된 헬스장이 없습니다.</p>
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    첫 번째 헬스장 등록하기
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}