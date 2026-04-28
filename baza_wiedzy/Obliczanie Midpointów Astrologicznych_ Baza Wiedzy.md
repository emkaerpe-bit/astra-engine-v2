# **Architektura i algorytmika punktów środkowych w astrologii obliczeniowej: Kompleksowa baza wiedzy dla systemów eksperckich**

Współczesna astrologia obliczeniowa, ewoluująca w stronę precyzyjnych modeli matematycznych, upatruje w punktach środkowych (midpointach) fundamentalny mechanizm integrowania rozproszonych danych planetarnych w spójne obrazy energetyczne. Z perspektywy inżynierii oprogramowania astrologicznego, punkt środkowy nie jest jedynie statyczną współrzędną, lecz dynamicznym węzłem rezonansowym, który pozwala na redukcję szumu informacyjnego w horoskopie poprzez skupienie uwagi na osiach symetrii. Historyczne korzenie tej metody, sięgające prac Klaudiusza Ptolemeusza w II wieku n.e. oraz XIII-wiecznych pism Guido Bonattiego, znalazły swoje apogeum w XX-wiecznych badaniach Szkoły Hamburskiej pod przewodnictwem Alfreda Wittego oraz w systemie Kosmobiologii Reinholda Ebertina. Niniejszy raport stanowi wyczerpujące kompendium wiedzy technicznej, matematycznej i interpretacyjnej, zaprojektowane jako fundament do implementacji zaawansowanych skryptów w nowoczesnych programach astrologicznych.

## **Fundamenty matematyczne i układy współrzędnych**

Implementacja midpointów w silniku astrologicznym wymaga rygorystycznego zdefiniowania układu odniesienia. Podstawą jest ekliptyczna długość geocentryczna, mierzona wzdłuż ścieżki Słońca. Pierwszym krokiem w procesie obliczeniowym jest konwersja pozycji planetarnych z formatu znakowego (np. 15° Byka) na format długości absolutnej (0^\\circ \- 360^\\circ).

### **Algorytm konwersji na długość absolutną**

Dla potrzeb skryptu obliczeniowego, każdy znak zodiaku reprezentuje segment 30^\\circ. Proces konwersji musi uwzględniać indeks znaku, gdzie Baran przyjmuje wartość 0, a Ryby 11\. Formuła matematyczna w notacji programistycznej przyjmuje postać:

| Znak Zodiaku | Indeks (Index\_{Znak}) | Zakres Długości Absolutnej |
| :---- | :---- | :---- |
| Baran (Aries) | 0 | 0^\\circ \- 29^\\circ 59' 59'' |
| Byk (Taurus) | 1 | 30^\\circ \- 59^\\circ 59' 59'' |
| Bliźnięta (Gemini) | 2 | 60^\\circ \- 89^\\circ 59' 59'' |
| Rak (Cancer) | 3 | 90^\\circ \- 119^\\circ 59' 59'' |
| Lew (Leo) | 4 | 120^\\circ \- 149^\\circ 59' 59'' |
| Panna (Virgo) | 5 | 150^\\circ \- 179^\\circ 59' 59'' |
| Waga (Libra) | 6 | 180^\\circ \- 209^\\circ 59' 59'' |
| Skorpion (Scorpio) | 7 | 210^\\circ \- 239^\\circ 59' 59'' |
| Strzelec (Sagittarius) | 8 | 240^\\circ \- 269^\\circ 59' 59'' |
| Koziorożec (Capricorn) | 9 | 270^\\circ \- 299^\\circ 59' 59'' |
| Wodnik (Aquarius) | 10 | 300^\\circ \- 329^\\circ 59' 59'' |
| Ryby (Pisces) | 11 | 330^\\circ \- 359^\\circ 59' 59'' |

W przykładzie praktycznym, Mars znajdujący się w 1° Strzelca 53' zostaje przeliczony jako (8 \\times 30\) \+ 1 \+ 53/60 \= 241,8833^\\circ. Takie podejście pozwala na bezbłędne wykonywanie operacji arytmetycznych, unikając problemów z przejściami między znakami.

### **Obliczanie punktu środkowego i logika krótkiego łuku**

Zdefiniowanie punktu środkowego między dwiema planetami (A i B) opiera się na średniej arytmetycznej ich długości absolutnych (L\_1 i L\_2). Jednakże, ze względu na kolisty charakter zodiaku, algorytm musi zawsze wybierać środek krótszego łuku między punktami.  
Standardowa formuła:  
Logika korekcyjna dla programisty:

