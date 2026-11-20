export type Product = {
  slug: string;
  title: string;
  company: string;
  image: string;
  summary: string;
  categories: string[];
};

export const products: Product[] = [
  { slug: 'ecofront', title: '電力需要変動型無停電化システム', company: 'エコフロント株式会社', image: '/images/products/ecofront.jpg', summary: '電力機器をIoT化せずに識別・制御し、平時の節電と非常時の電力利用を支えるシステム。', categories: ['solution1', 'solution3'] },
  { slug: 'planetarywellness', title: '孤独ゼロ社会を目指して－ペカン1,000年の恵みと共に－', company: '株式会社Planetary Wellness', image: '/images/products/planetarywellness.jpeg', summary: '心身状態の予測と地域の居場所づくりを組み合わせ、社会的孤立・孤独の解決を目指す取り組み。', categories: ['solution1', 'solution5', 'solution6'] },
  { slug: 'pf4', title: 'マルチユースドローン「PF4」による地すべり、道路崩落被害調査', company: '株式会社ＡＣＳＬ', image: '/images/products/pf4.png', summary: '物流・空撮・測量に対応するドローンを活用し、地すべりや道路崩落の被害調査を効率化。', categories: ['solution1', 'solution4'] },
  { slug: 'soten', title: '小型空撮ドローン（SOTEN）による震災被害調査', company: '株式会社ＡＣＳＬ', image: '/images/products/soten.png', summary: 'セキュリティ対策を施した国産小型ドローンで、孤立集落や港湾などの被害状況を調査。', categories: ['solution1', 'solution2', 'solution4'] },
  { slug: 'airtruck', title: '物流専用ドローン（AirTruck）による災害時物流', company: '株式会社ＡＣＳＬ', image: '/images/products/airtruck.jpg', summary: '救援物資や医薬品を目視外飛行で届け、災害時のラストワンマイル物流を支えるドローン。', categories: ['solution1', 'solution4'] },
  { slug: 'tenchijin', title: '水道DXサービス／天地人コンパス 宇宙水道局', company: '株式会社天地人', image: '/images/products/tenchijin.jpg', summary: '衛星データを活用し、漏水リスクを可視化して水道管の調査箇所選定を支援するサービス。', categories: ['solution1', 'solution3'] },
  { slug: 'challenergy', title: '防災にも資する小型風力発電機', company: '株式会社チャレナジー', image: '/images/products/challenergy.jpg', summary: '強風や乱流下でも発電できる、災害時の再生可能エネルギー供給を目指す小型風力発電機。', categories: ['solution3'] },
  { slug: 'e6s', title: 'インフラに依存しないトイレ洗浄水循環システム e6s', company: '株式会社e6s（えしっくす）', image: '/images/products/e6s.png', summary: '洗浄水の再生と廃棄物の減容を同時に実現する、持続可能な水洗トイレシステム。', categories: ['solution3'] },
  { slug: 'ntgiken', title: 'コンパクトタワー型集光太陽光システム', company: 'NT技研工業株式会社', image: '/images/products/ntgiken.jpg', summary: '省設置面積で発電・給湯を行い、海水淡水化や紫外線殺菌にも活用できる熱電併給システム。', categories: ['solution3'] },
  { slug: 'snowlion', title: '災害体験・医療実習VRソリューション', company: '株式会社白獅子', image: '/images/products/snowlion.jpg', summary: '災害体験や医療教育に活用できる、専門家監修のリアルなVR体験ソリューション。', categories: ['solution6'] },
];

export const solutionCategories = [
  { slug: 'solution1', title: '災害マネジメント', image: 'disaster.png' },
  { slug: 'solution2', title: '建築', image: 'architecture.png' },
  { slug: 'solution3', title: '電気、ガス、水道', image: 'utilities.png' },
  { slug: 'solution4', title: '交通、輸送', image: 'transport.png' },
  { slug: 'solution5', title: 'コミュニティ', image: 'community.png' },
  { slug: 'solution6', title: 'ヘルスケア・医療', image: 'healthcare.png' },
];

export function getCategory(slug: string) {
  return solutionCategories.find((category) => category.slug === slug);
}

export function getProductsForCategory(slug: string) {
  return products.filter((product) => product.categories.includes(slug));
}
