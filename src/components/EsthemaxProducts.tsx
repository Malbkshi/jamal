import Image from 'next/image';

const products = [
  {
    name: 'Collagen Massage Cream',
    image: '/images/esthemax/Collagen-Massage-Cream-570x684.png',
    width: 570,
    height: 684
  },
  {
    name: 'Lemon Soft Peeling Gel',
    image: '/images/esthemax/Lemon-Soft-peeling-Gel-from-esthemax-canada-370x444.jpg',
    width: 370,
    height: 444
  },
  {
    name: 'Skin Warrior',
    image: '/images/esthemax/skin-warrior.jpg',
    width: 400,
    height: 400
  },
  {
    name: 'Gold Mask',
    image: '/images/esthemax/gold-mask.jpg',
    width: 400,
    height: 400
  },
  {
    name: 'Egyptian Rose',
    image: '/images/esthemax/egyptiam-rose.jpg',
    width: 400,
    height: 400
  },
  {
    name: 'Charcoal Mask',
    image: '/images/esthemax/charcoal-mask.jpg',
    width: 400,
    height: 400
  },
  {
    name: 'Blue Glacier',
    image: '/images/esthemax/blue-glacier.jpg',
    width: 400,
    height: 400
  },
  {
    name: 'Antioxidant Goji',
    image: '/images/esthemax/antioxidant-goji.jpg',
    width: 400,
    height: 400
  }
];

export default function EsthemaxProducts() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Logo Section */}
      <div className="flex justify-center mb-12">
        <div className="relative w-64 h-32">
          <Image
            src="/images/esthemax/esthemax_logo.png"
            alt="Esthemax Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-full aspect-square mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">{product.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
} 