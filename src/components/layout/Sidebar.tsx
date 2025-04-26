'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  ClipboardCheck,
  Settings,
  CreditCard,
  Package,
  ArrowLeft
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  gymId: string | number;
  gymName?: string;
  className?: string;
}

export default function Sidebar({ gymId, gymName, className }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === `/gyms/${gymId}${path}`;
  };

  const getHref = (path: string) => {
    return `/gyms/${gymId}${path}`;
  };

  const sidebarItems = [
    { name: '대시보드', icon: LayoutDashboard, path: '' },
    { name: '회원 관리', icon: Users, path: '/members' },
    { name: '트레이너 관리', icon: UserCog, path: '/trainers' },
    { name: 'PT 일정', icon: Calendar, path: '/pt-sessions' },
    { name: '출석 관리', icon: ClipboardCheck, path: '/attendance' },
    { name: '결제 내역', icon: CreditCard, path: '/payments' },
    { name: '상품 관리', icon: Package, path: '/products' },
    { name: '설정', icon: Settings, path: '/settings' },
  ];

  const handleBackToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <div className={cn("h-full bg-white dark:bg-gray-800 flex flex-col", className)}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold truncate">{gymName || '헬스장'}</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start mb-4" 
          onClick={handleBackToDashboard}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          헬스장 목록으로
        </Button>
      </div>
      
      <Separator />
      
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            href={getHref(item.path)}
            className="block"
          >
            <Button
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isActive(item.path) ? "font-medium" : "font-normal"
              )}
            >
              <item.icon className="h-4 w-4 mr-2" />
              {item.name}
            </Button>
          </Link>
        ))}
      </nav>
      
      <div className="p-4">
        <Separator className="mb-4" />
        <p className="text-xs text-center text-muted-foreground">
          © 2025 GymHub. All rights reserved.
        </p>
      </div>
    </div>
  );
}