1. Oblicz odległość między planetami: D \= |L\_1 \- L\_2|.  
2. Jeżeli D \> 180^\\circ, skoryguj wynik: MP \= (MP\_{raw} \+ 180^\\circ) \\pmod{360}.  
3. W przeciwnym razie: MP \= MP\_{raw}.

Ta korekta jest krytyczna; bez niej punkt środkowy między planetą w 350° (koniec Ryb) a 10° (początek Barana) zostałby błędnie wyznaczony jako 180° (Waga), podczas gdy poprawny wynik to 0° (Baran).

## **Tarcze 90 i 45 stopni: Redukcja danych i analiza harmoniczna**

W tradycji Szkoły Hamburskiej i Kosmobiologii, analiza nie odbywa się na standardowym kole 360^\\circ, lecz na tzw. tarczy 90 stopni (4. harmoniczna). Jest to zabieg mający na celu sprowadzenie wszystkich twardych aspektów (koniunkcja, kwadratura, opozycja) do postaci koniunkcji na mniejszej tarczy.

### **Matematyczna redukcja modularna**

Dla celów programistycznych, każda pozycja L\_{abs} jest poddawana operacji modulo względem wybranego modułu tarczy:

* Tarcza 90°: L\_{90} \= L\_{abs} \\pmod{90}  
* Tarcza 45°: L\_{45} \= L\_{abs} \\pmod{45}

Zastosowanie tarczy 90° pozwala na błyskawiczne wykrywanie tzw. obrazów planetarnych. Jeżeli planeta C znajduje się w twardym aspekcie do midpointu A/B, to na tarczy 90° ich pozycje będą identyczne (w granicach dopuszczalnego orbu). Jest to niezwykle wydajne obliczeniowo, ponieważ zamiast sprawdzać pięć różnych aspektów, skrypt porównuje tylko jedną wartość zredukowaną.

| Typ Aspektu | Kąt w 360^\\circ | Pozycja na tarczy 90^\\circ | Pozycja na tarczy 45^\\circ |
| :---- | :---- | :---- | :---- |
| Koniunkcja | 0^\\circ | 0^\\circ | 0^\\circ |
| Kwadratura | 90^\\circ | 0^\\circ | 0^\\circ |
| Opozycja | 180^\\circ | 0^\\circ | 0^\\circ |
| Półkwadrat | 45^\\circ | 45^\\circ | 0^\\circ |
| Półtorakwadrat | 135^\\circ | 45^\\circ | 0^\\circ |

Większość współczesnych astrologów pracujących z midpointami używa orbu od 1,0^\\circ do 2,0^\\circ, przy czym Reinhold Ebertin sugerował utrzymanie orbu w granicach 1,5^\\circ dla większości kombinacji.

## **Klasyfikacja i katalog punktów środkowych**

W systemie astrologicznym opartym na midpointach wyróżniamy kilka poziomów istotności punktów wrażliwych. Skrypt powinien uwzględniać nie tylko planety główne, ale także osie horoskopu, punkty astronomiczne i hipotetyczne ciała Szkoły Hamburskiej.

### **Kluczowe pary planetarne (Radix Midpoints)**

Poniższa tabela stanowi bazę danych interpretacyjnych dla podstawowych kombinacji planetarnych stosowanych w systemie Ebertina (COSI).

