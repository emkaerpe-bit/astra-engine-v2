# **Strategie Refaktoryzacji i Protokoły Optymalizacji dla Systemu Astra Engine w Ekosystemie React i Vite**

Utrzymanie zaawansowanych systemów frontendowych, takich jak Astra Engine, wymaga podejścia wykraczającego poza doraźne poprawki błędów. W miarę wzrostu złożoności aplikacji, która przekracza progi 100 000 linii kodu, pojawia się zjawisko narastania długu technicznego, który może doprowadzić do załamania się projektu pod własnym ciężarem. Kluczowym elementem strategii przetrwania i dalszego rozwoju jest wdrożenie cyklicznych procesów refaktoryzacji i optymalizacji, delegowanych do autonomicznych agentów, takich jak Antigravity. Niniejszy raport stanowi kompleksowe kompendium wiedzy i zestaw instrukcji operacyjnych, które pozwalają przekształcić teoretyczne zasady czystego kodu w praktyczne działania optymalizacyjne, gwarantując wydajność, skalowalność i długoterminową utrzymywalność kodu.

## **Architektura Skalowalna: Implementacja Feature-Sliced Design**

Tradycyjne struktury projektów oparte na typach plików (foldery takie jak components, hooks, services) stają się nieefektywne w dużych skalach, prowadząc do niskiej spójności i wysokiego sprzężenia między modułami. Rozwiązaniem, które Antigravity musi wdrożyć w Astra Engine, jest Feature-Sliced Design (FSD) – metodologia organizująca kod wokół domeny biznesowej i odpowiedzialności, a nie technicznej roli pliku.  
Struktura FSD dzieli aplikację na warstwy o ściśle zdefiniowanej hierarchii. Najwyższa warstwa, "app", odpowiada za inicjalizację, routing i globalne dostawcy stanów. Warstwa "pages" zawiera kompozycje na poziomie widoków, które łączą mniejsze bloki funkcjonalne. "Widgets" to duże, reużywalne bloki interfejsu, podczas gdy "features" enkapsulują konkretne scenariusze interakcji użytkownika i procesy biznesowe. "Entities" reprezentują modele biznesowe, a "shared" zawiera najbardziej podstawowe narzędzia i komponenty UI. Kluczową zasadą, której agent musi przestrzegać, jest jednokierunkowy przepływ zależności: warstwy wyższe mogą importować z niższych, ale nigdy odwrotnie.

| Warstwa FSD | Odpowiedzialność Biznesowa | Przykładowa Zawartość |
| :---- | :---- | :---- |
| **app** | Konfiguracja globalna i inicjalizacja systemu. | Globalne style, providerzy (Query, Theme), router. |
| **pages** | Pełne widoki aplikacji (widok trasy). | Kompozycje widgetów dla konkretnych URL. |
| **widgets** | Złożone bloki UI składające się z wielu funkcji. | Navbar, Sidebar, tabele statystyk kampanii. |
| **features** | Konkretne akcje użytkownika (interakcje). | Formularz logowania, edytor postów, system filtrów. |
| **entities** | Modele danych i logika domenowa. | Logika użytkownika, kampanii, produktu. |
| **shared** | Generyczne narzędzia i reużywalne komponenty. | UI Kit, funkcje pomocnicze, stałe globalne. |

Przejście na taką strukturę pozwala na redukcję tzw. "prop drilling" i jasne zdefiniowanie granic odpowiedzialności. Antigravity powinno dążyć do sytuacji, w której każda zmiana funkcjonalna jest ograniczona do jednego "slice'a" wewnątrz warstwy, co minimalizuje ryzyko regresji w innych częściach systemu Astra Engine.

## **Optymalizacja Wydajności w Erze React 19 i Vite**

