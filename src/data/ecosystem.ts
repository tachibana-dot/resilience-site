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
  { name: 'エコフロント株式会社', role: 'ソリューション提供企業', image: '/images/products/ecofront.jpg', website: 'https://info.gbiz.go.jp/hojin/ichiran?hojinBango=4070001028220', productSlugs: ['ecofront'] },
  { name: '株式会社Planetary Wellness', role: 'ソリューション提供企業', image: '/images/products/planetarywellness.jpeg', website: 'https://planetarywellness.jp', productSlugs: ['planetarywellness'] },
  { name: '株式会社ＡＣＳＬ', role: 'ソリューション提供企業', image: '/images/products/pf4.png', website: 'https://product.acsl.co.jp/', productSlugs: ['pf4', 'soten', 'airtruck'] },
  { name: '株式会社天地人', role: 'ソリューション提供企業', image: '/images/products/tenchijin.jpg', website: 'https://tenchijin.co.jp/', productSlugs: ['tenchijin'] },
  { name: '株式会社チャレナジー', role: 'ソリューション提供企業', image: '/images/products/challenergy.jpg', website: 'https://challenergy.com/', productSlugs: ['challenergy'] },
  { name: '株式会社e6s（えしっくす）', role: 'ソリューション提供企業', image: '/images/products/e6s.png', website: 'https://e6s.co.jp/', productSlugs: ['e6s'] },
  { name: 'NT技研工業株式会社', role: 'ソリューション提供企業', image: '/images/products/ntgiken.jpg', website: 'http://ntgiken.industries/', productSlugs: ['ntgiken'] },
  { name: '株式会社白獅子', role: 'ソリューション提供企業', image: '/images/products/snowlion.jpg', website: 'https://www.snowlion.co.jp/', productSlugs: ['snowlion'] },
];

export function ecosystemProducts(slugs: string[]) {
  return slugs.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean);
}
