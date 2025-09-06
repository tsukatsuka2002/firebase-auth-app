# Firebase Authentication App

React + TypeScript + Vite + Firebase Authentication を使用したユーザー認証アプリケーション

## 🚀 機能

- **ユーザー認証**
  - メール/パスワードでのサインアップ・ログイン
  - 自動ログアウト機能
  
- **セキュリティ**
  - プライベートルート保護
  - 認証状態の自動監視
  - 未認証ユーザーの自動リダイレクト

- **ユーザビリティ**
  - リアルタイムエラーハンドリング
  - ローディング状態の表示
  - レスポンシブデザイン

## 📁 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── Login.tsx       # ログインページ
│   ├── Signup.tsx      # サインアップページ
│   ├── Dashboard.tsx   # ダッシュボード（認証後）
│   └── PrivateRoute.tsx # ルート保護コンポーネント
├── contexts/           # React Context
│   └── AuthContext.tsx # 認証状態管理
├── hooks/              # カスタムフック
│   └── useAuth.ts      # 認証フック
├── firebase.ts         # Firebase設定
├── App.tsx            # メインアプリコンポーネント
├── main.tsx           # エントリーポイント
└── index.css          # スタイルシート
```

## 🛠 技術スタック

- **フロントエンド**: React 18, TypeScript
- **ビルドツール**: Vite
- **認証**: Firebase Authentication
- **ルーティング**: React Router DOM
- **スタイリング**: 基本CSS（TailwindCSS風のユーティリティクラス）
- **バリデーション**: Zod（将来的な拡張用）

## 📋 セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Firebase プロジェクトの設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. Authentication サービスを有効化
3. Sign-in method で以下を設定：
   - Email/Password を有効化
   - Google を有効化（オプション）
   - ホームからプロジェクトを選択、ウェブ（＜＞）をアプリとして追加

### 3. Firebase 設定の更新

プロジェクトのルートに `.env` ファイルを作成し、以下を設定:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

`src/firebase.ts` ファイルの設定オブジェクトを実際の値に更新：

実際は、`.env`からfirebaseに関する情報を取得
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
```

### 4. 開発サーバーの起動

```bash
npm run dev -- --host
```

アプリケーションは `http://localhost:5173` でアクセス可能。

## 🔐 認証フロー

1. **未認証ユーザー**: `/login` または `/signup` にアクセス
2. **認証成功**: 自動的に `/dashboard` にリダイレクト
3. **認証済みユーザー**: 直接 `/dashboard` にアクセス可能
4. **ログアウト**: 自動的に `/login` にリダイレクト

## 🎨 カスタマイズ

### スタイルの変更

`src/index.css` でスタイルをカスタマイズ可能。現在は基本的なCSSクラスを使用しているが、TailwindCSSやStyled Componentsなどに置き換え可能。

### 新しいページの追加

1. `src/components/` に新しいコンポーネントを作成
2. `src/App.tsx` にルートを追加
3. 必要に応じて `PrivateRoute` でラップ

### Firebase機能の拡張

- Firestore データベース
- Cloud Storage
- Cloud Functions

## 🐛 トラブルシューティング

### Firebase設定エラー

- Firebase Console で設定値が正しいか確認
- Authentication サービスが有効化されているか確認

### ビルドエラー

```bash
npm run build
```

でエラーの詳細を確認

## 📝 今後の拡張案

- [ ] プロフィール編集機能
- [ ] パスワードリセット機能
- [ ] メール認証
- [ ] ユーザーデータの Firestore 保存
- [ ] ダークモード対応
- [ ] 多言語対応

## 🤝 開発者向け情報

### 重要なコンポーネント

- **AuthContext**: 認証状態の中央管理
- **useAuth**: 認証機能へのアクセス
- **PrivateRoute**: 認証が必要なページの保護

### セキュリティ考慮事項

- Firebase Security Rules の設定
- HTTPS の使用（本番環境）
- 適切なCORS設定