Wydajność aplikacji React w 2025 roku opiera się na eliminacji zbędnych renderowań i minimalizacji rozmiaru paczek dostarczanych do klienta. Jedną z najważniejszych zmian jest wprowadzenie React Compiler, który automatyzuje proces memoizacji, redukując potrzebę ręcznego stosowania useMemo i useCallback o 30-60%. Antigravity musi zidentyfikować fragmenty kodu, które mogą czerpać korzyści z tej automatyzacji, jednocześnie zachowując czystość funkcji komponentów.

### **Zarządzanie Renderowaniem i Stanem**

Częstym problemem w produkcji są kaskadowe renderowania, gdzie aktualizacja stanu w komponencie nadrzędnym wymusza odświeżenie całego drzewa potomnego, nawet jeśli ich właściwości nie uległy zmianie. Strategia optymalizacji musi obejmować selektywne subskrypcje stanu (np. za pomocą bibliotek takich jak Zustand lub Jotai) oraz dzielenie kontekstów React na mniejsze, tematyczne jednostki o różnej częstotliwości aktualizacji.  
W przypadku list przekraczających 50 elementów, Antigravity powinno obligatoryjnie wdrażać wirtualizację (windowing), co pozwala na renderowanie tylko tych elementów, które są aktualnie widoczne w oknie widokowym (viewport). Takie podejście drastycznie poprawia płynność przewijania i interakcji, szczególnie na urządzeniach mobilnych.

| Technika Optymalizacji | Mechanizm Działania | Spodziewany Zysk Wydajności |
| :---- | :---- | :---- |
| **React Compiler** | Automatyczna memoizacja na poziomie budowania. | 30-60% redukcji zbędnych renderów. |
| *Virtual Scrolling* | Renderowanie tylko widocznych elementów list. | 40-70% oszczędności czasu renderowania. |
| *Route Splitting* | Leniwe ładowanie tras (React.lazy \+ Suspense). | 60-80% mniejszy początkowy bundle. |
| *Lazy State Init* | Inicjalizacja stanu przez funkcję callback. | Eliminacja kosztownych obliczeń przy re-renderach. |
| **Parallel Awaits** | Równoległe wywoływanie niezależnych zapytań API. | Do 50% szybszy czas odpowiedzi interfejsu. |

### **Eliminacja Wodospadów Asynchronicznych**

Wydajność mierzalna w oczach użytkownika często zależy od sposobu obsługi operacji asynchronicznych. Antigravity powinno przeprowadzić audyt wszystkich miejsc, w których występuje sekwencyjne oczekiwanie na dane (np. await fetch1(); await fetch2();), gdy zapytania te nie są od siebie zależne. Zamiana takich konstrukcji na Promise.all() pozwala na równoległe pobieranie danych i znaczące skrócenie czasu ładowania komponentu. Dodatkowo, mechanizm Lazy State Initialization powinien być stosowany wszędzie tam, gdzie stan początkowy jest wynikiem kosztownej operacji, takiej jak parsowanie dużych obiektów JSON z localStorage.

## **Konfiguracja i Strojenie Narzędzi Builda (Vite)**

Vite zrewolucjonizował workflow deweloperski, wykorzystując natywne moduły ES (ESM) w trakcie tworzenia aplikacji, co pozwala na niemal natychmiastowy start serwera. Jednakże, aby Astra Engine nie "wywaliła się pod własnym ciężarem" w produkcji, Antigravity musi precyzyjnie skonfigurować potok budowania oparty na Rollupie.

### **Strategie Bundlingu i Tree-Shaking**

Podstawą optymalizacji rozmiaru paczki jest efektywne "potrząsanie drzewem" (tree-shaking). Agent powinien upewnić się, że wszystkie biblioteki są importowane w sposób umożliwiający usunięcie nieużywanego kodu (np. importowanie konkretnych funkcji zamiast całych modułów). W konfiguracji vite.config.ts, kluczowe znaczenie ma sekcja rollupOptions, która pozwala na ręczne dzielenie paczek (manual chunks). Strategia ta polega na wydzieleniu dużych, rzadko zmieniających się zależności (np. react, lodash) do osobnego pliku "vendor", co optymalizuje buforowanie po stronie przeglądarki.

