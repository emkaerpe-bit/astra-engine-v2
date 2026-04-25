# Skill: Ad Astra SVG Graphics (Midnight Luxe Edition)

Ten moduł definiuje standardy tworzenia luksusowych grafik wektorowych (SVG) dla marki Ad Astra. Preferujemy czysty kod SVG nad rasteryzacją, aby zapewnić nieskończoną skalowalność i luksusową precyzję.

## 🎨 System Wizualny

- **Kolor Główny (Złoto):** `#D4AF37` (Satin Gold)
- **Kolor Tła (Midnight):** `#1F2226` (Deep Obsidian)
- **Akcenty:** `#F1E9DE` (Textured Cream)
- **Grubość Linii:** 1.0px - 1.5px (Fine Line Art)
- **Styl:** Neoromantyzm / Minimalistyczny Luksus

## 📐 Zasady Tworzenia

1. **Geometria:** Stosuj czyste formy geometryczne z subtelnymi przerwami w obrysach (`stroke-dasharray`), co dodaje lekkości.
2. **Precyzja:** Używaj `viewBox="0 0 24 24"` dla ikon i `0 0 100 100` dla większych elementów, zachowując całkowite wycentrowanie.
3. **Detale:** Dodawaj mikro-punkty (`<circle r="0.5" />`) w miejscach styku linii, co nadaje grafice charakteru biżuteryjnego.
4. **Filtry:** Stosuj `drop-shadow(0 0 8px rgba(212, 175, 55, 0.3))` dla uzyskania efektu delikatnego lśnienia złota.

## ⚡ Animacja (GSAP / CSS)

- **Drawing Effect:** Animuj `stroke-dashoffset` dla efektu "rysowania się" symboli na ekranie.
- **Ease:** Zawsze używaj `power3.out` lub `expo.out` dla luksusowego, spowolnionego ruchu.
- **Micro-interakcje:** Przy najechaniu (hover) glif powinien się delikatnie skalować (`1.1x`) i zwiększać intensywność blasku.

## 🛠️ Przykładowy Szablon

```html
<svg viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="1.2">
  <circle cx="12" cy="12" r="10" stroke-dasharray="1 3" />
  <path d="M12 8v8M8 12h8" stroke-linecap="round" />
  <circle cx="12" cy="12" r="0.5" fill="#D4AF37" />
</svg>
```

Używaj tego skilla przy każdej prośbie o tworzenie nowych elementów wizualnych, ikon zodiaku, faz księżyca czy separatorów sekcji.
