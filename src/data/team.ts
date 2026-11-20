export type TeamMember = { name: string; role: string; image: string; message: string };

export const teamGroups: { title: string; members: TeamMember[] }[] = [
  { title: '主催', members: [
    { name: '株式会社リバネス', role: '代表取締役 グループCEO　丸 幸弘', image: '/images/team/leave-a-nest.jpg', message: 'テックプランターから生まれたベンチャーの技術を、平時と有事をつなぐ社会システムとして日本から世界へ広げます。' },
  ] },
  { title: '企業パートナー', members: [
    { name: 'アクアクララ株式会社', role: '経営戦略室 マーケティング課 課長　内山 政道', image: '/images/team/aqua-clara.jpg', message: '全国の地場企業と連携した宅配水の仕組みを活かし、インフラに根ざした事業を共につくります。' },
    { name: 'キヤノンマーケティングジャパン株式会社', role: '企画本部R&B推進センター グループマネージャー　阿部 龍生', image: '/images/team/canon.jpg', message: '研究・技術と事業開発をつなぎ、仲間とともにレジリエントな社会を創造します。' },
    { name: '東日本旅客鉄道株式会社', role: '執行役員 マーケティング本部副本部長　竹島 博行', image: '/images/team/jr-east.jpg', message: '鉄道・Suicaなどの社会基盤とスタートアップの技術を掛け合わせ、課題解決を実現します。' },
  ] },
  { title: 'コアテクノロジーズ', members: [
    { name: 'WOTA株式会社', role: '代表取締役 兼 CEO　前田 瑶介', image: '/images/team/wota.jpg', message: '分散型の水循環システムを通じて、国難級災害でも水に困らない社会システムを構築します。' },
    { name: '株式会社ACSL', role: '事業開発ユニット 部長　佐々木 大介', image: '/images/team/acsl.jpg', message: 'ドローンによる物資搬送や空撮を通じて、災害現場の人手と時間の負担を減らします。' },
    { name: '株式会社e6s', role: '代表取締役　高波 正充', image: '/images/team/e6s.jpg', message: '平時は水洗トイレ、災害時は自立型トイレとして使える仕組みを日本中・世界中へ広げます。' },
    { name: '環境微生物研究所株式会社', role: '代表取締役社長　馬場 保徳', image: '/images/team/environmental-microbiology.jpg', message: '微生物の力を活かし、平時は電力を生み、災害時には防災拠点になる仕組みを目指します。' },
    { name: '株式会社チャレナジー', role: '代表取締役CEO　清水 敦史', image: '/images/team/challenergy.jpg', message: '環境を選ばず発電できる風車を通じて、災害時の電力活用モデルを実証します。' },
    { name: '株式会社テラ・ラボ', role: '営業戦略部　新本 圭一', image: '/images/team/terra-labo.jpg', message: '長距離無人飛行と地理情報データを活用し、災害時にもすぐに使える広域の状況把握を実現します。' },
    { name: '株式会社Ridge-i', role: '代表取締役社長　柳原 尚史', image: '/images/team/ridge-i.jpg', message: '衛星データとAI解析を組み合わせ、災害や土砂崩れなどの状況を早く正確に可視化します。' },
    { name: '株式会社Liberaware', role: '代表取締役CEO　閔 弘圭', image: '/images/team/liberaware.jpg', message: '人が入りにくい現場を小型ドローンで調査し、見えないインフラリスクを可視化します。' },
  ] },
  { title: 'アカデミアチーム', members: [
    { name: '東京大学 学生チーム In-Spector', role: '李 在原、竹田 悠哉、富田 凜太郎、高橋 淳一郎', image: '/images/team/in-spector.jpeg', message: '衛星のリアルタイム画像処理で森林火災の発生を予測し、自然災害の予防に貢献します。' },
  ] },
];
