/**
 * Firebase Authentication Context
 * 
 * このファイルは React Context API を使用して、アプリケーション全体で
 * ユーザーの認証状態と認証関連の機能を共有するためのコンテキストを提供します。
 * 
 * 主な機能：
 * - ユーザーの認証状態管理
 * - ログイン、サインアップ、ログアウト機能
 * - Googleアカウントでの認証
 * - 認証状態の変化を監視
 */

import React, { createContext, useEffect, useState } from 'react';
import type { ReactNode, } from 'react';
import { 
  createUserWithEmailAndPassword,  // メール/パスワードでの新規ユーザー作成
  signInWithEmailAndPassword,      // メール/パスワードでのログイン
  signOut,                         // ログアウト
  onAuthStateChanged               // 認証状態の変化を監視
} from 'firebase/auth';
import type { User } from 'firebase/auth'; // Userの型定義
import { auth } from '../firebase'; // Firebase設定ファイルからauthインスタンスをインポート

/**
 * 認証コンテキストの型定義
 * コンテキストが提供する値の型を定義
 */
interface AuthContextType {
  currentUser: User | null;          // 現在ログインしているユーザー（未ログインの場合はnull）
  loading: boolean;                  // 認証状態の読み込み中かどうか
  signup: (email: string, password: string) => Promise<void>;     // ユーザー登録関数
  login: (email: string, password: string) => Promise<void>;      // ログイン関数
  logout: () => Promise<void>;                                    // ログアウト関数
}

/**
 * 認証コンテキストの作成
 * 初期値は undefined で、プロバイダー内でのみ有効な値を持つ
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthContextをエクスポート
 * useAuthフックで使用するため
 */
export { AuthContext };

/**
 * AuthProvider コンポーネントのProps型定義
 */
interface AuthProviderProps {
  children: ReactNode; // 子コンポーネント
}

/**
 * AuthProvider コンポーネント
 * 
 * このコンポーネントは認証関連の状態と機能を子コンポーネントに提供します。
 * アプリケーションのルートレベルでラップして使用します。
 * 
 * 機能：
 * - ユーザーの認証状態を管理
 * - 認証関連の関数を提供
 * - 認証状態の変化を監視
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 現在ログインしているユーザーの状態
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // 認証状態の読み込み中フラグ
  // 初期状態では true にして、認証状態が確定するまでコンポーネントのレンダリングを防ぐ
  const [loading, setLoading] = useState(true);

  /**
   * ユーザー登録関数
   * メールアドレスとパスワードで新規ユーザーを作成
   * 
   * @param email - ユーザーのメールアドレス
   * @param password - ユーザーのパスワード
   */
  const signup = async (email: string, password: string): Promise<void> => {
    if (!auth) {
      throw new Error('Firebase Authentication が初期化されていません。Firebase設定を確認してください。');
    }
    await createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * ログイン関数
   * メールアドレスとパスワードでユーザーをログイン
   * 
   * @param email - ユーザーのメールアドレス
   * @param password - ユーザーのパスワード
   */
  const login = async (email: string, password: string): Promise<void> => {
    if (!auth) {
      throw new Error('Firebase Authentication が初期化されていません。Firebase設定を確認してください。');
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * ログアウト関数
   * 現在ログインしているユーザーをログアウト
   */
  const logout = async (): Promise<void> => {
    if (!auth) {
      throw new Error('Firebase Authentication が初期化されていません。Firebase設定を確認してください。');
    }
    await signOut(auth);
  };

  /**
   * 認証状態の監視
   * 
   * useEffect を使用して、コンポーネントのマウント時に
   * Firebase の認証状態変化を監視するリスナーを設定
   */
  useEffect(() => {
    // Firebase authが正しく初期化されているかチェック
    if (!auth) {
      console.warn("Firebase認証が初期化されていません。デモモードで動作します。");
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user); // ユーザー状態を更新
        setLoading(false);    // 読み込み完了
      });

      // クリーンアップ関数：コンポーネントのアンマウント時にリスナーを解除
      return unsubscribe;
    } catch (error) {
      console.error("認証状態監視エラー:", error);
      setLoading(false);
    }
  }, []);

  /**
   * コンテキストに提供する値
   */
  const value: AuthContextType = {
    currentUser,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {/* loading が false になったら子コンポーネントをレンダリング */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
