// Firebase SDK v9のモジュラーAPIをインポート
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase プロジェクトの設定オブジェクト
 * 実際の使用時は、Firebase Consoleで作成したプロジェクトの設定値に置き換える必要があります
 * 
 * 設定値の取得方法：
 * 1. Firebase Console (https://console.firebase.google.com/) にアクセス
 * 2. プロジェクトを選択
 * 3. 歯車アイコン → プロジェクトの設定
 * 4. 「マイアプリ」セクションでWebアプリを追加
 * 5. 表示される設定オブジェクトをコピー
 */
const firebaseConfig = {
  apiKey: "your-api-key",                    // Firebase API キー
  authDomain: "your-auth-domain",            // 認証ドメイン（通常は project-id.firebaseapp.com）
  projectId: "your-project-id",              // プロジェクト ID
  storageBucket: "your-storage-bucket",      // Cloud Storage バケット
  messagingSenderId: "your-messaging-sender-id", // メッセージング送信者 ID
  appId: "your-app-id"                       // アプリ ID
};

// Firebaseアプリを初期化
// この初期化により、他のFirebaseサービスを使用できるようになります
const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication インスタンス
 * ユーザーのサインアップ、ログイン、ログアウト等の認証機能を提供
 */
export const auth = getAuth(app);

/**
 * Cloud Firestore インスタンス
 * NoSQLデータベースへのアクセスを提供（将来的にユーザーデータ保存等で使用）
 */
export const db = getFirestore(app);

// デフォルトエクスポートとしてFirebaseアプリインスタンスを提供
export default app;
