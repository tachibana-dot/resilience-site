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

// The cards are derived from the solution catalogue so a product is not
// duplicated in a second content source. Add or update companies through the
// solution data and this list only controls the ecosystem grouping.
export const ecosystemCompanies: EcosystemCompany[] = [
  { name: '株式会社Planetary Wellness', role: 'ソリューション提供企業', image: '/images/products/planetarywellness.jpeg', website: 'https://planetarywellness.jp', productSlugs: ['planetarywellness'] },
  { name: '株式会社ＡＣＳＬ', role: 'ソリューション提供企業', image: '/images/products/pf4.png', website: 'https://product.acsl.co.jp/', productSlugs: ['pf4', 'soten', 'airtruck'] },
  { name: '株式会社天地人', role: 'ソリューション提供企業', image: '/images/products/tenchijin.jpg', website: 'https://tenchijin.co.jp/', productSlugs: ['tenchijin'] },
  { name: '株式会社チャレナジー', role: 'ソリューション提供企業', image: '/images/products/challenergy.jpg', website: 'https://challenergy.com/', productSlugs: ['challenergy'] },
  { name: '株式会社e6s（えしっくす）', role: 'ソリューション提供企業', image: '/images/products/e6s.png', website: 'https://e6s.co.jp/', productSlugs: ['e6s'] },
  { name: 'NT技研工業株式会社', role: 'ソリューション提供企業', image: '/images/products/ntgiken.jpg', website: 'http://ntgiken.industries/', productSlugs: ['ntgiken'] },
  { name: '株式会社白獅子', role: 'ソリューション提供企業', image: '/images/products/snowlion.jpg', website: 'https://www.snowlion.co.jp/', productSlugs: ['snowlion'] },
  { name: '株式会社人機一体', role: '関連ベンチャー', image: '/images/ventures/jinki-ittai-tech.webp', description: '人型重機やロボットの遠隔操作技術で、鉄道・建設・災害対応などの重作業を支えます。', ventureUrl: 'https://ventures.lne.st/ventures/jinki-ittai/', productSlugs: [] },
  { name: '株式会社Liberaware', role: '参画ベンチャー', image: '/images/news/liberaware.jpeg', website: 'https://liberaware.co.jp/', productSlugs: [] },
  { name: '株式会社テラ・ラボ', role: '参画ベンチャー', image: '/images/news/terra-labo.jpeg', website: 'https://terra-labo.jp/', productSlugs: [] },
  { name: '株式会社ナチュラニクス', role: '関連ベンチャー', image: '/images/ventures/naturenix-tech.webp', description: '3分充電・長寿命電池を基盤に、モビリティや災害対応型ポータブル蓄電池を展開します。', ventureUrl: 'https://ventures.lne.st/ventures/naturenix/', productSlugs: [] },
  { name: '株式会社Aster', role: '関連ベンチャー', image: '/images/ventures/aster-tech.webp', description: '塗布型の耐震補強材Aster Power Coatingで、既存の壁やブロック塀の防災性能を高めます。', ventureUrl: 'https://ventures.lne.st/ventures/aster/', productSlugs: [] },
  { name: '環境微生物研究所株式会社', role: '参画ベンチャー', image: '/images/ventures/environmental-microorganism-institute-tech.webp', description: '微生物の力で廃棄野菜などを分解し、メタンガス・電気・液体肥料を生み出す循環技術に取り組みます。', ventureUrl: 'https://ventures.lne.st/ventures/environmental-microorganism-institute/', productSlugs: [] },
];

export function ecosystemProducts(slugs: string[]) {
  return slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);
}
