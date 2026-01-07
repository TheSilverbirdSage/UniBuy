import { Product, User, Message, Conversation } from './types';

// Mock Users
export const mockUsers: User[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@university.edu',
        university: 'University of Lagos',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        verified: true,
        joinedDate: '2024-09-15',
        rating: 4.8,
        reviewCount: 24
    },
    {
        id: '2',
        name: 'Michael Chen',
        email: 'mchen@university.edu',
        university: 'University of Lagos',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        verified: true,
        joinedDate: '2024-08-20',
        rating: 4.9,
        reviewCount: 31
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        email: 'emily.r@university.edu',
        university: 'University of Lagos',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        verified: true,
        joinedDate: '2024-10-01',
        rating: 4.7,
        reviewCount: 18
    },
    {
        id: '4',
        name: 'David Okonkwo',
        email: 'd.okonkwo@university.edu',
        university: 'University of Lagos',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        verified: true,
        joinedDate: '2024-07-12',
        rating: 5.0,
        reviewCount: 45
    }
];

// Mock Products
export const mockProducts: Product[] = [
    {
        id: '1',
        title: 'Organic Chemistry 8th Edition',
        description: 'Excellent condition textbook for CHEM 201. Barely used, no highlighting or writing inside. Includes access code (unused).',
        price: 3500,
        originalPrice: 15000,
        category: 'textbooks',
        condition: 'like-new',
        images: [
            'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800',
            'https://images.unsplash.com/photo-1589998059171-988d887df646?w=800'
        ],
        sellerId: '1',
        sellerName: 'Sarah Johnson',
        sellerAvatar: mockUsers[0].avatar,
        location: 'Main Library',
        campus: 'Main Campus',
        createdAt: '2024-12-28T10:30:00Z',
        views: 124,
        saved: 18,
        status: 'available'
    },
    {
        id: '2',
        title: 'MacBook Pro 13" 2020',
        description: 'M1 chip, 8GB RAM, 256GB SSD. Perfect for students. Comes with original charger and case. Battery health at 92%.',
        price: 85000,
        originalPrice: 150000,
        category: 'tech',
        condition: 'good',
        images: [
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'
        ],
        sellerId: '2',
        sellerName: 'Michael Chen',
        sellerAvatar: mockUsers[1].avatar,
        location: 'Student Center',
        campus: 'Main Campus',
        createdAt: '2024-12-27T14:20:00Z',
        views: 256,
        saved: 42,
        status: 'available'
    },
    {
        id: '3',
        title: 'Mini Fridge - Perfect for Dorm',
        description: 'Compact refrigerator, 1.7 cu ft. Great condition, very quiet. Moving out and need to sell quickly!',
        price: 8500,
        originalPrice: 18000,
        category: 'dorm-gear',
        condition: 'good',
        images: [
            'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800'
        ],
        sellerId: '3',
        sellerName: 'Emily Rodriguez',
        sellerAvatar: mockUsers[2].avatar,
        location: 'West Dorms',
        campus: 'Main Campus',
        createdAt: '2024-12-26T09:15:00Z',
        views: 89,
        saved: 12,
        status: 'available'
    },
    {
        id: '4',
        title: 'Calculus Early Transcendentals',
        description: 'Stewart 9th edition. Used for MATH 151/152. Some highlighting but all pages intact. Great price!',
        price: 4200,
        originalPrice: 16500,
        category: 'textbooks',
        condition: 'good',
        images: [
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800'
        ],
        sellerId: '4',
        sellerName: 'David Okonkwo',
        sellerAvatar: mockUsers[3].avatar,
        location: 'Engineering Building',
        campus: 'Main Campus',
        createdAt: '2024-12-25T16:45:00Z',
        views: 167,
        saved: 28,
        status: 'available'
    },
    {
        id: '5',
        title: 'Nike Running Shoes - Size 10',
        description: 'Barely worn Nike Air Zoom Pegasus. Only used for one semester of PE class. Like new condition!',
        price: 6500,
        originalPrice: 12000,
        category: 'clothing',
        condition: 'like-new',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
        ],
        sellerId: '1',
        sellerName: 'Sarah Johnson',
        sellerAvatar: mockUsers[0].avatar,
        location: 'Gym',
        campus: 'Main Campus',
        createdAt: '2024-12-24T11:00:00Z',
        views: 93,
        saved: 15,
        status: 'available'
    },
    {
        id: '6',
        title: 'Study Desk with Chair',
        description: 'Solid wood desk and ergonomic chair. Perfect for dorm room. Disassembles for easy transport.',
        price: 12000,
        originalPrice: 25000,
        category: 'furniture',
        condition: 'good',
        images: [
            'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'
        ],
        sellerId: '2',
        sellerName: 'Michael Chen',
        sellerAvatar: mockUsers[1].avatar,
        location: 'East Dorms',
        campus: 'Main Campus',
        createdAt: '2024-12-23T13:30:00Z',
        views: 145,
        saved: 31,
        status: 'available'
    },
    {
        id: '7',
        title: 'iPad Air 4th Gen with Apple Pencil',
        description: '64GB, WiFi. Includes Apple Pencil (2nd gen) and protective case. Perfect for note-taking!',
        price: 55000,
        originalPrice: 95000,
        category: 'tech',
        condition: 'like-new',
        images: [
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'
        ],
        sellerId: '3',
        sellerName: 'Emily Rodriguez',
        sellerAvatar: mockUsers[2].avatar,
        location: 'Library Cafe',
        campus: 'Main Campus',
        createdAt: '2024-12-22T08:20:00Z',
        views: 312,
        saved: 67,
        status: 'available'
    },
    {
        id: '8',
        title: 'Basketball - Official Size',
        description: 'Spalding official game ball. Well maintained, great grip. Perfect for pickup games!',
        price: 2500,
        originalPrice: 5000,
        category: 'sports',
        condition: 'good',
        images: [
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'
        ],
        sellerId: '4',
        sellerName: 'David Okonkwo',
        sellerAvatar: mockUsers[3].avatar,
        location: 'Sports Complex',
        campus: 'Main Campus',
        createdAt: '2024-12-21T15:10:00Z',
        views: 67,
        saved: 9,
        status: 'available'
    },
    {
        id: '9',
        title: 'Introduction to Psychology 12th Ed',
        description: 'Kalat textbook for PSY 101. Excellent condition with minimal wear. No markings inside.',
        price: 3800,
        originalPrice: 14000,
        category: 'textbooks',
        condition: 'like-new',
        images: [
            'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800'
        ],
        sellerId: '1',
        sellerName: 'Sarah Johnson',
        sellerAvatar: mockUsers[0].avatar,
        location: 'Psychology Building',
        campus: 'Main Campus',
        createdAt: '2024-12-20T12:00:00Z',
        views: 198,
        saved: 34,
        status: 'available'
    },
    {
        id: '10',
        title: 'Coffee Maker - Keurig K-Mini',
        description: 'Single serve coffee maker. Perfect for dorm room. Includes 10 K-cups. Works perfectly!',
        price: 4500,
        originalPrice: 8000,
        category: 'dorm-gear',
        condition: 'good',
        images: [
            'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800'
        ],
        sellerId: '2',
        sellerName: 'Michael Chen',
        sellerAvatar: mockUsers[1].avatar,
        location: 'North Dorms',
        campus: 'Main Campus',
        createdAt: '2024-12-19T10:45:00Z',
        views: 134,
        saved: 22,
        status: 'available'
    }
];

// Mock Messages
export const mockMessages: Message[] = [
    {
        id: 'm1',
        conversationId: 'c1',
        senderId: '2',
        receiverId: '1',
        content: 'Hi! Is the Organic Chemistry textbook still available?',
        timestamp: '2024-12-30T09:15:00Z',
        read: true,
        productId: '1'
    },
    {
        id: 'm2',
        conversationId: 'c1',
        senderId: '1',
        receiverId: '2',
        content: 'Yes it is! Are you interested?',
        timestamp: '2024-12-30T09:20:00Z',
        read: true,
        productId: '1'
    },
    {
        id: 'm3',
        conversationId: 'c1',
        senderId: '2',
        receiverId: '1',
        content: 'Definitely! Can we meet at the Main Library tomorrow around 2pm?',
        timestamp: '2024-12-30T09:25:00Z',
        read: false,
        productId: '1'
    }
];

// Mock Conversations
export const mockConversations: Conversation[] = [
    {
        id: 'c1',
        participants: [mockUsers[0], mockUsers[1]],
        product: mockProducts[0],
        lastMessage: mockMessages[2],
        unreadCount: 1,
        updatedAt: '2024-12-30T09:25:00Z'
    }
];
