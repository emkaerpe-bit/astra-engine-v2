# **Kompleksowa implementacja systemów symboliki sabiańskiej w środowisku agentycznym Google Antigravity: Raport techniczny i operacyjny**

Analiza nowoczesnych systemów astrologii obliczeniowej wskazuje na postępującą integrację precyzyjnej mechaniki nieba z zaawansowanymi modelami generatywnymi. W centrum tego styku znajduje się symbolika sabiańska – unikalny zestaw 360 obrazów archetypowych, z których każdy odpowiada jednemu stopniowi zodiaku. Współczesne wyzwanie polega nie tylko na poprawnym wyliczeniu pozycji planet, ale na stworzeniu spójnego środowiska programistycznego, które zautomatyzuje interpretację tych punktów. Wykorzystanie platformy Google Antigravity, będącej prekursorem paradygmatu "agent-first development", pozwala na wyniesienie procesu kodowania na poziom task-oriented, gdzie autonomiczne agenty przejmują rolę głównych wykonawców skomplikowanej logiki astrologicznej.

## **Geneza i struktura systemu symboli sabiańskich**

Zrozumienie technicznych wymagań stawianych skryptowi obliczeniowemu wymaga uprzedniej analizy struktury samego systemu. Symbole sabiańskie zostały skodyfikowane w 1925 roku przez Marca Edmunda Jonesa, amerykańskiego astrologa, oraz Elsie Wheeler, jasnowidzącą, w parku Balboa w San Diego. System ten opiera się na wizjach, które Wheeler przypisała każdemu z 360 stopni koła zodiakalnego. Choć wywodzą się one z tradycji spirytualistycznej, ich matematyczna struktura jest nierozerwalnie związana z podziałem ekliptyki na dwanaście znaków po trzydzieści stopni każdy.

### **Podstawy matematyczne podziału zodiaku**

Zodiak, rozumiany jako pas sfery niebieskiej, po którym porusza się Słońce, jest mierzony w układzie współrzędnych ekliptycznych. Każdy stopień tego koła (360^{\\circ}) niesie ze sobą specyficzną sygnaturę energetyczną, która w systemie sabiańskim zostaje przełożona na narracyjny obraz. W poniższej tabeli przedstawiono strukturę podziału zodiaku, która stanowi fundament dla algorytmów mapowania symboli.

| Znak Zodiaku | Zakres długości ekliptycznej (0-360^{\\circ}) | Indeks stopnia (według tradycji sabiańskiej) |
| :---- | :---- | :---- |
| Baran (Aries) | 0.00^{\\circ} \- 29.99^{\\circ} | 1 \- 30 |
| Byk (Taurus) | 30.00^{\\circ} \- 59.99^{\\circ} | 31 \- 60 |
| Bliźnięta (Gemini) | 60.00^{\\circ} \- 89.99^{\\circ} | 61 \- 90 |
| Rak (Cancer) | 90.00^{\\circ} \- 119.99^{\\circ} | 91 \- 120 |
| Lew (Leo) | 120.00^{\\circ} \- 149.99^{\\circ} | 121 \- 150 |
| Panna (Virgo) | 150.00^{\\circ} \- 179.99^{\\circ} | 151 \- 180 |
| Waga (Libra) | 180.00^{\\circ} \- 209.99^{\\circ} | 181 \- 210 |
| Skorpion (Scorpio) | 210.00^{\\circ} \- 239.99^{\\circ} | 211 \- 240 |
| Strzelec (Sagittarius) | 240.00^{\\circ} \- 269.99^{\\circ} | 241 \- 270 |
| Koziorożec (Capricorn) | 270.00^{\\circ} \- 299.99^{\\circ} | 271 \- 300 |
| Wodnik (Aquarius) | 300.00^{\\circ} \- 329.99^{\\circ} | 301 \- 330 |
| Ryby (Pisces) | 330.00^{\\circ} \- 359.99^{\\circ} | 331 \- 360 |

