"use client";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Copy, useLanguage } from "./language";
export type MenuKind = "food" | "drinks";
export type DialogKind = "menu" | "map" | null;
const menus = {
  food: ["/images/menus/food-1.jpg"],
  drinks: ["/images/menus/drinks-1.jpg", "/images/menus/drinks-2.jpg"],
};
function Dialog({
  open,
  id,
  title,
  className = "",
  onDismiss,
  children,
}: {
  open: boolean;
  id: string;
  title: string;
  className?: string;
  onDismiss: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (open && element && !element.open) element.showModal();
    if (!open && element?.open) element.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      id={id}
      className={`overlay-dialog ${className}`}
      aria-labelledby={title}
      onCancel={(event) => {
        event.preventDefault();
        onDismiss();
      }}
      onClose={() => {
        if (open) onDismiss();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const r = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          onDismiss();
      }}
    >
      {children}
    </dialog>
  );
}
function MenuContent({
  menu,
  onMenuChange,
  onDismiss,
}: {
  menu: MenuKind;
  onMenuChange: (value: MenuKind) => void;
  onDismiss: () => void;
}) {
  const { language } = useLanguage();
  const [zoomed, setZoomed] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const foodTab = useRef<HTMLButtonElement>(null);
  const drinksTab = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = viewport.current;
    element?.scrollTo({
      left: Math.max(0, (element.scrollWidth - element.clientWidth) / 2),
      top: 0,
    });
  }, [zoomed]);
  const other = menu === "food" ? "drinks" : "food";
  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const target =
      event.key === "Home" ? "food" : event.key === "End" ? "drinks" : other;
    setZoomed(false);
    onMenuChange(target);
    // The tab controls remain mounted while switching document pages.
    (target === "food" ? foodTab : drinksTab).current?.focus();
  }
  return (
    <div className="menu-viewer">
      <header className="viewer-toolbar">
        <div className="viewer-brand">
          <img
            src="/images/izakaya-logo.png"
            width={271}
            height={317}
            alt="Izakaya"
          />
          <h2 id="menu-title">
            <Copy id={menu === "food" ? "foodTitle" : "drinksTitle"} />
          </h2>
        </div>
        <div className="viewer-actions">
          <button
            type="button"
            id="menu-zoom"
            aria-pressed={zoomed}
            onClick={() => setZoomed((value) => !value)}
          >
            <Copy id={zoomed ? "zoomOut" : "zoomIn"} />
          </button>
          <button type="button" onClick={onDismiss}>
            <Copy id="close" />
          </button>
        </div>
      </header>
      <div
        className="viewer-tabs"
        role="tablist"
        aria-label={language === "en" ? "Choose menu" : "Velg meny"}
      >
        <button
          ref={foodTab}
          type="button"
          role="tab"
          id="food-tab"
          aria-controls="menu-pages"
          aria-selected={menu === "food"}
          tabIndex={menu === "food" ? 0 : -1}
          onClick={() => {
            setZoomed(false);
            onMenuChange("food");
          }}
          onKeyDown={handleTabKey}
        >
          <Copy id="foodTitle" />
        </button>
        <button
          ref={drinksTab}
          type="button"
          role="tab"
          id="drinks-tab"
          aria-controls="menu-pages"
          aria-selected={menu === "drinks"}
          tabIndex={menu === "drinks" ? 0 : -1}
          onClick={() => {
            setZoomed(false);
            onMenuChange("drinks");
          }}
          onKeyDown={handleTabKey}
        >
          <Copy id="drinksTitle" />
        </button>
      </div>
      <div className="menu-viewport" ref={viewport}>
        <MenuPages key={menu} menu={menu} zoomed={zoomed} />
      </div>
      <div className="viewer-navigation">
        <button
          type="button"
          onClick={() => {
            setZoomed(false);
            onMenuChange(other);
          }}
        >
          <Copy id="previousMenu" />
        </button>
        <span id="menu-count" aria-live="polite">
          {menu === "food" ? "01" : "02"} / 02
        </span>
        <button
          type="button"
          onClick={() => {
            setZoomed(false);
            onMenuChange(other);
          }}
        >
          <Copy id="nextMenu" />
        </button>
      </div>
    </div>
  );
}
function MenuPages({ menu, zoomed }: { menu: MenuKind; zoomed: boolean }) {
  const { language } = useLanguage();
  const title =
    menu === "food"
      ? language === "en"
        ? "Food menu"
        : "Matmeny"
      : language === "en"
        ? "Drinks"
        : "Drikke";
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.parentElement?.scrollTo({ left: 0, top: 0 });
  }, [menu]);
  return (
    <div
      ref={ref}
      id="menu-pages"
      className={`menu-pages${zoomed ? " is-zoomed" : ""}`}
      role="tabpanel"
      aria-labelledby={`${menu}-tab`}
      tabIndex={0}
    >
      {menus[menu].map((src, index) => (
        <figure key={src}>
          <img
            src={src}
            width={1158}
            height={1638}
            alt={`${title} — ${language === "en" ? "page" : "side"} ${index + 1}`}
          />
          {menus[menu].length > 1 ? (
            <figcaption>
              {language === "en" ? "Page" : "Side"} {index + 1} /{" "}
              {menus[menu].length}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}
export function Viewers({
  dialog,
  onDismiss,
  menu,
  onMenuChange,
}: {
  dialog: DialogKind;
  onDismiss: () => void;
  menu: MenuKind;
  onMenuChange: (value: MenuKind) => void;
}) {
  const { language } = useLanguage();
  return (
    <>
      <Dialog
        open={dialog === "menu"}
        id="menu-dialog"
        title="menu-title"
        onDismiss={onDismiss}
      >
        {dialog === "menu" ? (
          <MenuContent
            menu={menu}
            onMenuChange={onMenuChange}
            onDismiss={onDismiss}
          />
        ) : null}
      </Dialog>
      <Dialog
        open={dialog === "map"}
        id="map-dialog"
        title="map-title"
        className="map-dialog"
        onDismiss={onDismiss}
      >
        <div className="map-viewer">
          <header className="viewer-toolbar">
            <div>
              <h2 id="map-title">
                <Copy id="navFind" />
              </h2>
              <p>St. Olavs gate 7, 0165 Oslo</p>
            </div>
            <button type="button" onClick={onDismiss}>
              <Copy id="close" />
            </button>
          </header>
          <div className="map-frame">
            {dialog === "map" ? (
              <iframe
                title={
                  language === "en"
                    ? "Izakaya Oslo on Google Maps"
                    : "Izakaya Oslo på Google Maps"
                }
                src="https://www.google.com/maps?q=Izakaya%20St.%20Olavs%20gate%207%20Oslo&output=embed"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            ) : null}
          </div>
          <div className="map-footer">
            <span>
              <Copy id="walkin" />
            </span>
            <a
              className="text-link"
              href="https://www.google.com/maps/search/?api=1&query=Izakaya+St.+Olavs+gate+7+Oslo"
              target="_blank"
              rel="noopener"
            >
              <span>
                <Copy id="mapDirections" />
              </span>
              <svg className="arrow">
                <use href="#arrow" />
              </svg>
            </a>
          </div>
        </div>
      </Dialog>
    </>
  );
}
