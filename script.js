/* ===== LIBRES Y SIN MIEDO — script.js (JavaScript vanilla) ===== */

/* ---- CONFIGURACIÓN: edita aquí antes de publicar ----
   Cambia municipalVerificado a true SOLO después de confirmar por teléfono o en el
   sitio oficial del Ayuntamiento que 229 265 7587 sigue activo y su horario. */
const CONFIG = {
  municipalVerificado: false,
  salidaRapida: 'https://es.wikipedia.org/wiki/Mariposa'
};

/* ---- CONTENIDO (fácil de modificar) ---- */
const TIPOS = [
  { n: 'Psicológica', i: '<circle cx="12" cy="12" r="9"/><path d="M8 15c1.2 1.4 6.8 1.4 8 0M9 9.5h.01M15 9.5h.01"/>',
    d: 'Daña la autoestima y la estabilidad emocional.',
    e: 'Insultos, amenazas, humillaciones, vigilar con quién hablas o a dónde vas, o hacerte sentir culpable de todo.' },
  { n: 'Física', i: '<path d="M7 11V6a1.5 1.5 0 013 0v4m0-1V4.5a1.5 1.5 0 013 0V10m0-3.5a1.5 1.5 0 013 0V14c0 4-2.5 6-5.5 6S6 18 5 15l-1-3a1.4 1.4 0 012.5-1z"/>',
    d: 'Actos que provocan daño al cuerpo mediante la fuerza u otros medios.',
    e: 'Golpes, empujones, jalones o usar objetos para lastimar. Aunque no deje marcas, es violencia.' },
  { n: 'Sexual', i: '<path d="M12 21s-7-4.6-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.4-7 10-7 10z"/>',
    d: 'Actos que vulneran la libertad y autonomía sexual sin consentimiento.',
    e: 'Tocamientos no deseados, comentarios sexuales que incomodan o presión para tener relaciones. Sin consentimiento, no hay permiso.' },
  { n: 'Económica', i: '<circle cx="12" cy="12" r="9"/><path d="M14.5 9.2c-.6-.8-1.5-1.2-2.5-1.2-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.500 2c-1 0-1.900-.4-2.500-1.200M12 6.500v1.500m0 8v1.500"/>',
    d: 'Controlar o limitar los recursos económicos de una mujer.',
    e: 'Impedir que trabajes o estudies, quitarte tu dinero, negarte lo necesario para vivir o exigir cuentas de cada gasto.' },
  { n: 'Patrimonial', i: '<path d="M4 11l8-7 8 7v9H4zM10 20v-6h4v6"/>',
    d: 'Retener, destruir o quitar documentos, bienes u objetos personales.',
    e: 'Esconder tu identificación o acta de nacimiento, romper tu celular o tus útiles, o vender tus cosas sin permiso.' },
  { n: 'Digital', i: '<rect x="7" y="2.500" width="10" height="19" rx="2.500"/><path d="M11 18.500h2"/>',
    d: 'Agresiones mediante tecnologías: difundir contenido íntimo sin consentimiento, entre otras.',
    e: 'Compartir fotos o videos íntimos sin permiso, acosar por redes, crear perfiles falsos para dañar o revisar tu celular a la fuerza.' },
  { n: 'Obstétrica', i: '<path d="M12 4a3 3 0 100 6 3 3 0 000-6zM6 21c0-4 2.500-7 6-7s6 3 6 7"/>',
    d: 'Maltrato y vulneración de la autonomía durante la atención del embarazo, parto o posparto.',
    e: 'Ignorar tu opinión, regañarte o burlarte durante el parto, o hacer procedimientos sin explicarte ni pedir tu consentimiento.' },
  { n: 'Mediática', i: '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8M12 17v4"/>',
    d: 'Difusión de contenidos que promueven estereotipos sexistas o violencia contra las mujeres.',
    e: 'Anuncios, programas o publicaciones que presentan a las mujeres como objetos o que justifican las agresiones.' }
];

const PALABRAS = [
  ['LIBERTAD', 'Poder decidir sobre nuestra propia vida.'],
  ['RESPETO', 'Reconocer la dignidad y los derechos de todas.'],
  ['IGUALDAD', 'Las mismas oportunidades y derechos.'],
  ['DIGNIDAD', 'Toda persona merece un trato humano.'],
  ['AUTONOMÍA', 'Tener libertad para tomar decisiones.'],
  ['SEGURIDAD', 'Vivir sin amenazas ni violencia.'],
  ['JUSTICIA', 'Acceso a protección y reparación.'],
  ['SORORIDAD', 'Apoyo y solidaridad entre mujeres.']
];