Źródło opracowania:  
Ważnym spostrzeżeniem wynikającym z analizy źródeł jest rozbieżność w liczbie symboli w niektórych publikacjach, gdzie mowa o 288 lub 312 glifach, jednak standardem w profesjonalnej astrologii pozostaje pełna matryca 360 stopni. Każdy symbol identyfikowany jest poprzez nazwę, opis oraz numerologiczną sygnaturę, co czyni go nie tylko narzędziem dywinacyjnym, ale również złożonym obiektem danych.

### **Krytyczna reguła zaokrąglania (The Next Whole Number)**

Najczęstszym błędem w implementacji systemów sabiańskich jest błędne przypisanie stopnia planety do symbolu. Tradycja sabiańska kategorycznie stwierdza, że nie istnieje coś takiego jak "stopień 0". Każdy z dwunastu znaków operuje na skali 1-30. Z punktu widzenia programisty oznacza to, że pozycja planety musi zostać zawsze zaokrąglona w górę do najbliższej liczby całkowitej (funkcja sufitu).  
Szczegółowa logika zaokrąglania przedstawia się następująco:

1. Jeżeli planeta znajduje się na pozycji 0^{\\circ}00' znaku (np. 00 Leo 00), należy ją zaokrąglić w dół do 30 stopnia poprzedniego znaku (np. 30 Cancer), chyba że osiągnięto co najmniej jedną minutę kątową.  
2. Jeżeli planeta znajduje się na pozycji 0^{\\circ}01' znaku, odczytywany jest symbol dla 1 stopnia tego znaku.  
3. Dowolna pozycja przekraczająca pełną liczbę stopni (np. 26 Leo 01\) wymusza odczyt symbolu dla następnego stopnia (w tym przypadku 27 Leo).  
4. W przypadku pozycji powyżej 29^{\\circ}01', traktuje się ją jako 30 stopień danego znaku.

Zasada ta wynika z koncepcji "roku życia" – dziecko, które zaczyna pierwszy rok życia, znajduje się w przedziale od 0 do 1 roku, ale potocznie mówi się o nim jako o będącym w pierwszym roku. Analogicznie, planeta znajdująca się w przedziale 0^{\\circ} \- 1^{\\circ} realizuje archetyp 1 stopnia.

## **Techniczne fundamenty obliczeń: Biblioteka PySwissEph**

Aby skrypt astrologiczny był wiarygodny, musi opierać się na precyzyjnych danych astronomicznych. Standardem branżowym jest biblioteka Swiss Ephemeris, dostępna dla języka Python jako pyswisseph. Biblioteka ta pozwala na wyznaczanie pozycji planet z uwzględnieniem nutacji, aberracji i precesji, co jest niezbędne dla dokładnego mapowania symboli sabiańskich na styku stopni.

### **Inicjalizacja i konfiguracja środowiska**

Pierwszym krokiem w procesie kodowania jest poprawne ustawienie ścieżki do plików efemeryd. Pliki te (z rozszerzeniem .se1) zawierają dane o pozycjach ciał niebieskich i muszą być dostępne lokalnie dla silnika obliczeniowego.  
W systemach Unix ścieżkę ustawia się poprzez swe.set\_ephe\_path(), natomiast na systemie Windows proces budowania biblioteki wymaga środowiska MinGW i odpowiedniej konfiguracji pthreads. Kluczowe parametry konfiguracyjne dla biblioteki to m.in.:

* swe.FLG\_SWIEPH: Wykorzystanie efemeryd szwajcarskich (najwyższa dokładność).  
* swe.FLG\_SIDEREAL: Flaga niezbędna przy obliczeniach w astrologii wedyjskiej, wymagająca odjęcia Ayanamsy (np. Lahiri).  
* swe.utc\_to\_jd(): Konwersja czasu cywilnego (rok, miesiąc, dzień, godzina) na format Julian Day, który jest uniwersalną jednostką czasu w astronomii.

### **Algorytm ekstrakcji długości ekliptycznej**

