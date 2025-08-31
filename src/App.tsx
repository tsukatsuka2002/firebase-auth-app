/**
 * App コンポーネント
 * 
 * アプリケーションのルートコンポーネント
 * ルーティング設定と認証コンテキストの提供を行います
 * 
 * 機能：
 * - React Router による SPA ルーティング
 * - AuthProvider による認証状態の管理
 * - PrivateRoute による認証保護
 * - ページ間の自動リダイレクト
 * 
 * ルート構成：
 * - / : ダッシュボードへのリダイレクト
 * - /login : ログインページ
 * - /signup : サインアップページ
 * - /dashboard : ダッシュボード（認証が必要）
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      {/* 認証コンテキストプロバイダーでアプリ全体をラップ */}
      <AuthProvider>
        <div className="App">
          <Routes>
            {/* ルートパス：ダッシュボードにリダイレクト */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 公開ページ（認証不要） */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* 保護されたページ（認証が必要） */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
