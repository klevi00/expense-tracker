import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

console.log('🔗 PocketBase URL configurato:', POCKETBASE_URL);
console.log('🔗 VITE_POCKETBASE_URL env:', import.meta.env.VITE_POCKETBASE_URL || 'non impostato (uso default)');

if (!import.meta.env.VITE_POCKETBASE_URL) {
  console.warn('⚠️ VITE_POCKETBASE_URL non configurato nel file .env, uso il default:', POCKETBASE_URL);
  console.warn('💡 Crea un file .env nella root del progetto con: VITE_POCKETBASE_URL=http://127.0.0.1:8090');
}

const pb = new PocketBase(POCKETBASE_URL);

console.log('✅ PocketBase instance creata con baseUrl:', pb.baseUrl);

export { pb };
export default pb;