Funkcja swe.calc\_ut() zwraca krotkę sześciu wartości zmiennoprzecinkowych. Dla potrzeb symboliki sabiańskiej kluczowa jest pierwsza z nich – długość ekliptyczna (L) wyrażona w stopniach od 0 do 360\. Poniżej przedstawiono procedurę matematyczną prowadzącą do uzyskania numeru symbolu:

1. Obliczenie Julian Day dla zadanej daty UTC.  
2. Wywołanie swe.calc\_ut(jd, planet\_id, flags).  
3. Wyznaczenie pozycji w znaku: P \= L \\pmod{30}.  
4. Wyznaczenie numeru znaku: Z \= \\lfloor L / 30 \\rfloor \+ 1\.  
5. Zastosowanie reguły zaokrąglania sabiańskiego: S \= \\lceil P \\rceil.

W przypadku uzyskania wartości S=0 (co matematycznie rzadko występuje przy ceil dla dodatnich liczb, ale może wynikać z precyzji zmiennoprzecinkowej), należy przyjąć wartość 1\. Specyfika implementacji w Pythonie wymaga użycia modułu math, a w szczególności funkcji math.ceil() do poprawnej obsługi inkrementacji stopnia.

## **Google Antigravity: Środowisko agentyczne nowej generacji**

Wprowadzenie Google Antigravity w listopadzie 2025 roku zmieniło sposób, w jaki inżynierowie podchodzą do tworzenia oprogramowania. Antigravity nie jest tylko edytorem kodu z funkcją autouzupełniania; to zintegrowane środowisko programistyczne (IDE), w którym głównym aktorem jest autonomiczny agent AI. Agent ten potrafi rozumować nad całością repozytorium, planować zmiany w wielu plikach jednocześnie i weryfikować ich poprawność poprzez uruchamianie testów.

### **Architektura systemu i interfejsu**

Antigravity składa się z trzech głównych powierzchni operacyjnych :

* **Agent Manager:** Minimalistyczny widok skoncentrowany na konwersacji z agentem i przeglądaniu artefaktów. Pozwala na nadzorowanie wielu zadań równolegle w różnych obszarach roboczych.  
* **Editor:** W pełni funkcjonalne IDE oparte na Visual Studio Code, zintegrowane z funkcjami agentycznymi, takimi jak Tab (inteligentne autouzupełnianie) i Command (instrukcje inline).  
* **Browser:** Agenty mogą korzystać z wbudowanej przeglądarki do odczytywania dokumentacji, testowania interfejsów użytkownika i walidacji wdrożeń.

Dla programisty astrologicznego kluczowe jest to, że Antigravity pozwala na pracę na wysokim poziomie abstrakcji. Zamiast ręcznego pisania pętli obsługujących efemerydy, użytkownik opisuje cel zadania, a agent projektuje architekturę systemu.

### **Konfiguracja agenta i polityki bezpieczeństwa**

Podczas pierwszego uruchomienia Antigravity użytkownik musi podjąć decyzje dotyczące stopnia autonomii agenta. Dostępne są trzy główne tryby:

* **Agent-driven development ("Autopilot"):** Agent samodzielnie pisze kod, tworzy pliki i wykonuje komendy terminala.  
* **Review-driven development:** Każda akcja agenta wymaga jawnego zatwierdzenia przez człowieka.  
* **Agent-assisted development:** Tryb hybrydowy, zalecany dla większości zadań.

Istotne są również polityki dotyczące terminala i JavaScriptu. W projektach takich jak skrypt astrologiczny, który wymaga instalacji zewnętrznych bibliotek (pip install pyswisseph), warto ustawić terminal na "Always Proceed" (tylko dla zaufanych bibliotek) lub "Request Review", aby kontrolować instalowane zależności.

## **Instrukcja obsługi Google Antigravity dla projektu sabiańskiego**

Aby poprawnie skodować program do obliczania symboli sabiańskich w Antigravity, należy postępować zgodnie z ustrukturyzowanym procesem agentycznym. Agent najlepiej radzi sobie wtedy, gdy ma jasne wytyczne dotyczące architektury i specyficznych reguł dziedzinowych.