| Opcja Konfiguracji Vite | Przeznaczenie | Rekomendacja dla Astra Engine |
| :---- | :---- | :---- |
| build.target | Definicja docelowych przeglądarek. | esnext dla nowoczesnych środowisk. |
| optimizeDeps | Pre-bundling zależności przez esbuild. | Wymuś dla problematycznych paczek CJS. |
| manualChunks | Ręczne sterowanie podziałem kodu. | Wydziel vendor i ciężkie biblioteki (np. wykresy). |
|  | build.sourcemap | Generowanie map źródłowych. |
|  | minify | Wybór minifikatora kodu. |
|  |  |  |

### **Optymalizacja Zasobów Statycznych**

W nowoczesnych aplikacjach obrazy i ikony stanowią znaczną część przesyłanych danych. Antigravity powinno zaimplementować automatyczną optymalizację obrazów przy użyciu wtyczek takich jak vite-plugin-imagemin, konwertując je do formatów WebP lub AVIF, które są o 30-50% mniejsze od JPEG przy zachowaniu identycznej jakości. Ważnym aspektem jest również unikanie transformowania małych plików SVG na komponenty React, co niepotrzebnie zwiększa rozmiar JavaScriptu – zamiast tego należy importować je jako ciągi znaków lub adresy URL.

## **Czystość Kodu i Higiena Zależności: Rola Narzędzia Knip**

Martwy kod jest jak bałagan w szafie – spowalnia procesy i ukrywa rzeczywiste problemy. W dużych projektach, takich jak Astra Engine, martwe pliki i nieużywane eksporty gromadzą się niezwykle szybko. Narzędzie Knip stało się standardem w 2025 roku do utrzymania higieny kodu w projektach TypeScript.

### **Eliminacja Martwego Kodu i Niepotrzebnych Zależności**

Agent Antigravity powinien regularnie uruchamiać Knip w celu wykrycia nieużywanych plików, eksportów oraz zależności, które nie są już potrzebne. W dużych repozytoriach Knip potrafi usunąć jednorazowo tysiące linii kodu, co przekłada się na szybsze budowanie i łatwiejszy onboarding nowych programistów. Kluczowe jest, aby proces ten był częścią potoku CI/CD, co zapobiega regresji w kierunku "spaghetti code".  
Audyt zależności musi również uwzględniać tzw. zależności pośrednie (transitive dependencies). Jeśli projekt używa kodu z biblioteki, która jest zależnością innej biblioteki, a nie jest zadeklarowana bezpośrednio w package.json, może to prowadzić do błędów przy aktualizacjach. Knip pomaga wykryć takie braki, wymuszając jawną deklarację wszystkich używanych modułów.

| Rodzaj Problemu | Narzędzie Detekcji | Sposób Rozwiązania |
| :---- | :---- | :---- |
| **Nieużywane pliki** | Knip / depcheck | Bezpieczne usunięcie z repozytorium. |
| **Martwe eksporty** | Knip | Usunięcie słowa kluczowego export lub całego kodu. |
| **Zbędne zależności** | Knip / depcheck | npm uninstall lub pnpm remove. |
| **Błędy typowania** | TypeScript (Strict Mode) | Refaktoryzacja any na typy unijne lub unknown. |
| **Code Smells** | ESLint / SonarQube | Automatyczne poprawki (--fix) lub refaktoryzacja manualna. |

### **Konwencje Nazewnictwa i Separacja Logiki**

