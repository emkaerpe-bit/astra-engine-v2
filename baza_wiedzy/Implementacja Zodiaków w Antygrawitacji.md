# **Architektura Zaawansowanych Systemów Zodiakalnych w Obliczeniach Astrologicznych: Kompendium Implementacji dla Środowiska Antigravity**

Ewolucja profesjonalnego oprogramowania astrologicznego w XXI wieku wymusza odejście od monolitycznego podejścia skoncentrowanego wyłącznie na zodiaku tropikalnym. Współczesny warsztat badawczy, reprezentowany przez systemy takie jak Antigravity, wymaga implementacji wielowymiarowych ram odniesienia, które integrują precyzyjną mechanikę nieba z różnorodnymi tradycjami interpretacyjnymi. Fundamentem światowej klasy programu astrologicznego jest zdolność do płynnej transformacji współrzędnych ekliptycznych w zależności od paradygmatu badawczego – od klasycznej analizy zachodniej, przez wedyjską astrologię syderyczną, aż po ezoteryczne systemy drakoniczne i galaktyczne. Niniejsze opracowanie stanowi bazę wiedzy niezbędną do poprawnego skodowania tych modeli, kładąc szczególny nacisk na wykorzystanie precyzyjnych efemeryd i algorytmów transformacji współrzędnych.

## **Taksonomia Systemów Zodiakalnych w Oprogramowaniu Klasy Premium**

Aby oprogramowanie mogło zostać uznane za narzędzie profesjonalne, musi oferować zestaw zodiaków wykraczający poza standardowy podział ekliptyki na dwanaście trzydziestostopniowych znaków liczonych od punktu równonocy wiosennej. Każdy z tych systemów reprezentuje inną płaszczyznę rzeczywistości lub inną perspektywę obserwatora, co ma kluczowe znaczenie dla precyzji predykcyjnej i głębi analitycznej.

### **Kanoniczna Lista Systemów Zodiakalnych**

Światowej klasy program astrologiczny powinien zawierać co najmniej osiem odrębnych modeli zodiakalnych, z których każdy pełni specyficzną funkcję w procesie interpretacji danych astronomicznych.

1. Zodiak Tropikalny (Sayana): Jest to system ruchomy względem gwiazd stałych, ale stały względem pór roku na Ziemi. Jego punktem zero jest 0° Barana, definiowane przez moment przecięcia ekliptyki z równikiem niebieskim (punkt równonocy wiosennej). Jest to domyślny system w astrologii zachodniej, skupiający się na psychologii jednostki i jej relacji z cyklami ziemskimi.  
2. Zodiak Syderyczny (Nirayana): System zakotwiczony w sferze gwiazd stałych. Wymaga on zastosowania ayanamszy – wartości kątowej korygującej precesję osiową Ziemi, która wynosi około 50,3 sekundy łuku rocznie. Jest to fundament astrologii indyjskiej (Jyotish) oraz zachodniej astrologii syderycznej (szkoła Fagana-Bradleya).  
3. Zodiak Drakoniczny: System relacyjny, w którym punkt 0° Barana zostaje utożsamiony z pozycją Węzła Północnego Księżyca (Caput Draconis). Model ten służy do analizy motywacji duszy, karmy oraz archetypowych wzorców, które manifestują się "ponad" osobowością tropikalną.  
4. Zodiak Heliocentryczny: Perspektywa, w której centrum układu jest Słońce. Eliminuje on zjawisko retrogradacji planet (będącej efektem perspektywy ziemskiej) i pozwala na badanie czystych interakcji orbitalnych wewnątrz Układu Słonecznego.  
5. Zodiak Galaktyczny: Oparty na Centrum Galaktyki (Sagittarius A\*) jako punkcie zero. Pozwala on na pozycjonowanie Układu Słonecznego w szerszej strukturze Drogi Mlecznej, co jest wykorzystywane w astrologii ezoterycznej i badaniach nad misją duchową.  
6. Zodiak Gwiazdozbiorowy (IAU): Wykorzystuje rzeczywiste, nierówne granice gwiazdozbiorów zdefiniowane przez Międzynarodową Unię Astronomiczną. Obejmuje trzynasty znak – Wężownika (Ophiuchus) – i odzwierciedla faktyczny czas przebywania Słońca na tle danej konstelacji.  
7. Zodiak Planetocentryczny: Specjalistyczny model obliczający pozycje ciał niebieskich z perspektywy innej planety (np. Marsa lub Jowisza), co znajduje zastosowanie w badaniach nad cyklami zewnętrznymi i astrologii mundalnej.  
8. Zodiak Supergalaktyczny: Wykorzystujący płaszczyznę supergalaktyki (lokalnej gromady galaktyk), stosowany w najbardziej zaawansowanych analizach kosmologicznych.