| Midpoint | Nazwa / Archetyp | Kluczowe znaczenie | Biologia / Medycyna |
| :---- | :---- | :---- | :---- |
| **Słońce/Księżyc** | Oś Małżeństwa | Harmonia duszy i ciała, partnerstwo, rodzice | Serce, rytm życiowy, płodność |
| **Słońce/Merkury** | Intelekt | Myślenie o sobie, autoekspresja poprzez mowę | Układ nerwowy, percepcja |
| **Słońce/Wenus** | Urok | Poczucie piękna, miłość do życia, harmonia | Cukier w organizmie, gruczoły |
| **Słońce/Mars** | Witalność | Aktywność, siła woli, przedsiębiorczość | Krew, mięśnie, temperatura ciała |
| **Słońce/Jowisz** | Szczęście | Optymizm, sukces, ekspansja, uznanie | Wątroba, procesy wzrostu |
| **Słońce/Saturn** | Zahamowanie | Dyscyplina, trudności, izolacja, starość | Kości, złogi, przewlekłe stany |
| **Słońce/Uran** | Rebelia | Nagłe zmiany, innowacja, niezależność | Impulsy nerwowe, arytmia |
| **Słońce/Neptun** | Wrażliwość | Mistycyzm, osłabienie, iluzja, wizje | Osłabienie odporności, paraliż |
| **Słońce/Pluton** | Potęga | Transformacja, fanatyzm, dążenie do władzy | Regeneracja komórkowa |
| **Księżyc/Mars** | Emocjonalność | Impulsywność, kłótliwość, pasja | Zapalenia macicy, gorączka |
| **Księżyc/Saturn** | Depresja | Poczucie osamotnienia, melancholia | Trawienie, zahamowania limfatyczne |
| **Merkury/Jowisz** | Optymizm | Dobre wieści, sukces w handlu i nauce | Sprawność werbalna |
| **Mars/Saturn** | Oś Śmierci | Blokada energii, praca pod przymusem, śmierć | Ustanie czynności życiowych |
| **Mars/Uran** | Oś Wypadków | Nagłe operacje, gwałtowne zdarzenia | Rany cięte, pęknięcia, urazy |
| **Saturn/Neptun** | Oś Choroby | Chroniczne dolegliwości, rezygnacja, lęk | Infekcje, zatrucia, wyniszczenie |

### **Osie i punkty czułe (Angles & Sensitive Points)**

Punkty środkowe angażujące osie horoskopu (Ascendent \- ASC i Medium Coeli \- MC) są kluczowe dla personalizacji prognozy. Punkt ASC/MC jest uważany za jeden z najważniejszych punktów w horoskopie, reprezentujący moment, w którym osobowość (ASC) spotyka się z przeznaczeniem i karierą (MC).  
Równie istotny jest tzw. Punkt Barana (Aries Point \- AP), zdefiniowany jako 0^\\circ znaków kardynalnych. Reprezentuje on relację jednostki z ogółem społeczeństwa i światem zewnętrznym. Każdy midpoint padający na AP (np. Słońce/Jowisz \= AP) sugeruje, że potencjał danej pary planetarnej zostanie zauważony publicznie.

## **Implementacja planet transneptunowych (Szkoła Hamburska)**

Dla profesjonalnego oprogramowania astrologicznego obsługa ośmiu hipotetycznych planet Szkoły Hamburskiej jest standardem wymaganym przez nurt Uraniczny. Choć ciała te nie mają fizycznego odpowiednika w astronomii (choć Alfred Witte postulował ich istnienie na podstawie perturbacji orbit), ich pozycje są obliczane za pomocą precyzyjnych efemeryd.

| Planeta | Dystans (AU) | Symbolika w midpointach | Interpretacja |
| :---- | :---- | :---- | :---- |
| **Cupido** | 41,0 | Małżeństwo, rodzina, sztuka | Wspólnoty, estetyka grupowa |
| **Hades** | 50,7 | Starożytność, nędza, głębia, rozkład | Praca z przeszłością, leczenie, ezoteryka |
| **Zeus** | 59,2 | Twórczość, celność, ogień, maszyny | Liderstwo, płodność, technika |
| **Kronos** | 64,8 | Autorytet, rząd, wysokość, ojciec | Wybitność, standardy, państwo |
| **Apollon** | 70,4 | Wielka wiedza, sukces, wielość | Nauka, handel na dużą skalę |
| **Admetos** | 73,3 | Skupienie, fundament, opór, śmierć | Głęboka koncentracja, blokada, cykle |
| **Vulkanus** | 77,3 | Potężna energia, siła, przeznaczenie | Nieodparta siła, wielka moc fizyczna |
| **Poseidon** | 83,5 | Duchowość, oświecenie, idea | Jasność umysłu, religia, ideologia |

Włączenie tych punktów do bazy danych midpointów drastycznie rozszerza liczbę kombinacji, co wymaga od programisty optymalizacji struktur danych, np. poprzez zastosowanie obiektów typu JSON przechowujących predefiniowane interpretacje dla każdej z tysięcy możliwych trójek planetarnych.

## **Punkty Arabskie jako specyficzny rodzaj midpointów**