### **Krok 1: Inicjalizacja obszaru roboczego i zadań**

Proces rozpoczyna się od stworzenia pustego folderu i otwarcia go w Antigravity. W panelu Agent Managera należy kliknąć "New Task" i wprowadzić szczegółowy prompt.  
| Element Promptu | Opis techniczny | | :--- | :--- | | **Cel (Goal)** | Stwórz aplikację w Pythonie obliczającą symbole sabiańskie dla wszystkich planet układu słonecznego. | | **Ograniczenia (Constraints)** | Użyj biblioteki pyswisseph. Pliki efemeryd znajdują się w podfolderze ephe/. | | **Logika biznesowa** | Zaimplementuj regułę "zawsze zaokrąglaj stopień w górę". 0.00^{\\circ} to 30\. stopień poprzedniego znaku. | | **Wymagane wyjście** | Skrypt powinien zwracać nazwę znaku, numer stopnia i pełny opis symbolu z bazy JSON. |  
Zastosowanie wzorca **Goal \+ Constraints** zapewnia, że agent nie pominie krytycznych aspektów astronomicznych na rzecz prostszych rozwiązań matematycznych.

### **Krok 2: Zarządzanie artefaktami planowania**

Po otrzymaniu instrukcji agent przechodzi w tryb **PLANNING**. Generuje wtedy artefakt implementation\_plan.md. Dokument ten jest kluczowy, ponieważ zawiera techniczną strategię:

* Struktura plików (np. engine.py, data\_loader.py, utils.py).  
* Potrzebne zależności (np. math, json, swisseph).  
* Plan weryfikacji (np. testy dla pozycji na granicy znaków).

Użytkownik powinien przejrzeć ten plan. Jeżeli agent planuje użyć prostej funkcji int() zamiast math.ceil(), należy dodać komentarz do planu i zatwierdzić go ponownie, co wymusi na agencie korektę logiki.

### **Krok 3: Wykorzystanie "Umiejętności" (Skills) dla astrologii**

Antigravity pozwala na definiowanie tzw. Skills – reużywalnych paczek instrukcji dla agenta. Warto stworzyć specjalną umiejętność sabian-expert w folderze .agent/skills/.  
Plik SKILL.md dla tego projektu powinien zawierać :

* **Trigger phrase:** "Pomóż mi w mapowaniu stopni zodiaku na symbole sabiańskie."  
* **Core Instructions:** "Zawsze sprawdzaj, czy długość ekliptyczna jest Tropikalna. Przy mapowaniu na symbole sabiańskie dodaj 1 do części całkowitej stopnia w znaku."  
* **Decision Tree:** Instrukcja wyboru pomiędzy symbolem "Karmicznym" (stopień przed) a "Quest" (stopień po), jeśli użytkownik o to poprosi.

Dzięki temu agent zyskuje trwałą "wiedzę" o specyfice astrologicznej, która nie ulatuje po zakończeniu pojedynczej konwersacji.

## **Implementacja skryptu: Od logiki do bazy danych**

Poprawne zakodowanie skryptu wymaga integracji logiki obliczeniowej z bazą opisów tekstowych. Symbole sabiańskie to bogate narracje, które muszą być przechowywane w sposób ustrukturyzowany, najlepiej w formacie JSON lub CSV.

### **Przykładowe opisy w bazie danych**

Baza danych powinna zawierać 360 rekordów. Poniżej przedstawiono przykładowe dane, które agent musi poprawnie załadować i dopasować.

| Indeks (1-360) | Znak i Stopień | Opis Symbolu |
| :---- | :---- | :---- |
| 1 | Aries 1 | Kobieta wynurzająca się z oceanu, foka ją obejmuje. |
| 7 | Aries 7 | Człowiek odnoszący sukcesy w wyrażaniu siebie w dwóch sferach naraz. |
| 31 | Taurus 1 | Czysty górski strumień. |
| 94 | Cancer 4 | Kot kłócący się z myszą. |
| 190 | Libra 10 | Łódź wypływająca z wzburzonych wód na bezpieczne miejsce. |

