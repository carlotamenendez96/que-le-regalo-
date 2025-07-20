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

export function openAffiliateLink(category: string, store: string) {
  const urls = affiliateCategoryUrls[store];
  if (!urls) return;

  // Intentar match exacto
  let url = urls[category];

  // Si no hay match exacto, buscar por inclusión de palabra clave
  if (!url) {
    const foundKey = Object.keys(urls).find(key =>
      category.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(category.toLowerCase())
    );
    if (foundKey) url = urls[foundKey];
  }

  // Fallback: búsqueda genérica en Amazon
  if (!url) {
    url = `https://www.amazon.es/s?k=${encodeURIComponent(category)}&tag=${amazonAffiliateId}`;
  }

  if (url) {
    window.open(url, '_blank');
  } else {
    alert(`No hay enlace de afiliado para la categoría "${category}" en la tienda "${store}"`);
  }
} 