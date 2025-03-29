"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type ServiceCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  image_url?: string;
  href: string;
};

export default function ServiceCard({ id, title, description, imageUrl, image_url, href }: ServiceCardProps) {
  const finalImageUrl = imageUrl || image_url || '/images/services/cleaning.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={finalImageUrl}
          alt={title}
          fill
          className={`${id === 'esthemax' ? 'object-contain bg-white' : 'object-cover'}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          priority={id === 'esthemax'}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-pink-600 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{description}</p>
        <Link 
          href={href} 
          className="inline-block bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
        >
          المزيد
        </Link>
      </div>
    </motion.div>
  );
} 