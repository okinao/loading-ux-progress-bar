import React, { useState, useEffect } from 'react';

// プログレスバーコンポーネント
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
      <div
        className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out relative"
        style={{ width: `${progress}%` }}
      >
        {/* 縞模様のアニメーション（オプション） */}
        <div
          className="absolute inset-0 w-full h-full opacity-20"
          style={{
            backgroundImage: 'linear-gradient(45deg, #fff 25%, transparent 25%, transparent 50%, #fff 50%, #fff 75%, transparent 75%, transparent)',
            backgroundSize: '1rem 1rem'
          }}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  // ファイルアップロードをシミュレート
  const startUpload = () => {
    setProgress(0);
    setIsUploading(true);
    setUploadComplete(false);
  };

  useEffect(() => {
    if (!isUploading) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        // リアルなアップロード進捗をシミュレート
        // 最初は速く、後半は遅くなる
        const increment = prev < 30 ? 3 : prev < 70 ? 2 : prev < 95 ? 1 : 0.5;
        const newProgress = Math.min(prev + increment, 100);

        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadComplete(true);
        }

        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isUploading]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            プログレスバー デモ
          </h1>
          <p className="text-slate-600 mb-4">
            ファイルアップロードなど進捗を可視化
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-700">
                {uploadComplete ? 'アップロード完了！' : isUploading ? 'アップロード中...' : 'ファイルをアップロード'}
              </span>
              <span className="text-sm font-bold text-blue-600">
                {Math.round(progress)}%
              </span>
            </div>

            <ProgressBar progress={progress} />

            {uploadComplete && (
              <div className="text-sm text-green-600 font-medium">
                ✓ ファイルのアップロードが完了しました
              </div>
            )}
          </div>

          <button
            onClick={startUpload}
            disabled={isUploading}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {isUploading ? 'アップロード中...' : uploadComplete ? '再度アップロード' : 'アップロード開始'}
          </button>
        </div>

        
    </div>
  );
}
