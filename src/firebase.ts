// Firebase SDK v9のモジュラーAPIをインポート
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase プロジェクトの設定オブジェクト
 * 
 * 🚨 重要: これは開発用のプレースホルダー設定です
 * 実際のFirebaseプロジェクトを使用する場合は、以下の手順で設定を更新してください：
 * 
 * 設定値の取得方法：
 * 1. Firebase Console (https://console.firebase.google.com/) にアクセス
 * 2. プロジェクトを選択
 * 3. 歯車アイコン → プロジェクトの設定
 * 4. 「マイアプリ」セクションでWebアプリを追加
 * 5. 表示される設定オブジェクトをコピー
 */
const firebaseConfig = {
  apiKey: "demo-api-key",                    
  authDomain: "demo-project.firebaseapp.com",            
  projectId: "demo-project-id",              
  storageBucket: "demo-project.appspot.com",      
  messagingSenderId: "123456789", 
  appId: "1:123456789:web:abcdef123456789"                       
};

// 開発環境での警告表示
if (firebaseConfig.apiKey === "demo-api-key") {
  console.warn(
    "🚨 Firebase設定が開発用プレースホルダーです。\n" +
    "実際の認証機能を使用するには、Firebase Consoleで" +
    "プロジェクトを作成し、src/firebase.tsの設定を更新してください。"
  );
}

// Firebaseアプリを初期化
// この初期化により、他のFirebaseサービスを使用できるようになります
let app;
let authInstance;
let dbInstance;

try {
  app = initializeApp(firebaseConfig);
  
  /**
   * Firebase Authentication インスタンス
   * ユーザーのサインアップ、ログイン、ログアウト等の認証機能を提供
   */
  authInstance = getAuth(app);
  
  /**
   * Cloud Firestore インスタンス
   * NoSQLデータベースへのアクセスを提供（将来的にユーザーデータ保存等で使用）
   */
  dbInstance = getFirestore(app);
  
} catch (error) {
  console.error("Firebase初期化エラー:", error);
  console.warn("Firebase設定を確認してください。現在はデモモードで動作します。");
}

export const auth = authInstance;
export const db = dbInstance;
// デフォルトエクスポートとしてFirebaseアプリインスタンスを提供
export default app;