Źródło danych:  
Ważnym aspektem jest obsługa tzw. stopni krytycznych. W astrologii stopnie 0^{\\circ}, 15^{\\circ} i 29^{\\circ} każdego znaku niosą szczególną intensywność. Agent powinien być poinstruowany, aby w raporcie końcowym flagować te pozycje, ponieważ reprezentują one odpowiednio początki nowych cykli, punkty kulminacyjne lub domknięcia karmiczne.

### **Struktura kodu generowanego przez agenta**

Skuteczny skrypt, stworzony przez agenta Antigravity, będzie miał strukturę modularną.

1. **Moduł Inicjalizacji:** Odpowiada za ustawienie ścieżek efemeryd i walidację plików .se1.  
2. **Moduł Matematyczny:** Realizuje funkcję get\_sabian\_degree(raw\_longitude), która zwraca liczbę całkowitą z zakresu 1-30.  
3. **Moduł Danych:** Ładuje plik JSON i implementuje funkcję lookup\_symbol(sign, degree).  
4. **Moduł Raportowania:** Generuje czytelny wynik, być może w formacie Markdown, który może zostać od razu wykorzystany jako artefakt w Antigravity.

Podczas egzekucji agent może napotkać problem braku plików efemeryd. Dzięki funkcji **Browser Use**, agent może samodzielnie wejść na stronę AstroDienst, pobrać brakujące pliki efemeryd i umieścić je w odpowiednim folderze projektu.

## **Weryfikacja i testowanie systemu w Antigravity**

Po napisaniu kodu agent Antigravity nie kończy pracy. Przechodzi on w fazę **VERIFICATION**. Jest to etap, w którym autonomiczny agent sprawdza, czy stworzony skrypt rzeczywiście realizuje założone cele.

### **Automatyzacja testów jednostkowych**

Użytkownik może wydać polecenie: "Stwórz i uruchom testy jednostkowe dla reguł zaokrąglania symboli sabiańskich". Agent stworzy wtedy plik test\_sabian.py, w którym sprawdzi przypadki brzegowe :

* Dla pozycji 0^{\\circ}00'01'' Barana wynik musi być "Aries 1".  
* Dla pozycji 30^{\\circ}00'00'' Barana (która w efemerydach jest tożsama z 0^{\\circ} Byka) wynik musi być "Aries 30".  
* Dla pozycji 14^{\\circ}30' dowolnego znaku wynik musi być 15\. stopniem tego znaku.

Jeśli którykolwiek z testów zawiedzie, agent automatycznie przeanalizuje logi błędu, poprawi kod w calculations.py i ponownie uruchomi testy, aż do uzyskania pełnej zgodności.

### **Artefakt walkthrough.md i dokumentacja końcowa**

Po pomyślnym zakończeniu zadań agent generuje dokument walkthrough.md. Jest to post-implementacyjne podsumowanie, które zawiera :

* Strukturę końcową projektu.  
* Instrukcję, jak uruchomić skrypt z terminala (np. python main.py \--date 1990-05-15).  
* Przykładowe wyniki obliczeń dla znanych postaci lub dat, co służy jako weryfikacja "naoczna" dla użytkownika.

Dokument ten jest przechowywany w repozytorium jako artefakt, co pozwala na łatwy powrót do projektu po miesiącach i szybkie zrozumienie logiki działania systemu przez innych programistów lub samego użytkownika.

## **Zaawansowane funkcje agentyczne: Interpretacja i synteza**

Wykorzystanie Google Antigravity pozwala na wyjście poza proste obliczenia. Agenty mogą zostać zaprogramowane do przeprowadzania głębokiej analizy horoskopu w oparciu o symbole sabiańskie, łącząc dane numeryczne z rozumowaniem semantycznym.

### **Dynamika stopni karmicznych i celowych (Quest)**