Czysty kod musi "czytać się jak opowieść". Antigravity powinno wymuszać spójne nazewnictwo: PascalCase dla komponentów, camelCase dla funkcji i hooków, oraz UPPER\_SNAKE\_CASE dla stałych. Szczególną uwagę należy poświęcić hookom – ich nazwy muszą zawsze zaczynać się od przedrostka use, co sygnalizuje deweloperom i narzędziom (lintery), że mają do czynienia z logiką stanową React.  
Logika biznesowa powinna być bezwzględnie oddzielona od warstwy prezentacji. Komponenty UI powinny zajmować się wyłącznie renderowaniem, podczas gdy cała logika pobierania danych, walidacji czy transformacji powinna być wyniesiona do customowych hooków. Takie podejście ułatwia testowanie jednostkowe i ponowne wykorzystanie kodu w różnych częściach Astra Engine.

## **TypeScript: Od Swobodnego Kodowania do Rygorystycznej Bezpieczeństwa**

W 2025 roku TypeScript jest fundamentem bezpieczeństwa aplikacji React. Przejście na tryb ścisły (strict: true) w konfiguracji tsconfig.json jest niezbędne, aby wyeliminować całe klasy błędów wykonawczych (runtime errors).

### **Migracja i Typowanie Ścisłe**

