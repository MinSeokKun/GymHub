'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getWithAuth } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Header from '@/components/layout/Header';

// UI 컴포넌트 임포트
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// 헬스장 타입 정의
interface Gym {
  id: number;
  name: string;
  dbName: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [gymList, setGymList] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 로그인한 사용자의 헬스장 목록 가져오기
    const fetchGyms = async () => {
      try {
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

  const handleGymClick = (gymId: number) => {
    router.push(`/gyms/${gymId}`);
  };

  const handleAddGym = () => {
    router.push('/gyms/new');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* 페이지 제목 */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">대시보드</h1>
            <p className="text-muted-foreground mt-1">헬스장 목록 및 관리</p>
          </div>

          {/* 사용자 정보 */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>사용자 정보</CardTitle>
              <CardDescription>현재 로그인된 계정 정보입니다.</CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium w-24">이름:</span>
                    <span>{user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-24">이메일:</span>
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium w-24">권한:</span>
                    <span>{user.role === 'admin' ? '관리자' : '슈퍼 관리자'}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 헬스장 목록 */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">내 헬스장 목록</h2>
            <Button onClick={handleAddGym}>
              <PlusCircle className="mr-2 h-4 w-4" />
              헬스장 추가
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <Skeleton className="h-5 w-[180px]" />
                    <Skeleton className="h-4 w-[120px]" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : gymList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gymList.map((gym) => (
                <Card 
                  key={gym.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleGymClick(gym.id)}
                >
                  <CardHeader>
                    <CardTitle>{gym.name}</CardTitle>
                    <CardDescription>ID: {gym.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      DB: {gym.dbName}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => handleGymClick(gym.id)}>
                      관리하기
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>헬스장이 없습니다</CardTitle>
                <CardDescription>새로운 헬스장을 추가해보세요.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-6">
                <Building2 className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-center text-muted-foreground mb-4">
                  아직 등록된 헬스장이 없습니다.<br />
                  첫 번째 헬스장을 추가하고 회원과 수업을 관리해보세요.
                </p>
                <Button onClick={handleAddGym}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  첫 번째 헬스장 등록하기
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}