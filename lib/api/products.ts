import { Product, ProductFilters, ApiResponse, PaginatedResponse } from '../types';
import { mockProducts } from '../mockData';
import { simulateApiCall } from './config';

/**
 * Products API Service
 * 
 * Currently uses dummy data. To integrate with real API:
 * 1. Replace simulateApiCall with actual fetch/axios calls
 * 2. Update API_CONFIG.BASE_URL in config.ts
 * 3. Ensure response format matches ApiResponse/PaginatedResponse types
 */

// Get all products with optional filters
export async function getProducts(
    filters?: ProductFilters,
    page: number = 1,
    pageSize: number = 20
): Promise<PaginatedResponse<Product>> {
    // Simulate API call - replace with real API
    let filteredProducts = [...mockProducts];

    // Apply filters
    if (filters) {
        if (filters.category) {
            filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        if (filters.condition) {
            filteredProducts = filteredProducts.filter(p => p.condition === filters.condition);
        }
        if (filters.minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
        }
        if (filters.campus) {
            filteredProducts = filteredProducts.filter(p => p.campus === filters.campus);
        }
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(p =>
                p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower)
            );
        }
    }

    // Pagination
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filteredProducts.slice(start, end);

    return simulateApiCall({
        data: paginatedData,
        total: filteredProducts.length,
        page,
        pageSize,
        hasMore: end < filteredProducts.length
    });
}

// Get single product by ID
export async function getProductById(id: string): Promise<ApiResponse<Product>> {
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        return simulateApiCall({
            data: {} as Product,
            error: 'Product not found'
        });
    }

    return simulateApiCall({
        data: product,
        message: 'Product retrieved successfully'
    });
}

// Create new product listing
export async function createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'views' | 'saved'>): Promise<ApiResponse<Product>> {
    // Simulate creating product - replace with real API
    const newProduct: Product = {
        ...productData,
        id: `product_${Date.now()}`,
        createdAt: new Date().toISOString(),
        views: 0,
        saved: 0,
        status: 'available'
    };

    // In real implementation, this would POST to API
    return simulateApiCall({
        data: newProduct,
        message: 'Product created successfully'
    });
}

// Update existing product
export async function updateProduct(id: string, updates: Partial<Product>): Promise<ApiResponse<Product>> {
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
        return simulateApiCall({
            data: {} as Product,
            error: 'Product not found'
        });
    }

    const updatedProduct = { ...product, ...updates };

    return simulateApiCall({
        data: updatedProduct,
        message: 'Product updated successfully'
    });
}

// Delete product
export async function deleteProduct(id: string): Promise<ApiResponse<{ success: boolean }>> {
    const productExists = mockProducts.some(p => p.id === id);

    if (!productExists) {
        return simulateApiCall({
            data: { success: false },
            error: 'Product not found'
        });
    }

    return simulateApiCall({
        data: { success: true },
        message: 'Product deleted successfully'
    });
}

// Get related products (based on category)
export async function getRelatedProducts(productId: string, limit: number = 4): Promise<ApiResponse<Product[]>> {
    const product = mockProducts.find(p => p.id === productId);

    if (!product) {
        return simulateApiCall({
            data: [],
            error: 'Product not found'
        });
    }

    const related = mockProducts
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit);

    return simulateApiCall({
        data: related,
        message: 'Related products retrieved successfully'
    });
}
