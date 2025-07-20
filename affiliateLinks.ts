const amazonAffiliateId = 'carlotamdez-21';
// Mapeo de categorías IA a URLs de afiliado de Amazon
export const affiliateCategoryUrls: {
  [store: string]: { [category: string]: string }
} = {
  amazon: {
    'Electrónica': 'https://www.amazon.es/gp/search?ie=UTF8&tag='+amazonAffiliateId+'&k=electronica',
    'Libros': 'https://www.amazon.es/libros/s?k=libros&tag='+amazonAffiliateId,
    'Deportes': 'https://www.amazon.es/deportes/s?k=deportes&tag='+amazonAffiliateId,
    'Utensilios de Cocina': 'https://www.amazon.es/utensilios-de-cocina/s?k=utensilios+de+cocina&tag='+amazonAffiliateId,
    'Cocina / Gourmet': 'https://www.amazon.es/cocina-gourmet/s?k=cocina+gourmet&tag='+amazonAffiliateId,
    'Moda / Belleza': 'https://www.amazon.es/moda-belleza/s?k=moda+belleza&tag='+amazonAffiliateId,
    'Joyería': 'https://www.amazon.es/joyeria/s?k=joyeria&tag='+amazonAffiliateId,
    'Experiencias': 'https://www.amazon.es/s?k=experiencia+regalo&tag='+amazonAffiliateId,
    'Experiencia': 'https://www.amazon.es/s?k=experiencia+regalo&tag='+amazonAffiliateId,
    'Tecnología': 'https://www.amazon.es/tecnologia/s?k=tecnologia&tag='+amazonAffiliateId,
    'Bienestar': 'https://www.amazon.es/bienestar/s?k=bienestar&tag='+amazonAffiliateId,
    'Hogar': 'https://www.amazon.es/hogar/s?k=hogar&tag='+amazonAffiliateId,
    'Hogar / Decoración': 'https://www.amazon.es/hogar-decoracion/s?k=hogar+decoracion&tag='+amazonAffiliateId,
    'Educación': 'https://www.amazon.es/educacion/s?k=educacion&tag='+amazonAffiliateId,
    'Jardinería': 'https://www.amazon.es/jardineria/s?k=jardineria&tag='+amazonAffiliateId,
    'Gastronomía': 'https://www.amazon.es/gastronomia/s?k=gastronomia&tag='+amazonAffiliateId,
    'Arte': 'https://www.amazon.es/arte/s?k=arte&tag='+amazonAffiliateId,
    'Manualidades': 'https://www.amazon.es/manualidades/s?k=manualidades&tag='+amazonAffiliateId,
    'Música': 'https://www.amazon.es/musica/s?k=musica&tag='+amazonAffiliateId,
    'Viajes': 'https://www.amazon.es/viajes/s?k=viajes&tag='+amazonAffiliateId,
    'Regalo personalizado': 'https://www.amazon.es/regalo-personalizado/s?k=regalo+personalizado&tag='+amazonAffiliateId,
    'Aventura': 'https://www.amazon.es/aventura/s?k=aventura&tag='+amazonAffiliateId,
    'Gourmet': 'https://www.amazon.es/gourmet/s?k=gourmet&tag='+amazonAffiliateId,
    'Regalo': 'https://www.amazon.es/regalo/s?k=regalo&tag='+amazonAffiliateId,
    'Regalo para él': 'https://www.amazon.es/regalo-el/s?k=regalo+para+el&tag='+amazonAffiliateId,
    'Regalo para ella': 'https://www.amazon.es/regalo-ella/s?k=regalo+para+ella&tag='+amazonAffiliateId,
    'Regalo para él y ella': 'https://www.amazon.es/regalo-el-y-ella/s?k=regalo+para+el+y+ella&tag='+amazonAffiliateId,
    
    // ...añade más si lo deseas
  }
};

export function openAffiliateLink(
  giftName: string,
  giftCategory: string,
  store: string
) {
  const urls = affiliateCategoryUrls[store];
  if (!urls) return;

  // 1. Buscar por nombre de regalo (siempre)
  let url = null;
  if (giftName) {
    url = `https://www.amazon.es/s?k=${encodeURIComponent(giftName)}&tag=${amazonAffiliateId}`;
  }

  // 2. Si no hay nombre, buscar por categoría predefinida
  if (!url && urls[giftCategory]) {
    url = urls[giftCategory];
  }

  // 3. Si no hay match exacto, buscar por inclusión de palabra clave en la categoría
  if (!url) {
    const foundKey = Object.keys(urls).find(key =>
      giftCategory.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(giftCategory.toLowerCase())
    );
    if (foundKey) url = urls[foundKey];
  }

  // 4. Fallback final: búsqueda genérica por categoría
  if (!url && giftCategory) {
    url = `https://www.amazon.es/s?k=${encodeURIComponent(giftCategory)}&tag=${amazonAffiliateId}`;
  }

  if (url) {
    window.open(url, '_blank');
  } else {
    alert(`No hay enlace de afiliado para la categoría "${giftCategory}" en la tienda "${store}"`);
  }
} 