Lynda Hill, jedna z czołowych badaczek systemu sabiańskiego, wprowadziła pojęcia stopnia karmicznego (poprzedzającego) i stopnia celu (następnego). W Antigravity można stworzyć workflow, który automatycznie generuje taką triadę dla każdej planety:

1. **Karmic Condition:** Co dusza wnosi z przeszłości (stopień \-1).  
2. **Core Expression:** Aktualna lekcja (stopień obliczony).  
3. **Quest Degree:** Kierunek ewolucji (stopień \+1).

Agent może napisać funkcję, która dla każdej planety wywołuje mapowanie dla trzech kolejnych stopni i syntetyzuje te opisy w spójny raport tekstowy. Dzięki integracji z modelami takimi jak Gemini 3 Pro, agent może nadać tym opisom tonację odpowiednią dla klienta (np. profesjonalną, wspierającą lub terapeutyczną).

### **Optymalizacja wydajności i UI**

Jeżeli program ma obsługiwać tysiące obliczeń (np. dla badań statystycznych w astrologii mundalnej), agent może zoptymalizować kod, wprowadzając wektoryzację obliczeń lub wykorzystując bazę danych SQL zamiast plików JSON. Dodatkowo, poprzez umiejętność enhance\_ui, agent może zaproponować i wdrożyć prosty interfejs graficzny, który wizualizuje koło zodiakalne z zaznaczonymi symbolami sabiańskimi, dbając o estetykę zgodną z nowoczesnymi trendami designu (np. glassmorphism).

## **Podsumowanie i wytyczne operacyjne**

Implementacja symboliki sabiańskiej w środowisku Google Antigravity jest procesem, który łączy rygor astronomiczny z elastycznością nowoczesnej sztucznej inteligencji. Kluczem do sukcesu jest ścisłe przestrzeganie reguł zaokrąglania (The Next Whole Number) oraz wykorzystanie agentycznych mechanizmów planowania i weryfikacji.  
Dla profesjonalnych użytkowników przygotowano następujące wytyczne operacyjne:

* **Inicjalizacja:** Zawsze zaczynaj od zdefiniowania reguł zaokrąglania w AGENTS.md lub jako "Workspace Rule" w Antigravity. Zapobiegnie to błędnemu interpretowaniu stopni przez agenta.  
* **Dane:** Upewnij się, że agent ma dostęp do pełnej bazy 360 symboli. W razie braków, poinstruuj go, aby skorzystał z narzędzi przeglądarkowych w celu uzupełnienia opisów.  
* **Weryfikacja:** Nigdy nie akceptuj kodu bez artefaktu walkthrough.md i zielonych testów dla przypadków brzegowych na stykach znaków.  
* **Rozwój:** Wykorzystuj system "Skills" do budowania własnej, unikalnej bazy wiedzy astrologicznej, którą agenty będą mogły stosować w kolejnych projektach.

Google Antigravity, poprzez swoje agenty, zdejmuje z programisty ciężar manualnego zarządzania plikami i rutynowego kodowania, pozwalając mu skupić się na merytorycznej stronie interpretacji astrologicznej i projektowaniu innowacyjnych narzędzi dla nowej ery cyfrowej ezoteryki.

#### **Cytowane prace**

