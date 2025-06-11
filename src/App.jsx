import { useState } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Sparkles, Star, Zap, Target } from 'lucide-react';

export default function StockFortuneTeller() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(null);

  const stockData = {
    // 대형 기술주
    'AAPL': { name: 'Apple Inc.', price: 185.42 },
    'GOOGL': { name: 'Alphabet Inc.', price: 138.25 },
    'MSFT': { name: 'Microsoft Corp.', price: 378.85 },
    'TSLA': { name: 'Tesla Inc.', price: 248.73 },
    'AMZN': { name: 'Amazon.com Inc.', price: 145.86 },
    'NVDA': { name: 'NVIDIA Corp.', price: 875.28 },
    'META': { name: 'Meta Platforms Inc.', price: 298.45 },
    'NFLX': { name: 'Netflix Inc.', price: 421.33 },
    'AMD': { name: 'Advanced Micro Devices', price: 138.92 },
    'ORCL': { name: 'Oracle Corp.', price: 115.67 },
    
    // 추가 기술주
    'CRM': { name: 'Salesforce Inc.', price: 215.32 },
    'ADBE': { name: 'Adobe Inc.', price: 492.85 },
    'INTC': { name: 'Intel Corp.', price: 34.21 },
    'IBM': { name: 'IBM Corp.', price: 142.67 },
    'CSCO': { name: 'Cisco Systems', price: 51.28 },
    'QCOM': { name: 'Qualcomm Inc.', price: 157.93 },
    'AVGO': { name: 'Broadcom Inc.', price: 892.45 },
    'TXN': { name: 'Texas Instruments', price: 187.34 },
    'MU': { name: 'Micron Technology', price: 89.76 },
    'AMAT': { name: 'Applied Materials', price: 168.52 },
    
    // 금융주
    'JPM': { name: 'JPMorgan Chase', price: 189.45 },
    'BAC': { name: 'Bank of America', price: 38.92 },
    'WFC': { name: 'Wells Fargo', price: 52.14 },
    'GS': { name: 'Goldman Sachs', price: 378.67 },
    'MS': { name: 'Morgan Stanley', price: 94.23 },
    'C': { name: 'Citigroup Inc.', price: 61.87 },
    'AXP': { name: 'American Express', price: 189.34 },
    'BLK': { name: 'BlackRock Inc.', price: 745.28 },
    'SCHW': { name: 'Charles Schwab', price: 67.89 },
    'COF': { name: 'Capital One', price: 142.56 },
    
    // 헬스케어
    'JNJ': { name: 'Johnson & Johnson', price: 167.23 },
    'PFE': { name: 'Pfizer Inc.', price: 28.94 },
    'ABBV': { name: 'AbbVie Inc.', price: 174.56 },
    'MRK': { name: 'Merck & Co.', price: 112.45 },
    'UNH': { name: 'UnitedHealth Group', price: 512.78 },
    'TMO': { name: 'Thermo Fisher', price: 534.12 },
    'ABT': { name: 'Abbott Laboratories', price: 108.67 },
    'DHR': { name: 'Danaher Corp.', price: 245.89 },
    'BMY': { name: 'Bristol-Myers Squibb', price: 56.34 },
    'AMGN': { name: 'Amgen Inc.', price: 289.45 },
    
    // 소비재
    'PG': { name: 'Procter & Gamble', price: 156.78 },
    'KO': { name: 'Coca-Cola Co.', price: 62.45 },
    'PEP': { name: 'PepsiCo Inc.', price: 178.92 },
    'WMT': { name: 'Walmart Inc.', price: 158.34 },
    'HD': { name: 'Home Depot', price: 342.67 },
    'MCD': { name: 'McDonald\'s Corp.', price: 289.45 },
    'COST': { name: 'Costco Wholesale', price: 678.92 },
    'NKE': { name: 'Nike Inc.', price: 98.76 },
    'SBUX': { name: 'Starbucks Corp.', price: 94.23 },
    'TGT': { name: 'Target Corp.', price: 142.89 },
    
    // 에너지
    'XOM': { name: 'Exxon Mobil', price: 108.45 },
    'CVX': { name: 'Chevron Corp.', price: 152.67 },
    'COP': { name: 'ConocoPhillips', price: 112.34 },
    'SLB': { name: 'Schlumberger', price: 45.78 },
    'EOG': { name: 'EOG Resources', price: 121.56 },
    'MPC': { name: 'Marathon Petroleum', price: 147.23 },
    'PSX': { name: 'Phillips 66', price: 134.56 },
    'VLO': { name: 'Valero Energy', price: 128.89 },
    'OXY': { name: 'Occidental Petroleum', price: 58.34 },
    'HAL': { name: 'Halliburton Co.', price: 34.67 },
    
    // 통신
    'VZ': { name: 'Verizon Communications', price: 41.23 },
    'T': { name: 'AT&T Inc.', price: 19.78 },
    'TMUS': { name: 'T-Mobile US', price: 164.56 },
    'CMCSA': { name: 'Comcast Corp.', price: 42.89 },
    'DIS': { name: 'Walt Disney Co.', price: 98.45 },
    'NWSA': { name: 'News Corp.', price: 25.34 },
    'FOXA': { name: 'Fox Corp.', price: 34.67 },
    'PARA': { name: 'Paramount Global', price: 12.45 },
    'WBD': { name: 'Warner Bros. Discovery', price: 8.92 },
    'ROKU': { name: 'Roku Inc.', price: 62.78 },
    
    // 산업재
    'BA': { name: 'Boeing Co.', price: 198.45 },
    'CAT': { name: 'Caterpillar Inc.', price: 287.92 },
    'GE': { name: 'General Electric', price: 112.34 },
    'MMM': { name: '3M Co.', price: 89.67 },
    'HON': { name: 'Honeywell International', price: 201.45 },
    'LMT': { name: 'Lockheed Martin', price: 432.78 },
    'RTX': { name: 'Raytheon Technologies', price: 89.23 },
    'UPS': { name: 'United Parcel Service', price: 142.56 },
    'FDX': { name: 'FedEx Corp.', price: 234.67 },
    'DE': { name: 'Deere & Co.', price: 378.92 },
    
    // 부동산
    'AMT': { name: 'American Tower', price: 189.45 },
    'PLD': { name: 'Prologis Inc.', price: 124.78 },
    'CCI': { name: 'Crown Castle', price: 92.34 },
    'EQIX': { name: 'Equinix Inc.', price: 745.67 },
    'SPG': { name: 'Simon Property Group', price: 145.23 },
    'O': { name: 'Realty Income', price: 56.89 },
    'WELL': { name: 'Welltower Inc.', price: 89.45 },
    'EXR': { name: 'Extended Stay America', price: 178.92 },
    'PSA': { name: 'Public Storage', price: 298.45 },
    'VTR': { name: 'Ventas Inc.', price: 45.67 },
    
    // 유틸리티
    'NEE': { name: 'NextEra Energy', price: 78.45 },
    'DUK': { name: 'Duke Energy', price: 98.76 },
    'SO': { name: 'Southern Co.', price: 67.89 },
    'D': { name: 'Dominion Energy', price: 52.34 },
    'EXC': { name: 'Exelon Corp.', price: 38.92 },
    'AEP': { name: 'American Electric Power', price: 89.45 },
    'SRE': { name: 'Sempra Energy', price: 134.67 },
    'XEL': { name: 'Xcel Energy', price: 56.78 },
    'PPL': { name: 'PPL Corp.', price: 28.45 },
    'ES': { name: 'Eversource Energy', price: 62.34 },
    
    // 소재
    'LIN': { name: 'Linde plc', price: 412.78 },
    'APD': { name: 'Air Products', price: 289.45 },
    'SHW': { name: 'Sherwin-Williams', price: 324.67 },
    'FCX': { name: 'Freeport-McMoRan', price: 42.89 },
    'NEM': { name: 'Newmont Corp.', price: 38.45 },
    'DOW': { name: 'Dow Inc.', price: 54.78 },
    'DD': { name: 'DuPont de Nemours', price: 78.92 },
    'ECL': { name: 'Ecolab Inc.', price: 189.34 },
    'PPG': { name: 'PPG Industries', price: 134.56 },
    'CF': { name: 'CF Industries', price: 89.67 },
    
    // 추가 기술주 및 성장주
    'SHOP': { name: 'Shopify Inc.', price: 67.89 },
    'SQ': { name: 'Block Inc.', price: 78.45 },
    'PYPL': { name: 'PayPal Holdings', price: 58.92 },
    'UBER': { name: 'Uber Technologies', price: 62.34 },
    'LYFT': { name: 'Lyft Inc.', price: 12.78 },
    'SNAP': { name: 'Snap Inc.', price: 10.45 },
    'TWTR': { name: 'Twitter Inc.', price: 54.32 },
    'PINS': { name: 'Pinterest Inc.', price: 29.67 },
    'SPOT': { name: 'Spotify Technology', price: 134.89 },
    'ZM': { name: 'Zoom Video', price: 67.23 },
    
    // 바이오텍
    'GILD': { name: 'Gilead Sciences', price: 78.45 },
    'BIIB': { name: 'Biogen Inc.', price: 245.67 },
    'REGN': { name: 'Regeneron Pharmaceuticals', price: 789.23 },
    'VRTX': { name: 'Vertex Pharmaceuticals', price: 412.56 },
    'ILMN': { name: 'Illumina Inc.', price: 178.92 },
    'MRNA': { name: 'Moderna Inc.', price: 89.45 },
    'BNTX': { name: 'BioNTech SE', price: 98.78 },
    'IQV': { name: 'IQVIA Holdings', price: 234.56 },
    'ISRG': { name: 'Intuitive Surgical', price: 367.89 },
    'DXCM': { name: 'DexCom Inc.', price: 89.34 },
    
    // 반도체
    'TSM': { name: 'Taiwan Semiconductor', price: 98.45 },
    'ASML': { name: 'ASML Holding', price: 712.34 },
    'MRVL': { name: 'Marvell Technology', price: 67.89 },
    'LRCX': { name: 'Lam Research', price: 789.45 },
    'KLAC': { name: 'KLA Corp.', price: 456.78 },
    'MCHP': { name: 'Microchip Technology', price: 89.23 },
    'ADI': { name: 'Analog Devices', price: 189.45 },
    'NXPI': { name: 'NXP Semiconductors', price: 234.67 },
    'SWKS': { name: 'Skyworks Solutions', price: 98.78 },
    'QRVO': { name: 'Qorvo Inc.', price: 112.45 },
    
    // 클라우드 및 소프트웨어
    'NOW': { name: 'ServiceNow Inc.', price: 567.89 },
    'SNOW': { name: 'Snowflake Inc.', price: 156.78 },
    'PLTR': { name: 'Palantir Technologies', price: 18.45 },
    'CRWD': { name: 'CrowdStrike Holdings', price: 189.67 },
    'ZS': { name: 'Zscaler Inc.', price: 178.92 },
    'OKTA': { name: 'Okta Inc.', price: 89.45 },
    'DDOG': { name: 'Datadog Inc.', price: 98.34 },
    'SPLK': { name: 'Splunk Inc.', price: 134.56 },
    'WDAY': { name: 'Workday Inc.', price: 234.78 },
    'VEEV': { name: 'Veeva Systems', price: 189.23 },
    
    // 전기차 및 자동차
    'F': { name: 'Ford Motor Co.', price: 12.45 },
    'GM': { name: 'General Motors', price: 34.67 },
    'RIVN': { name: 'Rivian Automotive', price: 18.92 },
    'LCID': { name: 'Lucid Group', price: 6.78 },
    'NIO': { name: 'NIO Inc.', price: 8.45 },
    'XPEV': { name: 'XPeng Inc.', price: 12.34 },
    'LI': { name: 'Li Auto Inc.', price: 23.56 },
    'GOEV': { name: 'Canoo Inc.', price: 1.23 },
    'RIDE': { name: 'Lordstown Motors', price: 0.89 },
    'HYLN': { name: 'Hyliion Holdings', price: 2.34 },
    
    // 항공 및 여행
    'AAL': { name: 'American Airlines', price: 14.56 },
    'DAL': { name: 'Delta Air Lines', price: 42.78 },
    'UAL': { name: 'United Airlines', price: 45.92 },
    'LUV': { name: 'Southwest Airlines', price: 32.45 },
    'JETS': { name: 'U.S. Global Jets ETF', price: 24.67 },
    'CCL': { name: 'Carnival Corp.', price: 16.89 },
    'RCL': { name: 'Royal Caribbean', price: 89.45 },
    'NCLH': { name: 'Norwegian Cruise Line', price: 18.92 },
    'MAR': { name: 'Marriott International', price: 178.45 },
    'HLT': { name: 'Hilton Worldwide', price: 134.67 },
    
    // 소매 및 이커머스
    'EBAY': { name: 'eBay Inc.', price: 45.78 },
    'ETSY': { name: 'Etsy Inc.', price: 89.45 },
    'W': { name: 'Wayfair Inc.', price: 56.34 },
    'CHWY': { name: 'Chewy Inc.', price: 34.67 },
    'BABA': { name: 'Alibaba Group', price: 89.45 },
    'JD': { name: 'JD.com Inc.', price: 34.78 },
    'PDD': { name: 'PDD Holdings', price: 123.45 },
    'MELI': { name: 'MercadoLibre', price: 1234.56 },
    'SE': { name: 'Sea Limited', price: 67.89 },
    'GRAB': { name: 'Grab Holdings', price: 3.45 },
    
    // 게임 및 엔터테인먼트
    'EA': { name: 'Electronic Arts', price: 128.45 },
    'ATVI': { name: 'Activision Blizzard', price: 92.34 },
    'TTWO': { name: 'Take-Two Interactive', price: 145.67 },
    'RBLX': { name: 'Roblox Corp.', price: 34.89 },
    'ZNGA': { name: 'Zynga Inc.', price: 9.23 },
    'SONY': { name: 'Sony Group Corp.', price: 89.45 },
    'NTDOY': { name: 'Nintendo Co.', price: 67.78 },
    'U': { name: 'Unity Software', price: 34.56 },
    'DKNG': { name: 'DraftKings Inc.', price: 18.92 },
    'PENN': { name: 'Penn Entertainment', price: 23.45 },
    
    // 식품 및 음료
    'MDLZ': { name: 'Mondelez International', price: 67.89 },
    'GIS': { name: 'General Mills', price: 78.92 },
    'K': { name: 'Kellogg Co.', price: 56.78 },
    'HSY': { name: 'Hershey Co.', price: 234.56 },
    'CAG': { name: 'Conagra Brands', price: 34.67 },
    'CPB': { name: 'Campbell Soup', price: 45.78 },
    'KHC': { name: 'Kraft Heinz', price: 38.92 },
    'TSN': { name: 'Tyson Foods', price: 67.45 },
    'HRL': { name: 'Hormel Foods', price: 45.23 },
    'SJM': { name: 'J.M. Smucker', price: 134.56 },
    
    // 의류 및 럭셔리
    'LULU': { name: 'Lululemon Athletica', price: 367.89 },
    'UAA': { name: 'Under Armour', price: 8.45 },
    'UA': { name: 'Under Armour Class C', price: 7.92 },
    'VFC': { name: 'VF Corp.', price: 23.45 },
    'PVH': { name: 'PVH Corp.', price: 78.92 },
    'RL': { name: 'Ralph Lauren', price: 123.45 },
    'CPRI': { name: 'Capri Holdings', price: 45.67 },
    'TPG': { name: 'TPG Inc.', price: 34.89 },
    'KSS': { name: 'Kohl\'s Corp.', price: 23.67 },
    'M': { name: 'Macy\'s Inc.', price: 18.92 },
    
    // 미디어 및 광고
    'GOOGL': { name: 'Alphabet Class A', price: 138.25 },
    'GOOG': { name: 'Alphabet Class C', price: 139.45 },
    'IPG': { name: 'Interpublic Group', price: 32.45 },
    'OMC': { name: 'Omnicom Group', price: 78.92 },
    'NWSA': { name: 'News Corp Class A', price: 25.34 },
    'NWS': { name: 'News Corp Class B', price: 24.78 },
    'VIAC': { name: 'Paramount Global', price: 12.89 },
    'DISH': { name: 'DISH Network', price: 6.78 },
    'SIRI': { name: 'Sirius XM Holdings', price: 4.23 },
    'LSXMA': { name: 'Liberty SiriusXM', price: 23.45 },
    
    // 보험
    'BRK-A': { name: 'Berkshire Hathaway A', price: 523456.78 },
    'BRK-B': { name: 'Berkshire Hathaway B', price: 348.92 },
    'PGR': { name: 'Progressive Corp.', price: 178.45 },
    'TRV': { name: 'Travelers Companies', price: 189.67 },
    'ALL': { name: 'Allstate Corp.', price: 134.56 },
    'CB': { name: 'Chubb Ltd.', price: 223.45 },
    'AIG': { name: 'American International Group', price: 67.89 },
    'MET': { name: 'MetLife Inc.', price: 67.23 },
    'PRU': { name: 'Prudential Financial', price: 112.45 },
    'AFL': { name: 'Aflac Inc.', price: 78.92 },
    
    // 기타 금융 서비스
    'V': { name: 'Visa Inc.', price: 245.67 },
    'MA': { name: 'Mastercard Inc.', price: 389.45 },
    'PYPL': { name: 'PayPal Holdings', price: 58.92 },
    'FIS': { name: 'Fidelity National Information Services', price: 89.45 },
    'FISV': { name: 'Fiserv Inc.', price: 134.67 },
    'SYF': { name: 'Synchrony Financial', price: 34.78 },
    'DFS': { name: 'Discover Financial Services', price: 112.34 },
    'AXP': { name: 'American Express', price: 189.34 },
    'TROW': { name: 'T. Rowe Price', price: 134.56 },
    'BEN': { name: 'Franklin Resources', price: 23.45 },
    
    // 광업 및 금속
    'GOLD': { name: 'Barrick Gold', price: 18.45 },
    'AEM': { name: 'Agnico Eagle Mines', price: 56.78 },
    'KGC': { name: 'Kinross Gold', price: 5.23 },
    'AA': { name: 'Alcoa Corp.', price: 34.67 },
    'X': { name: 'United States Steel', price: 23.45 },
    'CLF': { name: 'Cleveland-Cliffs', price: 18.92 },
    'MT': { name: 'ArcelorMittal', price: 29.45 },
    'VALE': { name: 'Vale S.A.', price: 12.78 },
    'RIO': { name: 'Rio Tinto', price: 67.89 },
    'BHP': { name: 'BHP Group', price: 58.34 },
    
    // 농업 및 화학
    'ADM': { name: 'Archer-Daniels-Midland', price: 78.45 },
    'BG': { name: 'Bunge Ltd.', price: 112.34 },
    'CF': { name: 'CF Industries', price: 89.67 },
    'MOS': { name: 'Mosaic Co.', price: 34.78 },
    'NTR': { name: 'Nutrien Ltd.', price: 67.89 },
    'FMC': { name: 'FMC Corp.', price: 89.45 },
    'CTVA': { name: 'Corteva Inc.', price: 56.78 },
    'LYB': { name: 'LyondellBasell', price: 89.34 },
    'EMN': { name: 'Eastman Chemical', price: 78.92 },
    'IFF': { name: 'International Flavors & Fragrances', price: 89.45 },
    
    // 운송 및 물류
    'UNP': { name: 'Union Pacific', price: 234.56 },
    'CSX': { name: 'CSX Corp.', price: 32.45 },
    'NSC': { name: 'Norfolk Southern', price: 234.67 },
    'KSU': { name: 'Kansas City Southern', price: 289.45 },
    'JBHT': { name: 'J.B. Hunt Transport', price: 178.92 },
    'CHRW': { name: 'C.H. Robinson', price: 89.45 },
    'XPO': { name: 'XPO Logistics', price: 56.78 },
    'ODFL': { name: 'Old Dominion Freight Line', price: 378.92 },
    'SAIA': { name: 'Saia Inc.', price: 234.56 },
    'EXPD': { name: 'Expeditors International', price: 112.34 },
    
    // 건설 및 자재
    'DHI': { name: 'D.R. Horton', price: 134.56 },
    'LEN': { name: 'Lennar Corp.', price: 145.78 },
    'PHM': { name: 'PulteGroup Inc.', price: 78.92 },
    'KBH': { name: 'KB Home', price: 45.67 },
    'TOL': { name: 'Toll Brothers', price: 67.89 },
    'NVR': { name: 'NVR Inc.', price: 6789.45 },
    'MLM': { name: 'Martin Marietta Materials', price: 378.92 },
    'VMC': { name: 'Vulcan Materials', price: 234.56 },
    'EME': { name: 'EMCOR Group', price: 289.45 },
    'PWR': { name: 'Quanta Services', price: 189.34 },
    
    // 한국 주식 (코스피/코스닥)
    '005930': { name: '삼성전자', price: 71500 },
    'SAMSUNG': { name: '삼성전자', price: 71500 },
    '000660': { name: 'SK하이닉스', price: 128000 },
    'SKHYNIX': { name: 'SK하이닉스', price: 128000 },
    '373220': { name: 'LG에너지솔루션', price: 412000 },
    'LGES': { name: 'LG에너지솔루션', price: 412000 },
    '207940': { name: '삼성바이오로직스', price: 789000 },
    'SAMSUNGBIO': { name: '삼성바이오로직스', price: 789000 },
    '005380': { name: '현대차', price: 234000 },
    'HYUNDAI': { name: '현대차', price: 234000 },
    '006400': { name: '삼성SDI', price: 456000 },
    'SAMSUNGSDI': { name: '삼성SDI', price: 456000 },
    '051910': { name: 'LG화학', price: 567000 },
    'LGCHEM': { name: 'LG화학', price: 567000 },
    '005490': { name: 'POSCO홀딩스', price: 412000 },
    'POSCO': { name: 'POSCO홀딩스', price: 412000 },
    '035420': { name: 'NAVER', price: 234000 },
    'NAVER': { name: 'NAVER', price: 234000 },
    '000270': { name: '기아', price: 98000 },
    'KIA': { name: '기아', price: 98000 },
    '068270': { name: '셀트리온', price: 189000 },
    'CELLTRION': { name: '셀트리온', price: 189000 },
    '105560': { name: 'KB금융', price: 67000 },
    'KBFIN': { name: 'KB금융', price: 67000 },
    '055550': { name: '신한지주', price: 45000 },
    'SHINHAN': { name: '신한지주', price: 45000 },
    '003550': { name: 'LG', price: 89000 },
    'LG': { name: 'LG', price: 89000 },
    '096770': { name: 'SK이노베이션', price: 134000 },
    'SKINN': { name: 'SK이노베이션', price: 134000 },
    '017670': { name: 'SK텔레콤', price: 56000 },
    'SKT': { name: 'SK텔레콤', price: 56000 },
    '030200': { name: 'KT', price: 34000 },
    'KT': { name: 'KT', price: 34000 },
    '086790': { name: '하나금융지주', price: 56000 },
    'HANAFIN': { name: '하나금융지주', price: 56000 },
    '323410': { name: '카카오뱅크', price: 23000 },
    'KAKAOBANK': { name: '카카오뱅크', price: 23000 },
    '035720': { name: '카카오', price: 45000 },
    'KAKAO': { name: '카카오', price: 45000 },
    '066570': { name: 'LG전자', price: 123000 },
    'LGELECTRONICS': { name: 'LG전자', price: 123000 },
    '028260': { name: '삼성물산', price: 134000 },
    'SAMSUNGCT': { name: '삼성물산', price: 134000 },
    '009150': { name: '삼성전기', price: 189000 },
    'SAMSUNGEM': { name: '삼성전기', price: 189000 },
    '012330': { name: '현대모비스', price: 234000 },
    'HYUNDAIMOBIS': { name: '현대모비스', price: 234000 }
  };

  const fortuneMessages = [
    {
      direction: 'up',
      message: '🌅 새로운 기회가 다가옵니다! 매수세가 강하게 몰려오고 있으며, 상승의 기운이 가득합니다. 🐉\n\n📈 거래량이 급증하며 긍정적인 신호들이 나타나고 있습니다. 투자자들의 관심이 집중되고 있어 가격 상승이 예상됩니다!\n\n🌟 지금이 좋은 매수 타이밍일 수 있습니다. 하지만 항상 신중한 투자 결정을 내리시기 바랍니다.',
      confidence: '높음',
      icon: '📈',
      advice: '**추천: 분할 매수를 통해 안전하게 접근해보세요!** 💰'
    },
    {
      direction: 'up',
      message: '🌸 봄날처럼 상승의 기운이 넘쳐납니다! 긍정적인 뉴스와 함께 투자 심리가 개선되고 있습니다. 🏰\n\n💎 기술적 지표들이 상승을 가리키고 있으며, 전문가들의 전망도 밝습니다. 시장의 흐름이 우호적으로 변하고 있어요!\n\n🎊 이런 기회는 자주 오지 않습니다. 하지만 무리한 투자는 금물이니 적절한 선에서 매수를 고려해보세요.',
      confidence: '높음',
      icon: '🌸',
      advice: '**추천: 목표가를 설정하고 단계적으로 매수하세요!** 🎯'
    },
    {
      direction: 'down',
      message: '🌊 조정의 파도가 밀려오고 있습니다... 매도 압력이 증가하며 하락 신호가 감지되고 있어요. 🌧️\n\n⚡ 시장 심리가 악화되고 있으며, 거래량도 감소 추세입니다. 당분간은 관망하는 것이 좋겠습니다.\n\n🌙 하지만 이런 조정은 더 좋은 기회를 위한 준비 과정일 수 있습니다. 현금 보유하며 기다리는 지혜가 필요해요.',
      confidence: '보통',
      icon: '📉',
      advice: '**추천: 매수를 보류하고 현금 비중을 늘리세요!** 💸'
    },
    {
      direction: 'up',
      message: '🎯 강력한 상승 신호가 포착되었습니다! 모든 지표가 긍정적인 방향을 가리키고 있어요. 🚩\n\n🦅 기관 투자자들의 매수세가 몰리고 있으며, 외국인 투자자들도 관심을 보이고 있습니다!\n\n🌟 이런 기회는 놓치기 아까운 타이밍입니다. 적극적인 매수를 고려해볼 만한 상황이에요!',
      confidence: '매우 높음',
      icon: '🚀',
      advice: '**추천: 과감한 매수로 기회를 잡으세요!** 💎'
    },
    {
      direction: 'down',
      message: '🍂 하락의 바람이 불어오고 있습니다... 시장 전반적으로 부정적인 흐름이 감지됩니다. 🌧️\n\n⚔️ 매도 물량이 증가하고 있으며, 투자 심리도 위축되고 있어요. 손절매를 고려해야 할 시점입니다.\n\n🌙 하지만 이런 어려운 시기를 견뎌낸 투자자만이 진정한 수익을 얻을 수 있습니다. 인내심을 갖고 기다려보세요.',
      confidence: '높음',
      icon: '📉',
      advice: '**추천: 손실 확정 후 재진입 기회를 노리세요!** ⚠️'
    },
    {
      direction: 'up',
      message: '🐉 대상승의 전조가 나타나고 있습니다! 모든 신들이 축복하는 절호의 기회입니다! 🌈\n\n🎊 거래량 폭증과 함께 상승 모멘텀이 강화되고 있습니다. 투자자들의 열광적인 관심이 집중되고 있어요!\n\n✨ 역사에 남을 만한 투자 기회가 될 수 있습니다. 용기 있는 결단이 필요한 순간이에요!',
      confidence: '매우 높음',
      icon: '👑',
      advice: '**추천: 전 재산을 걸고 대박을 노려보세요!** 🏆'
    }
  ];

  const generatePrediction = () => {
    if (!stockSymbol.trim()) return;
    
    setIsLoading(true);
    
    // 시뮬레이션 딜레이
    setTimeout(() => {
      const upperSymbol = stockSymbol.toUpperCase();
      let stock = stockData[upperSymbol];
      let foundSymbol = upperSymbol;
      
      // 심볼로 찾지 못했으면 회사명으로 검색
      if (!stock) {
        const searchTerm = stockSymbol.toLowerCase();
        
        // 정확한 회사명 매칭
        for (const [symbol, data] of Object.entries(stockData)) {
          if (data.name.toLowerCase().includes(searchTerm) || 
              data.name.toLowerCase() === searchTerm ||
              // 한국어 검색을 위한 추가 매칭
              (searchTerm === '삼성전자' && data.name === '삼성전자') ||
              (searchTerm === '애플' && data.name === 'Apple Inc.') ||
              (searchTerm === '구글' && data.name === 'Alphabet Inc.') ||
              (searchTerm === '마이크로소프트' && data.name === 'Microsoft Corp.') ||
              (searchTerm === '테슬라' && data.name === 'Tesla Inc.') ||
              (searchTerm === '아마존' && data.name === 'Amazon.com Inc.') ||
              (searchTerm === '엔비디아' && data.name === 'NVIDIA Corp.') ||
              (searchTerm === '메타' && data.name === 'Meta Platforms Inc.') ||
              (searchTerm === '넷플릭스' && data.name === 'Netflix Inc.') ||
              (searchTerm === 'sk하이닉스' && data.name === 'SK하이닉스') ||
              (searchTerm === 'lg에너지솔루션' && data.name === 'LG에너지솔루션') ||
              (searchTerm === '네이버' && data.name === 'NAVER') ||
              (searchTerm === '카카오' && data.name === '카카오') ||
              (searchTerm === '현대차' && data.name === '현대차') ||
              (searchTerm === '기아' && data.name === '기아') ||
              (searchTerm === 'lg전자' && data.name === 'LG전자') ||
              (searchTerm === 'lg화학' && data.name === 'LG화학') ||
              (searchTerm === '포스코' && data.name === 'POSCO홀딩스') ||
              (searchTerm === '셀트리온' && data.name === '셀트리온')) {
            stock = data;
            foundSymbol = symbol;
            break;
          }
        }
      }
      
      if (stock) {
        setCurrentPrice(stock.price);
        
        // 다음날 날짜 계산
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toLocaleDateString('ko-KR', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
        
        // 날짜 + 주식명을 기반으로 일관된 점괘 생성
        const today = new Date().toDateString();
        const seedString = today + foundSymbol;
        let hash = 0;
        for (let i = 0; i < seedString.length; i++) {
          const char = seedString.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash; // 32비트로 변환
        }
        
        // 해시값을 기반으로 점괘 선택 (항상 같은 결과)
        const fortuneIndex = Math.abs(hash) % fortuneMessages.length;
        const selectedFortune = fortuneMessages[fortuneIndex];
        
        // 해시값을 기반으로 가격 변동률도 일관되게 생성
        const priceChangeHash = Math.abs(hash * 7919) % 2000; // 0-1999 범위
        const priceChange = ((priceChangeHash / 1000) - 1) * 20; // -20% ~ +20%
        const targetPrice = (stock.price * (1 + priceChange / 100)).toFixed(2);
        
        // 해시값을 기반으로 예측 기간도 일관되게 생성
        const timeframeHash = Math.abs(hash * 31) % 30 + 1; // 1-30일
        
        setPrediction({
          ...selectedFortune,
          targetPrice: parseFloat(targetPrice),
          priceChange: priceChange.toFixed(2),
          timeframe: `${timeframeHash}일 후`,
          stockName: stock.name,
          tomorrowDate: tomorrowStr
        });
      } else {
        setPrediction({
          direction: 'unknown',
          message: '죄송합니다. 현재 등록되지 않은 주식입니다.\n\n새로운 종목 등록을 원하시면 이메일로 연락주세요.\n\n빠른 시일 내에 추가하겠습니다.',
          confidence: '낮음',
          icon: '📧',
          targetPrice: null,
          priceChange: 0,
          timeframe: '',
          stockName: '등록되지 않은 종목',
          advice: '**이메일: sitemaker_@naver.com** 💌'
        });
        setCurrentPrice(null);
      }
      
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = () => {
    generatePrediction();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="relative">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-400 animate-pulse" size={24} />
              📈 AI 주식 점쟁이
              <Sparkles className="text-yellow-400 animate-pulse" size={24} />
            </h1>
            <div className="absolute -top-1 -right-1 animate-bounce">
              <Star className="text-yellow-300" size={16} />
            </div>
            <div className="absolute -top-2 -left-2 animate-bounce delay-500">
              <Zap className="text-pink-300" size={14} />
            </div>
          </div>
          <p className="text-sm sm:text-base text-purple-200 mb-1">🔮 AI가 주식 미래를 예언합니다</p>
          <p className="text-xs text-purple-300">※ 투자 참고용으로만 사용하세요 ※</p>
        </div>

        {/* Input Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4 border border-white/20">
          <div className="space-y-3">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                🎯 점쳐볼 주식을 입력하세요
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={stockSymbol}
                  onChange={(e) => setStockSymbol(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && generatePrediction()}
                  placeholder="예: 애플, 삼성전자, AAPL, 005930"
                  className="w-full px-3 py-2.5 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-sm"
                />
              </div>
            </div>
            
            <button
              onClick={generatePrediction}
              disabled={isLoading || !stockSymbol.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 text-sm flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  🔮 점괘를 보는 중...
                </>
              ) : (
                <>
                  <Target size={16} />
                  ✨ 운명을 점쳐보기 ✨
                </>
              )}
            </button>
          </div>
        </div>

        {/* Advertisement Section - 처음 화면에서만 표시 */}
        {!prediction && (
          <div className="bg-gradient-to-br from-purple-800/20 via-blue-800/20 to-indigo-800/20 backdrop-blur-lg rounded-xl p-4 mb-4 border-2 border-purple-400/40 shadow-xl">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center border border-red-400">
                  <span className="text-white text-xs font-bold">AD</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-yellow-200 mb-3">
                🔮 광고 게재 문의
              </h3>
              <p className="text-purple-100 text-sm mb-4 leading-relaxed">
                투자자들에게 브랜드를<br/>
                효과적으로 알릴 기회입니다
              </p>
              <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 rounded-lg p-3 border border-yellow-500/40">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-yellow-200 text-sm font-medium">📧 광고 문의</span>
                </div>
                <div className="space-y-2">
                  <p className="text-yellow-100 font-medium text-sm">
                    sitemaker_@naver.com
                  </p>
                  <div className="bg-red-600/30 rounded-lg px-2 py-1 border border-red-500/40 inline-block">
                    <p className="text-red-300 font-bold text-sm">
                      월 3만원
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Prediction Result */}
        {prediction && (
          <div className="bg-gradient-to-br from-amber-900/20 via-yellow-900/20 to-orange-900/20 backdrop-blur-lg rounded-xl p-4 border-2 border-yellow-500/30 shadow-xl mb-4">
            <div className="text-center">
              <div className="text-3xl mb-3">{prediction.icon}</div>
              <h2 className="text-sm font-bold text-yellow-200 mb-4 leading-relaxed">
                <span className="text-yellow-300">{prediction.stockName}</span> 점괘 결과 🔮
              </h2>

              {/* 점괘 메시지 */}
              <div className="bg-gradient-to-br from-amber-800/20 to-yellow-800/20 rounded-lg p-3 mb-3 border border-yellow-600/30">
                <div className="text-yellow-100 text-xs sm:text-sm leading-relaxed whitespace-pre-line text-left">
                  {prediction.message}
                </div>
              </div>

              {/* 조언 */}
              {prediction.advice && (
                <div className="bg-gradient-to-r from-red-800/30 to-pink-800/30 rounded-lg p-3 mb-3 border border-red-500/30">
                  <div className="text-red-200 text-xs sm:text-sm" dangerouslySetInnerHTML={{ __html: prediction.advice }}></div>
                </div>
              )}

              <div className="flex justify-center items-center gap-2 flex-wrap">
                {prediction.direction === 'up' && (
                  <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full border border-green-500/40">
                    <TrendingUp className="text-green-400" size={14} />
                    <span className="text-green-400 font-bold text-xs">상승 예상</span>
                  </div>
                )}
                {prediction.direction === 'down' && (
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full border border-red-500/40">
                    <TrendingDown className="text-red-400" size={14} />
                    <span className="text-red-400 font-bold text-xs">하락 예상</span>
                  </div>
                )}
                <div className="bg-yellow-600/20 px-2 py-1 rounded-full border border-yellow-500/40">
                  <span className="text-yellow-200 text-xs">신뢰도: {prediction.confidence}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Donation Section - 점괘 결과가 나온 후에만 표시 */}
        {prediction && (
          <div className="bg-gradient-to-br from-pink-800/20 via-purple-800/20 to-blue-800/20 backdrop-blur-lg rounded-xl p-4 mb-4 border-2 border-pink-400/40 shadow-xl">
            <div className="text-center">
              <div className="text-2xl mb-2">❤️</div>
              <h3 className="text-lg font-bold text-pink-200 mb-2">
                후원해주세요!
              </h3>
              <p className="text-purple-100 text-xs mb-3 leading-relaxed">
                나도 주식 한 번 사보고 싶다...
              </p>
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-3 border border-blue-500/40">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-blue-200 text-xs font-medium">📱 후원 계좌</span>
                </div>
                <p className="text-blue-100 font-medium text-sm">
                  카카오뱅크 3333-25-5152733
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-6 text-yellow-300 text-xs">
          <p>👑 점지는 참고용일 뿐입니다 👑</p>
          <p>투자는 신중히 결정하세요! ⚔️💎</p>
        </div>
      </div>
    </div>
  );
}