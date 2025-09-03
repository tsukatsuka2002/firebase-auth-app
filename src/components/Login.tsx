/**
 * Login コンポーネント
 * 
 * ユーザーのログインページを提供するコンポーネント
 * 
 * 機能：
 * - メール/パスワードでのログイン
 * - Googleアカウントでのログイン
 * - 入力値のバリデーション
 * - エラーハンドリング
 * - ログイン後のリダイレクト
 * - サインアップページへのリンク
 */

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // フォームの状態管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');      // エラーメッセージ
  const [loading, setLoading] = useState(false); // ローディング状態
  
  // 認証機能とナビゲーション機能を取得
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * フォーム送信ハンドラー
   * メール/パスワードでのログインを処理
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぐ
    
    try {
      setError('');        // エラーメッセージをクリア
      setLoading(true);    // ローディング開始
      await login(email, password);  // ログイン実行
      navigate('/dashboard');        // ログイン成功時はダッシュボードにリダイレクト
    } catch (error) {
      // ログイン失敗時のエラーハンドリング
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
      console.error('Login error:', error);
    } finally {
      setLoading(false);   // ローディング終了
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* ページタイトル */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
        </div>
        
        {/* ログインフォーム */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* エラーメッセージ表示 */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {/* 入力フィールド */}
          <div className="rounded-md shadow-sm -space-y-px">
            {/* メールアドレス入力 */}
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="メールアドレス"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* パスワード入力 */}
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* ログインボタン */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </div>

          {/* サインアップページへのリンク */}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              アカウントをお持ちでない方は{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                こちらから登録
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
