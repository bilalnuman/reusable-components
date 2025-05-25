export const API_ROUTES = {
    inventory: {
        products: '/v1/inventory/products/',
        productById: (id: string) => `/v1/inventory/products/${id}/`,
    },
    auth: {
        login: '/v1/auth/login/',
        register: '/v1/auth/register/',
        profile: '/v1/auth/me/',
    },
};