Poniższa tabela przedstawia porównanie kluczowych parametrów tych systemów, co stanowi punkt wyjścia do implementacji algorytmicznej w systemie Antigravity.

| System Zodiakalny | Punkt Odniesienia (0° Barana) | Główna Zmienna | Perspektywa Obserwatora |
| :---- | :---- | :---- | :---- |
| Tropikalny | Równonoc Wiosenna | Obliquity (Nachylenie) | Geocentryczna |
| Syderyczny | Gwiazda Stała (np. Spica) | Ayanamsha | Geocentryczna (Gwiezdna) |
| Drakoniczny | Węzeł Północny Księżyca | Mean/True Node | Geocentryczna (Nodalna) |
| Heliocentryczny | Vernal Equinox (Solar) | Transformacja wektorowa | Heliocentryczna |
| Galaktyczny | Sagittarius A\* | Szerokość Galaktyczna | Galaktyczna |
| IAU | Granice Astronomiczne | Współrzędne J2000 | Geocentryczna (Realna) |

## **Matematyczne Fundamenty i Algorytmy Transformacji**

Implementacja alternatywnych modeli zodiakalnych w Antigravity nie polega na tworzeniu nowych zestawów danych, lecz na stosowaniu precyzyjnych transformacji matematycznych na bazowych współrzędnych ekliptycznych dostarczanych przez efemerydy. Każdy zodiak jest w istocie przesunięciem (offsetem) lub rotacją układu współrzędnych.

### **Mechanika Precesji i Implementacja Ayanamszy**

W zodiaku syderycznym kluczowym zadaniem jest wyliczenie wartości ayanamszy (\\mathcal{A}) dla konkretnego momentu w czasie (t). Algorytm musi uwzględniać, że różnica między zodiakiem tropikalnym a syderycznym nie jest stała. Podstawowy wzór na długość syderyczną planety (\\lambda\_{sid}) to:  
Szwajcarskie Efemerydy (Swiss Ephemeris), będące standardem dla Antigravity, stosują zaawansowane modele precesji (np. Vondrák 2011), aby wyliczyć \\mathcal{A}(t) z dokładnością do ułamków sekundy łuku. Programista musi zaimplementować wybór spośród co najmniej kilkunastu standardowych ayanamsz, gdyż ich wybór drastycznie zmienia wyniki w astrologii wedyjskiej i predykcyjnej.

| Nazwa Ayanamszy | Definicja / Punkt Zakotwiczenia | Znaczenie Historyczne |
| :---- | :---- | :---- |
| Lahiri | Spica (Chitra) dokładnie przy 180° | Standard rządu Indii |
| Fagan/Bradley | Aldebaran przy 15° Byka | Podstawa syderyzmu zachodniego |
| Raman | Specyficzna dla szkoły B.V. Ramana | Alternatywa w Jyotish |
| Krishnamurti | Zmodyfikowana Lahiri dla systemów K.P. | Astrologia predykcyjna (horarna) |
| True Citra | Spica jako punkt stały z uwzględnieniem ruchu własnego | Najwyższa precyzja astronomiczna |

