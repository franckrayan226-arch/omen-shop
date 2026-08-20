export const WHATSAPP_NUMBER = '22676154525';

export const payments = [
  {
    id: 'orange',
    name: 'Orange Money',
    logo: '/logos/orange-money.png',
    color: '#FF7900',
    account: '76 64 84 02',
    accountDigits: '76648402',
    ussdTemplate: '*144*2*1*{numero}*{montant}#',
    hasUssd: true,
    appLabel: 'Composer le code USSD',
    appLink: '',
    hint: 'Composez le code USSD, puis validez avec votre code PIN Orange Money.'
  },
  {
    id: 'bank',
    name: 'Virement bancaire',
    logo: '',
    color: '#0A0A0A',
    account: '',
    accountDigits: '',
    ussdTemplate: '',
    hasUssd: false,
    appLabel: '',
    appLink: '',
    accountLabel: 'Coordonnées bancaires',
    hint: 'Effectuez le virement, puis envoyez la preuve sur WhatsApp.',
    details: []
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