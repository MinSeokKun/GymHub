'use client';
import { ReactNode, useState } from 'react';
import { useParams } from 'next/navigation';
import { Menu } from 'lucide-react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const gymId = Array.isArray(params?.gymId) ? params.gymId[0] : params?.gymId;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* 모바일 헤더 */}
      <div className="lg:hidden">
        <div className="flex items-center p-4">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar gymId={gymId} />
            </SheetContent>
          </Sheet>
          <div className="flex-1">
            <Header />
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* 데스크톱 사이드바 */}
        <div className="hidden lg:block">
          <Sidebar gymId={gymId} />
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex flex-col">
          {/* 데스크톱 헤더 */}
          <div className="hidden lg:block">
            <Header />
          </div>

          {/* 메인 콘텐츠 영역 */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}