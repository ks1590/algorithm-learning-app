export const AppColors = {
  // ベースカラー
  background: '#FFF8E7', // クリーム / ライトベージュ
  foreground: '#000000',
  white: '#ffffff',
  black: '#000000',

  // プライマリパレット
  primary: '#FF66C4', // ホットピンク
  secondary: '#FFD23F', // ポップイエロー
  accent: '#3DCCC7', // ティール
  muted: '#8E9DFF', // ペリウィンクル
  destructive: '#FF6B6B',

  // 特定のUI要素
  descriptionBox: {
    background: '#d9f99d', // ライムグリーン (Tailwind lime-200 相当)
    border: '#000000',
  },

  tree: {
    node: {
      active: {
        fill: '#FFD23F',
        stroke: '#f3c326',
      },
      visited: {
        fill: '#C689D8',
        stroke: '#9333EA',
      },
      default: {
        fill: '#ffffff',
        stroke: '#000000',
      },
    },
    edge: {
      stroke: 'gray',
    },
  },
} as const;
