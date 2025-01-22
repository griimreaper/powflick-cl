interface CacheItem<T> {
    value: T;
    expiration: number;
}

const cacheStore: { [key: string]: CacheItem<any> } = {};

// Función para establecer un valor en el caché
export function setCache<T>(key: string, value: T, ttl: number = 86400): void {
    const expiration = Date.now() + ttl * 1000; // TTL en milisegundos
    cacheStore[key] = { value, expiration };
}

// Función para obtener un valor del caché
export function getCache<T>(key: string): T | null {
    const cached = cacheStore[key];

    if (cached && cached.expiration > Date.now()) {
        return cached.value;
    }

    // Si el caché ha expirado o no existe, lo eliminamos
    delete cacheStore[key];
    return null;
}
