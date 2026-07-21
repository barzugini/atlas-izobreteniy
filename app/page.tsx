"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { categories, getInventionByTitle } from "@/data/atlas";

const constellationPositions = [
  { x: 360, y: 65 }, { x: 483, y: 98 }, { x: 572, y: 188 },
  { x: 605, y: 310 }, { x: 572, y: 433 }, { x: 483, y: 522 },
  { x: 360, y: 555 }, { x: 238, y: 522 }, { x: 148, y: 433 },
  { x: 115, y: 310 }, { x: 148, y: 188 }, { x: 238, y: 98 },
];

const constellationStarPoints = Array.from({ length: 24 }, (_, index) => {
  const angle = (-90 + index * 15) * (Math.PI / 180);
  const radius = index % 2 === 0 ? 245 : 148;
  return `${360 + Math.cos(angle) * radius},${310 + Math.sin(angle) * radius}`;
}).join(" ");

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
            <polygon className="star-outline" points={constellationStarPoints} />
            <circle className="star-center-ring" cx="360" cy="310" r="62" />
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
                getInventionByTitle(item) ? (
                  <Link className="leaf-node is-linked" href={`/inventions/${getInventionByTitle(item)!.slug}/`} key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true">↗</i>
                  </Link>
                ) : (
                  <div className="leaf-node" key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><i aria-hidden="true">↗</i>
                  </div>
                )
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
