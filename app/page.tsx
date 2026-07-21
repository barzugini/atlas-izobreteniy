"use client";

import { useRef, useState } from "react";

type Branch = { name: string; items: string[] };
type Category = {
  number: string;
  title: string;
  symbol: string;
  branches: Branch[];
  related: number[];
};

const categories: Category[] = [
  {
    number: "01", title: "Энергия и тепло", symbol: "☼", related: [5, 6, 7, 9],
    branches: [
      { name: "Огонь и тепло", items: ["Освоение огня", "Очаг", "Печь", "Паровой котёл"] },
      { name: "Механическая энергия", items: ["Рычаг", "Водяное колесо", "Ветряная мельница", "Паровая машина"] },
      { name: "Электричество", items: ["Электрогенератор", "Трансформатор", "Электродвигатель", "Электрическая сеть"] },
      { name: "Современная энергетика", items: ["Двигатель внутреннего сгорания", "Ядерный реактор", "Солнечная батарея", "Литий-ионный аккумулятор"] },
    ],
  },
  {
    number: "02", title: "Связь и медиа", symbol: "⌁", related: [7, 8, 9, 11],
    branches: [
      { name: "Запись знаний", items: ["Письменность", "Алфавит", "Бумага", "Переплётная книга"] },
      { name: "Печать и изображение", items: ["Книгопечатание", "Литография", "Фотография", "Кинематограф"] },
      { name: "Связь на расстоянии", items: ["Телеграф", "Телефон", "Радио", "Телевидение"] },
      { name: "Цифровые сети", items: ["Волоконная оптика", "Спутниковая связь", "Интернет", "Мобильная связь"] },
    ],
  },
  {
    number: "03", title: "Медицина и биотехнологии", symbol: "⚕", related: [4, 8, 9, 10],
    branches: [
      { name: "Диагностика", items: ["Анатомический атлас", "Стетоскоп", "Рентгеновский аппарат", "Магнитно-резонансная томография"] },
      { name: "Инфекции и здоровье", items: ["Санитария", "Вакцинация", "Антисептика", "Антибиотики"] },
      { name: "Хирургия и поддержка", items: ["Анестезия", "Переливание крови", "Кардиостимулятор", "Трансплантация органов"] },
      { name: "Генетические технологии", items: ["Структура ДНК", "ПЦР", "Секвенирование генома", "CRISPR"] },
    ],
  },
  {
    number: "04", title: "Транспорт и навигация", symbol: "⌖", related: [0, 6, 9, 10],
    branches: [
      { name: "Наземный транспорт", items: ["Колесо", "Повозка", "Велосипед", "Автомобиль"] },
      { name: "Водный транспорт", items: ["Парус", "Корабельный руль", "Пароход", "Подводная лодка"] },
      { name: "Воздушный транспорт", items: ["Воздушный шар", "Самолёт", "Вертолёт", "Реактивный двигатель"] },
      { name: "Навигация и космос", items: ["Астролябия", "Морской хронометр", "Ракета", "GPS"] },
    ],
  },
  {
    number: "05", title: "Пища и вода", symbol: "◇", related: [0, 5, 6, 9],
    branches: [
      { name: "Земледелие", items: ["Плуг", "Орошение", "Севооборот", "Трактор"] },
      { name: "Приготовление пищи", items: ["Очаг", "Хлебная печь", "Ферментация", "Скороварка"] },
      { name: "Хранение продуктов", items: ["Соление", "Консервирование", "Пастеризация", "Холодильник"] },
      { name: "Доступ к воде", items: ["Колодец", "Акведук", "Фильтрация воды", "Опреснение"] },
    ],
  },
  {
    number: "06", title: "Материалы и производство", symbol: "⬡", related: [0, 4, 6, 7],
    branches: [
      { name: "Первые материалы", items: ["Керамика", "Стекло", "Бумага", "Бетон"] },
      { name: "Металлы", items: ["Бронза", "Железо и сталь", "Алюминий", "Нержавеющая сталь"] },
      { name: "Синтетические материалы", items: ["Вулканизированная резина", "Пластмасса", "Нейлон", "Композиты"] },
      { name: "Способы производства", items: ["Токарный станок", "Прядильная машина", "Конвейер", "3D-печать"] },
    ],
  },
  {
    number: "07", title: "Жилище и города", symbol: "▱", related: [0, 4, 5, 11],
    branches: [
      { name: "Здания", items: ["Кирпич", "Арка", "Железобетон", "Небоскрёб"] },
      { name: "Городская инфраструктура", items: ["Мощёная дорога", "Мост", "Канализация", "Метрополитен"] },
      { name: "Климат и воздух", items: ["Дымоход", "Центральное отопление", "Вентиляция", "Кондиционер"] },
      { name: "Освещение и удобство", items: ["Масляная лампа", "Электрическая лампа", "Лифт", "Умный дом"] },
    ],
  },
  {
    number: "08", title: "Вычисления и ИИ", symbol: "⌘", related: [1, 2, 5, 8],
    branches: [
      { name: "Счёт и вычисления", items: ["Счёты", "Логарифмическая линейка", "Механический калькулятор", "Электронный калькулятор"] },
      { name: "Вычислительные машины", items: ["Машина Паскаля", "Аналитическая машина", "Табулятор", "Электронный компьютер"] },
      { name: "Электроника", items: ["Электронная лампа", "Транзистор", "Интегральная схема", "Микропроцессор"] },
      { name: "Программы и интеллект", items: ["Язык программирования", "Операционная система", "База данных", "Искусственный интеллект"] },
    ],
  },
  {
    number: "09", title: "Познание и измерения", symbol: "◎", related: [0, 2, 7, 9],
    branches: [
      { name: "Измерение времени", items: ["Солнечные часы", "Механические часы", "Маятниковые часы", "Атомные часы"] },
      { name: "Оптические приборы", items: ["Линза", "Телескоп", "Микроскоп", "Спектроскоп"] },
      { name: "Измерительные приборы", items: ["Термометр", "Барометр", "Сейсмограф", "Счётчик Гейгера"] },
      { name: "Картины мира", items: ["Гелиоцентрическая система", "Теория тяготения", "Теория относительности", "Квантовая механика"] },
    ],
  },
  {
    number: "10", title: "Земля, природа и космос", symbol: "✦", related: [2, 3, 4, 8],
    branches: [
      { name: "Исследование Земли", items: ["Картография", "Компас", "Эхолот", "Спутниковая съёмка"] },
      { name: "Возраст и строение планеты", items: ["Геологическая шкала", "Сейсмология", "Радиоуглеродный анализ", "Тектоника плит"] },
      { name: "Жизнь и природа", items: ["Биологическая систематика", "Теория эволюции", "Экология", "Генетика"] },
      { name: "Вселенная", items: ["Спектральный анализ звёзд", "Обнаружение невидимых планет", "Радиотелескоп", "Космический аппарат"] },
    ],
  },
  {
    number: "11", title: "Защита и безопасность", symbol: "△", related: [1, 3, 6, 7],
    branches: [
      { name: "Личная защита", items: ["Доспех", "Замок", "Крепость", "Сейф"] },
      { name: "Оружие", items: ["Лук", "Порох", "Огнестрельное оружие", "Управляемая ракета"] },
      { name: "Обнаружение и спасение", items: ["Радар", "Сонар", "Датчик дыма", "Спутниковая система спасения"] },
      { name: "Цифровая безопасность", items: ["Шифрование", "Биометрия", "Межсетевой экран", "Кибербезопасность"] },
    ],
  },
  {
    number: "12", title: "Быт, культура и общество", symbol: "◫", related: [1, 4, 6, 7],
    branches: [
      { name: "Домашний быт", items: ["Швейная игла", "Мебель", "Стиральная машина", "Пылесос"] },
      { name: "Одежда", items: ["Ткацкий станок", "Швейная машина", "Застёжка-молния", "Синтетическая ткань"] },
      { name: "Обмен и управление", items: ["Деньги", "Бухгалтерский учёт", "Банковское дело", "Страхование"] },
      { name: "Культура и обучение", items: ["Музыкальная нотация", "Школа", "Публичная библиотека", "Звукозапись"] },
    ],
  },
];

