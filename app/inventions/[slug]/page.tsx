import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getInventionBySlug, inventions } from "@/data/atlas";
import styles from "./page.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return inventions.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getInventionBySlug(slug);

  return item
    ? { title: `${item.title} — Атлас изобретений`, description: item.lead }
    : { title: "Атлас изобретений" };
}

export default async function InventionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getInventionBySlug(slug);

  if (!item) notFound();

  const category = categories[item.categoryIndex];
  const branch = category.branches[item.branchIndex];
  const code = `${category.number}.${item.branchIndex + 1}.${String(item.itemIndex + 1).padStart(2, "0")}`;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.wordmark} href="/">АТЛАС</Link>
        <Link className={styles.backLink} href="/#map">← Вернуться к карте</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.breadcrumbs}>Атлас <i>—</i> {category.number} <i>—</i> {branch.name}</p>
          <p className={styles.eyebrow}>{code} · {item.kind}</p>
          <h1>{item.title}</h1>
          <p className={styles.lead}>{item.lead}</p>
        </div>

        <div className={styles.fireMark} aria-hidden="true">
          <span className={styles.fireOrbitOne} />
          <span className={styles.fireOrbitTwo} />
          <span className={styles.fireCore}>☼</span>
          <b>01</b>
        </div>

        <dl className={styles.facts}>
          <div><dt>Период</dt><dd>{item.period}</dd></div>
          <div><dt>География</dt><dd>{item.geography}</dd></div>
          <div><dt>Характер</dt><dd>{item.status}</dd></div>
        </dl>
      </section>

      <section className={styles.articleSection}>
        <p className={styles.sectionNumber}>01</p>
        <div className={styles.sectionTitle}><p className={styles.eyebrow}>Суть изменения</p><h2>Природная сила стала инструментом</h2></div>
        <div className={styles.prose}>{item.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className={styles.impactSection}>
        <div className={styles.sectionTitle}><p className={styles.eyebrow}>Последствия</p><h2>Что изменил огонь</h2></div>
        <div className={styles.impactGrid}>
          {item.impacts.map((impact, index) => (
            <article key={impact.title}><span>0{index + 1}</span><h3>{impact.title}</h3><p>{impact.text}</p></article>
          ))}
        </div>
      </section>

      <section className={styles.evidenceSection}>
        <div className={styles.sectionTitle}><p className={styles.eyebrow}>Археологические свидетельства</p><h2>Что мы действительно знаем</h2></div>
        <div className={styles.timeline}>
          {item.evidence.map((entry) => (
            <article key={entry.title}><time>{entry.date}</time><div><h3>{entry.title}</h3><p>{entry.text}</p></div></article>
          ))}
        </div>
      </section>

      <section className={styles.developmentSection}>
        <div className={styles.sectionTitle}><p className={styles.eyebrow}>Цепочка развития</p><h2>От стихии к очагу</h2></div>
        <div className={styles.developmentTrack}>
          {item.development.map((entry, index) => (
            <article key={entry.label} className={index === 1 ? styles.currentStep : ""}>
              <span>{entry.label}</span><h3>{entry.title}</h3><p>{entry.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sourcesSection}>
        <div className={styles.sectionTitle}><p className={styles.eyebrow}>Источники</p><h2>На чём основана статья</h2></div>
        <div className={styles.sourceList}>
          {item.sources.map((source, index) => (
            <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
              <span>0{index + 1}</span><strong>{source.title}</strong><small>{source.publisher}</small><i>↗</i>
            </a>
          ))}
        </div>
      </section>

      <nav className={styles.bottomNav} aria-label="Навигация по Атласу">
        <Link href="/#map"><span>Назад к ветви</span><strong>Огонь и тепло</strong></Link>
        <div><span>Следующий узел</span><strong>Очаг</strong><small>Страница появится следующей</small></div>
      </nav>
    </main>
  );
}