1\. Sabian Symbols: Home, https://sabiansymbols.com/ 2\. Introduction To "The Sabian Symbols by Degree: A Word History" \- Scribd, https://www.scribd.com/document/73824392/Introduction-to-The-Sabian-Symbols-by-Degree-A-Word-History 3\. hamodywe/antigravity-mastery-handbook: A comprehensive guide to Google Antigravity, the agentic AI development platform from Google. Covers concepts, features, comparisons, and real-world use cases \- GitHub, https://github.com/hamodywe/antigravity-mastery-handbook 4\. How to Set Up and Use Google Antigravity \- Codecademy, https://www.codecademy.com/article/how-to-set-up-and-use-google-antigravity 5\. Degrees in Astrology: Unlocking the Critical Secrets to Know \- Tiny Rituals, https://tinyrituals.co/blogs/tiny-rituals/degrees-in-astrology 6\. SABIAN SYMBOLS LIST, https://redeot.mte.gov.br/uploaded-files/4SQBKI/jMz134/symbols-list.pdf 7\. Full text of "The+ Sabian+ Symbols+ Record" \- Internet Archive, https://archive.org/stream/TheSabianSymbolsRecord/The%2BSabian%2BSymbols%2BRecord\_djvu.txt 8\. Complete List of Sabian Symbols | PDF | Nature \- Scribd, https://www.scribd.com/document/128339970/All-360-Sabian-Symbols 9\. mte.gov.br ·, https://redeot.mte.gov.br/Resources/4SQBKI/jMz134/symbols\_\_list.pdf 10\. Sabian Symbols at Sunrise, https://sabian.org/sunrise\_symbols.php 11\. Notes On How To Use The Sabian Symbols, https://sabiansymbols.com/2025/05/notes-on-how-to-use-the-sabian-symbols/ 12\. python pyswisseph calculate planets rashi or zodiac signs \- GitHub Gist, https://gist.github.com/EH30/6133342b67827e14add07a37b5cfb941 13\. astrorigin/pyswisseph: Python extension to the Swiss Ephemeris \- GitHub, https://github.com/astrorigin/pyswisseph 14\. Planet Positions in Python Version \- Swisseph \- Groups.io, https://groups.io/g/swisseph/topic/planet\_positions\_in\_python/27495343 15\. horoscop \- The CTAN archive, https://ctan.math.illinois.edu/macros/latex/contrib/horoscop/horoscop.pdf 16\. swisseph@groups.io | Topics, https://groups.io/g/swisseph/topics?page=6\&after=1698167751259429691 17\. The Ascendant using Python3 and PySwissEph \- Tech Shinobi, https://www.techshinobi.com/ascendant-using-python3-and-pyswisseph/ 18\. Pyswisseph Sidereal House Example | PDF | Superstitions | Technical Factors Of Astrology, https://www.scribd.com/document/358835706/SwissephemDLL-py 19\. Google Antigravity Documentation, https://antigravity.google/docs/home 20\. Agent Manager \- Google Antigravity Documentation, https://antigravity.google/docs/agent-manager 21\. Getting Started with Google Antigravity, https://codelabs.developers.google.com/getting-started-google-antigravity 22\. Google Antigravity's Top 10 Patterns for Effective AI Prompt \- Times Of AI, https://www.timesofai.com/industry-insights/top-google-antigravity-prompt-patterns/ 23\. Guide with AGENTS.md & Examples (2026) \- Antigravity Rules, https://antigravity.codes/blog/user-rules 24\. Agent Skills \- Google Antigravity Documentation, https://antigravity.google/docs/skills 25\. Authoring Google Antigravity Skills, https://codelabs.developers.google.com/getting-started-with-antigravity-skills 26\. The best Human Resources courses on the web \- SendOwl, https://www.sendowl.com/s/human-resources 27\. アジョシを募集 \- 札幌市・猫の保護団体「NyapanCatRescue」, http://nyapan.jp/family/blog/2015/12/03/post-46/ 28\. What Are Sabian Symbols & What Each Means For Your Zodiac Sign \- YourTango, https://www.yourtango.com/2020338186/sabian-symbols-story-meanings-degrees-explained 29\. 360 Symbolic Degrees in Astrology | PDF \- Scribd, https://www.scribd.com/document/632567519/Jeanne-Duzea-360-symbolic-degrees 30\. Symbolism of Zodiac's 360 Degrees | PDF \- Scribd, https://www.scribd.com/document/892712000/The-Symbolism-of-the-360-of-the-Zodiac-Janduz-Nicolaus 31\. krishnakanthb13/antigravity\_global\_skills: A curated collection of agentic skills for Antigravity AI, automating development workflows from code reviews and debugging to release management. \- GitHub, https://github.com/krishnakanthb13/antigravity\_global\_skills