const constellationPositions = [
  { x: 360, y: 65 }, { x: 483, y: 98 }, { x: 572, y: 188 },
  { x: 605, y: 310 }, { x: 572, y: 433 }, { x: 483, y: 522 },
  { x: 360, y: 555 }, { x: 238, y: 522 }, { x: 148, y: 433 },
  { x: 115, y: 310 }, { x: 148, y: 188 }, { x: 238, y: 98 },
];

const constellationStarLinks = constellationPositions.map((_, source) => ({
  source,
  target: (source + 5) % constellationPositions.length,
}));

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploredCategory, setExploredCategory] = useState<number | null>(null);
  const touchPreviewCategory = useRef<number | null>(null);
  const current = categories[selectedCategory];
  const heroCategoryIndex = exploredCategory ?? selectedCategory;
  const heroCategory = categories[heroCategoryIndex];
  const highlightedCategories = new Set([heroCategoryIndex, ...heroCategory.related]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openCategory = (index: number) => {
    setSelectedCategory(index);
    setSelectedBranch(0);
    setMenuOpen(false);
    window.setTimeout(() => scrollTo("map"), 40);
  };

  const goTo = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  const openConstellationCategory = (index: number) => {
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (isTouch && touchPreviewCategory.current !== index) {
      touchPreviewCategory.current = index;
      setExploredCategory(index);
      return;
    }

    touchPreviewCategory.current = null;
    openCategory(index);
  };

  return (
    <main>
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Атлас — на главную">АТЛАС</a>
        <nav aria-label="Основная навигация">
          <a href="#categories">Категории</a>
          <a href="#map">Карта знаний</a>
        </nav>
        <button className="about-button" type="button" onClick={() => setAboutOpen(true)}>О проекте</button>
        <button
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-menu" aria-hidden={!menuOpen}>
          <button type="button" onClick={() => goTo("categories")}><span>01</span>Категории</button>
          <button type="button" onClick={() => goTo("map")}><span>02</span>Карта знаний</button>
          <button type="button" onClick={() => { setMenuOpen(false); setAboutOpen(true); }}><span>03</span>О проекте</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">История человеческой мысли</p>
          <h1>Атлас<br />изобретений</h1>
          <p className="subtitle">Путь от первого огня до искусственного интеллекта</p>
          <button className="start-button" type="button" onClick={() => goTo("categories")}>
            <span className="start-node" /> Начать исследование <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hero-constellation" aria-label="Интерактивная карта двенадцати областей изобретений">
          <svg className="constellation-lines" viewBox="0 0 720 620" aria-hidden="true">
            <g className="orbit-rings"><circle cx="360" cy="310" r="100" /><circle cx="360" cy="310" r="180" /><circle cx="360" cy="310" r="245" /></g>
            <g className="network-paths network-star">
              {constellationStarLinks.map(({ source, target }) => {
                const from = constellationPositions[source];
                const to = constellationPositions[target];
                return <line key={`star-${source}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
              })}
            </g>
            <g className="network-paths network-spokes">
              {constellationPositions.map((position, index) => (
                <line
                  key={`spoke-${index}`}
                  className={highlightedCategories.has(index) ? "is-highlighted" : "is-dimmed"}
                  x1="360" y1="310" x2={position.x} y2={position.y}
                />
              ))}
            </g>
            <g className="network-paths network-relations">
              {heroCategory.related.map((target) => {
                const from = constellationPositions[heroCategoryIndex];
                const to = constellationPositions[target];
                return <line key={`relation-${heroCategoryIndex}-${target}`} className="is-active" x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
              })}
            </g>
          </svg>
          <div className="constellation-core" aria-hidden="true"><span>А</span></div>
          <div className="constellation-nodes">
            {categories.map((category, index) => {
              const position = constellationPositions[index];
              const isActive = index === heroCategoryIndex;
              const isRelated = heroCategory.related.includes(index);
              return (
                <button
                  className={`constellation-node ${isActive ? "is-active" : ""} ${isRelated ? "is-related" : ""} ${!highlightedCategories.has(index) ? "is-dimmed" : ""}`}
                  style={{ left: `${(position.x / 720) * 100}%`, top: `${(position.y / 620) * 100}%` }}
                  type="button"
                  key={category.number}
                  aria-label={`${category.number} — ${category.title}. Перейти к категории`}
                  aria-pressed={isActive}
                  onMouseEnter={() => setExploredCategory(index)}
                  onMouseLeave={() => setExploredCategory(null)}
                  onFocus={() => setExploredCategory(index)}
                  onBlur={() => setExploredCategory(null)}
                  onClick={() => openConstellationCategory(index)}
                >
                  <span className="constellation-node-core" aria-hidden="true">{category.symbol}</span>
                  <span className="constellation-node-label"><b>{category.number}</b>{category.title}</span>
                </button>
              );
            })}
          </div>
          <div className="constellation-caption" aria-live="polite">
            <span>{heroCategory.number}</span>
            <strong>{heroCategory.title}</strong>
            <small>Связанных областей: {heroCategory.related.length}</small>
          </div>
          <div className="atlas-stats">
            <span><b>12</b> областей</span><span><b>48</b> ветвей</span><span><b>192</b> узла</span>
          </div>
        </div>
      </section>

      <section className="categories-section" id="categories">
        <div className="section-heading">
          <p className="eyebrow">Двенадцать областей</p><h2>Выберите отправную точку</h2>
          <p>Каждая область раскрывается в ветви, технологии, открытия и конкретные изобретения.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <button className={`category-card ${index === selectedCategory ? "is-active" : ""}`} key={category.number} type="button" onClick={() => openCategory(index)}>
              <span className="category-number">{category.number}</span><span className="category-symbol" aria-hidden="true">{category.symbol}</span>
              <span className="category-title">{category.title}</span><span className="category-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </section>

      <section className="knowledge-map" id="map" aria-labelledby="map-title">
        <div className="map-toolbar">
          <p className="breadcrumbs"><span>Атлас</span><i>—</i><span>{current.number}</span><i>—</i><strong>{current.title}</strong></p>
          <p className="map-counter">4 ветви · 16 узлов</p>
        </div>
        <div className="map-heading">
          <span className="map-heading-symbol" aria-hidden="true">{current.symbol}</span>
          <div><p className="eyebrow">Карта категории {current.number}</p><h2 id="map-title">{current.title}</h2></div>
        </div>

        <div className="tree-layout">
          <div className="root-column" aria-hidden="true"><span className="root-orbit"><b>{current.symbol}</b></span><span className="root-line" /></div>
          <div className="branch-column" role="tablist" aria-label="Ветви категории">
            {current.branches.map((branch, index) => (
              <button key={branch.name} type="button" role="tab" aria-selected={selectedBranch === index} className={`branch-node ${selectedBranch === index ? "is-active" : ""}`} onClick={() => setSelectedBranch(index)}>
                <span>0{index + 1}</span><strong>{branch.name}</strong><i aria-hidden="true">→</i>
              </button>
            ))}
          </div>
          <div className="leaf-panel" role="tabpanel">
            <p className="leaf-label">{current.number}.{selectedBranch + 1} · {current.branches[selectedBranch].name}</p>
            <div className="leaf-list">
              {current.branches[selectedBranch].items.map((item, index) => (
                <div className="leaf-node" key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true">↗</i>
                </div>
              ))}
            </div>
            <p className="future-note">Карточки узлов будут наполнены на следующем этапе.</p>
          </div>
        </div>

        <div className="related-row">
          <span>Связанные области</span>
          <div>{current.related.map((index) => <button type="button" key={categories[index].number} onClick={() => openCategory(index)}>{categories[index].number} · {categories[index].title}</button>)}</div>
        </div>
      </section>

      <footer><a className="wordmark" href="#top">АТЛАС</a><p>Карта изобретений, открытий и технологий человечества</p><button type="button" onClick={() => scrollTo("top")}>Наверх ↑</button></footer>

      {aboutOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setAboutOpen(false)}>
          <section className="about-modal" role="dialog" aria-modal="true" aria-labelledby="about-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" type="button" aria-label="Закрыть" onClick={() => setAboutOpen(false)}>×</button>
            <p className="eyebrow">О проекте</p><h2 id="about-title">Не список, а карта развития</h2>
            <p>Атлас показывает, как человеческие потребности, открытия и технологии разветвлялись и влияли друг на друга.</p>
            <p className="modal-status">Сейчас построена структура: 12 областей, 48 ветвей и 192 узла.</p>
          </section>
        </div>
      )}
    </main>
  );
}
