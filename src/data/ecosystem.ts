import { products } from './solutions';

export type EcosystemCompany = {
  name: string;
  role: string;
  image: string;
  description?: string;
  website?: string;
  ventureUrl?: string;
  productSlugs: string[];
};

const roleOrder: Record<string, number> = {
  '参画ベンチャー': 1,
  'ソリューション提供企業': 2,
  '関連ベンチャー': 3,
};

// The cards are derived from the solution catalogue so a product is not
// duplicated in a second content source. Add or update companies through the
// solution data and this list only controls the ecosystem grouping.
export const ecosystemCompanies: EcosystemCompany[] = [
  { name: '株式会社人機一体', role: '関連ベンチャー', image: '/images/ventures/jinki-ittai-tech.webp', description: '人型重機やロボットの遠隔操作技術で、鉄道・建設・災害対応などの重作業を支えます。', ventureUrl: 'https://ventures.lne.st/ventures/jinki-ittai/', productSlugs: [] },
  { name: '株式会社Liberaware', role: '参画ベンチャー', image: '/images/news/liberaware.jpeg', description: '狭く、暗く、危険な空間を小型ドローンで点検し、災害時や平時のインフラ維持管理を安全・省力化します。', website: 'https://liberaware.co.jp/', productSlugs: [] },
  { name: 'WOTA株式会社', role: '参画ベンチャー', image: '/images/ventures/wota.png', description: '小規模分散型の水循環システムで、災害時の入浴・手洗いなど生活用水と衛生環境を支えます。', website: 'https://wota.co.jp/', productSlugs: [] },
  { name: '株式会社サグリ', role: '関連ベンチャー', image: '/images/ventures/sagri-disaster-map.png', description: '衛星画像解析とAI・地理空間データを活用し、災害時の被害や支援情報を地図上で可視化します。', ventureUrl: 'https://ventures.lne.st/ventures/sagri/', productSlugs: [] },
  { name: '株式会社テラ・ラボ', role: '参画ベンチャー', image: '/images/news/terra-labo.jpeg', description: '固定翼無人航空機による広域センシングで、災害時の状況把握や復旧・復興に必要な情報収集を支えます。', website: 'https://terra-labo.jp/', productSlugs: [] },
  { name: '株式会社Planetary Wellness', role: 'ソリューション提供企業', image: '/images/products/planetarywellness.jpeg', description: '心身状態の予測と地域の居場所づくりを組み合わせ、孤独・孤立のない社会を目指します。', website: 'https://planetarywellness.jp', productSlugs: ['planetarywellness'] },
  { name: '株式会社ＡＣＳＬ', role: '参画ベンチャー', image: '/images/products/pf4.png', description: '国産ドローンで災害現場の被害調査や、孤立地域への救援物資輸送を支えます。', website: 'https://product.acsl.co.jp/', productSlugs: ['pf4', 'soten', 'airtruck'] },
  { name: '株式会社天地人', role: 'ソリューション提供企業', image: '/images/products/tenchijin.jpg', description: '衛星データで水道管の漏水リスクを可視化し、持続可能な水インフラの維持管理を支援します。', website: 'https://tenchijin.co.jp/', productSlugs: ['tenchijin'] },
  { name: '株式会社チャレナジー', role: '参画ベンチャー', image: '/images/products/challenergy.jpg', description: '強風や乱流の中でも発電できる小型風力発電で、災害時の電力確保に取り組みます。', website: 'https://challenergy.com/', productSlugs: ['challenergy'] },
  { name: '株式会社e6s（えしっくす）', role: '参画ベンチャー', image: '/images/products/e6s.png', description: '電気・水道などのインフラが止まっても使える、水洗トイレの循環システムを開発しています。', website: 'https://e6s.co.jp/', productSlugs: ['e6s'] },
  { name: 'NT技研工業株式会社', role: 'ソリューション提供企業', image: '/images/products/ntgiken.jpg', description: '発電と給湯を同時に行う集光太陽光システムで、地域の分散型エネルギーを支えます。', website: 'http://ntgiken.industries/', productSlugs: ['ntgiken'] },
  { name: '株式会社白獅子', role: 'ソリューション提供企業', image: '/images/products/snowlion.jpg', description: '災害体験や医療教育をVRで再現し、いざという時に備える学習・訓練を支援します。', website: 'https://www.snowlion.co.jp/', productSlugs: ['snowlion'] },
  { name: '株式会社ナチュラニクス', role: '関連ベンチャー', image: '/images/ventures/naturenix-tech.webp', description: '3分充電・長寿命電池を基盤に、モビリティや災害対応型ポータブル蓄電池を展開します。', ventureUrl: 'https://ventures.lne.st/ventures/naturenix/', productSlugs: [] },
  { name: '株式会社Aster', role: '関連ベンチャー', image: '/images/ventures/aster-tech.webp', description: '塗布型の耐震補強材Aster Power Coatingで、既存の壁やブロック塀の防災性能を高めます。', ventureUrl: 'https://ventures.lne.st/ventures/aster/', productSlugs: [] },
  { name: '環境微生物研究所株式会社', role: '参画ベンチャー', image: '/images/ventures/environmental-microorganism-photo.png', description: '微生物の力で廃棄野菜などを分解し、メタンガス・電気・液体肥料を生み出す循環技術に取り組みます。', ventureUrl: 'https://ventures.lne.st/ventures/environmental-microorganism-institute/', productSlugs: [] },
  { name: '株式会社Ridge-i', role: '参画ベンチャー', image: '/images/ventures/ridge-i.webp', description: '衛星画像解析やAIを活用し、土砂災害などの環境・防災課題を把握する技術を提供します。', website: 'https://ridge-i.com/', productSlugs: [] },
].sort((a, b) => (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99));

export function ecosystemProducts(slugs: string[]) {
  return slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);
}