W systemie Antigravity, przy użyciu biblioteki pyswisseph, ustawienie trybu syderycznego odbywa się za pomocą funkcji set\_sid\_mode(), która przyjmuje stałą identyfikującą ayanamszę oraz opcjonalne parametry dla systemów niestandardowych.

### **Algorytm Zodiaku Drakonicznego: Synteza Solarno-Lunarna**

Zodiak drakoniczny jest przykładem systemu relacyjnego, w którym cały układ znaków zostaje przesunięty tak, aby 0° Barana pokrywało się z bieżącą pozycją Węzła Północnego Księżyca. Jest to operacja dynamiczna, ponieważ Węzeł Północny cofa się przez zodiak tropikalny z prędkością około 19 stopni rocznie.  
Procedura implementacji w Antigravity:

1. Obliczenie długości ekliptycznej tropikalnej Węzła Północnego (\\lambda\_{NN}) dla czasu narodzin lub zdarzenia.  
2. Zastosowanie przesunięcia drakonicznego dla każdego ciała niebieskiego (P):  
3. Zapewnienie poprawnej normalizacji wyniku w zakresie \[0, 360), co w językach programowania takich jak Python wymaga obsługi liczb ujemnych: (pos \- node) % 360\.

Istotnym detalem technicznym jest wybór między Węzłem Średnim (Mean Node) a Prawdziwym (True Node). Węzeł Średni reprezentuje uśrednioną orbitę Księżyca, podczas gdy Węzeł Prawdziwy uwzględnia perturbacje grawitacyjne wywołane przez Słońce, co powoduje, że Węzeł Prawdziwy czasami porusza się ruchem prostym. Większość współczesnych astrologów drakonicznych preferuje Węzeł Prawdziwy (True Node), jednak światowej klasy oprogramowanie musi oferować oba tryby jako opcję konfiguracyjną, gdyż błąd między nimi może wynosić do 1°45'.

## **Implementacja Zodiaku Heliocentrycznego i Galaktycznego**

Przejście z modelu geocentrycznego na heliocentryczny lub galaktyczny wymaga transformacji wektorowej współrzędnych, a nie tylko prostego dodawania offsetu kątowego.

### **Mechanika Heliocentryczna**

W modelu heliocentrycznym punktem odniesienia (origin) jest środek masy Słońca lub barycentrum Układu Słonecznego. Ziemia staje się jedną z planet, a jej pozycja w zodiaku heliocentrycznym jest dokładnie o 180° przeciwna do pozycji Słońca w zodiaku geocentrycznym.  
W systemie Antigravity implementacja ta jest uproszczona przez flagę SEFLG\_HELCTR w bibliotece Swiss Ephemeris. Należy jednak pamiętać o kilku zasadach:

* Księżyc w tym systemie nie jest traktowany jako samodzielne ciało, lecz jako część układu Ziemia-Księżyc (EMB \- Earth-Moon Barycenter).  
* Należy wyeliminować pojęcie retrogradacji, gdyż planety zawsze poruszają się w tym samym kierunku wokół Słońca.  
* Domy w systemie heliocentrycznym są zazwyczaj liczone od punktu równonocy (zodiak tropikalny heliocentryczny), ale profesjonalne systemy pozwalają na rzutowanie ich na zodiak syderyczny heliocentryczny.

### **Zodiak Galaktyczny i Supergalaktyczny**

System galaktyczny opiera się na płaszczyźnie Drogi Mlecznej. Punktem zero (0° długości galaktycznej) jest kierunek ku Centrum Galaktyki (Sagittarius A\*).  
Dla programisty Antigravity kluczowe są stałe współrzędne bieguna galaktycznego i punktu zero w układzie J2000:

* Rektascensja bieguna galaktycznego: 192,85948^\\circ.  
* Deklinacja bieguna galaktycznego: 27,12825^\\circ.  
* Kąt pozycji: 122,93192^\\circ.

