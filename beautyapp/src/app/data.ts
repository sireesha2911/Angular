// data.ts

import { BeautyProduct } from '../app/models/beauty-product.model';

export const BEAUTY_PRODUCTS: BeautyProduct[] = [
  {
    id: 1,
    name: 'Moisturizier',
    price: 29.99,
    favorite: true,
    rating: 4.5,
    tags: ['skincare', 'organic'],
    imageUrl: "../../../public/Product1.jpg"
  },
  {
    id: 2,
    name: 'SunScreen',
    price: 49.99,
    favorite: false,
    rating: 4.0,
    tags: ['skincare', 'sun protection'],
    imageUrl: '../assets/Product2.jpg'
  },
  {
    id: 3,
    name: 'Toner',
    price: 19.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular'],
    imageUrl: '../assets/Product3.jpg'
  },
  {
    id: 4,
    name: 'Serum',
    price: 23.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular'],
    imageUrl: '../assets/Product4.jpg'
  },
  {
    id: 5,
    name: 'Lip Glossy',
    price: 29.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular','Beauty'],
    imageUrl: '../assets/Product5.jpg'
  },
  {
    id: 6,
    name: 'Lip Balm',
    price: 13.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'popular','Beauty'],
    imageUrl: '../assets/Product6.jpg'
  },
  {
    id: 7,
    name: 'Eye Liner',
    price: 9.99,
    favorite: true,
    rating: 4.8,
    tags: ['Makeup', 'Beauty'],
    imageUrl: '../assets/Product7.jpg'
  }
];
