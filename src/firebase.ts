// Firebase SDK v9のモジュラーAPIをインポート
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

/**
 * Firebase プロジェクトの設定オブジェクト
 * 
 * 環境変数から設定値を取得します。
 * Viteでは環境変数は VITE_ プレフィックスが必要です。
 * 
 * 設定値は .env ファイルで管理されています。
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// 設定の検証
if (!firebaseConfig.apiKey) {
  console.warn(
    "🚨 Firebase設定が見つかりません。\n" +
    ".envファイルに適切なFirebase設定値を追加してください。"
  );
}

// Firebaseアプリを初期化
let app;
let authInstance: Auth;
let dbInstance: Firestore;

try {
  app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
  
  // 開発環境でエミュレーターを使用する場合（オプション）
  if (!firebaseConfig.apiKey && typeof window !== 'undefined') {
    // 本番環境では実行されない開発用設定
    console.log("開発モード: Firebase設定が未完了");
  }
  
} catch (error) {
  console.error("Firebase初期化エラー:", error);
  // エラーが発生した場合でも、ダミーのauthインスタンスを作成
  app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
}

export const auth: Auth = authInstance;
export const db: Firestore = dbInstance;
export default app;
