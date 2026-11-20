export const statuses = {ready:'Доступний',beta:'Тестова версія',development:'У розробці',planned:'Заплановано'};
export const icons = {plc:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M7 2v3m5-3v3m5-3v3M7 19v3m5-3v3m5-3v3M7 9h3v6H7zm7 0h3m-3 4h3"/>',chart:'<path d="M3 3v18h18M6 15l4-5 4 3 6-8"/>',calculator:'<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h2m4 0h2M8 15h2m4 0h2M8 19h2m4 0h2"/>',book:'<path d="M12 5v16M3 3c4 0 7 0 9 2 2-2 5-2 9-2v16c-4 0-7 0-9 2-2-2-5-2-9-2z"/>'};
export function safeUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return false;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}
export function validateCatalog(data) {
  if (!data || data.schemaVersion !== 1 || !Array.isArray(data.tools)) throw Error('Невідома структура tools.json.');
  const ids = new Set();
  for (const [i, t] of data.tools.entries()) {
    if (!t || typeof t !== 'object' || typeof t.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.id) || ids.has(t.id)) throw Error(`Запис ${i + 1}: некоректний або повторний id.`);
    ids.add(t.id);
    for (const key of ['name','description','category']) if (typeof t[key] !== 'string' || !t[key].trim()) throw Error(`${t.id}: відсутнє поле ${key}.`);
    if (!Object.hasOwn(statuses,t.status) || !Object.hasOwn(icons,t.icon) || !Number.isFinite(t.order)) throw Error(`${t.id}: перевірте status, icon та order.`);
    if (t.version !== undefined && (typeof t.version !== 'string' || !t.version.trim())) throw Error(`${t.id}: некоректна версія.`);
    if (t.url !== null && !safeUrl(t.url)) throw Error(`${t.id}: URL повинен бути абсолютним HTTPS або null.`);
    if (['ready','beta'].includes(t.status) && !safeUrl(t.url)) throw Error(`${t.id}: доступний інструмент потребує URL.`);
  }
  return [...data.tools].sort((a,b)=>a.order-b.order || a.id.localeCompare(b.id));
}
export function filterTools(tools,query='',category='',status='all') {
  const q=query.trim().toLocaleLowerCase('uk');
  return tools.filter(t=>(!q || `${t.name} ${t.description}`.toLocaleLowerCase('uk').includes(q)) && (!category || t.category===category) && (status==='all' || (status==='available' ? ['ready','beta'].includes(t.status) : t.status==='planned')));
}