Implementacja wymaga użycia funkcji swe\_cotrans(), która pozwala na konwersję współrzędnych ekliptycznych na galaktyczne. Warto zauważyć, że Centrum Galaktyki w zodiaku tropikalnym przesuwa się ze względu na precesję i obecnie (rok 2025\) znajduje się około 27°08' Strzelca.

## **Architektura Skryptów w Systemie Antigravity (Python/pyswisseph)**

Poniżej przedstawiono strukturę bazy wiedzy w formie instrukcji kodowania dla kluczowych modułów systemu Antigravity, z wykorzystaniem biblioteki pyswisseph.

### **Moduł 1: Inicjalizacja i Środowisko**

Poprawne skodowanie wymaga załadowania plików efemeryd (.se1), które pokrywają tysiące lat historii. Bez nich program przechodzi w tryb Moshier, który jest mniej dokładny.  
`import swisseph as swe`  
`import os`

`# Ustawienie ścieżki do plików binarnych efemeryd`  
`swe.set_ephe_path('/usr/share/sweph/ephe')`

`def get_julian_day(year, month, day, hour_utc):`  
    `"""Konwersja daty kalendarzowej na Dzień Juliański."""`  
    `return swe.julday(year, month, day, hour_utc)`

### **Moduł 2: Silnik Transformacji Zodiakalnej**

Kluczem do elastyczności Antigravity jest stworzenie uniwersalnej funkcji obliczeniowej, która przyjmuje typ zodiaku jako parametr.  
`def calculate_planet_position(jd_ut, planet_id, zodiac_model='tropical', ayanamsa=None):`  
    `flags = swe.FLG_SWIEPH | swe.FLG_SPEED`  
      
    `if zodiac_model == 'sidereal':`  
        `# Ustawienie konkretnej ayanamszy`  
        `if ayanamsa is not None:`  
            `swe.set_sid_mode(ayanamsa, 0, 0)`  
        `flags |= swe.FLG_SIDEREAL`  
          
    `elif zodiac_model == 'heliocentric':`  
        `flags |= swe.FLG_HELCTR`  
          
    `# Obliczenie pozycji bazowej`  
    `res, _ = swe.calc_ut(jd_ut, planet_id, flags)`  
    `longitude = res`  
      
    `# Obsługa modelu drakonicznego (relacyjnego)`  
    `if zodiac_model == 'draconic':`  
        `# Pobranie pozycji Węzła Północnego (True Node)`  
        `node_res, _ = swe.calc_ut(jd_ut, swe.TRUE_NODE, swe.FLG_SWIEPH)`  
        `node_lon = node_res`  
        `# Transformacja drakoniczna`  
        `longitude = (longitude - node_lon) % 360`  
          
    `return longitude`

### **Moduł 3: Systemy Domów w Alternatywnych Modelach**

Najczęstszym błędem w oprogramowaniu astrologicznym jest niepoprawne przeliczanie wierzchołków domów w zodiaku drakonicznym lub syderycznym. Algorytm musi najpierw wyliczyć wierzchołki w systemie tropikalnym, a następnie zastosować ten sam offset (ayanamszę lub pozycję węzła), co w przypadku planet.  
W profesjonalnych systemach, takich jak Astrolog czy ZEUS, domy w wysokich szerokościach geograficznych (strefy polarne) wymagają specjalnego traktowania. Systemy takie jak Placidus czy Koch przestają tam działać, ponieważ ekliptyka nigdy nie przecina horyzontu w pewnych momentach doby.

| Szerokość Geograficzna | Zalecany System Domów | Powód |
| :---- | :---- | :---- |
| 0° \- 60° | Placidus / Koch | Standardowa korelacja czasowa |
| 60° \- 66° | Porphyry | Stabilność matematyczna |
| Powyżej 66° (Polarne) | Equal House / Whole Sign | Uniknięcie błędu "sane house cusps" |

