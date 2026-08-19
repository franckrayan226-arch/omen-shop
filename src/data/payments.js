export const WHATSAPP_NUMBER = '22676154525';

export const payments = [
  {
    id: 'orange',
    name: 'Orange Money',
    logo: '/logos/orange-money.png',
    color: '#FF7900',
    account: '70 00 00 01',
    accountDigits: '70000001',
    ussdTemplate: '*144*{numero}*{montant}#',
    hasUssd: true,
    appLabel: 'Composer le code USSD',
    appLink: '',
    hint: "Composez le code, puis validez avec votre code PIN Orange Money."
  },
  {
    id: 'moov',
    name: 'Moov Money',
    logo: '/logos/moov.png',
    color: '#1A56A0',
    account: '60 00 00 02',
    accountDigits: '60000002',
    ussdTemplate: '*555*{numero}*{montant}#',
    hasUssd: true,
    appLabel: 'Composer le code USSD',
    appLink: '',
    hint: "Composez le code, puis validez avec votre code PIN Moov Money."
  },
  {
    id: 'telecel',
    name: 'Telecel Money',
    logo: '/logos/telecel.png',
    color: '#0A0A0A',
    account: '50 00 00 03',
    accountDigits: '50000003',
    ussdTemplate: '*808*{numero}*{montant}#',
    hasUssd: true,
    appLabel: 'Composer le code USSD',
    appLink: '',
    hint: "Composez le code, puis validez avec votre code PIN Telecel Money."
  },
  {
    id: 'wave',
    name: 'Wave',
    logo: '/logos/wave.png',
    color: '#1F8AF4',
    account: '40 00 00 04',
    accountDigits: '40000004',
    ussdTemplate: '',
    hasUssd: false,
    appLabel: 'Ouvrir Wave',
    appLink: 'https://wave.com',
    hint: "Ouvrez Wave, transférez le montant vers le numéro ci-dessous, puis confirmez."
  }
];

export const composeUssd = (method, amount) => {
  if (!method || !method.ussdTemplate) return '';
  return method.ussdTemplate
    .replace('{numero}', method.accountDigits)
    .replace('{montant}', String(amount));
};

export const telUri = (ussdCode) => {
  if (!ussdCode) return '';
  return `tel:${ussdCode.replace(/#/g, '%23')}`;
};

export const getPaymentById = (id) => payments.find((p) => p.id === id) || null;