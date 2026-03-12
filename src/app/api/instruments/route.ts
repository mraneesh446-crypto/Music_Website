import { NextResponse } from 'next/server';

export async function GET() {
  const instruments = [
    {
      id: '1',
      name: 'Fender Stratocaster',
      type: 'Electric Guitar',
      category: 'String',
      brand: 'Fender',
      price: 162000,
      rentPriceDaily: 3500,
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&q=80',
      description: 'Classic electric guitar with versatile tones, perfect for rock, blues, and pop.',
      features: ['Alder Body', '3 Single Coil Pickups', 'Maple Neck', 'Tremolo Bridge', '22 Medium Jumbo Frets'],
      isNew: true,
      inStock: true
    },
    {
      id: '2',
      name: 'Yamaha Grand Piano',
      type: 'Acoustic Piano',
      category: 'Keyboard',
      brand: 'Yamaha',
      price: 1957000,
      rentPriceDaily: 20000,
      image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80',
      description: 'Elegant grand piano delivering unmatched acoustic brilliance and responsive touch.',
      features: ['Solid Spruce Soundboard', 'Polished Ebony Finish', 'Advanced Action'],
      isNew: false,
      inStock: true
    },
    {
      id: '3',
      name: 'Mantra',
      type: 'Acoustic Guitar',
      category: 'String',
      brand: 'Mantra',
      price: 25000,
      rentPriceDaily: 800,
      image: '/images/mantra.png',
      description: 'A beautifully crafted acoustic guitar, known for its warm and resonant sound.',
      features: ['Solid Spruce Top', 'Mahogany Back & Sides', 'Die-cast Tuners', 'Warm Acoustic Tone', 'Rosewood Fingerboard'],
      isNew: true,
      inStock: true
    },
    {
      id: '4',
      name: 'Selmer Paris Saxophone',
      type: 'Alto Saxophone',
      category: 'Woodwind',
      brand: 'Selmer',
      price: 702000,
      rentPriceDaily: 8100,
      image: 'https://images.unsplash.com/photo-1573871666457-7c7329118cf9?w=800&q=80',
      description: 'Professional grade alto saxophone known for its rich, warm tone and flawless intonation.',
      features: ['Gold Lacquer', 'Hand-Engraved Bell', 'High F# Key'],
      isNew: false,
      inStock: false
    },
    {
      id: '6',
      name: 'Stradivarius Replica Violin',
      type: 'Acoustic Violin',
      category: 'String',
      brand: 'Handcrafted',
      price: 283500,
      rentPriceDaily: 4700,
      image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800&q=80',
      description: 'Beautifully crafted acoustic violin offering clear resonance and projection for soloists.',
      features: ['Hand-Carved Tone Woods', 'Ebony Fittings', 'Includes Case & Bow'],
      isNew: true,
      inStock: true
    }
  ];

  return NextResponse.json({ instruments });
}