Tradycyjne Punkty Arabskie (np. Punkt Fortuny) są matematycznie spokrewnione z midpointami, lecz wykorzystują formułę trzech punktów: Obraz \= Punkt Personalny \+ Sygnifikator \- Wyzwalacz.  
Najważniejszy z nich, Punkt Fortuny (Pars \\ Fortune), obliczany jest inaczej dla urodzeń dziennych i nocnych, co skrypt musi obsługiwać automatycznie:

* Dzień: ASC \+ Księżyc \- Słońce  
* Noc: ASC \+ Słońce \- Księżyc

Z perspektywy techniki symetrii, Punkt Fortuny jest miejscem, w którym odległość między Słońcem a Księżycem zostaje rzutowana z Ascendentu. W analizie midpointowej Punkt Fortuny traktuje się jako czuły odbiornik, na który mogą padać midpointy innych planet, aktywując obietnicę sukcesu materialnego.

## **Architektura skryptu: Obliczenia i sortowanie**

Aby program mógł wygenerować tzw. Drzewo Midpointów (Midpoint Tree) lub sortowanie 90-stopniowe, konieczne jest zastosowanie wydajnych algorytmów sortujących, ze względu na dużą liczbę kombinacji.

### **Algorytm generowania drzewa**

1. **Inicjalizacja**: Pobierz listę N aktywnych punktów (planety, osie, asteroidy).  
2. **Kombinatoryka**: Wygeneruj wszystkie unikalne pary planetarne P \= \\frac{N(N-1)}{2}.  
3. **Obliczenia**: Dla każdej pary oblicz midpoint zgodnie z logiką krótkiego łuku i wykonaj redukcję modulo 90\.  
4. **Przechowywanie**: Zapisz wyniki w tablicy obiektów zawierającej indeksy planet źródłowych oraz wartość zredukowaną.  
5. **Sortowanie**: Użyj algorytmu typu QuickSort lub MergeSort do uporządkowania midpointów według ich pozycji 0^\\circ \- 90^\\circ.  
6. **Wyszukiwanie Aspektów**: Dla każdego punktu radix (planety) znajdź wszystkie midpointy, których wartość zredukowana mieści się w zakresie Pozycja\_{Planety} \\pm Orb.

### **Obsługa precyzji czasu i logarytmów**

Choć współczesne procesory wykonują obliczenia zmiennoprzecinkowe błyskawicznie, historycznie obliczenia te opierały się na logarytmach proporcjonalnych. Skrypt powinien dążyć do precyzji rzędu 0,0001 stopnia, aby uniknąć błędów kumulatywnych przy obliczaniu dyrekcji łuku słonecznego, gdzie błąd jednej minuty kątowej może przesunąć prognozowane zdarzenie o kilka dni.

## **Analiza medyczna i biologiczna w systemie Ebertina**

Jednym z najbardziej unikalnych zastosowań midpointów jest astrologia medyczna. Reinhold Ebertin, współpracując z klinikami w Niemczech, opracował katalog biologicznych korespondencji dla poszczególnych kombinacji. Implementacja modułu medycznego w programie powinna opierać się na identyfikacji tzw. "osi krytycznych".

| Kombinacja | Znaczenie biologiczne | Potencjalne dysfunkcje |
| :---- | :---- | :---- |
| **Słońce/Księżyc** | Równowaga płynów | Zaburzenia metaboliczne |
| **Mars/Saturn** | Przerwanie dopływu krwi | Śmierć tkanek, gangrena, atrofia |
| **Saturn/Neptun** | Infekcje ukryte | Nowotwory, zatrucia, choroby przewlekłe |
| **Mars/Pluton** | Gwałtowna regeneracja | Zapalenia ostre, reakcje alergiczne |
| **Jowisz/Saturn** | Formowanie tkanek | Zaburzenia wzrostu kości, wątroba |

Wykrycie w horoskopie układu, w którym np. Tranzytujący Saturn uderza w urodzeniowy midpoint Mars/Neptun (osłabienie witalności), powinno generować w programie odpowiednie ostrzeżenie o spadku odporności.

## **Obliczenia dynamiczne: Tranzyty i Dyrekcje Łuku Słonecznego**

Punkty środkowe są statyczne w radixie, ale ich aktywacja następuje poprzez ruch planet tranzytujących oraz dyrekcje.

### **Dyrekcje Łuku Słonecznego (Solar Arc)**

