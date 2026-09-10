import {useRef, useState} from 'react';
import type {Route} from './+types/_index';
import lumbreStyles from '~/styles/lumbre.css?url';

export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: lumbreStyles},
];
export const meta: Route.MetaFunction = () => [
  {title: 'Lumbre — Una luz para cada momento'},
  {
    name: 'description',
    content:
      'Descubre lámparas con carácter. Enciende la colección y encuentra la luz que hace de tu espacio un hogar.',
  },
];

const lamps = [
  {
    id: 0,
    name: 'Noma',
    category: 'De mesa',
    material: 'Metal · Terracota',
    price: 89990,
    tag: 'La favorita',
    dimensions: 'Ø 30 × 38 cm',
    description:
      'Una pequeña escultura de luz. Su silueta redondeada y su acabado terracota aportan calidez incluso cuando está apagada.',
    use: 'Para tu velador, una repisa o ese rincón que merece algo especial.',
  },
  {
    id: 1,
    name: 'Nube',
    category: 'De techo',
    material: 'Papel · Marfil',
    price: 69990,
    tag: 'Luz que abraza',
    dimensions: 'Ø 45 cm · Cable 150 cm',
    description:
      'Ligera como su nombre. El papel texturado suaviza la luz y dibuja una atmósfera serena sobre tu espacio.',
    use: 'Sobre la mesa del comedor o al centro de un dormitorio tranquilo.',
  },
  {
    id: 2,
    name: 'Savia',
    category: 'De pie',
    material: 'Madera · Lino natural',
    price: 159990,
    tag: '',
    dimensions: 'Ø 40 × 150 cm',
    description:
      'Madera de tono profundo y una pantalla de lino que filtra la luz. Una presencia cálida para acompañar tus pausas.',
    use: 'Junto a tu sillón favorito, para conversar o bajar el ritmo.',
  },
  {
    id: 3,
    name: 'Aura',
    category: 'De pared',
    material: 'Travertino · Arena',
    price: 79990,
    tag: 'Pura textura',
    dimensions: '12 × 10 × 28 cm',
    description:
      'La belleza de la piedra y una luz indirecta que baña el muro. Una pieza discreta que transforma el ambiente.',
    use: 'En un pasillo, junto a la cama o para destacar una pared.',
  },
] as const;
type Lamp = (typeof lamps)[number];
const categories = ['Todas', 'De mesa', 'De techo', 'De pie', 'De pared'];
const money = (value: number) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(value);

function Icon({
  name,
  size = 20,
}: {
  name: 'sun' | 'arrow' | 'bag' | 'close' | 'plus' | 'minus';
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === 'sun' && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </>
      )}
      {name === 'arrow' && <path d="M4 12h16m-6-6 6 6-6 6" />}
      {name === 'bag' && (
        <>
          <path d="M5 7h14l1 14H4L5 7Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </>
      )}
      {name === 'close' && <path d="m6 6 12 12M6 18 18 6" />}
      {name === 'plus' && <path d="M5 12h14M12 5v14" />}
      {name === 'minus' && <path d="M5 12h14" />}
    </svg>
  );
}

function LampPhoto({
  lamp,
  on,
  className = '',
}: {
  lamp: Lamp;
  on: boolean;
  className?: string;
}) {
  const position = `${lamp.id % 2 ? '100%' : '0%'} ${lamp.id > 1 ? '100%' : '0%'}`;
  // The generated sheet's horizontal divider is at y=598 of 1254 pixels.
  const backgroundSize = `200% ${lamp.id > 1 ? (1254 / 656) * 100 : (1254 / 598) * 100}%`;
  return (
    <div
      className={`lamp-photo ${className} ${on ? 'is-lit' : ''}`}
      role="img"
      aria-label={`Lámpara ${lamp.name} ${on ? 'encendida' : 'apagada'}`}
    >
      <span
        className="lamp-layer lamp-off"
        style={{backgroundPosition: position, backgroundSize}}
      />
      <span
        className="lamp-layer lamp-on"
        style={{backgroundPosition: position, backgroundSize}}
      />
    </div>
  );
}