## **Głębokie Wglądy: Implikacje Wyboru Modelu Zodiakalnego**

Wybór modelu zodiakalnego w kodzie Antigravity nie jest jedynie kwestią estetyki interfejsu, ale decyzją o tym, którą warstwę rzeczywistości system ma priorytetyzować.

### **Paradoks "Prawdziwego" Nieba**

Wiele nowoczesnych systemów, takich jak Prometheus, promuje powrót do "True Sky" – czyli używania rzeczywistych gwiazdozbiorów o nierównej długości. Programista musi tu podjąć decyzję o implementacji algorytmu granic IAU, który dzieli ekliptykę na segmenty o długościach od 7 dni (Skorpion) do 45 dni (Panna). Z perspektywy kodowania, wymaga to użycia tabeli lookup dla długości ekliptycznej i przypisania jej do nazwy konstelacji zamiast prostego dzielenia przez 30 stopni.

### **Relatywizm Nodalny w Zodiaku Drakonicznym**

Zodiak drakoniczny wprowadza koncepcję "Synastrii z Samym Sobą" (Synastry of Self), co jest zaawansowaną funkcją analityczną, którą Antigravity powinno obsługiwać. Polega to na nałożeniu chartu drakonicznego na tropikalny tego samego użytkownika. Wymaga to od silnika bazy danych zdolności do przechowywania i porównywania dwóch zestawów współrzędnych dla tego samego momentu czasu, co z punktu widzenia architektury danych jest wyzwaniem dla optymalizacji zapytań o aspekty.

### **Precyzja Czasowa: Rola Delta-T**

W profesjonalnych obliczeniach nie można ignorować różnicy między czasem uniwersalnym (UT) a czasem dynamicznym (TD). Parametr Delta-T (\\Delta T) odzwierciedla nieregularność rotacji Ziemi. Dla dat historycznych błąd ten może wynosić godziny, co w zodiaku drakonicznym (gdzie Księżyc porusza się o 13 stopni na dobę) powoduje ogromne przesunięcia. Światowej klasy program musi automatycznie pobierać aktualne wartości \\Delta T z bazy danych IERS lub używać wbudowanych modeli Swiss Ephemeris.

## **Instrukcja Implementacji Specyficznych Funkcji Zodiakalnych**

Aby Antigravity stało się narzędziem kompletnym, należy skodować funkcje pomocnicze, które obsługują rzadziej spotykane, ale istotne techniki.

### **Obliczanie Planetarnych Węzłów i Punktów Interface**

Michael Erlewine, pionier astrologii heliocentrycznej, wskazuje na znaczenie węzłów wszystkich planet, a nie tylko Księżyca. Każda planeta posiada własną płaszczyznę orbity, która przecina ekliptykę w dwóch punktach.

* Implementacja: Należy stworzyć funkcję swe\_nod\_aps\_ut(), która zwraca pozycje węzłów dla Marsa, Jowisza itd..  
* Zastosowanie: Pozwala to na castowanie horoskopów drakonicznych opartych np. na węźle Marsa, co jest techniką używaną w badaniach nad dynamiką popędów i działań mundalnych.