Jest to najskuteczniejsza technika prognostyczna w systemie midpointowym. Algorytm przesunięcia jest następujący:

1. Oblicz pozycję Słońca w dniu urodzenia (Sun\_{nat}).  
2. Oblicz pozycję Słońca progresywnego na dany dzień życia (Sun\_{prog}).  
3. Wyznacz Łuk Słoneczny: Arc \= Sun\_{prog} \- Sun\_{nat}.  
4. Dodaj Arc do każdego urodzeniowego midpointu i planety.

Skrypt powinien następnie porównać te "dyrygowane" punkty z punktami urodzeniowymi. Kontakt dyrygowanego midpointu Słońce/Księżyc z urodzeniowym Jowiszem niemal zawsze wskazuje na rok dużego sukcesu osobistego lub powiększenia rodziny.

## **Standardy prezentacji danych i UI w oprogramowaniu**

Profesjonalne programy, takie jak LUNA czy Astro Gold, stosują specyficzne standardy prezentacji, które programista powinien zreplikować.

### **Midpoint DataSheet**

Tabela danych powinna zawierać kolumny:

* Para planet (np. Sun/Moon).  
* Pozycja zodiakalna (znak, stopnie, minuty).  
* Wartość modułu 90°.  
* Jakość znaku (kardynalny, stały, zmienny).  
* Planety aspektujące dany midpoint w radixie.

### **Wykresy graficzne i dialy**

Wizualizacja tarczy 90 stopni z ruchomym wskaźnikiem (pointerem) pozwala użytkownikowi na ręczne wyszukiwanie symetrii. Gdy wskaźnik jest ustawiony na dany stopień, program powinien dynamicznie podświetlać wszystkie pary planet, które tworzą midpoint w tym miejscu (tzw. "Completed Planetary Pictures").

## **Podsumowanie i wytyczne dla programisty**

Stworzenie solidnego modułu midpointów wymaga nie tylko biegłości w programowaniu, ale i zrozumienia specyficznej logiki "obrazów planetarnych". System powinien być budowany modularnie, z wyraźnym oddzieleniem silnika efemeryd od logiki interpretacyjnej.  
Kluczowe zalecenia techniczne:

* Używaj wyłącznie długości absolutnej do obliczeń wewnętrznych.  
* Zaimplementuj obsługę krótkiego łuku jako domyślną.  
* Zastosuj tarcze harmoniczne (90 i 45 stopni) do redukcji orbu i wykrywania aspektów.  
* Uwzględnij planety transneptunowe i osie jako punkty o równej wadze z planetami.  
* Wykorzystaj algorytmy sortujące do generowania czytelnych drzew midpointów.

Punkty środkowe stanowią most między tradycyjną astrologią a nowoczesną analizą systemową. Dla twórcy oprogramowania są one okazją do zaoferowania użytkownikom narzędzia o niezwykłej precyzji, zdolnego do odkrywania głębokich struktur losu i biologii, które pozostają niewidoczne dla standardowych technik aspektowych. Niniejszy raport wyczerpuje techniczne ramy niezbędne do rozpoczęcia prac nad skryptami, stanowiąc kompletną bazę wiedzy dla zaawansowanego systemu astrologicznego.

#### **Cytowane prace**

