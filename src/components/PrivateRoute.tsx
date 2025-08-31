/**
 * PrivateRoute コンポーネント
 * 
 * 認証が必要なページを保護するためのコンポーネント
 * 未認証ユーザーは自動的にログインページにリダイレクトされます
 * 
 * 使用方法：
 * ```tsx
 * <PrivateRoute>
 *   <Dashboard />
 * </PrivateRoute>
 * ```
 * 
 * 動作：
 * - currentUser が存在する場合：子コンポーネントをレンダリング
 * - currentUser が null の場合：/login にリダイレクト
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode; // 保護したいコンポーネント
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();
  
  // 認証済みの場合は子コンポーネントを表示、未認証の場合はログインページにリダイレクト
  return currentUser ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