Antigravity powinno systematycznie eliminować typ any z projektu, zastępując go bardziej precyzyjnymi konstrukcjami. Typ unknown powinien być stosowany wszędzie tam, gdzie kształt danych nie jest jeszcze znany, co wymusza na programiście sprawdzenie typu przed użyciem danych. Wykorzystanie typów unijnych (Unions) i Enumów pozwala na modelowanie stanów aplikacji w sposób wykluczający stany nieprawidłowe (np. jednoczesne występowanie flag isLoading i isError).  
Ważnym mechanizmem są typy narzędziowe (Utility Types), takie jak Pick, Omit, Partial czy Record. Pozwalają one na tworzenie nowych typów na bazie istniejących interfejsów bez konieczności ich duplikowania, co sprzyja zasadzie DRY (Don't Repeat Yourself).

| Flaga Strict TypeScript | Wpływ na Kod | Korzyść dla Astra Engine |
| :---- | :---- | :---- |
| noImplicitAny | Błąd przy braku jawnego typu. | Eliminuje "ciche" błędy typowania. |
| strictNullChecks | null/undefined to osobne typy. | Zapobiega "undefined is not a function". |
| strictFunctionTypes | Ścisła kontrola parametrów funkcji. | Bezpieczniejsze callbacki i handlery zdarzeń. |
| noUncheckedIndexedAccess | Wymusza sprawdzenie klucza w obiektach. | Bezpieczna praca z dynamicznymi słownikami. |

### **Typowanie Hooków i Kontekstu**

Agent refaktoryzujący musi zadbać o to, aby wszystkie customowe hooki miały jasno zdefiniowane typy zwracane. Zastosowanie as const przy zwracaniu tablic (tupli) z hooków pozwala na poprawną inferencję typów przez TypeScript, co jest kluczowe dla czytelności kodu. W przypadku useContext, Antigravity powinno wdrażać wzorzec "smart context hooks", które sprawdzają, czy hook jest wywoływany wewnątrz odpowiedniego dostawcy (Providera) i rzucają czytelny błąd w przeciwnym razie, co znacznie ułatwia debugowanie.

## **Zarządzanie Długiem Technicznym: Metryki i Cele**

Zrozumienie długu technicznego pozwala na przekształcenie problemów inżynieryjnych w język biznesowy. Astra Engine potrzebuje jasnych wskaźników, które pozwolą Antigravity ocenić, kiedy refaktoryzacja jest niezbędna. Kluczową metryką jest Technical Debt Ratio (TDR), obliczany jako stosunek kosztu naprawy błędów do kosztu stworzenia całego systemu.  
Wartość TDR można wyliczyć za pomocą wzoru:  
Gdzie koszt remediacji to czas potrzebny na poprawienie długu, a koszt deweloperki to całkowity czas poświęcony na budowę systemu.

### **Progi Złożoności i Standardy Jakości**

Antigravity powinno monitorować złożoność cyklomatyczną (Cyclomatic Complexity) kodu. Funkcje o złożoności powyżej 10 stają się trudne do zrozumienia i testowania, a te powyżej 15 wymagają natychmiastowej refaktoryzacji. Inne istotne parametry to pokrycie testami (target 80%) oraz duplikacja kodu, która nie powinna przekraczać 5% całego projektu.  
Dług techniczny powinien być widoczny dla całego zespołu. Rekomenduje się stworzenie dedykowanych zadań w backlogu na refaktoryzację, priorytetyzowanych na podstawie "oprocentowania" długu – czyli tego, jak bardzo dany fragment kodu spowalnia dostarczanie nowych funkcji.

## **Instrukcje Operacyjne dla Antigravity: Protokół "Clean & Optimize"**

Aby Antigravity mogło skutecznie posprzątać w plikach Astra Engine, musi postępować zgodnie z ustrukturyzowanym workflow. Poniżej znajduje się zestaw precyzyjnych instrukcji do wykonania w cyklach refaktoryzacyjnych.

### **Etap 1: Weryfikacja Funkcjonalna i Audyt Zależności**

Przed przystąpieniem do jakichkolwiek zmian, Antigravity musi upewnić się, że aktualny stan projektu jest stabilny. Pierwszym krokiem jest uruchomienie wszystkich testów i weryfikacja lokalnego builda. Następnie należy uruchomić Knip w celu zidentyfikowania nieużywanych plików i eksportów.

1. Uruchom pnpm knip (lub odpowiednik dla npm/yarn).  
2. Zidentyfikuj pliki z zerową liczbą odniesień i usuń je po potwierdzeniu, że nie są to pliki konfiguracyjne ani entry-pointy dynamiczne.  
3. Przejrzyj listę nieużywanych zależności w package.json i usuń te, które nie są peer-dependencies ani pluginami narzędzi deweloperskich.

### **Etap 2: Reorganizacja Struktury Plików (FSD Alignment)**

Antigravity musi przeanalizować strukturę folderów i dopasować ją do metodologii Feature-Sliced Design.

1. Zidentyfikuj komponenty o wielkości powyżej 200 linii kodu i rozbij je na mniejsze, podrzędne jednostki.  
2. Zastosuj zasadę ko-lokacji: przenieś hooki, stałe i testy jednostkowe bezpośrednio do folderu komponentu, którego dotyczą.  
3. Wdróż publiczne API (index.ts) dla każdego "slice'a" i upewnij się, że inne moduły importują kod tylko przez ten punkt wejścia.

### **Etap 3: Optymalizacja Wydajności i Kodu React**

Na tym etapie agent skupia się na poprawie szybkości działania aplikacji i jakości kodu JSX.

1. Przeskanuj komponenty pod kątem "inline function definitions" wewnątrz renderowania i zastąp je stabilnymi referencjami (jeśli nie używasz jeszcze w pełni React Compiler).  
2. Znajdź sekwencyjne await w hookach useEffect lub handlerach zdarzeń i zrównoleglij je tam, gdzie to możliwe.  
3. Zaimplementuj Lazy State Initialization dla stanów pobieranych z ciężkich operacji (np. localStorage.getItem).  
4. Wdróż leniwe ładowanie dla wszystkich tras aplikacji za pomocą React.lazy i Suspense.

### **Etap 4: Modernizacja TypeScript i Refaktoryzacja Typów**

Agent musi podnieść poziom bezpieczeństwa typów w Astra Engine.

1. Uruchom skaner w poszukiwaniu typu any i spróbuj go zastąpić najbardziej precyzyjnym typem możliwym, lub typem unknown.  
2. Zidentyfikuj parametry opcjonalne, które są zawsze przekazywane, i zmień je na wymagane.  
3. Zastosuj typy unijne (Discriminated Unions) do modelowania stanów API (np. stat\[span\_79\](start\_span)\[span\_79\](end\_span)us: 'idle' | 'loading' | 'success' | 'error').  
4. Upewnij się, że wszystkie hooki mają nazwy zaczynające się od use i zwracają stabilne typy (używając as const dla tablic).

### **Etap 5: Finalne Czyszczenie i Standaryzacja Stylu**

Ostatnim krokiem jest dopracowanie szczegółów wizualnych kodu i usunięcie pozostałości po debugowaniu.

1. Usuń wszystkie instrukcje console.log, zakomentowany kod i zmienne tymczasowe.  
2. Uruchom Prettier i ESLint (z flagą \--fix), aby ujednolicić formatowanie w całym projekcie.  
3. Dodaj komentarze JSDoc do kluczowych interfejsów i funkcji, wyjaśniając "dlaczego" coś zostało zaimplementowane w dany sposób, a nie tylko "co" robi kod.

## **Podsumowanie i Rekomendacje Strategiczne**

System Astra Engine, aby utrzymać swoją pozycję lidera pod względem funkcjonalności, musi być regularnie poddawany rygorystycznym procesom czyszczenia. Refaktoryzacja nie jest jednorazowym wydarzeniem, lecz ciągłym procesem, który powinien być wspierany przez automatyzację i inteligentnych agentów. Kluczem do sukcesu jest wdrożenie metodologii Feature-Sliced Design, która narzuca dyscyplinę architektoniczną, oraz pełne wykorzystanie możliwości React 19 i TypeScriptu do eliminacji błędów na etapie kompilacji.  
Regularne stosowanie opisanego protokołu przez Antigravity pozwoli na utrzymanie niskiego wskaźnika długu technicznego i wysokiej wydajności, co bezpośrednio przekłada się na lepsze doświadczenie użytkownika końcowego i większą satysfakcję zespołu deweloperskiego. Inwestycja w jakość kodu jest inwestycją w przyszłość projektu – czysty kod to fundament, na którym można bezpiecznie budować najbardziej innowacyjne funkcje Astra Engine.

#### **Cytowane prace**

1\. Build Scalable React with Feature-Based React Architecture \- adjoe, https://adjoe.io/company/engineer-blog/moving-to-feature-based-react-architecture/ 2\. Building Scalable Systems with React Architecture | Feature-Sliced ..., https://feature-sliced.design/kr/blog/scalable-react-architecture 3\. React Architecture Best Practices for Scalable Apps | NareshIT, https://nareshit.com/blogs/react-architecture-best-practices-scalable-apps 4\. React Performance Optimization: 15 Best Practices for 2025 \- DEV ..., https://dev.to/alex\_bobes/react-performance-optimization-15-best-practices-for-2025-17l9 5\. Introducing: React Best Practices \- Vercel, https://vercel.com/blog/introducing-react-best-practices 6\. React Design Patterns and Best Practices for 2025 \- Telerik.com, https://www.telerik.com/blogs/react-design-patterns-best-practices 7\. Performance | Vite, https://vite.dev/guide/performance 8\. Vite Deep Dive Free Tutorial | Why Vite Is Faster Than Webpack \- Hakuna Matata Solutions, https://www.hakunamatatatech.com/our-resources/blog/vite 9\. Optimize Vite Build Time: A Comprehensive Guide \- DEV Community, https://dev.to/perisicnikola37/optimize-vite-build-time-a-comprehensive-guide-4c99 10\. Build Process \- Pirson Dev Portfolio \- Mintlify, https://www.mintlify.com/SrPirson/Portfolio/deployment/build 11\. React Code Reviews Done Right: A Practical 7-Step Checklist | by ..., https://medium.com/@echilaka/lessons-from-real-life-react-code-reviews-326622c94aff 12\. Getting rid of dead code : r/reactjs \- Reddit, https://www.reddit.com/r/reactjs/comments/1r9xp14/getting\_rid\_of\_dead\_code/ 13\. How I Cleaned Up Our Codebase With Knip, And Why You Should Too \- DEV Community, https://dev.to/rkhaslarov/how-i-cleaned-up-our-codebase-with-knip-and-why-you-should-too-41mg 14\. React Code Review: Checklist, Key Challenges, and Best Practices \- DevCom, https://devcom.com/tech-blog/react-code-review/ 15\. How I Generate Clean React Native Code: My Practical Strategies for 2025 | by Arin Volkov, https://medium.com/@arinvolkov/how-i-generate-clean-react-native-code-my-practical-strategies-for-2025-fa7383a62771 16\. Reusing Logic with Custom Hooks \- React, https://react.dev/learn/reusing-logic-with-custom-hooks 17\. React Hook Naming Conventions Best Practices and Guidelines \- Stackademic, https://blog.stackademic.com/react-hook-naming-conventions-best-practices-and-guidelines-32ac80c1580e 18\. strict \- TypeScript: TSConfig Option, https://www.typescriptlang.org/tsconfig/strict.html 19\. How to Set Up Strict TypeScript Configuration for React Projects \- OneUptime, https://oneuptime.com/blog/post/2026-01-15-strict-typescript-configuration-react/view 20\. TypeScript Best Practices in 2025 \- DEV Community, https://dev.to/mitu\_mariam/typescript-best-practices-in-2025-57hb 21\. TypeScript Adoption & Best Practices: Boost Your JavaScript Code Quality in 2025, https://javascript.plainenglish.io/typescript-adoption-best-practices-boost-your-javascript-code-quality-in-2025-21456f61cf21 22\. TypeScript \+ React: Best Practices for Clean, Maintainable Code, https://dev.co/typescript-react-best-practices-clean-maintainable-code 23\. React & TypeScript: 10 patterns for writing better code \- LogRocket Blog, https://blog.logrocket.com/react-typescript-10-patterns-writing-better-code/ 24\. TypeScript Code Review Checklist: Type Safety \- Pull Panda, https://pullpanda.io/blog/typescript-code-review-checklist 25\. Practical Framework for Measuring Technical Debt Teams \- American Chase, https://americanchase.com/measuring-technical-debt/ 26\. Technical Debt Ratio: Formula & Benchmarks \- Count.co, https://count.co/metric/technical-debt-ratio 27\. Technical debt ratio: How to measure technical debt \- DX, https://getdx.com/blog/technical-debt-ratio/ 28\. Avoiding Technical Debt: How to Measure, Manage, and Tackle Technical Debt, https://blog.codacy.com/avoiding-technical-debt 29\. The Complete Guide to Finding and Removing Unused Dependencies in Your Project | by MD Tariqul Islam | Medium, https://medium.com/@ittarek551/the-complete-guide-to-finding-and-removing-unused-dependencies-in-your-project-2cd8aa4643c9 30\. Best practices for managing dependencies across multiple package.json files? : r/node, https://www.reddit.com/r/node/comments/1o7bgtj/best\_practices\_for\_managing\_dependencies\_across/ 31\. TypeScript Code Review Checklist for Reliable Delivery \- Redwerk, https://redwerk.com/blog/typescript-code-review-checklist/ 32\. Code Review Checklist for JavaScript/React \- IBM Community, https://community.ibm.com/community/user/blogs/marina-mascarenhas/2025/07/15/code-review-checklist-for-javascriptreact 33\. Setting Up ESLint and Prettier in a React Project with Vite | by Leandro A. Siqueira \- Medium, https://leandroaps.medium.com/setting-up-eslint-and-prettier-in-a-react-project-with-vite-c2ab658dc0e7 34\. React Linting Best Practices: ESLint \+ Prettier Setup Guide \- Propelius Technologies, https://propelius.tech/blogs/best-practices-for-linting-react-code/ 35\. Eslint and Prettier configuration | by Manohar Batra \- Medium, https://medium.com/@contactmanoharbatra/eslint-and-prettier-configuration-f0259ebeb58b 36\. Refactoring TypeScript React components in VS Code \- Mike Bifulco, https://mikebifulco.com/posts/refactoring-typescript-react-components-vscode