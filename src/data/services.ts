export interface Service {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  price: number;
  duration: string;
  category: string;
  image_url?: string;
  features?: string[];
  created_at?: string;
  updated_at?: string;
}

// Using real image paths from public directory
const serviceImages = {
  facial: '/images/services/cleaning.png',
  laserHair: '/images/services/hairremoval.png',
  body: '/images/services/cleaning.png',
  antiaging: '/images/services/antiaging.png',
  bride: '/images/services/pride.png',
  plasma: '/images/services/plazma.png',
  esthemax: '/images/services/esthemax.png',
};

export const services: Service[] = [
  {
    id: 'facial-care',
    title: 'العناية بالبشرة',
    description: 'علاجات متخصصة للعناية بالبشرة تعالج مشاكل البشرة المختلفة وتمنحك بشرة متوهجة ونضرة.',
    long_description: 'نقدم مجموعة متكاملة من علاجات العناية بالبشرة التي تساعد في حل مشاكل البشرة المختلفة مثل حب الشباب، البقع الداكنة، التجاعيد، والمسام الواسعة. نستخدم منتجات عالية الجودة وتقنيات متطورة لضمان أفضل النتائج.',
    price: 120,
    duration: '60 دقيقة',
    category: 'skin',
    image_url: serviceImages.facial,
    features: [
      'تنظيف عميق للبشرة',
      'إزالة الخلايا الميتة',
      'ترطيب عميق',
      'حماية من أشعة الشمس',
      'علاج مشاكل البشرة'
    ]
  },
  {
    id: 'hair-removal-laser',
    title: 'إزالة الشعر بالليزر',
    description: 'تقنية متطورة لإزالة الشعر بشكل دائم وآمن باستخدام أحدث أجهزة الليزر.',
    long_description: 'نستخدم أحدث تقنيات الليزر لإزالة الشعر بشكل دائم وآمن. هذه التقنية تعمل على تدمير بصيلات الشعر بشكل فعال دون التأثير على البشرة المحيطة.',
    price: 200,
    duration: '120 دقيقة',
    category: 'hair',
    image_url: serviceImages.laserHair,
    features: [
      'إزالة دائمة للشعر',
      'آمن على جميع أنواع البشرة',
      'لا تسبب الألم',
      'نتائج فورية',
      'جلسات متعددة للحصول على أفضل النتائج'
    ]
  },
  {
    id: 'body-treatments',
    title: 'علاجات الجسم',
    description: 'برامج متكاملة للعناية بالجسم ونحته والتخلص من السليوليت وترهلات الجلد.',
    long_description: 'نقدم برامج متكاملة للعناية بالجسم تشمل نحت الجسم، التخلص من السليوليت، وشد الترهلات. نستخدم تقنيات متطورة وعلاجات فعالة لتحقيق النتائج المطلوبة.',
    price: 150,
    duration: '60 دقيقة',
    category: 'skin',
    image_url: serviceImages.body,
    features: [
      'نحت الجسم',
      'التخلص من السليوليت',
      'شد الترهلات',
      'ترطيب عميق للبشرة',
      'تدليك استرخائي'
    ]
  },
  {
    id: 'anti-aging',
    title: 'مكافحة الشيخوخة',
    description: 'علاجات متخصصة للحفاظ على شباب البشرة ومكافحة علامات التقدم في العمر.',
    long_description: 'نقدم علاجات متخصصة لمكافحة علامات التقدم في العمر والحفاظ على شباب البشرة. نستخدم منتجات وتقنيات متطورة لتحفيز إنتاج الكولاجين وتحسين مرونة البشرة.',
    price: 180,
    duration: '120 دقيقة',
    category: 'skin',
    image_url: serviceImages.antiaging,
    features: [
      'تحفيز إنتاج الكولاجين',
      'تقليل التجاعيد',
      'تحسين مرونة البشرة',
      'تفتيح البشرة',
      'حماية من الجذور الحرة'
    ]
  },
  {
    id: 'bride-packages',
    title: 'باقات العروس',
    description: 'باقات عناية متكاملة للعروس تشمل جميع الخدمات التي تحتاجها قبل الزفاف.',
    long_description: 'نقدم باقات متكاملة للعروس تشمل جميع خدمات العناية بالبشرة والشعر التي تحتاجها قبل الزفاف. نضمن لك مظهراً متألقاً في يوم زفافك.',
    price: 250,
    duration: '120 دقيقة',
    category: 'makeup',
    image_url: serviceImages.bride,
    features: [
      'عناية بالبشرة',
      'إزالة الشعر',
      'تسريحة شعر',
      'مكياج احترافي',
      'تدليك استرخائي'
    ]
  },
  {
    id: 'plasma-therapy',
    title: 'علاج البلازما',
    description: 'تقنية متقدمة تستخدم البلازما الغنية بالصفائح الدموية لتجديد البشرة وعلاج مشاكلها المختلفة.',
    long_description: 'نستخدم تقنية البلازما الغنية بالصفائح الدموية لتجديد البشرة وعلاج مشاكلها المختلفة. هذه التقنية تساعد في تحسين مظهر البشرة وعلاج مشاكلها بشكل فعال.',
    price: 180,
    duration: '120 دقيقة',
    category: 'skin',
    image_url: serviceImages.plasma,
    features: [
      'تجديد البشرة',
      'تحسين مظهر الندبات',
      'تحفيز نمو الشعر',
      'تحسين مرونة البشرة',
      'علاج مشاكل البشرة'
    ]
  },
  {
    id: 'esthemax',
    title: 'Esthemax جلسات',
    description: 'مجموعة متكاملة من جلسات Esthemax المتخصصة للبشرة باستخدام تقنيات وأقنعة متطورة.',
    long_description: 'نقدم جلسات Esthemax المتخصصة للبشرة باستخدام منتجات وتقنيات متطورة. هذه الجلسات تساعد في تحسين مظهر البشرة وعلاج مشاكلها المختلفة.',
    price: 200,
    duration: '120 دقيقة',
    category: 'skin',
    image_url: serviceImages.esthemax,
    features: [
      'تنظيف عميق للبشرة',
      'ترطيب عميق',
      'علاج مشاكل البشرة',
      'تحسين مظهر البشرة',
      'حماية من أشعة الشمس'
    ]
  }
]; 