const FRASES = [
  'Mi voz merece ser escuchada.',
  'El respeto no es negociable.',
  'Ninguna forma de violencia es normal.',
  'Todas tenemos derecho a decidir.',
  'Vivir sin miedo es un derecho, no un privilegio.'
];

/* ---- Utilidades ---- */
const $ = (s, c = document) => c.querySelector(s);
document.documentElement.classList.add('js');

/* ---- Render de tarjetas, palabras y frases ---- */
$('#rejilla-tipos').innerHTML = TIPOS.map(t => `
  <button class="tipo rev" aria-expanded="false">
    <svg viewBox="0 0 24 24" aria-hidden="true">${t.i}</svg>
    <h3>${t.n}</h3><p>${t.d}</p>
    <span class="ej"><b>Ejemplos:</b> ${t.e}</span>
    <span class="mas" aria-hidden="true">Ver ejemplos</span>
  </button>`).join('');

$('#palabras-lista').innerHTML = PALABRAS.map(([p, d]) =>
  `<button class="palabra rev" aria-expanded="false">${p}<small>${d}</small></button>`).join('');

$('#frases-lista').innerHTML = FRASES.map(f => `<li class="rev">${f}</li>`).join('');

/* Alternar tarjetas y palabras (accesible: aria-expanded) */
document.addEventListener('click', e => {
  const b = e.target.closest('.tipo, .palabra');
  if (!b) return;
  const abierto = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', String(!abierto));
  const mas = $('.mas', b);
  if (mas) mas.textContent = abierto ? 'Ver ejemplos' : 'Ocultar ejemplos';
});

/* ---- Teléfono municipal: solo visible si fue verificado ---- */
if (CONFIG.municipalVerificado) $('#tel-municipal').hidden = false;

/* ---- Menú móvil ---- */
const menu = $('#menu'), burger = $('#burger');
burger.addEventListener('click', () => {
  const abre = !menu.classList.contains('abierto');
  menu.classList.toggle('abierto', abre);
  burger.setAttribute('aria-expanded', String(abre));
  burger.setAttribute('aria-label', abre ? 'Cerrar menú' : 'Abrir menú');
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') { menu.classList.remove('abierto'); burger.setAttribute('aria-expanded', 'false'); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menu.classList.contains('abierto')) { menu.classList.remove('abierto'); burger.focus(); }
});

/* ---- Barra de progreso de lectura ---- */
const barra = $('#progreso');
function progreso() {
  const total = document.documentElement.scrollHeight - innerHeight;
  const p = total > 0 ? Math.min(1, scrollY / total) : 0;
  barra.style.transform = `scaleX(${p})`;
  barra.setAttribute('aria-valuenow', Math.round(p * 100));
}
addEventListener('scroll', progreso, { passive: true });
progreso();

/* ---- Tema claro/oscuro (se recuerda la preferencia en este dispositivo) ---- */
const raiz = document.documentElement, btnTema = $('#tema');
function aplicarTema(t) {
  raiz.dataset.theme = t;
  btnTema.setAttribute('aria-pressed', String(t === 'dark'));
}
let guardado = null;
try { guardado = localStorage.getItem('lsm-tema'); } catch (_) {}
aplicarTema(guardado || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
btnTema.addEventListener('click', () => {
  const t = raiz.dataset.theme === 'dark' ? 'light' : 'dark';
  aplicarTema(t);
  try { localStorage.setItem('lsm-tema', t); } catch (_) {}
});

/* ---- Tamaño de texto ---- */
let tam = 17; // px
try { tam = parseInt(localStorage.getItem('lsm-tam')) || 17; } catch (_) {}
function ponerTam(n) {
  tam = Math.max(14, Math.min(24, n));
  raiz.style.setProperty('--base', tam + 'px');
  try { localStorage.setItem('lsm-tam', tam); } catch (_) {}
}
ponerTam(tam);
$('#aMas').addEventListener('click', () => ponerTam(tam + 2));
$('#aMenos').addEventListener('click', () => ponerTam(tam - 2));

/* ---- Aparición suave al desplazarse ---- */
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(x => {
    if (x.isIntersecting) { x.target.classList.add('vis'); io.unobserve(x.target); }
  }), { threshold: 0.15 });
  document.querySelectorAll('.rev').forEach(el => io.observe(el));
} else {
  document.querySelectorAll('.rev').forEach(el => el.classList.add('vis'));
}

/* ---- Salida rápida: reemplaza la página por otra neutra ---- */
$('#salir').addEventListener('click', () => location.replace(CONFIG.salidaRapida));
