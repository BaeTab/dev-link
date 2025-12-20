import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// NOTE: You need to download your Firebase Service Account Key
// and save it as 'service-account.json' in this directory.
// Go to Firebase Console -> Project Settings -> Service accounts
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const serviceAccount = require('./service-account.json');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.warn('\x1b[33m%s\x1b[0m', '⚠️  WARNING: Sitemap generation skipped.');
  console.warn('   Could not initialize Firebase Admin. Please check scripts/service-account.json.');
  console.warn('   The deployment will continue without updating the sitemap.');
  // Exit successfully so the deploy chain doesn't break
  process.exit(0);
}

const db = getFirestore();

async function generateSitemap() {
  console.log('Fetching users...');
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://devv-link.web.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.username) {
      sitemap += `  <url>
    <loc>https://devv-link.web.app/${data.username}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }
  });

  sitemap += `</urlset>`;

  const publicDir = path.resolve(__dirname, '../public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log(`Sitemap generated with ${snapshot.size} users at public/sitemap.xml`);
}

generateSitemap().catch(console.error);