\#\#\# Zarządzanie Wieloma Ayanamszami: Podejście Statystyczne  
Badania statystyczne nad ayanamszami (np. badanie moon's position w nakshatrach na dużych zbiorach danych) sugerują, że żadna ayanamsza nie jest "ostateczna". Dlatego Antigravity powinno implementować tzw. "User Defined Ayanamsa", pozwalając badaczom na wprowadzanie własnej stałej dla epoki J2000.0.  
Formula dla użytkownika:  
Gdzie P\_{rate} to tempo precesji, które również może być modyfikowane przez użytkownika w celach eksperymentalnych.

## **Podsumowanie i Rekomendacje dla Rozwoju Antigravity**

Budowa bazy wiedzy dla systemów zodiakalnych w Antigravity musi opierać się na najwyższych standardach astronomicznych, aby zaspokoić potrzeby profesjonalnych astrologów i badaczy. Kluczowe jest zachowanie modularności kodu, co pozwoli na łatwe dodawanie nowych modeli (np. zodiak galaktyczny oparty na nowych pomiarach Sagittarius A\*) bez konieczności przebudowy całego silnika.

### **Kluczowe Wytyczne dla Programisty**

1. Modularność: Każdy zodiak powinien być traktowany jako warstwa (layer) nałożona na bazowe współrzędne J2000.  
2. Precyzja: Obowiązkowe użycie plików efemeryd Swiss Ephemeris i uwzględnienie \\Delta T oraz nutacji.  
3. Elastyczność: Implementacja co najmniej 15 rodzajów ayanamsz oraz opcji Mean/True Node dla modelu drakonicznego.  
4. Hybrydowość: Możliwość wyświetlania wielu zodiaków na jednym wykresie (np. bi-wheel: tropikalny wewnętrzny, drakoniczny zewnętrzny).

Wprowadzenie tych rozwiązań uczyni z Antigravity narzędzie unikalne na skalę światową, zdolne do obsługi najbardziej zaawansowanych technik astrologicznych – od tradycji wedyjskiej po nowoczesną astrologię galaktyczną i drakoniczną. Poprawne skodowanie tych modeli to nie tylko wyzwanie techniczne, ale przede wszystkim stworzenie ramy dla nowych odkryć w dziedzinie korelacji nieba i życia na Ziemi.

#### **Cytowane prace**

1\. Astrology Software ZEUS \- AstroZeus, https://astro-zeus.com/ 2\. Decoding the SWISS Ephemeris \- Av8rAero, https://www.av8raero.com/blog/decoding-the-swiss-ephemeris 3\. Astrolog \- Wikipedia, https://en.wikipedia.org/wiki/Astrolog 4\. What are the different kinds of Astrology \- Astroyogi, https://www.astroyogi.com/blog/what-are-the-different-kinds-of-astrology.aspx 5\. Astronomical coordinate systems \- Wikipedia, https://en.wikipedia.org/wiki/Astronomical\_coordinate\_systems 6\. Astrolog 7.80 Documentation \- astrolog.org, https://www.astrolog.org/ftp/astrolog.htm 7\. Different Types of Astrology and Charts, https://saketbhatia.com/different-types-of-astrology/ 8\. List of astrological traditions, types, and systems \- Wikipedia, https://en.wikipedia.org/wiki/List\_of\_astrological\_traditions,\_types,\_and\_systems 9\. Understanding the Draconic Zodiac | PDF \- Scribd, https://www.scribd.com/document/912244075/DRACONIC-LETTER 10\. Ayanamsas—A Statistical Study, https://storage.yandexcloud.net/j108/forum/post/5ktb6ijlcfjz/Ayanamsa\_-\_A\_Statistical\_Study.pdf 11\. Understanding Draconic Astrology Basics | PDF | Zodiac | Divination \- Scribd, https://www.scribd.com/document/966715891/Draconic-Astrology-Maria-Blaquier 12\. Zodiac \- Wikipedia, https://en.wikipedia.org/wiki/Zodiac 13\. Sidereal and tropical astrology \- Wikipedia, https://en.wikipedia.org/wiki/Sidereal\_and\_tropical\_astrology 14\. swisseph documentation \- Astrodienst, https://www.astro.com/swisseph/swisseph.htm 15\. Draconic Astrology Chart \- Stay Organized with a Free Printable Study Planner, https://fwd.iws.edu/en/draconic-astrology-chart.html 16\. The Draconic Chart | Articles \- Australian Academy of Astrology & Cosmobiology, https://www.astrologycosmobiology.com.au/articles/tutorial/draconic-chart.html 17\. ASTROLOGY – Heliocentric or Geocentric Model \- Innovative Astro Solutions, https://innovativeastrosolutions.com/blog/astrology-heliocentric-or-geocentric-model/ 18\. How to calculate geocentric transformation to heliocentric coordinates?, https://astronomy.stackexchange.com/questions/39480/how-to-calculate-geocentric-transformation-to-heliocentric-coordinates 19\. The galactic center at 0° Sagittarius is the most accurate nakshatra reference, here's why. : r/Astrology\_Vedic \- Reddit, https://www.reddit.com/r/Astrology\_Vedic/comments/1myggk8/the\_galactic\_center\_at\_0\_sagittarius\_is\_the\_most/ 20\. Galactic Center In Astrology \- Mastering the Zodiac, https://masteringthezodiac.com/galactic-center 21\. swisseph@groups.io | Topics, https://groups.io/g/swisseph/topics?page=29\&after=1609115065685442280 22\. swephprg programming interface \- Astrodienst, https://www.astro.com/swisseph/swephprg.htm 23\. How to Calculate Aynamsha using pyswisseph \- Groups.io, https://groups.io/g/swisseph/topic/how\_to\_calculate\_aynamsha/88996361 24\. Ayanamsha and Zodiac Precession Analysis | PDF | Astrological Sign \- Scribd, https://www.scribd.com/document/65316337/Resolving-the-Ayanamsha 25\. swisseph | Dart package \- Pub.dev, https://pub.dev/packages/swisseph 26\. The Movement of the True and Mean Node through the Zodiac \- Astro\*Synthesis, https://www.astrosynthesis.com.au/wp-content/uploads/2021/10/Which-Node-Should-I-Use.pdf 27\. python \- Hindu astrology \- Problems with programming ascendant \- Stack Overflow, https://stackoverflow.com/questions/48971104/hindu-astrology-problems-with-programming-ascendant 28\. Do you use mean or true node? Which do you think works better? : r/astrology \- Reddit, https://www.reddit.com/r/astrology/comments/1jncs6z/do\_you\_use\_mean\_or\_true\_node\_which\_do\_you\_think/ 29\. True Node And Mean Node • Which Is The Most Accurate? \- Molly's Astrology, https://www.mollysastrology.com/lesson/true-node-and-mean-node/ 30\. Galactic Coordinate System, https://www.pas.rochester.edu/\~tkarim/galcs.htm 31\. pyswisseph/pyswisseph.c at master · astrorigin/pyswisseph · GitHub, https://github.com/astrorigin/pyswisseph/blob/master/pyswisseph.c 32\. TRUE NODE vs. MEAN NODE \- What's the difference? \- Bonnie Gillespie, https://bonniegillespie.com/astrology-true-node-mean-node/ 33\. python pyswisseph calculate planets rashi or zodiac signs \- GitHub Gist, https://gist.github.com/EH30/6133342b67827e14add07a37b5cfb941 34\. The Ascendant using Python3 and PySwissEph \- Tech Shinobi, https://www.techshinobi.com/ascendant-using-python3-and-pyswisseph/ 35\. pyswisseph · PyPI, https://pypi.org/project/pyswisseph/ 36\. astrorigin/pyswisseph: Python extension to the Swiss Ephemeris \- GitHub, https://github.com/astrorigin/pyswisseph 37\. Vedic Ascendant/Planets and SwissEph Python \- Groups.io, https://groups.io/g/swisseph/topic/vedic\_ascendant\_planets\_and/27495911 38\. Prometheus Astrology Software \- Mastering the Zodiac, https://masteringthezodiac.com/prometheus-astrology-software 39\. Your REAL zodiac sign \- INAOE, https://www.inaoep.mx/\~frosales/html/zodiac/index.html 40\. Chasing the Dragons: An Introduction to Draconic Astrology \- Facing North, https://facingnorth.net/books/astrology/chasing 41\. Interface: Planetary Nodes. B y Michael Erlewine \- Medium, https://medium.com/@MichaelErlewine/interface-planetary-nodes-963cc571e454