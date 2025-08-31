// Firebase SDK v9のモジュラーAPIをインポート
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

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
let app;
let authInstance: Auth;
let dbInstance: Firestore;

try {
  app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
  
  // 開発環境でエミュレーターを使用する場合（オプション）
  if (firebaseConfig.apiKey === "demo-api-key" && typeof window !== 'undefined') {
    // 本番環境では実行されない開発用設定
    console.log("開発モード: Firebase Auth エミュレーターの設定をスキップ");
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