export default function Homepage() {
  const [allOn, setAllOn] = useState(false);
  const [individual, setIndividual] = useState<Record<number, boolean>>({});
  const [category, setCategory] = useState('Todas');
  const [selected, setSelected] = useState<Lamp>(lamps[0]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [temperature, setTemperature] = useState(0);
  const productDialog = useRef<HTMLDialogElement>(null);
  const cartDialog = useRef<HTMLDialogElement>(null);
  const isOn = (id: number) => individual[id] ?? allOn;
  const toggleAll = () => {
    setAllOn(!allOn);
    setIndividual({});
  };
  const toggleLamp = (id: number) =>
    setIndividual((previous) => ({
      ...previous,
      [id]: !(previous[id] ?? allOn),
    }));
  const count = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const total = lamps.reduce(
    (sum, lamp) => sum + lamp.price * (cart[lamp.id] || 0),
    0,
  );
  const changeQuantity = (id: number, delta: number) =>
    setCart((previous) => ({
      ...previous,
      [id]: Math.max(0, (previous[id] || 0) + delta),
    }));
  const openProduct = (lamp: Lamp) => {
    setSelected(lamp);
    productDialog.current?.showModal();
  };
  const openCart = () => {
    productDialog.current?.close();
    cartDialog.current?.showModal();
  };
  const temperatures = [
    {
      label: 'Cálida',
      kelvin: '2700 K',
      title: 'Para bajar el ritmo.',
      text: 'Una luz dorada y envolvente para descansar, conversar y sentirte en casa. Ideal para el living y el dormitorio.',
    },
    {
      label: 'Neutra',
      kelvin: '4000 K',
      title: 'Para tu día a día.',
      text: 'Una luz equilibrada para cocinar, leer y acompañar tus actividades. Una buena opción para la cocina y los espacios de trabajo.',
    },
    {
      label: 'Fría',
      kelvin: '6500 K',
      title: 'Para ver cada detalle.',
      text: 'Una luz blanca de tono azulado para tareas que requieren precisión. Elige también la intensidad adecuada para tu espacio.',
    },
  ];

  return (
    <div id="inicio" className={`lumbre ${allOn ? 'night-mode' : ''}`}>
      <a className="skip-link" href="#coleccion">
        Ir a la colección
      </a>
      <div className="announcement">
        Una luz para cada momento. Un objeto para quedarte.
      </div>
      <header className="lumbre-header">
        <a className="wordmark" href="#inicio" aria-label="Lumbre, inicio">
          lumbre<span>✳</span>
        </a>
        <nav aria-label="Navegación principal">
          <a href="#coleccion">Lámparas</a>
          <a href="#guia">Encuentra tu luz</a>
          <a href="#nosotros">El universo Lumbre</a>
        </nav>
        <button
          className="bag-button"
          onClick={openCart}
          aria-label={`Abrir bolsa, ${count} productos`}
        >
          <Icon name="bag" />
          <span className="bag-label">Mi bolsa</span>
          <span className="bag-count">{count}</span>
        </button>
      </header>
      <main>
        <section className="lumbre-hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="tiny-star">✳</span> DISEÑO QUE SE SIENTE
            </span>
            <h1 id="hero-title">
              Hay luces.
              <br />Y hay <em>hogar.</em>
            </h1>
            <p>
              Piezas que transforman un rincón.
              <br />
              Luz que cambia cómo lo vives.
            </p>
            <a className="primary-button" href="#coleccion">
              Encuentra tu lámpara <Icon name="arrow" />
            </a>
            <div className="hero-switch">
              <button
                className="switch-control"
                role="switch"
                aria-checked={allOn}
                aria-label="Encender todas las lámparas"
                onClick={toggleAll}
              >
                <span />
              </button>
              <div>
                <strong>
                  {allOn
                    ? 'Así se siente encenderlas'
                    : 'Un clic. Otra atmósfera.'}
                </strong>
                <span>
                  {allOn
                    ? 'Apaga las luces para comparar'
                    : 'Enciende todas las lámparas'}
                </span>
              </div>
              <span className="hand-arrow">⤴</span>
            </div>
          </div>
          <div className={`hero-visual ${allOn ? 'is-lit' : ''}`}>
            <img
              className="hero-image hero-off"
              src="/images/lumbre/hero-off.png"
              alt="Lámpara terracota junto a un sillón en un espacio cálido y natural"
              fetchPriority="high"
            />
            <img
              className="hero-image hero-on"
              src="/images/lumbre/hero-on.png"
              alt=""
              aria-hidden="true"
            />
            <span className="scene-label">
              <span className={allOn ? 'status-dot active' : 'status-dot'} />
              {allOn ? 'EL MOMENTO DE ENCENDER' : 'LA BELLEZA DE LO COTIDIANO'}
            </span>
            <button
              className="hero-product"
              onClick={() => openProduct(lamps[0])}
            >
              <span>
                <small>CONOCE A</small>
                <strong>
                  Noma <span>— una pequeña gran luz</span>
                </strong>
              </span>
              <span className="circle-arrow">
                <Icon name="arrow" />
              </span>
            </button>
          </div>
        </section>
        <div className="values-strip">
          <span>
            <span>✳</span> Diseño con carácter
          </span>
          <span>
            <span>◌</span> Materiales que se sienten
          </span>
          <span>
            <Icon name="sun" size={18} /> Atmósferas para habitar
          </span>
          <span className="strip-note">Menos ruido. Más calidez.</span>
        </div>
        <section
          className="collection-section"
          id="coleccion"
          aria-labelledby="collection-title"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">TU PRÓXIMO RINCÓN FAVORITO</span>
              <h2 id="collection-title">
                Cada espacio, <em>su luz.</em>
              </h2>
            </div>
            <p>
              Formas simples. Personalidad propia.
              <br />
              Encuentra esa que se siente como tú.
            </p>
          </div>
          <div className="collection-toolbar">
            <div className="category-tabs" aria-label="Filtrar lámparas">
              {categories.map((item) => (
                <button
                  key={item}
                  aria-pressed={category === item}
                  className={category === item ? 'active' : ''}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="collection-switch"
              role="switch"
              aria-checked={allOn}
              onClick={toggleAll}
            >
              <Icon name="sun" size={17} />
              <span>{allOn ? 'Apagar todas' : 'Encender todas'}</span>
              <span className={`mini-switch ${allOn ? 'active' : ''}`}>
                <span />
              </span>
            </button>
          </div>
          <div className="lamp-grid">
            {lamps
              .filter(
                (lamp) => category === 'Todas' || lamp.category === category,
              )
              .map((lamp) => (
                <article className="lamp-card" key={lamp.id}>
                  <div className="product-visual">
                    <button
                      className="photo-button"
                      onClick={() => openProduct(lamp)}
                      aria-label={`Ver lámpara ${lamp.name}`}
                    >
                      <LampPhoto lamp={lamp} on={isOn(lamp.id)} />
                    </button>
                    {lamp.tag && (
                      <span className="product-tag">{lamp.tag}</span>
                    )}
                    <button
                      className={`individual-switch ${isOn(lamp.id) ? 'active' : ''}`}
                      aria-label={`${isOn(lamp.id) ? 'Apagar' : 'Encender'} ${lamp.name}`}
                      aria-pressed={isOn(lamp.id)}
                      onClick={() => toggleLamp(lamp.id)}
                    >
                      <Icon name="sun" size={19} />
                    </button>
                  </div>
                  <div className="product-heading">
                    <button onClick={() => openProduct(lamp)}>
                      <h3>{lamp.name}</h3>
                    </button>
                    <span>{money(lamp.price)}</span>
                  </div>
                  <div className="product-meta">
                    <span>
                      {lamp.category} · {lamp.material}
                    </span>
                    <span className={`color-dot color-${lamp.id}`} />
                  </div>
                </article>
              ))}
          </div>
          <p className="collection-note">
            <Icon name="sun" size={15} /> Toca el sol de cada lámpara y descubre
            cómo ilumina.
          </p>
        </section>
        <section
          className="light-guide"
          id="guia"
          aria-labelledby="guide-title"
        >
          <div className={`guide-scene temperature-${temperature}`}>
            <div className="guide-glow" />
            <div className="guide-pendant">
              <div className="pendant-cord" />
              <div className="pendant-shade" />
            </div>
            <span className="guide-scene-caption">
              LA MISMA HABITACIÓN.
              <br />
              OTRA SENSACIÓN.
            </span>
            <span className="kelvin-label">
              {temperatures[temperature].kelvin}
            </span>
          </div>
          <div className="guide-copy">
            <span className="eyebrow">UN POCO DE LUZ SOBRE LA LUZ</span>
            <h2 id="guide-title">
              No solo ilumina.
              <br />
              <em>Te hace sentir.</em>
            </h2>
            <p>
              El tono de la luz cambia la forma de vivir un espacio. Prueba y
              encuentra tu momento.
            </p>
            <div
              className="temperature-tabs"
              aria-label="Temperatura de la luz"
            >
              {temperatures.map((item, index) => (
                <button
                  key={item.label}
                  aria-pressed={temperature === index}
                  onClick={() => setTemperature(index)}
                  className={temperature === index ? 'active' : ''}
                >
                  <span />
                  {item.label}
                  <small>{item.kelvin}</small>
                </button>
              ))}
            </div>
            <div className="temperature-description" aria-live="polite">
              <h3>{temperatures[temperature].title}</h3>
              <p>{temperatures[temperature].text}</p>
            </div>
            <small className="guide-disclaimer">
              Simulación orientativa: el resultado depende de la ampolleta y del
              espacio.
            </small>
          </div>
        </section>
        <section className="brand-story" id="nosotros">
          <span className="tiny-star">✳</span>
          <span className="eyebrow">EL UNIVERSO LUMBRE</span>
          <h2>
            Creemos en los objetos que
            <br />
            hacen de un lugar <em>tu lugar.</em>
          </h2>
          <p>
            En la luz de una sobremesa. En ese último capítulo.
            <br />
            En volver, encender y sentir que ya estás en casa.
          </p>
          <a href="#coleccion">
            Encuentra la tuya <Icon name="arrow" size={18} />
          </a>
        </section>
      </main>
      <footer className="lumbre-footer">
        <a className="wordmark" href="#inicio">
          lumbre<span>✳</span>
        </a>
        <p>Una forma más cálida de habitar.</p>
        <a href="#coleccion">
          Explorar la colección <Icon name="arrow" size={16} />
        </a>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Lumbre</span>
          <span>
            Catálogo de demostración · Imágenes y precios de ejemplo · Sin
            compras reales
          </span>
          <span>Hecho para encender.</span>
        </div>
      </footer>
      <dialog
        ref={productDialog}
        className="lumbre-dialog product-dialog"
        aria-labelledby="product-dialog-title"
      >
        <button
          className="dialog-close"
          aria-label="Cerrar producto"
          onClick={() => productDialog.current?.close()}
        >
          <Icon name="close" />
        </button>
        <div className="product-dialog-grid">
          <div className="dialog-photo">
            <LampPhoto lamp={selected} on={isOn(selected.id)} />
            <button
              className="collection-switch"
              onClick={() => toggleLamp(selected.id)}
              aria-pressed={isOn(selected.id)}
            >
              <Icon name="sun" />
              {isOn(selected.id) ? 'Apagar lámpara' : 'Encender lámpara'}
            </button>
          </div>
          <div className="product-dialog-copy">
            <span className="eyebrow">
              {selected.category} · COLECCIÓN LUMBRE
            </span>
            <h2 id="product-dialog-title">{selected.name}</h2>
            <span className="dialog-price">{money(selected.price)}</span>
            <p>{selected.description}</p>
            <dl>
              <div>
                <dt>Material y acabado</dt>
                <dd>{selected.material}</dd>
              </div>
              <div>
                <dt>Medidas de referencia</dt>
                <dd>{selected.dimensions}</dd>
              </div>
              <div>
                <dt>Su lugar ideal</dt>
                <dd>{selected.use}</dd>
              </div>
            </dl>
            <button
              className="primary-button"
              onClick={() => {
                changeQuantity(selected.id, 1);
                openCart();
              }}
            >
              Agregar a la bolsa <Icon name="plus" />
            </button>
            <small>
              Producto de prueba. Imágenes, medidas y precios ilustrativos.
            </small>
          </div>
        </div>
      </dialog>
      <dialog
        ref={cartDialog}
        className="lumbre-dialog cart-dialog"
        aria-labelledby="cart-dialog-title"
      >
        <button
          className="dialog-close"
          aria-label="Cerrar bolsa"
          onClick={() => cartDialog.current?.close()}
        >
          <Icon name="close" />
        </button>
        <span className="eyebrow">TUS PRÓXIMAS LUCES</span>
        <h2 id="cart-dialog-title">
          Mi bolsa <span>({count})</span>
        </h2>
        {count === 0 ? (
          <div className="empty-bag">
            <Icon name="bag" size={40} />
            <h3>Un espacio para tu próxima luz.</h3>
            <p>Explora la colección y agrega tu favorita.</p>
            <button
              className="primary-button"
              onClick={() => {
                cartDialog.current?.close();
                document
                  .getElementById('coleccion')
                  ?.scrollIntoView({behavior: 'smooth'});
              }}
            >
              Descubrir lámparas <Icon name="arrow" />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {lamps
                .filter((lamp) => cart[lamp.id] > 0)
                .map((lamp) => (
                  <div className="demo-cart-item" key={lamp.id}>
                    <LampPhoto lamp={lamp} on={isOn(lamp.id)} />
                    <div>
                      <h3>{lamp.name}</h3>
                      <p>{lamp.category}</p>
                      <div className="quantity-control">
                        <button
                          aria-label={`Quitar una ${lamp.name}`}
                          onClick={() => changeQuantity(lamp.id, -1)}
                        >
                          <Icon name="minus" size={15} />
                        </button>
                        <span>{cart[lamp.id]}</span>
                        <button
                          aria-label={`Agregar una ${lamp.name}`}
                          onClick={() => changeQuantity(lamp.id, 1)}
                        >
                          <Icon name="plus" size={15} />
                        </button>
                      </div>
                    </div>
                    <strong>{money(lamp.price * cart[lamp.id])}</strong>
                  </div>
                ))}
            </div>
            <div className="cart-total">
              <span>Subtotal de ejemplo</span>
              <strong>{money(total)}</strong>
            </div>
            <p className="demo-notice">
              Esta bolsa es una demostración. Los pagos estarán disponibles
              cuando conectemos el catálogo real de Shopify.
            </p>
            <button
              className="primary-button"
              onClick={() => cartDialog.current?.close()}
            >
              Seguir explorando <Icon name="arrow" />
            </button>
          </>
        )}
      </dialog>
    </div>
  );
}
