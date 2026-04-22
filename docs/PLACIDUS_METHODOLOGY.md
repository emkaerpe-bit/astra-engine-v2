# Projektowanie Profesjonalnej Aplikacji Astrologicznej w Środowisku Google Antigravity
## Architektura, Dane Efemerydalne i Implementacja Systemu Placidusa

### 1. Wprowadzenie do Paradygmatu Agentowego
Projekt zakłada wykorzystanie Google Antigravity jako środowiska IDE do budowy zaawansowanego silnika astrologicznego. Kluczowe jest rygorystyczne podejście do algorytmów mechaniki nieba i precyzyjne zarządzanie geolokalizacją.

### 2. Fundamenty Matematyczne: Swiss Ephemeris
- **Standard**: Biblioteka Swiss Ephemeris (Astrodienst).
- **Tryby obliczeń**: 
    - Moshier Ephemeris (lekki, wbudowany).
    - JPL Horizons (wysoka precyzja, wymaga plików `.se1`).
- **Pliki danych**: Rekomendowane użycie `sepl_18.se1` (planety główne) i `semo_18.se1` (księżyc).

### 3. System Domów Placidusa
- **Mechanika**: System zorientowany na czas, symulujący dobowe ruchy planetarne.
- **Implementacja**: Wywołanie `swe_houses()` z flagą `'p'`.
- **Krytyczne Uwagi (Pułapki)**:
    - **Tablica trzynastoelementowa**: Indeks `0` jest ignorowany. Domy 1-12 znajdują się pod indeksami 1-12.
    - **Ascendent**: Matematycznie tożsamy z wierzchołkiem 1. domu (indeks 1).
    - **Medium Coeli (MC)**: Tożsamy z wierzchołkiem 10. domu (indeks 10).

### 4. Ograniczenia i Fallback
- **Błąd szerokości geograficznej**: System Placidusa załamuje się powyżej 66° szerokości geograficznej (koła podbiegunowe).
- **Rozwiązanie**: Należy wdrożyć procedurę Error-Catch lub blokować żądania przekraczające te współrzędne, informując użytkownika o ograniczeniach geometrycznych systemu.

### 5. Logika Konwersji Czasu
- **UTC i Julian Day**: Silnik wymaga Daty Juliańskiej (JD). Należy integrować Delta T, aby kompensować spowolnienie ruchu obrotowego Ziemi.
- **Geolokalizacja**: Rekomendowane Geoapify, LocationIQ lub Mapbox do precyzyjnego pozycjonowania i automatycznego uzupełniania miast.

### 6. Wymagania Wyjściowe (Response Model)
Każda planeta musi zawierać:
- Bezwzględną pozycję (float).
- Sektor domu (wynik binarnego przeszukania siatki domów).
- Status **Retrograde** (jeśli prędkość radialna < 0.0).

### 7. Renderowanie Grafiki (UI)
- **Technologia**: Natywne SVG wewnątrz frameworka (Astro/React).
- **Pozycjonowanie**: Ascendent musi być sztywno przypięty do godziny 9:00 na geometrycznym kole (oś horyzontalna po lewej stronie).
