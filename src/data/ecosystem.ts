import { products } from './solutions';

export type EcosystemCompany = {
  name: string;
  role: string;
  image: string;
  website?: string;
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
  { name: '株式会社人機一体', role: '関連ベンチャー', image: '/images/news/noimg.jpg', productSlugs: [] },
  { name: '株式会社Liberaware', role: '参画ベンチャー', image: '/images/news/liberaware.jpeg', website: 'https://liberaware.co.jp/', productSlugs: [] },
  { name: '株式会社テラ・ラボ', role: '参画ベンチャー', image: '/images/news/terra-labo.jpeg', website: 'https://terra-labo.jp/', productSlugs: [] },
  { name: '株式会社ナチュラニクス', role: '関連ベンチャー', image: '/images/news/noimg.jpg', productSlugs: [] },
  { name: '株式会社Sydecas', role: '関連ベンチャー', image: '/images/news/noimg.jpg', productSlugs: [] },
  { name: '株式会社Aster', role: '関連ベンチャー', image: '/images/news/noimg.jpg', productSlugs: [] },
  { name: '環境微生物研究所株式会社', role: '参画ベンチャー', image: '/images/team/environmental-microbiology.jpg', productSlugs: [] },
  { name: '株式会社vitom', role: '関連ベンチャー', image: '/images/news/noimg.jpg', productSlugs: [] },
];

export function ecosystemProducts(slugs: string[]) {
  return slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);
}
