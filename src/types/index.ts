export interface Location {
  lat: number;
  lng: number;
}

export type ServiceType = 'in-house' | 'home' | 'both';

export interface Staff {
  id: string;
  name: string;
  image: string;
  specialty?: string;
  rating: number;
  reviewCount: number;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  description?: string;
}

export interface Table {
  id: string;
  name: string;
  capacity: number;
  shape: 'round' | 'square' | 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
  isAvailable: boolean;
}

export interface Section {
  id: string;
  name: string;
  tables: Table[];
}

export interface Business {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  address: string;
  location: Location;
  phone: string;
  email?: string;
  website?: string;
  workingHours: {
    day: string;
    open: string;
    close: string;
    isOpen: boolean;
  }[];
  serviceType: ServiceType;
  services: Service[];
  staff: Staff[];
  sections?: Section[];
  minPrice?: number;
  maxPrice?: number;
  isActive: boolean;
  isApproved: boolean;
  createdAt: string;
}

export interface Reservation {
  id: string;
  businessId: string;
  businessName: string;
  userId: string;
  userName: string;
  userPhone: string;
  serviceId?: string;
  serviceName?: string;
  staffId?: string;
  staffName?: string;
  tableId?: string;
  tableName?: string;
  date: string;
  time: string;
  duration: number;
  guestCount: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice?: number;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  category: string;
  subcategory?: string;
  description: string;
  location: Location;
  address: string;
  preferredDate?: string;
  preferredTime?: string;
  budget?: number;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail?: string;
  status: 'pending' | 'quoted' | 'accepted' | 'rejected';
  quotes: Quote[];
  createdAt: string;
}

export interface Quote {
  id: string;
  businessId: string;
  businessName: string;
  price: number;
  description: string;
  estimatedDuration?: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'user' | 'business' | 'admin';
  favorites: string[];
  reservations: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: string[];
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}
