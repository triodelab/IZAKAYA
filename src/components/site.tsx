"use client";
import { useState } from "react";
import { Copy, LanguageProvider, useLanguage } from "./language";
import { Viewers, type MenuKind, type DialogKind } from "./viewers";

function SiteContent() {
  const { language, setLanguage } = useLanguage();
  const [dialog, setDialog] = useState<DialogKind>(null);
  const [menu, setMenu] = useState<MenuKind>("food");
  function openMenu(kind: MenuKind) {
    setMenu(kind);
    setDialog("menu");
  }
  return (
    <>
      <a className="skip" href="#main">
        <Copy id="skip" />
      </a>
      <header className="header">
        <a className="brand" href="#" aria-label="Izakaya Oslo">
          <img
            className="header-logo"
            src="/images/izakaya-logo.png"
            width="271"
            height="317"
            alt=""
          />
          <span>IZAKAYA / OSLO</span>
        </a>
        <nav aria-label={language === "en" ? "Main navigation" : "Hovedmeny"}>
          <button
            type="button"
            className="nav-button"
            onClick={() => openMenu("food")}
            aria-haspopup="dialog"
            aria-controls="menu-dialog"
          >
            <Copy id="navFood" />
          </button>
          <button
            type="button"
            className="nav-button"
            onClick={() => setDialog("map")}
            aria-haspopup="dialog"
            aria-controls="map-dialog"
          >
            <Copy id="navFind" />
          </button>
          <a href="#sporsmal">
            <Copy id="navFaq" />
          </a>
          <a
            className="instagram"
            href="https://www.instagram.com/izakayaoslo/"
            target="_blank"
            rel="noopener"
          >
            Instagram{" "}
            <svg className="arrow">
              <use href="#arrow" />
            </svg>
          </a>
        </nav>
        <div className="languages" aria-label="Language">
          <button
            type="button"
            onClick={() => setLanguage("nb")}
            aria-pressed={language === "nb"}
          >
            NO
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
          >
            EN
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="wordmark">
          <div className="masthead">
            <span className="sun" aria-hidden="true"></span>
            <h1 id="wordmark">IZAKAYA</h1>
            <span className="japanese" lang="ja">
              居酒屋
            </span>
          </div>
          <div className="hero-body" id="mat">
            <div className="intro">
              <h2>
                <Copy id="intro" />
              </h2>
              <div className="essentials">
                <button
                  type="button"
                  className="address-button"
                  onClick={() => setDialog("map")}
                  aria-haspopup="dialog"
                  aria-controls="map-dialog"
                >
                  St. Olavs gate 7, Oslo
                </button>
                <p>
                  <Copy id="hours" />
                </p>
                <p>
                  <Copy id="walkin" />
                </p>
              </div>
              <div className="menu-links">
                <button
                  type="button"
                  className="text-link"
                  onClick={() => openMenu("food")}
                  aria-haspopup="dialog"
                  aria-controls="menu-dialog"
                >
                  <span>
                    <Copy id="foodLink" />
                  </span>
                  <svg className="arrow">
                    <use href="#arrow" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => openMenu("drinks")}
                  aria-haspopup="dialog"
                  aria-controls="menu-dialog"
                >
                  <span>
                    <Copy id="drinkLink" />
                  </span>
                  <svg className="arrow">
                    <use href="#arrow" />
                  </svg>
                </button>
              </div>
            </div>
            <figure className="hero-photo">
              <img
                src="/images/izakaya-plate.jpg"
                alt="Gylne gyoza på en tallerken hos Izakaya"
                width="800"
                height="804"
                fetchPriority="high"
              />
              <figcaption>
                <span>
                  <Copy id="caption" />
                </span>
                <span>いただきます</span>
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="about" id="finn-oss" aria-labelledby="about-title">
          <figure className="interior">
            <img
              src="/images/izakaya-bar.jpg"
              alt="Izakayas bar med røde japanske lykter, sakeflasker og filmplakater"
              width="800"
              height="534"
              loading="lazy"
            />
            <figcaption>
              <Copy id="barCaption" />
            </figcaption>
          </figure>
          <div className="about-copy">
            <h2 id="about-title">
              <Copy id="aboutTitle" />
            </h2>
            <p>
              <Copy id="aboutBody" />
            </p>
            <p>
              <Copy id="aboutExtra" />
            </p>
            <button
              type="button"
              className="text-link"
              onClick={() => setDialog("map")}
              aria-haspopup="dialog"
              aria-controls="map-dialog"
            >
              <span>
                <Copy id="directions" />
              </span>
              <svg className="arrow">
                <use href="#arrow" />
              </svg>
            </button>
          </div>
        </section>
        <section className="faq" id="sporsmal" aria-labelledby="faq-title">
          <h2 id="faq-title">
            <Copy id="faqLabel" />
          </h2>
          <div className="questions">
            <details>
              <summary>
                <span>
                  <Copy id="q1" />
                </span>
                <span className="plus" aria-hidden="true"></span>
              </summary>
              <p>
                <Copy id="a1" />
              </p>
            </details>
            <details>
              <summary>
                <span>
                  <Copy id="q2" />
                </span>
                <span className="plus" aria-hidden="true"></span>
              </summary>
              <p>
                <Copy id="a2" />
              </p>
            </details>
            <details>
              <summary>
                <span>
                  <Copy id="q3" />
                </span>
                <span className="plus" aria-hidden="true"></span>
              </summary>
              <p>
                <Copy id="a3" />
              </p>
            </details>
            <details>
              <summary>
                <span>
                  <Copy id="q4" />
                </span>
                <span className="plus" aria-hidden="true"></span>
              </summary>
              <p>
                <Copy id="a4" />
              </p>
            </details>
            <details>
              <summary>
                <span>
                  <Copy id="q5" />
                </span>
                <span className="plus" aria-hidden="true"></span>
              </summary>
              <p>
                <Copy id="a5" />
              </p>
            </details>
          </div>
        </section>
        <section className="closing" aria-label="Instagram">
          <p>
            <Copy id="socialCopy" />
          </p>
          <a
            className="text-link"
            href="https://www.instagram.com/izakayaoslo/"
            target="_blank"
            rel="noopener"
          >
            @izakayaoslo{" "}
            <svg className="arrow">
              <use href="#arrow" />
            </svg>
          </a>
        </section>
      </main>
      <footer>
        <a className="brand footer-brand" href="#" aria-label="Izakaya Oslo">
          <img
            className="original-logo"
            src="/images/izakaya-logo.png"
            width="271"
            height="317"
            alt="Izakayas originale runde logo"
          />
          <span>IZAKAYA / OSLO</span>
        </a>
        <button
          type="button"
          className="address-button"
          onClick={() => setDialog("map")}
          aria-haspopup="dialog"
          aria-controls="map-dialog"
        >
          St. Olavs gate 7, 0165 Oslo
        </button>
        <span>
          <Copy id="footerHours" />
        </span>
        <a
          href="https://www.facebook.com/OsloIzakaya"
          target="_blank"
          rel="noopener"
        >
          Facebook{" "}
          <svg className="arrow">
            <use href="#arrow" />
          </svg>
        </a>
        <a href="#">
          <Copy id="top" />
        </a>
      </footer>

      <Viewers
        dialog={dialog}
        onDismiss={() => setDialog(null)}
        menu={menu}
        onMenuChange={setMenu}
      />
      <svg className="svg-defs" aria-hidden="true">
        <symbol id="arrow" viewBox="0 0 24 24">
          <path
            d="M5 19 19 5M5 5h14v14"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          />
        </symbol>
      </svg>
    </>
  );
}
export default function Site() {
  return (
    <LanguageProvider>
      <SiteContent />
    </LanguageProvider>
  );
}
