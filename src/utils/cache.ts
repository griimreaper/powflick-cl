// utils/cache.ts

interface CacheItem<T> {
    value: T;
    expiration: number;
}

const cache: { [key: string]: CacheItem<any> } = {}; // El cache es un objeto con claves como string y valores de tipo CacheItem<any>

// Tipo para los datos almacenados en el caché
export function setCache<T>(key: string, value: T, ttl: number = 86400): void {
    const expiration = Date.now() + ttl * 1000; // TTL en milisegundos
    cache[key] = { value, expiration };
}

// Tipo para obtener los datos del caché
export function getCache<T>(key: string): T | null {
    const cached = cache[key];

    if (cached && cached.expiration > Date.now()) {
        return cached.value;
    }

    // Si el cache ha expirado o no existe, lo eliminamos
    delete cache[key];
    return null;
}
