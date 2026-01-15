import PocketBase from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

if (!import.meta.env.VITE_POCKETBASE_URL) {
  console.warn('⚠️ VITE_POCKETBASE_URL non configurato, uso default:', POCKETBASE_URL);
}

const pb = new PocketBase(POCKETBASE_URL);

// Disable auto cancellation to prevent request issues
pb.autoCancellation(false);

// PocketBase automatically stores auth tokens in localStorage
// This means: Login once per device, stay logged in forever (until logout)
// Same account on different devices = same data (expenses filtered by user ID)

// DEBUG
console.log('🔗 PocketBase URL:', pb.baseUrl);
console.log('🔐 Auth token presente:', pb.authStore.isValid);
if (pb.authStore.isValid) {
  console.log('👤 Utente autenticato:', pb.authStore.model?.email);
  console.log('💾 Token salvato in localStorage - sessione persistente');
} else {
  console.log('ℹ️ Nessun token trovato - login richiesto');
}

export default pb;
export { pb };
