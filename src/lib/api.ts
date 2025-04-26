/**
 * 인증이 필요한 API 요청을 위한 유틸리티 함수
 */
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // 로컬 스토리지에서 토큰 가져오기
  const token = localStorage.getItem('token');
  
  // 기본 헤더 설정
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  
  // 토큰이 있으면 Authorization 헤더 추가
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  // API 요청 보내기
  const response = await fetch(url, {
    ...options,
    headers,
  });
  
  // 401 Unauthorized 응답 처리
  if (response.status === 401) {
    // 토큰이 만료되었거나 유효하지 않은 경우
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 로그인 페이지로 리다이렉트
    window.location.href = '/login?redirected=session-expired';
    
    throw new Error('인증이 필요합니다. 다시 로그인해주세요.');
  }
  
  return response;
}

/**
 * GET 요청 유틸리티
 */
export async function getWithAuth(url: string) {
  const response = await fetchWithAuth(url);
  return await response.json();
}

/**
 * POST 요청 유틸리티
 */
export async function postWithAuth(url: string, data: any) {
  const response = await fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * PUT 요청 유틸리티
 */
export async function putWithAuth(url: string, data: any) {
  const response = await fetchWithAuth(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return await response.json();
}

/**
 * DELETE 요청 유틸리티
 */
export async function deleteWithAuth(url: string) {
  const response = await fetchWithAuth(url, {
    method: 'DELETE',
  });
  return await response.json();
}