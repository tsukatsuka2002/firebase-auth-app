/**
 * Signup コンポーネント
 * 
 * 新規ユーザー登録ページを提供するコンポーネント
 * 
 * 機能：
 * - メール/パスワードでの新規ユーザー登録
 * - Googleアカウントでの登録
 * - パスワードの確認入力
 * - 入力値のバリデーション（パスワード一致、長さチェック）
 * - エラーハンドリング
 * - 登録後のリダイレクト
 * - ログインページへのリンク
 */

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  // フォームの状態管理
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // パスワード確認用
  const [error, setError] = useState('');      // エラーメッセージ
  const [loading, setLoading] = useState(false); // ローディング状態
  
  // 認証機能とナビゲーション機能を取得
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  /**
   * フォーム送信ハンドラー
   * 新規ユーザー登録を処理
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのフォーム送信を防ぐ
    
    // パスワード一致チェック
    if (password !== confirmPassword) {
      return setError('パスワードが一致しません。');
    }

    // パスワード長さチェック（Firebaseの最小要件）
    if (password.length < 6) {
      return setError('パスワードは6文字以上で入力してください。');
    }
    
    try {
      setError('');        // エラーメッセージをクリア
      setLoading(true);    // ローディング開始
      await signup(email, password);    // ユーザー登録実行
      navigate('/dashboard');           // 登録成功時はダッシュボードにリダイレクト
    } catch (error) {
      // 登録失敗時のエラーハンドリング
      setError('アカウント作成に失敗しました。');
      console.error('Signup error:', error);
    } finally {
      setLoading(false);   // ローディング終了
    }
  };

  /**
   * Googleサインアップハンドラー
   * Googleアカウントでの登録を処理
   */
  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();          // Googleログイン実行（登録も兼ねる）
      navigate('/dashboard');           // 成功時はダッシュボードにリダイレクト
    } catch (error) {
      // Google登録失敗時のエラーハンドリング
      setError('Googleアカウントでの登録に失敗しました。');
      console.error('Google signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            新規アカウント作成
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
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
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード（6文字以上）"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="パスワード確認"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
            >
              {loading ? 'アカウント作成中...' : 'アカウント作成'}
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="btn-secondary"
            >
              Googleで登録
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              すでにアカウントをお持ちの方は{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                こちらからログイン
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
