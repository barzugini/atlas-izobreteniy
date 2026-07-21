"use client";

import { useState } from "react";

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

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const current = categories[selectedCategory];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const openCategory = (index: number) => {
    setSelectedCategory(index);
    setSelectedBranch(0);
    window.setTimeout(() => scrollTo("map"), 40);
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
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">История человеческой мысли</p>
          <h1>Атлас<br />изобретений</h1>
          <p className="subtitle">Путь от первого огня до искусственного интеллекта</p>
          <button className="start-button" type="button" onClick={() => scrollTo("categories")}>
            <span className="start-node" /> Начать исследование <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="hero-constellation" aria-label="Схематичная карта знаний: 12 областей, 48 ветвей и 192 узла">
          <svg className="constellation-lines" viewBox="0 0 720 620" aria-hidden="true">
            <g className="orbit-rings"><circle cx="348" cy="310" r="94" /><circle cx="348" cy="310" r="192" /><circle cx="348" cy="310" r="276" /></g>
            <g className="network-paths">
              <path d="M348 310 C310 254 256 208 186 150" /><path d="M348 310 C353 233 350 169 356 72" />
              <path d="M348 310 C407 257 464 216 552 155" /><path d="M348 310 C429 300 511 286 640 282" />
              <path d="M348 310 C412 359 479 401 578 462" /><path d="M348 310 C370 388 389 456 414 550" />
              <path d="M348 310 C296 383 252 438 186 518" /><path d="M348 310 C262 342 194 362 86 390" />
              <path d="M348 310 C274 286 206 267 92 238" /><path d="M186 150 C241 124 297 100 356 72" />
              <path d="M552 155 C580 198 611 239 640 282" /><path d="M186 518 C270 532 341 542 414 550" />
              <path d="M92 238 C86 289 84 339 86 390" /><path d="M578 462 C526 502 472 531 414 550" />
            </g>
            <g className="network-nodes">
              <circle className="origin-node" cx="348" cy="310" r="10" />
              <circle cx="186" cy="150" r="6" /><circle cx="356" cy="72" r="6" /><circle cx="552" cy="155" r="6" />
              <circle cx="640" cy="282" r="6" /><circle cx="578" cy="462" r="6" /><circle cx="414" cy="550" r="6" />
              <circle cx="186" cy="518" r="6" /><circle cx="86" cy="390" r="6" /><circle cx="92" cy="238" r="6" />
              <circle cx="274" cy="223" r="4" /><circle cx="453" cy="335" r="4" /><circle cx="300" cy="407" r="4" />
            </g>
          </svg>
          <div className="constellation-core" aria-hidden="true"><span /></div>
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