1\. How to Interpret Midpoints in Astrology \- Hiroki Niizato, https://hniizato.com/midpoints-in-astrology/ 2\. Midpoint (astrology) \- Wikipedia, https://en.wikipedia.org/wiki/Midpoint\_(astrology) 3\. Midpoints in Astrology: Historical Origins, https://theastrologypodcast.com/2026/03/26/midpoints-in-astrology-historical-origins/ 4\. Midpoints in Astrology: Ebertin & Munkasey | PDF | New Age Practices \- Scribd, https://www.scribd.com/document/434002883/Mid-Points 5\. The Midpoint Method In Astrology \- Mastering the Zodiac, https://masteringthezodiac.com/midpoint-method 6\. Computing Approximate Solar Coordinates \- US Naval Observatory Astronomical Applications Department, https://aa.usno.navy.mil/faq/sun\_approx 7\. Understanding Midpoints in Medical Astrology | PDF \- Scribd, https://www.scribd.com/document/821710824/Ebertin-midpoints 8\. Computer Coding & Ascendant Calculations : r/astrology \- Reddit, https://www.reddit.com/r/astrology/comments/savduo/computer\_coding\_ascendant\_calculations/ 9\. Midpoint DataSheet \- LUNA Support Center., https://support.lunaastrology.com/knowledge-base/midpoint-datasheet/ 10\. Midpoints in the Natal & Composite Charts \- Mastering the Zodiac, https://masteringthezodiac.com/astrological-midpoints 11\. Reinhold Ebertin \- Wikipedia, https://en.wikipedia.org/wiki/Reinhold\_Ebertin 12\. Reinhold Ebertin \- The Astrology Center of America, https://astroamerica.com/ebertin.html 13\. MIDPOINTS IN ASTROLOGY, https://www.holmastrology.com/post/midpoints-in-astrology-2 14\. Opinions and simple introduction to midpoints please. : r/Advancedastrology \- Reddit, https://www.reddit.com/r/Advancedastrology/comments/roce07/opinions\_and\_simple\_introduction\_to\_midpoints/ 15\. Hamburg School of Astrology \- Wikipedia, https://en.wikipedia.org/wiki/Hamburg\_School\_of\_Astrology 16\. The Combination of Stellar Influences \- Reinhold Ebertin \- Google Books, https://books.google.com/books/about/The\_Combination\_of\_Stellar\_Influences.html?id=wRWRh6WXNtsC 17\. Ebertin Midpoints | PDF | Planets In Astrology | Astronomy \- Scribd, https://www.scribd.com/document/892667341/Ebertin-midpoints 18\. Exploring the Aries Point \- Alice Sparkly Kat, https://www.alicesparklykat.com/articles/89/Exploring\_the\_Aries\_Point/ 19\. Aries Point in Astrology: Potential for Public Recognition \- Hiroki Niizato, https://hniizato.com/aries-point-astrology/ 20\. midpoints 101 \- ambient astrology, https://ambientastrology.com/articles/2011/4/20/midpoints-101.html 21\. Hamburg School of Astrology Overview | PDF \- Scribd, https://ru.scribd.com/document/217409871/The-Hamburg-School-of-Astrology 22\. VisualAstro: Astrology \- App Store \- Apple, https://apps.apple.com/us/app/visualastro-astrology/id6745230460 23\. Displayed Points \- Astro Gold, https://www.astrogold.io/AG-MacOS-Help/displayed-points.html 24\. Planetary Dictionary Plus \- Free download and install on Windows \- Microsoft Store, https://apps.microsoft.com/detail/9nq1k60t5cxg?hl=en-GB\&gl=AU 25\. What are Arabic Lots and how are they calculated? : r/astrology \- Reddit, https://www.reddit.com/r/astrology/comments/1k298sx/what\_are\_arabic\_lots\_and\_how\_are\_they\_calculated/ 26\. Arabic Parts Calculation in Astrology | PDF | Teaching Methods & Materials \- Scribd, https://www.scribd.com/doc/168993281/Arabic-Parts 27\. Planetary Pictures: An Introduction by Gary Christen In the previous article, I discussed the revitalization of astrology at the, https://www.alabe.com/text/Christen-SymAst2.pdf 28\. Hermetic Lots (Arabic Parts) \- Benebell Wen, https://benebellwen.com/astrology-2/hermetic-lots/ 29\. Horary astrology, cosmobiology and part of fortune, https://www.astrology-house.com/glossary.cfm?section=p 30\. Tree sort \- Wikipedia, https://en.wikipedia.org/wiki/Tree\_sort 31\. Sorting algorithm \- Wikipedia, https://en.wikipedia.org/wiki/Sorting\_algorithm 32\. Simplified Scientific Astrology/How to Calculate \- Wikisource, the free online library, https://en.wikisource.org/wiki/Simplified\_Scientific\_Astrology/How\_to\_Calculate 33\. Midpoints and Solar Arc directions with Stelliums : r/Advancedastrology \- Reddit, https://www.reddit.com/r/Advancedastrology/comments/106jg8r/midpoints\_and\_solar\_arc\_directions\_with\_stelliums/ 34\. Rules For Planetary Pictures by Witte-Lefeldt | PDF | Planets In Astrology \- Scribd, https://www.scribd.com/document/684899647/Rules-for-Planetary-Pictures-by-Witte-Lefeldt 35\. The Growing-Tree Sorting Algorithm \- WSEAS US, https://www.wseas.us/e-library/transactions/information/2011/53-408.pdf