/**
 * useAuth カスタムフック
 * 
 * このフックは AuthContext から認証関連の状態と機能を取得するために使用します。
 * AuthProvider でラップされたコンポーネント内でのみ使用可能です。
 * 
 * 使用例：
 * ```tsx
 * const { currentUser, login, logout } = useAuth();
 * ```
 * 
 * 提供される値：
 * - currentUser: 現在ログインしているユーザー情報
 * - loading: 認証状態の読み込み中フラグ
 * - signup: ユーザー登録関数
 * - login: ログイン関数
 * - logout: ログアウト関数
 * - loginWithGoogle: Googleログイン関数
 */

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  // AuthProvider の外で使用された場合にエラーを投げる
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
