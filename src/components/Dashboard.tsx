/**
 * Dashboard コンポーネント
 * 
 * ログイン後のメインページを提供するコンポーネント
 * 認証済みユーザーのみアクセス可能（PrivateRouteで保護）
 * 
 * 機能：
 * - ログインユーザーの情報表示
 * - ログアウト機能
 * - ナビゲーションバー
 * - ユーザーの基本情報（メール、UID、認証状態）の表示
 */

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // 認証情報とナビゲーション機能を取得
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * ログアウトハンドラー
   * ユーザーをログアウトし、ログインページにリダイレクト
   */
  const handleLogout = async () => {
    try {
      await logout();           // ログアウト実行
      navigate('/login');       // ログインページにリダイレクト
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーションバー */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* アプリケーションタイトル */}
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">ダッシュボード</h1>
            </div>
            
            {/* ユーザー情報とログアウトボタン */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                ようこそ、{currentUser?.email}さん
              </span>
              <button
                onClick={handleLogout}
                className="btn-primary"
                style={{ width: 'auto', padding: '0.5rem 1rem' }}
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* メインコンテンツエリア */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* ユーザー情報表示カード */}
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                認証に成功しました！
              </h2>
              
              {/* ユーザーの詳細情報 */}
              <p className="text-gray-600 mb-4">
                ユーザーID: {currentUser?.uid}
              </p>
              <p className="text-gray-600 mb-4">
                メールアドレス: {currentUser?.email}
              </p>
              <p className="text-gray-600">
                メール認証: {currentUser?.emailVerified ? '済み' : '未認証'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
