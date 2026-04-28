# **Architektura techniczna i baza wiedzy systemu Zodiakalnego Uwalniania dla platformy Antigravity**

Współczesna astrologia obliczeniowa przechodzi renesans dzięki odzyskaniu starożytnych technik hellenistycznych, wśród których Zodiakalne Uwalnianie (Zodiacal Releasing) zajmuje pozycję nadrzędną jako najbardziej precyzyjne narzędzie do chronometrażu życia.1 Technika ta, opisana przez Vettiusa Valensa w II wieku n.e., opiera się na koncepcji, że potencjał zawarty w kosmogramie urodzeniowym nie manifestuje się w sposób ciągły, lecz jest aktywowany w ramach hierarchicznych struktur czasowych, znanych jako okresy "władców czasu" lub *chronokratorów*.1 Dla systemu Antigravity implementacja tej metody na poziomie światowym wymaga nie tylko precyzji astronomicznej, ale także głębokiego zrozumienia matematycznych i filozoficznych fundamentów uwalniania punktów losu, mechaniki "rozwiązania więzi" oraz specyfiki egipskiego roku cywilnego.5

## **Filozoficzne i historyczne podstawy techniki chronokratorów**

Zodiakalne Uwalnianie różni się fundamentalnie od współczesnych metod prognostycznych, takich jak tranzyty czy progresje wtórne, ponieważ nie opiera się na fizycznym ruchu planet w czasie rzeczywistym, lecz na symbolicznym rozwijaniu potencjału zapisanego w momentach matematycznych – Punktach Losu (Hermetic Lots).1 System ten postrzega życie jako ustrukturyzowaną narrację, podobną do książki podzielonej na rozdziały (Poziom 1), strony (Poziom 2), akapity (Poziom 3\) i zdania (Poziom 4).8

Odzyskanie tej techniki w ciągu ostatnich trzech dekad, głównie dzięki pracom Roberta Schmidta i projektu Project Hindsight, a później Chrisa Brennana, pozwoliło na stworzenie deterministycznego modelu czasu, który wykazuje niezwykłą korelację z kluczowymi wydarzeniami w życiu jednostki.1 W przeciwieństwie do psychologicznych interpretacji astrologii modernistycznej, Zodiakalne Uwalnianie skupia się na obiektywnych wydarzeniach, sukcesach zawodowych, kondycji fizycznej i dynamice relacji, co czyni je idealnym kandydatem do algorytmizacji w ramach zaawansowanego oprogramowania.3

## **Matematyczna derywacja Punktów Losu i ich rola w silniku obliczeniowym**

Fundamentem techniki uwalniania jest precyzyjne obliczenie Punktów Losu, które są punktami na ekliptyce wyznaczonymi przez relację kątową między Słońcem, Księżycem a Ascendentem.1 Każdy punkt reprezentuje inną sferę życia i staje się "punktem uwalniania", z którego rozpoczyna się sekwencja zodiakalna.1

W systemie Antigravity kluczowe jest rozróżnienie między "sektem" dziennym i nocnym, co diametralnie zmienia formuły obliczeniowe. Błąd w określeniu sektu uniemożliwia poprawną predykcję, gdyż odwraca znaczenie Punktu Fortuny i Punktu Ducha.3

### **Główne Punkty Losu i ich formuły**

Niech ![][image1] oznacza długość geograficzną Ascendentu, ![][image2] długość Słońca, a ![][image3] długość Księżyca. Wszystkie wartości muszą być przeliczane na format 360-stopniowy od 0° Barana.

| Nazwa Punktu | Sekt Dzienny | Sekt Nocny | Domena Interpretacyjna |
| :---- | :---- | :---- | :---- |
| Punkt Fortuny (*Tyche*) | ![][image4] | ![][image5] | Ciało, zdrowie, losowe wydarzenia 1 |
| Punkt Ducha (*Daimon*) | ![][image5] | ![][image4] | Kariera, intencje, wolna wola 5 |
| Punkt Eros | ![][image6] | ![][image7] | Miłość, pożądanie, relacje 1 |
| Punkt Nemezis | ![][image8] | ![][image9] | Upadki, przeszkody, ograniczenia 3 |

Implementacja w Antigravity musi uwzględniać tzw. "korektę Valensa".3 Jeśli Punkt Ducha i Punkt Fortuny znajdują się w tym samym znaku zodiaku, uwalnianie dla Punktu Ducha powinno rozpocząć się od następnego znaku w porządku zodiakalnym, aby uniknąć identyczności cykli.15

Dla celów programistycznych punkty te są traktowane jako obiekty na ekliptyce o szerokości geograficznej 0°. Aby uzyskać ich deklinację lub inne współrzędne, należy zastosować funkcje transformacji współrzędnych, takie jak swe\_cotrans() z biblioteki Swiss Ephemeris.16

## **Mechanika cykli: Lata planetarne i hierarchia poziomów**

Zodiakalne Uwalnianie przypisuje każdemu znakowi zodiaku określoną liczbę jednostek czasu, które wywodzą się z tzw. "małych lat" planet władających danymi znakami.3 Jest to system zmienny, w którym znaki rządzone przez planety wolniejsze (np. Saturn) trwają znacznie dłużej niż te rządzone przez planety szybkie (np. Wenus).1

### **Tabela czasu trwania okresów (Poziom 1\)**

Wartości te są stałe dla Poziomu 1 (lata) i stanowią podstawę do obliczeń sub-okresów na niższych poziomach.1

| Znaki Zodiaku | Władca Planety | Czas trwania (Jednostki) |
| :---- | :---- | :---- |
| Baran, Skorpion | Mars | 15 lat 1 |
| Byk, Waga | Wenus | 8 lat 1 |
| Bliźnięta, Panna | Merkury | 20 lat 1 |
| Rak | Księżyc | 25 lat 1 |
| Lew | Słońce | 19 lat 1 |
| Strzelec, Ryby | Jowisz | 12 lat 1 |
| Koziorożec | Saturn | 27 lat 1 |
| Wodnik | Saturn | 30 lat 1 |

### **Hierarchia podziału czasu (L1-L4)**

Struktura uwalniania jest rekurencyjna. Każdy wyższy poziom dzieli się na 12 sub-okresów, z których każdy reprezentuje kolejny znak zodiaku, zaczynając od znaku, w którym znajduje się dany punkt na poziomie wyższym.1

1. **Poziom 1 (L1):** Główne rozdziały życia trwające od 8 do 30 lat.8  
2. **Poziom 2 (L2):** Pod-okresy, w których lata zamieniane są na miesiące (np. Baran L2 trwa 15 miesięcy).1  
3. **Poziom 3 (L3):** "Tygodnie" trwające około 1/12 czasu L2 (średnio 2.5 dnia na jednostkę).1  
4. **Poziom 4 (L4):** "Dni" lub "godziny" trwające około 1/12 czasu L3 (średnio 5 godzin na jednostkę).1

Wybór algorytmu synchronizacji czasu jest krytyczny dla Antigravity. Tradycyjnie stosuje się rok egipski składający się z 360 dni (12 miesięcy po 30 dni).1 Jednak współczesne badania sugerują, że rok juliański (365,25 dnia) daje lepsze wyniki w korelacji z rzeczywistymi datami kalendarza gregoriańskiego.4 Najlepszej klasy oprogramowanie powinno oferować obie opcje jako ustawienie konfiguracyjne użytkownika.15

## **Rozwiązanie więzi (Loosing of the Bond) i skoki sekwencyjne**

Najbardziej zaawansowanym i dramatycznym elementem techniki jest zjawisko "rozwiązania więzi" (LB). Występuje ono, gdy sub-okres (zazwyczaj L2) kończy pełny cykl 12 znaków zodiaku, ale główny okres L1 wciąż trwa.3 Ponieważ suma wszystkich lat planetarnych w cyklu wynosi 149 jednostek, cykl L2 kończy się po około 17,5 roku.4

### **Mechanizm LB w kodzie**

Zjawisko to dotyczy tylko znaków o czasie trwania powyżej 17 lat (Bliźnięta, Panna, Rak, Lew, Koziorożec, Wodnik).3 Kiedy algorytm napotka koniec 12\. znaku w sekwencji sub-okresu, zamiast powrócić do początku (znaku L1), musi wykonać "skok" do znaku leżącego naprzeciwko (opozycja 180°) i kontynuować sekwencję stamtąd.1

| Znak L1 | Czas trwania | Moment LB (L2) | Skok sekwencji |
| :---- | :---- | :---- | :---- |
| Koziorożec | 27 lat | Po ok. 17,5 roku | Ze Strzelca skok do Raka 3 |
| Wodnik | 30 lat | Po ok. 17,5 roku | Ze Strzelca skok do Raka 1 |

Z perspektywy narracyjnej LB oznacza moment gwałtownej zmiany kursu życiowego, często o charakterze "resetu" lub wejścia na zupełnie nową ścieżkę kariery (jeśli uwalniamy z Punktu Ducha) lub zdrowia (z Fortuny).1 Przykładem jest Arnold Schwarzenegger, który doświadczył LB dwukrotnie: przy przejściu z kulturystyki do aktorstwa oraz z aktorstwa do polityki.3 Oprogramowanie Antigravity musi wyraźnie oznaczać te okresy etykietą "LB" lub gwiazdką.3

## **Geometria sukcesu: Okresy szczytowe i Triada Angularna**

Kolejnym kluczowym modułem dla Antigravity jest automatyczna identyfikacja okresów szczytowych (Peak Periods). Okresy te są definiowane przez relację aktywnego znaku do natalnej pozycji Punktu Fortuny, niezależnie od tego, z którego punktu następuje uwalnianie.3

### **Hierarchia Peak Periods**

Znaki kątowe względem Fortuny (1., 4., 7\. i 10\. znak) są okresami wzmożonej aktywności i znaczenia.1

* **Główne Szczyty (Major Peaks):** Znak, w którym znajduje się Punkt Fortuny oraz 10\. znak od niego. To momenty kulminacji i największej widoczności.8  
* **Średni Szczyt (Moderate Peak):** 7\. znak od Fortuny (opozycja). Często wiąże się z interakcjami z innymi lub konfrontacją.10  
* **Mały Szczyt (Minor Peak):** 4\. znak od Fortuny (kwadratura dolna). Dotyczy fundamentów i spraw prywatnych o dużym znaczeniu.10

Algorytm powinien dynamicznie mapować te znaki. Na przykład, jeśli Punkt Fortuny znajduje się w Raku, znakami szczytowymi będą: Rak (1.), Waga (4.), Koziorożec (7.) i Baran (10.).3

### **Dynamika Triady: Przygotowanie, Szczyt i Kontynuacja**

System powinien wizualizować cykl aktywności jako triady:

1. **Okres Przygotowawczy (Prep):** Znaki upadające (kadentne) względem Fortuny (3., 6., 9., 12.). To czas budowania fundamentów, często mniej widoczny na zewnątrz.3  
2. **Okres Szczytowy (Peak):** Znaki kątowe, gdzie następuje akcja i rezultaty.3  
3. **Okres Kontynuacji (Follow-through):** Znaki następujące (sukcedentne) (2., 5., 8., 11.), gdzie następuje stabilizacja po szczycie.3

Wdrożenie "mapy cieplnej" (heatmap) w interfejsie Antigravity pozwoliłoby użytkownikom na natychmiastową ocenę, w której fazie cyklu się znajdują.21

## **Logika interpretacyjna: Sekt, planety i kondycja władców**

Zautomatyzowane raporty w Antigravity wymagają zaawansowanego silnika reguł, który ocenia jakość danego okresu. Sama aktywność (Peak) nie gwarantuje pozytywnych rezultatów; o tym decyduje stan planet w aktywnym znaku oraz kondycja jego władcy.1

### **Reguły oceny jakości okresu**

Podstawowa logika powinna opierać się na następującej hierarchii ważności 1:

1. **Sekt i Benefiki/Malefiki:**  
   * W kosmogramie dziennym: Jowisz jest najbardziej pozytywny, Mars najbardziej problematyczny.1  
   * W kosmogramie nocnym: Wenus jest najbardziej pozytywna, Saturn najbardziej problematyczny.1  
   * Jeśli najbardziej pozytywna planeta znajduje się w znaku szczytowym, okres ten przyniesie wielkie sukcesy. Jeśli malefic, szczyt może być czasem kryzysu.1  
2. **Planety w znaku:** Obecność planety w aktywowanym znaku nadaje mu jej charakter (np. Merkury przynosi naukę, kontakty, podróże).1  
3. **Aspekty:** Należy sprawdzić planety tworzące kwadratury lub opozycje do aktywnego znaku. Malefiki w tych aspektach "atakują" okres, przynosząc przeszkody.1  
4. **Kondycja władcy:** Czy władca aktywnego znaku jest silny (w swoim znaku lub egzaltacji), czy słaby? Czy znajduje się w domu kątowym względem Fortuny?.1

| Scenariusz | Logika raportu tekstowego |
| :---- | :---- |
| Szczyt \+ Benefik w znaku | "Okres Wybitnego Rozwoju: Znaczące sukcesy i ekspansja w domenie punktu" 1 |
| Szczyt \+ Malefic w znaku | "Wyzwanie Kulminacyjne: Wzmożona presja i konieczność pokonania trudnych przeszkód" 3 |
| LB \+ Władca w upadku | "Krytyczny Przełom: Gwałtowna zmiana kierunku przy ograniczonych zasobach" 3 |
| Okres kadentny \+ Benefik | "Ciche Wsparcie: Przygotowania do przyszłych sukcesów przebiegają pomyślnie" 3 |

## **Integracja techniczna: Swiss Ephemeris i Architektura Antigravity**

Aby Antigravity stało się narzędziem profesjonalnym, musi integrować bibliotekę Swiss Ephemeris (SE) – de facto standard w precyzyjnych obliczeniach astronomicznych.6

### **Wytyczne dla programistów**

1. **Precyzja:** Obliczenia muszą opierać się na współrzędnych ekliptycznych z dokładnością do ułamka sekundy łuku. SE modeluje mechanikę orbitalną, perturbacje grawitacyjne i precesję.6  
2. **Technologia:** Dla nowoczesnych aplikacji webowych lub desktopowych rekomendowane jest użycie WebAssembly (Wasm) dla SE, co pozwala na wykonywanie obliczeń po stronie klienta z prędkością kodu C++.6  
3. **Zarządzanie czasem:** Algorytm uwalniania powinien przeliczać daty urodzenia na dni juliańskie (Julian Days), co eliminuje błędy związane z reformami kalendarza i strefami czasowymi.25  
4. **Baza danych:** Model danych powinien wykorzystywać PostgreSQL z polami JSONB do przechowywania hierarchicznych struktur okresów ZR, co umożliwi szybkie filtrowanie i wyszukiwanie specyficznych konfiguracji (np. "znajdź wszystkich klientów z LB w przyszłym roku").7

### **Przykładowy pseudo-kod algorytmu ZR**

JavaScript

function calculateZR(birthJD, lotSign, levels \= 4, method \= '365.25') {  
    const durations \= ; // Od Barana  
    let timeline \=;  
    let currentDate \= birthJD;  
      
    // L1 Calculation  
    for (let i \= 0; i \< 12; i++) {  
        let l1Sign \= (lotSign \+ i) % 12;  
        let l1Years \= durations;  
        let l1End \= addTime(currentDate, l1Years, 'years', method);  
          
        // L2 nested logic with Loosing of the Bond check  
        let accumulatedMonths \= 0;  
        let l2Start \= currentDate;  
        for (let j \= 0; j \< 60; j++) { // Iteracja przez L2  
            let l2Sign \= (l1Sign \+ j) % 12;  
              
            // LB logic  
            if (accumulatedMonths \>= 149) {  
                l2Sign \= (l2Sign \+ 6) % 12; // Jump to opposite sign  
                isLB \= true;  
                accumulatedMonths \= 0; // Reset or mark jump  
            }  
              
            let l2Months \= durations;  
            let l2End \= addTime(l2Start, l2Months, 'months', method);  
            accumulatedMonths \+= l2Months;  
            //... rekurencja dla L3 i L4  
        }  
    }  
}

## **Projektowanie UI/UX: Wizualizacja narracji życia**

Wizualizacja Zodiakalnego Uwalniania w Antigravity musi odzwierciedlać strukturę "książki życia".1 Typowe tabele są nieczytelne dla użytkowników końcowych; wymagany jest interaktywny interfejs typu "timeline".22

### **Rekomendowane funkcje interfejsu**

* **Hierarchiczna oś czasu:** Użytkownik powinien móc płynnie przechodzić od widoku dekad (L1) do widoku godzin (L4) za pomocą suwaka lub gestu uszczypnięcia (pinch-to-zoom).8  
* **Wskaźnik "Live":** Pionowa linia pokazująca aktualną pozycję we wszystkich czterech poziomach jednocześnie.3  
* **Synchronizacja z tranzytami:** Możliwość nałożenia tranzytów bieżących na aktywne znaki ZR. Jest to funkcja premium, która pozwala zobaczyć, jaki tranzyt "odpali" potencjał okresu szczytowego.20  
* **Eksport do kalendarza:** Funkcja eksportu okresów L2 i L3 do formatu iCal/Google Calendar, aby użytkownik mógł otrzymywać powiadomienia o wejściu w okresy szczytowe lub LB.21  
* **Dashboard "Sygnalizacja Świetlna":** Szybka ocena jakości aktualnego dnia na podstawie sub-okresów L3/L4 (Zielony: aktywne benefiki, Czerwony: aktywne malefiki, Złoty: Peak Period).1

## **Zaawansowane derywacje: Releasing z innych punktów**

Choć uwalnianie z Punktu Fortuny i Ducha jest standardem, profesjonalny system Antigravity powinien wspierać uwalnianie z tzw. Punktów Planetarnych (Hermetic Lots of the Planets).3

| Punkt | Planeta | Zastosowanie w Antigravity |
| :---- | :---- | :---- |
| Punkt Zwycięstwa | Jowisz | Przewidywanie momentów triumfu i uznania społecznego 14 |
| Punkt Konieczności | Merkury | Timing umów, sporów prawnych i logistyki 14 |
| Punkt Odwagi | Mars | Okresy walki, rywalizacji i operacji chirurgicznych 14 |
| Punkt Nemezis | Saturn | Przewidywanie kryzysów i momentów konfrontacji z własnymi błędami 14 |

Uwalnianie z Punktu Eros, zmodyfikowane przez Chrisa Brennana, stało się jedną z najpopularniejszych metod badania dynamiki związków.1 Antigravity może zaoferować unikalną funkcję "Synastrii Czasowej", porównującą okresy szczytowe Punktu Eros obojga partnerów, co pozwala przewidzieć momenty wspólnych przełomów w relacji.7

## **Strategiczna mapa drogowa dla Antigravity**

Aby osiągnąć poziom światowy, Antigravity musi wyjść poza proste kalkulatory dostępne online, takie jak Astro-Seek czy Astro.com.15 Przewaga konkurencyjna zostanie zbudowana na trzech filarach:

1. **Szybkość i Precyzja:** Wykorzystanie Wasm i SE zapewnia natychmiastowe generowanie wyników nawet dla wielowiekowych cykli.6  
2. **Narracyjna Inteligencja:** Zastosowanie algorytmów opartych na sekcie i kondycji władców do tworzenia raportów, które czytają się jak profesjonalna interpretacja astrologiczna.1  
3. **Wizualna Ekscelencja:** Dynamiczne osie czasu, które pozwalają użytkownikowi "zobaczyć" rytm swojego życia jako cykl przypływów i odpływów.21

Implementacja Zodiakalnego Uwalniania w Antigravity to nie tylko dodanie nowej funkcji; to wprowadzenie do programu nowej filozofii czasu – czasu, który ma swoją strukturę, hierarchię i cel.2 Dzięki temu użytkownicy otrzymają narzędzie, które nie tylko przewiduje przyszłość, ale pomaga zrozumieć całą biografię jako spójną, divinely timed opowieść.3

Stworzenie tak wyrafinowanego modułu wymaga ścisłej współpracy między astrologami tradycyjnymi a inżynierami oprogramowania, ale rezultat w postaci światowej klasy silnika chronokratorów zdefiniuje nową erę w profesjonalnej astrologii cyfrowej.6

#### **Cytowane prace**

1. Zodiacal Releasing: An Ancient Timing Technique \- The Astrology Podcast, otwierano: kwietnia 25, 2026, [https://theastrologypodcast.com/2019/02/11/zodiacal-releasing-an-ancient-timing-technique/](https://theastrologypodcast.com/2019/02/11/zodiacal-releasing-an-ancient-timing-technique/)  
2. Zodiacal Releasing Course | Gray Crawford, otwierano: kwietnia 25, 2026, [https://graycrawford.net/2025/08/14/zodiacal-releasing-course-3/](https://graycrawford.net/2025/08/14/zodiacal-releasing-course-3/)  
3. Zodiacal Releasing: How to Actually Use the Technique \- The Mountain Astrologer, otwierano: kwietnia 25, 2026, [https://mountainastrologer.com/archives/43941](https://mountainastrologer.com/archives/43941)  
4. Zodiacal Releasing \- Peak and Beyond\! \- Aswin's Astrology, otwierano: kwietnia 25, 2026, [https://www.aswinsubramanyan.com/post/zodiacal-releasing-peak-and-beyond](https://www.aswinsubramanyan.com/post/zodiacal-releasing-peak-and-beyond)  
5. Zodiacal Liberation Techniques Explained | PDF | Planets In Astrology \- Scribd, otwierano: kwietnia 25, 2026, [https://www.scribd.com/document/957221664/Zodiacal-Liberation](https://www.scribd.com/document/957221664/Zodiacal-Liberation)  
6. Swiss Ephemeris Explained for Developers: The Engine Behind Astrology Software, otwierano: kwietnia 25, 2026, [https://roxyapi.com/blogs/swiss-ephemeris-explained-developers](https://roxyapi.com/blogs/swiss-ephemeris-explained-developers)  
7. How I built a entire Astrology echosystem | by Luis Meazzini \- Medium, otwierano: kwietnia 25, 2026, [https://medium.com/swlh/how-i-built-a-entire-astrology-echosystem-50193b930a21](https://medium.com/swlh/how-i-built-a-entire-astrology-echosystem-50193b930a21)  
8. How To Use Zodiacal Releasing As A Timing Technique \- Two Wander, otwierano: kwietnia 25, 2026, [https://www.twowander.com/blog/how-to-use-zodiacal-releasing-as-a-timing-technique](https://www.twowander.com/blog/how-to-use-zodiacal-releasing-as-a-timing-technique)  
9. Zodiacal Releasing: How to Time Your Life's Chapters and Peak Periods | \- Helena Woods, otwierano: kwietnia 25, 2026, [https://helenawoods.com/zodiacal-releasing-how-to-time-your-lifes-chapters-and-peak-periods/](https://helenawoods.com/zodiacal-releasing-how-to-time-your-lifes-chapters-and-peak-periods/)  
10. Zodiacal Releasing: Timing Your Ebbs and Flows \- The Mountain Astrologer, otwierano: kwietnia 25, 2026, [https://mountainastrologer.com/archives/43384](https://mountainastrologer.com/archives/43384)  
11. Peak Periods in Zodiacal Releasing vs. Modern Astrology: What You Need to Know, otwierano: kwietnia 25, 2026, [https://www.astrolearn.io/post/peak-periods-in-zodiacal-releasing-vs-modern-astrology-what-you-need-to-know](https://www.astrolearn.io/post/peak-periods-in-zodiacal-releasing-vs-modern-astrology-what-you-need-to-know)  
12. Part of Fortune Calculation \- iPhemeris, otwierano: kwietnia 25, 2026, [https://iphemeris.com/blog/2015/01/15/part-of-fortune-calculation/](https://iphemeris.com/blog/2015/01/15/part-of-fortune-calculation/)  
13. Zodiacal Releasing: An Ancient Timing Technique \- YouTube, otwierano: kwietnia 25, 2026, [https://www.youtube.com/watch?v=PBSLHj8ddBc](https://www.youtube.com/watch?v=PBSLHj8ddBc)  
14. Zodiacal Releasing from the Lot of Nemesis: A Case Study \- Patrick Watson, otwierano: kwietnia 25, 2026, [https://patrickwatsonastrology.com/zodiacal-releasing-from-the-lot-of-nemesis-a-case-study/](https://patrickwatsonastrology.com/zodiacal-releasing-from-the-lot-of-nemesis-a-case-study/)  
15. Zodiacal Releasing Periods, Astrology Calculator \- Horoscopes, otwierano: kwietnia 25, 2026, [https://horoscopes.astro-seek.com/zodiacal-releasing-astrology-calculator](https://horoscopes.astro-seek.com/zodiacal-releasing-astrology-calculator)  
16. Lots / Parts Declinations. \- Swisseph \- Groups.io, otwierano: kwietnia 25, 2026, [https://groups.io/g/swisseph/topic/lots\_parts\_declinations/76787239](https://groups.io/g/swisseph/topic/lots_parts_declinations/76787239)  
17. Egyptian calendar \- Wikipedia, otwierano: kwietnia 25, 2026, [https://en.wikipedia.org/wiki/Egyptian\_calendar](https://en.wikipedia.org/wiki/Egyptian_calendar)  
18. Zodiacal releasing from Spirit? : r/Advancedastrology \- Reddit, otwierano: kwietnia 25, 2026, [https://www.reddit.com/r/Advancedastrology/comments/1fvc70v/zodiacal\_releasing\_from\_spirit/](https://www.reddit.com/r/Advancedastrology/comments/1fvc70v/zodiacal_releasing_from_spirit/)  
19. Zodiacal Releasing: An explanation? : r/Advancedastrology \- Reddit, otwierano: kwietnia 25, 2026, [https://www.reddit.com/r/Advancedastrology/comments/16hkode/zodiacal\_releasing\_an\_explanation/](https://www.reddit.com/r/Advancedastrology/comments/16hkode/zodiacal_releasing_an_explanation/)  
20. Zodiacal Releasing: peak periods : r/Advancedastrology \- Reddit, otwierano: kwietnia 25, 2026, [https://www.reddit.com/r/Advancedastrology/comments/1nab0or/zodiacal\_releasing\_peak\_periods/](https://www.reddit.com/r/Advancedastrology/comments/1nab0or/zodiacal_releasing_peak_periods/)  
21. Zodiacal Releasing Calculator, otwierano: kwietnia 25, 2026, [https://zodiacalreleasing.net/](https://zodiacalreleasing.net/)  
22. Transit Graphs and Time Maps in Astrology Software \- Hank Friedman, otwierano: kwietnia 25, 2026, [https://www.soulhealing.com/timemaps.htm](https://www.soulhealing.com/timemaps.htm)  
23. Decoding the SWISS Ephemeris \- Av8rAero, otwierano: kwietnia 25, 2026, [https://www.av8raero.com/blog/decoding-the-swiss-ephemeris](https://www.av8raero.com/blog/decoding-the-swiss-ephemeris)  
24. Top 15 Astrological APIs to Boost Your App Features \- Appic Softwares, otwierano: kwietnia 25, 2026, [https://appicsoftwares.com/blog/astrological-apis/](https://appicsoftwares.com/blog/astrological-apis/)  
25. astroahava/astro-sweph: High precision Swiss Ephemeris WebAssembly library for professional astrological calculations. \- GitHub, otwierano: kwietnia 25, 2026, [https://github.com/astroahava/astro-sweph](https://github.com/astroahava/astro-sweph)  
26. Programming interface to the Swiss Ephemeris \- Accurate Predict, otwierano: kwietnia 25, 2026, [http://accupredict.in/sweph/doc/swephprg.htm](http://accupredict.in/sweph/doc/swephprg.htm)  
27. Question regarding the conversion algorithms between Julian Day and calendar dates : r/askastronomy \- Reddit, otwierano: kwietnia 25, 2026, [https://www.reddit.com/r/askastronomy/comments/1o2zq79/question\_regarding\_the\_conversion\_algorithms/](https://www.reddit.com/r/askastronomy/comments/1o2zq79/question_regarding_the_conversion_algorithms/)  
28. Complete Astrology App Development Guide 2026: Cost, Features, Market & Monetization, otwierano: kwietnia 25, 2026, [https://waplia.com/complete-astrology-app-development-guide/](https://waplia.com/complete-astrology-app-development-guide/)  
29. Top 8 Best Astrology Software of 2026 \- Gitnux, otwierano: kwietnia 25, 2026, [https://gitnux.org/best/astrology-software/](https://gitnux.org/best/astrology-software/)  
30. What tools do you use to visualize your chronology? : r/worldbuilding \- Reddit, otwierano: kwietnia 25, 2026, [https://www.reddit.com/r/worldbuilding/comments/1ovvwp0/what\_tools\_do\_you\_use\_to\_visualize\_your\_chronology/](https://www.reddit.com/r/worldbuilding/comments/1ovvwp0/what_tools_do_you_use_to_visualize_your_chronology/)  
31. Top 10 Best Horoscope Apps in 2026 & How To Build Yours? \- Apptunix, otwierano: kwietnia 25, 2026, [https://www.apptunix.com/blog/top-horoscope-apps/](https://www.apptunix.com/blog/top-horoscope-apps/)  
32. katelouie/stellium: A modern Python library for astrological chart calculation, visualization, reporting and data analysis. Built on the Swiss Ephemeris for astronomical accuracy. \- GitHub, otwierano: kwietnia 25, 2026, [https://github.com/katelouie/stellium](https://github.com/katelouie/stellium)  
33. Top 10 Astrology App Development Companies in 2026 \- Digittrix Infotech, otwierano: kwietnia 25, 2026, [https://www.digittrix.com/blogs/top-10-astrology-app-development-companies-in-2026](https://www.digittrix.com/blogs/top-10-astrology-app-development-companies-in-2026)

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAZCAYAAABHLbxYAAACU0lEQVR4Xu2Wy0tVURSHl5RgGEQqQVQokYkIVoSDwEHQgyY1iAaCOmqQiCMdhI6SRoJE5EARKRo0if6AoKA7aNBjEEERCEEDHyMRHIQWPn6/1trefZb7PgiH54OP61lr73PWOWevfRTJySnLSfjVB0twCo7AWXgW1piMp6iDl+E4fAKvw1rLXYHn7e+K8CIP4bZPJGiA66JF9sJVOAPHYFM0LnAcbpofRed9g5/hbfgLtofBlXgpWiRl0SkOwjm45BOiBfubfGCxny4eOCKa5zmr5j18LTrxsMsFLsEN+MInwEW4EB3zZnmuedgcxT0cw5usimPwluir48Sj2fQuw6J5rjEPC+XNBng+vmr+lmNFqnztHVJsIK4XFnK6mM4QCqW8KV7gQGaEMiQ65oZPJLjrAynCmhu145uiF+DTSXFGdH2GYimfGrs+wHX3wXKpxvovrol2Hl896YZ/7bcUXfCHZItl11+w/Dm4ZvF9gwu9H94x74sWei8eVAFuVSyqINqEPXZcTaHNPpCiRbR7uacFecyuZsGechtyXGhYPr/jAQm4Kzz1QQ8HPbbfGHY7l0Kqq1PFB1hYmBOWT6UnyiZ+44MxXOwFOODihM31Cr6F9VH8hOjXg3M9vOAzKX4OSZ9ooS1RLIZfsUnJztmFT68RfoJbcDCb/pdrhe/gF9gmxSa7KjrnETxkMdIp+tXh/wgxLGBatOk4JobnnZASRRIuXL+18AkGfI4uW46vnU+ZF/5jfxdEt6YpG+Ph/sqxPM8ifC76Vr7L3iWXk5OTk7NP7ADf+oQntDwMBAAAAABJRU5ErkJggg==>

[image2]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAZCAYAAABD2GxlAAACKElEQVR4Xu2VPUiWURiG76AgKZIoitA2FYJIIiJqEcKhhoaagkYHQZwMipoUcWkIaooIoiGEaGloKsJRagqK1oSowUEUCn/6u++ec/R5H8/7fQZtvRdcfN97/s95zg/Q8B9zmF6lE7SPbqMXU3qJTnqe3qe36Nlq9r/lCV2GdXaHLtB79C3d78plHtIf9AW9DKu3Sgd8Iccu+pL+KnjFldvEdvqA9sQMWMVh972DjsMa7XDpnp/0A+2OGYmdsPpPYX235TRdgYUzcoKedN/XYI1rJep4DyvjJ+bRwFvlb2IMVqGEBujDq5B+padcWiSH8XHMSAzSb6hOvCV5gHP0Jj1SzV5nFBa+czEjMANrT78Rhfc5bPCliBXR3vuM6qZVIzrFGZ3WWfqG7nXpJT5hY49FuuhH/EV4M1puP0CpU3w85ffTJdhhaodWWfWnYgYsvMrfcnjreIVqmC6l7wu5QA0HYeW02lp1Tw6v8uvCO9Q2IaHrxQ9QA9vKAHUfaoU0oYhObw5/CU3oaEwshUHkFbubvnNoWg3wAH0Hu7B1X0ZyG2sxI6E+K3erNmwpFGIe9lLkjhSSSfqa7suFHDdgE9IhqiOHNx6ePbBT/SWk/5mRKtxGdeTHYB3Fl0ATUXk9g768OtDKPEr/I7vpIdj9qfq6yvQte+liSp/OFTLX6RnYs6Q3VKGZgV3GpY6EQq7GdGeO0Gf0O+ziLm38Vu9vVPu3oaGhoYH8BqHdiS+PkHbuAAAAAElFTkSuQmCC>

[image3]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAZCAYAAABOxhwiAAACEUlEQVR4Xu2Wvyt/YRTHj74G+pJMkkFsJAYTUQYDi8GklGwWk0VZWPwDIiVSSiKbKDEohbJY5E8wSBYG5Md5f57ndO89n/Pcm5XnVe/6fM55Ps8959z3fe6HKBL5W3SxvgzdpxcxNawzKl+3z6r0a06NvGadsvmdbJoWUzkRfmPSxnok+0IaNIB126wKlQPIj+ugAQp+oPA10UAho+Q2QPFFtJJbO6UTHuS7dVBRy+pnLZPbqyGbpirWoYqZLJHb4FwnDIZZLxQuDvl6HVTgDqPYHtYrayybpibWlYqZiE0w+Tz+k/PxJtk2kXwRGJSAolE8mhBmKbsmiNgEk8gDNsBDG/Iw8rc6qIBNjlPfMXl5APGQi02KhlhCbIJN84ANsDZkk0HWhQ4qMJxLFcOeT6wOSmxSNMTSgpBNqlkrrHZKbIC1lk0AJhW6GwIsMKNiOGGw7x39wCYoOGQT+A7nNBoQm4SOL3BD9j6C2KRPxYdYn+T2PmCNZNM26O6a7JMAvpv2n2EPnCbvSbqMI3JNhkBTsAHskKbOx2Xqec2XkBePdXs7KftWlM0xGQ2KXaOwhQSc23M66MFDiqJzbYILNLLmyXU54L9DvawtH9fnK27hB7kmhBbWCWs1FdPgbdrMemPt+c8WC1Rgk9D/Ey0UlQYNT5A7AXZZG6xn1iTrX7KsDP3/BLLAqYJnKRKJRCK/kG/BsYYg2zml/QAAAABJRU5ErkJggg==>

[image4]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAAWCAYAAAA4jYW0AAAEpklEQVR4Xu2ZW8htUxTH/3IUuUfk1uHkksil01FHvBEeEHlQwoMHJ3mi3B50JE+nTocHSerkQXJ5k0g67SLXB5dySTyQSEIUueQwfo0123OPb8611rfbn+PbzV/9+74951xrrznWmGOMObfUaDQajUZjDTjRdEdsrHCS6U7TA6bTTfuZrunaS9B/s+lR0+OaHXej6cDsc2OJwREeNN0XOwo8a/pd7jAPm34yPWb6wHR0Ni5xtekT03emZ+TX/Wy63XSk6ZHp0P+MK0z/FPSu/JlyNnd9UTd0/eeafgl9tOUcnPWh7TO90gbT85odM3bRrxsOkDsPk3tK7nQlMMYTplNjh9zot4a2M01fyI3Kd0SuV/mlDEHkvTI2zsklpr9MF8WOAM72q/x5a3xs2hQbM4jaL8gXGvdh/hGcLdpxabjW9LrpZdPEdMhM75Stpj9UdkRexJbs80bTZ3KDlsYDDvO1VkaQIXCyJ2PjnBDBP1I5EuewkJjLD7EjY6K67YD5vmU6W34v7H3QzAjpTc3acakgXVwlN3opdSQI5bUVjaPlL+sV+Vj+1jjU9FpsHMGiHI0I86L6o3iCSM58JqE956HYECB6vqRpGmXRsnhzWPBDTr8uOasTENm+VT38J0f7Uu6UpMYSx6q+YnOOMN0fG0ewKEfjxe/VuAiSajAWZAnSf81uCdImtSFsl9+PiJ7A2ZcybaaaK61mXiB1CNGpBLXZN3IDJRER2HXmpNprrYy2KEe7W/6cYyII4/oWIamVSNUHaTNdT/pkE5VnCJ5jjNOvOy6Vp8oEBfFQYYwhckdDGOz8bAzOSwRYbZE/lkU4WkqbPP9Q2gTGTVSvwcbsnFPaBBb50/L7kgEglh9LwTZ5sc4Z1nWd0gpfTSTao+lLgMPlK/dV9a9wdqEXqj+1Hi+/71dBP5r+LLQj5jOGlDZ/ix0dx2j60lkwzLGWNikh3o+NARw7pc1EshUlBrbaPdvdC/OMc6/pnu6afQJnXhTBbLWT+IxBcbjILbGhI+3GJt1nVjz/DxXYrF4MjLFr7C9/4ccF3WR6rtCOxh78UmPy3Ow4S5D+0/MzR3abtZqUfqJjH+w4N8VG+VkimwLOGtkIjAU7x7nXVIvCaw4G3NX9zWG3ifFLaaC2o2IDkV9DSuAsaKL+Ce6UR9V5WETqTGmTZ43w3PlumYVX242nFIjD9EEELdnjFPlzfCg/2lgaiCCT2NiB0Zh0THsnyEN8Kfp8Lw/5+YHsUfL73KuVzgwXmM6LjatgEY5G2izVo5fJa858YW1V/aztba28R4TygOhdI20KVlOy/G/hhV9sekduZI4W8j6c4zT5hN8znSFPXcBqpJ0olNdU58hXOmkhggNyTX58wbW3abieGWJeR0upmOfl2T6X7/5Sirm8ayeV4VyJtADv0nThcC/GE9H7wKY75NfzvaXUTkTs2+2vKzbKJ5tEysCAqS8eW6BUU5A6KNz5vZIinHpuYvrbdFg3JnKy6Q35fdgwcA07UVJs7ZqxzOtotd83o0rRe7d8gX4q/72WKES66yMdzOYq/eyEw2KrUmpu7ENwGBy30Wg0Go1Go9FoDPAvjpQlT1Ff8kAAAAAASUVORK5CYII=>

[image5]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJoAAAAWCAYAAAA4jYW0AAAErklEQVR4Xu2ZXailUxjHH5kpMr4y+Rg0p8lHUj4SMo0bEcpH5EIJFy5IU4qimYvpTGYuuBDKNElNLuZicMGFEtIuQlzMKKXEBcmEjExojM/n1/M+s5+9PGufvc/Z5kxnr1/922evtd73vGu9z9daW6TRaDQajcb/wFmqh8vGCmerHlFtVp2nOkp1W9eeQf+9qm2q52Vw3N2qY8L3ww3Pzzzicy1XnXBoxCAnqm5UPdnpGrHxjRHAEB5XbSw7El5SHRB7Mc+oflJtV32iWhnGObeqPlN9p9oldt3PqvWqk1XP9ocedmbEnuUJ1V2q38TWgPlkxo8z/qV6S3Wf2FwOqr6IgwpeUP2TaGscNA3gjRgPk98pZnQZy8QW7ZyyQ+wl3V+0XaD6UjUrucffKfY/Ly475oCXfXPZOCYrVD3VR0U7YAB/F22zYs/K/DNuEHMmnq0G138s5lxTye2q91RviC0+LyHjKtXvkhviZarLw/fVqs/FFjcbD7yUb2T8hcfIXiwbx8SNPIvg3J/ncnh+xr4tljYziOSMKZ3NOV6sfzGj96KDl90itujDPI76jcXKwNBi2nxTbCyfNVj8d8vGEZiEoXk6ywyD+78evrM2v6quDG0lx8nwjEB0px+nnkou7AQswl7Vmn73AG5oX4kZJYuXcZrYOCLksUVf5CTVprJxBCZpaG5sM5IbCHUkY0iNwyALMK7X/V1CJMOpcK6pw2suX2BeIJ5LdMqgNvtW+i8I4fns2iKelrJoMQkmYWhXi5UBcS4U9aeHMaTJD7u+WpR3KAMY94rYuka8HpzatHmdWKp01qn+6D5rUIfFl4PYdV4axmC8+2X8In9UJmFoONdNqu9lcC6xoOf5mQftc3Gt2LhsJ0nk/1GmNG0+IFasc4Z1R6fHZPxI9I7YNb3uu0cBCmfqlhrsQtfK8NS6Suy+XxfaJxZ9ynbEfOYLEZu5uBFjGG6Aw6BUwECZd7ZZIJJxj1ra3FI2BIi87NzLeWZ6TvIjmUWFMy8KV86BXHxnQTC4Es6MMjjWiIbmaaJWFDukZ2q47MU4R6tOVZ1R6B7Vy0k7GmWhOWytEQ2NyDmKoXmpkEUs3/DU7kGaHVb/MZ9yjjVR8x5RYABPd58R6hAWJKslspQA7vV+DQtHndKTvCh2nhKLqvNhIamTOe8oGwMxopMOOU+rGQngCJ+KjcnOCj1t1u6BwxERlxxEkF7Z2IGRsCBl2jtT6mnhB7EXFxf5FLH7bJD/GjNcobqkbByDhRgaL5YNT1mwAzVrfGY++bWEuTCnEiIufdS5tYNaT5uxFgZKhs1iG5IlBYtGvuckHC+NYZY+FvJcsUXZrTpfbCHBC12iUKypLpL6ImOAXBOPL7j2QdWe0DYfFmJoRCue6yHpz4/5Xy+2qSmdie84Hj+1xbnzOyjPgLLfRD3lUV/x/3BGT3GrxY6IaMeBlxRMjom54jacvvLYAq3p+qnZKNwpeCnCqed6Yr/5ZYsMM6r3xe7DhoFr2MHh4bVrRmW+huZpk2fBEX5RvSrmWPx2+2h/6AB+GItxUEK8pvpT9YHkERviOd0wzXbjG0cgFPMYS6PRaDQajUaj0ZiDfwE2PyeWsjSNtQAAAABJRU5ErkJggg==>

[image6]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAWCAYAAABOtzc/AAAEuklEQVR4Xu2ZW8htUxTH/0KRe0RuHU4uiVxyKeKNch4QeVAuJ50HkieKeNCWvArhQUoeJJcXSSGxO4Qot4iUBxIhRJFLLuP3jTW/Pdf45tzWzqLPt+ev/u295mXtNecac44x5pYajUaj0WhsIA4xXRcLKxxqut50q+ko0w6mC7vyEtRvNd1nul/9dpebdsmuG40Vg7nNdHOsKPCY6We5Yd1l+k7e7x3Tflk72NF0gekD05emR+X9vjdda9rHdPdq63+fB0x/Bm3ptfCx5PUn9KtXKN2npEnXPhH77dSv1u1ZXdLSsbPcyBj8w3LjLMHkMaFHxAp536tC2TFd+UT+G5FL5PWlFz4PdvLzYuGC8Ls/xsKMN037x8IAC4n7vBErOo5T+Tnp94jpa6012MR/uUjXHReZXjY9Y5qadu/Vzjjd9IvKBvuZ6dTsepPpI9MNKrcHDIt+7JKLwEt+KBYuyB+q7z4Y4vmxsACGyD1qxsO48jlJPGs6y3SP3HMc0K9eCV94J0sLE8sLwFXxvWYgxJe1l4hBJ3eNQT8nb1szbtjD9FIsHMAYBsnuWBpLCl1KO3rkG/k9Ls3KdpWHKXCg3EtEXpUbIQuc/niKnINV7rcUHNsJWJVfmDbPqnskg/xEbry1SWPV044ddx57m26JhQMYwyDf11qDxJieNF0dymvQnwXFwoIU0vwdeeLIPfA6GGfixuz7UpEmMLlUXjQ7x8mrLfoQO34un8Skp+VZdk6qizHlWIxhkFP5M+ZJxWWmFzV/V0/gRei/3XSxaZu87+95owIY75nZdVq8yZBx18zpUnKO+gE5E/Vb91mDmCg3SESWnUPZD1o8WRnKGAZJf54zN7635bHdEFLC9q3pU9NX3TUx8Tzol8eME/XnEHf92mrtEoFbIungDJAVjnAVi+5sL6j/Yvfqrp837ZYaFSBGO0PuJmscJN/JeOG5MIJfC+WI8QwhhR8p7GBxkmQNhUQmd9dAGJOOzfA6HOFEYgLEDk3GzbNgqLyD2KYGi+djrZ2Dku7VOj/r5cyQIx7OBJO4ZmJKMQwuqQQBfW6QfHI97/gICAuIMTHgGiQHZLwkB7muMD1eKEdDJ51dludkx99XnpQNBXeNZ4mGs1UzAz9ca++J8ZJhR86VZ/1Xmp7SsAwfGGscf03E6+sWDOXO7jMnxUVxoqG02oFEiD4JVjzXU82Pxe7Q8OQhMobLxhB/kr/8m+TnsEPB6Miw5x3NTOTHOjn0K7ljFiXlH8pjylqyuCFh8NNY2JGMKbrbFNeUdjMOdx8MZa/L78OLLnGa6cRYuABjGCS7BqcFPCd/gS5C+rcld9c52+W7fx6OsPgx0OTSI7jr2mawIWFCiDkwFtxDvoVTh9s6Uj4pb5mO1uw87eyunF0tn+Tj5a4rxl6nyA2VPnl7vl8jTx7+CWMYJLv3VG48pYVWgj4nyeM2xhbdIgsNz0NdfrZIP4yeuJeduOY56DfUXf/v2SQfcNITmh15UBePc9Dmrp6YkgQEd8KkEm9O5Ucce3ZtIoeZXpG3IfGhD5k3O0Ctz1DGMEjGzhwMzaoh/g9d03vq/+0Y+02yupx3VT8DbqxjtsgNvNFoNBqNRqPRaCwJfwHZ/i6x4Eij8gAAAABJRU5ErkJggg==>

[image7]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKQAAAAWCAYAAABOtzc/AAAFGElEQVR4Xu2ZW6htUxjH/0KR+yV3HXdJueRSxIt4kDjIg+Lw4IHkicKhtCUPXoSEpORBcilelIO06kguDy4l5ZJNIhRR5JLL9+ub31ljf2fMtedae5/lmGf+6t9aa4w551pjjG98l7GkgYGBgYGBgR5xiOnG3NjCoaabTHeajjFtZ7qkaa9B/9Wmh0yPaul160w7FZ/nzbRjGZgDLMJdpttyR4VnTL/JDet+04/y+9437VtcB9ub1po+Mn1relp+30+mG0x7mR7YdPX8qY3lEdXH0oUjTQfkxo7wfTfLN8U2zY7yhfnH9KTcOGvsYHrMdFTukN97bWo7rmlfkH9H5nJ5/4m5Yxnw5BfmximZNJYrtPlYurCP3JBPzR0ded70h+nS1H6W6U/Tq6m9tzABr5teMo1Muy7pHXOG6XfVDfYr02nF5zWmj+U7vnY9YFjch5ecBozxidw4JZPGcoqWjuW/5hb5xr07d/SVd0wXycMu79sMhPySiamBQUeIw6Bfll/bZtywm2ljbuzAahjkpLFgkLOE6y3Fi/Lfen7u6CPHNwI85TemI8bdS4hF/EJuvITkGuSLXIfHncSepjtyYwdW0yAnjQXveb08jN4uL7y+lnvW75r+4FP58zYUbXCP6Ve5MZFbkhr9LH9u3E/O+LbpA41/BxHmLdOX8uf+JY8m1zX9vSTyqJgYFvoXuYeoQb7FgjBBIXZvTsKjb5Y8rAurYZBdxsJGfUWeV2OERI/d5fO13nRec93J8ufxu7LX5V5yS4ya7yNvxmgxLlIWRJQ4Uz73rAfsYrrAdJn8mTyH9xhqb2FCmeQgkmde2yC3KhcRUZmW0IYXmLZY6cpqGCS0jQUDgwX5SQDGQB+VeMAcPSX3mvFbItcL6DtXHv5p52gJeP+ZaX/5d3BftOeikmfQ3vtwjeun6OAMkJ2HYkKn8Wyvye+JXHGP5jMVIbu8DapuvMLOuaPgIHmRRdgq9YPc4+R2xHhmJcYySu14rpxbM0d4NvJgiCJpFBcUULU/rnoBFRxuWjQdnNox6OXmMmDseT7adGtzz1YDxxPsRnZ9KDxB7NiSa3JDA5NdGiSvtZ2eIS0gx8SA2+AMcz/TgUlXmZ6ttKMuB+wn5YaGGMsotdNWGhSvfH5OnvbAg811eNQM56zLbXLu4xl5zliLrtU1c5/no02Tis25w6Dva15L8ABMau2gum1SKIS4J2CBYlEnDfpezZ6grzRk1zYcxFjK8TNHtGGsASH4Qy01Pgq5WkHInOJd2/JyIEqwOXOqxOYir+11uMYjjXJjQxhTDhGEkTdV92bfy71FCRUjz1mf2oPT1e6lurASg2Qsi5o8lvIQH0OKAgToo1Km6g1i3jg6g4Vx1yavmzd/yYLGm5pNEWPju0kXYmOT2xIxegETcrbcWP6WH7mUfVSCR8sn5l3TsfKQCeQxtOPVypzvBPnuj8UK+KeCxeWe8nrec9zxXtE2CysxSMbC+LuOJQzqyuYzXpH8NQoUYPOGd2QOy2fgbcsIUoPKmmJyb9MLGhdVYZCsD0dGnO32hjXyiQmV+Q99+QgERfghxFGAEJZYDPLNkdxLcAxS4zDTG/JrKBa4h8qbBWq7pysrMUjGQgToMpbIFfnNn8vD6iemc5q+EgyKKEJ/yQZtfgqRIWJwDZU3HjLAGz8sN8RF9Tx0/59hYTCkLU14qK3pX5uBbRgqYyJF9oYDA3OHc1lySgzyYg1ecmBgYGBgLvwLXxdDrxqE6vAAAAAASUVORK5CYII=>

[image8]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAWCAYAAADNcw4EAAAExklEQVR4Xu2ZW6itUxTH/0KRe+Suc8IhkUuiiDeKB+TyQC6neHCJF4p40DnJm4QHJHXyILm8KiF7hSQeUKTIA4kQoshxH7/GN88ea6z5fXutZXXO2dv81b+99pzzW2uNOcccY8y5pEaj0Wg0GjNypOn23NjDUaY7TJtNx5l2MV3atdegf6PpUdMTGh93rWmP8P/ODrasl9uDLXfK56DRAxN2n+me3FHhOdNv8ol92PSj6XHTB6aDwjjY1XSJ6WPTN6Zn5c/9ZLrVdIDpkW2jtx8Xmv6ZUnd1zwDz9J7pV7nNN5iWTH+bDg3jItiX3zPqNtOe20avMXaXOwyGPi2fwBq7mZ40HZs7jKtNN6a2E+TvuUn+GZkr5f2n5I4VIMJelBvn5Dy5o5yRO4yT5BuHz8JxXjf9pfr80IYtj+WOAP0j096p/V153zOpfU1wmelN00uqG184y7RV9ck9XeMLtM70iTxl1MYDTvKlPHrNAov9VG6ck/tNH2ky4sJhpvfltr0qdwDs6YPo9X1u7NhL/nwtSo/kfZ+l9jUBO+dieUrkdd9iU48xCTVYgLhAL8vH9jkq7GN6IzdOwaKcizrvRdMW1TcAzvWWaYPcFiLXfmMjxvlZ/fNztLyPec7g3PTNMxc7NSd2AiLY1/KJqFGc63O5I5L2ahwiH0ckHGJ/0725cQoW5VykRKJNjLjXyEsESgCgFsIOakbsGuIX9TsXEXKkyc2Gs/IMdWitdFi1lBqq7FoWjQkiCtWg1vpKPhlF7Px8Uiq1VK7BFsWinIsF53uWiMvCf6HxE3MpBRi7EmVOMiVCxvdgY3HQ+dB0lfzgs6Y4X54GC+eY/uj+9sEuj86FKHpPC2NwWFLErIX6tCzCucqCZ1uy/SVac7pcifJ8hkxARsif9afp5jBuzXCTvODmjumKThy5MXqWiPOa/JlR9z9h/m15AUwR2wcp4GwNH8EPl78v0STqB9PvlXaEPdNQUiInxcgLWk6JRHROz9hH/TXEBfJxm1I7lAgZUyLvvaVrr9V7mVc0aWufjume2WFwJ8XEkeuLykTGe50C9zk1uIKIzsUE8nroSgNIvdQyQwUyqeJg+cJGXWd6vtKOpr2MLQtOMR3Jl8hEyJWcC2fkGuFTTV4is8HKSTNDhM9O10dtHvq0Q1Msi/5Q9zfCKRFja8flvpqDQ0B8holm9480PGkPyqPnPCwiLZaUyCYYolyADjkX5QX3X5fnDo2nxEg5KU8buVYFRIpRbuzAMTA2p7Qj5KmuFmW+k4f3eNI5UP4+d4e2yJmmU3PjDCzCufh+fZenEWx5R/7rRc0JSlnwQO7oKBFylNqxgfbodByEViVMzLnyiaLW4LQS+5jEDXJj+XnjeC2HV+oT2ok2sUY6WX4g4DI0g9PxTBzP61vkF5P/hXmdiw3AdQLfl+/2rdzRsb3mOAXGbJWf7uI47Kf2u16TqYj0TLTDVj6LNB4/p9R8xbn4Xkvd61XHOi3vFBQLV/ryFQMipAM1GMU3dz1MJvXZSJ4K9u3GZNbLLyAZw+7mGU6QpJm+Z6ZlXufq+z2R+pOFH4JNyVhS2Wb5BuS015cuSzqNitEfR2dOaMc5lzR8+9/YTuAkLEyj0Wg0Go1Go/G/4F9AkD6xkKhKpQAAAABJRU5ErkJggg==>

[image9]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAAWCAYAAADNcw4EAAAEm0lEQVR4Xu2ZTahVVRTHl1RQ9ClFZiXv8UhDgiz6wqhZIUIlSaIg6sCBEkFgUOQgimjQJLNBhATRwIEZpEhQGnahkMhBOZBEnCiRVFAkFmVYrR/r7HfXW2+fc+957+bT6/7BH9/ZZ+/j2eusvdba+4oUCoVCoVBoya2qTbGxhnmq51SvqBaoZqmerNpzcH+d6m3VNpnYb43qcnd9ruH9mYd/r8tU14z3aGaR6qfYWOjCx39VtTneyPCB6k+xj7FV9avqHdUh1Q2uH1yiWqb6TvWjaofYuN9Uz6hmq94a733uGRV7l9dVq1V/iNmA+fTj8Dgh9vg33lAuFWvvpdOqE2KLdejwBtou5mg5MNa7qtviDbEPsyG0LRR75sti/0dkldh9Vn4biLCPx8aWXKXqqL4O7fCa6p/YWAPjk5NEsMmIu8ZZPxbriy0TY6rjqkdc29CwXPWl6hMxg2P4HItVf0ne+e5R3eeuMepR1fOS7w84yfdi0asNONb7sbElybFzkZrn81798KnqK5nsXDgPC9aDE52UyX3nijkpi3HoOKh6QszQ/F33sanHomESOJdPiXvF+tY5Klyt+iI29sEgnIsIzPvFaAs8nwjTizvE5k20z0Wjfe4aiExERFKvB6f6XCaXFBc8GAgBEYyVhWFyJOcihOOIdSttjlg/ImET16leio19MEjnSg42KvURNsejYgsRsAXPqVuUiZQSccahJ9VQyah8tN/FVmMOaq0fpPtREAZjt+VJKScXFQbBIJzrYbEU7+dyRnWT71QD0ZjIvLK6fkFsPOmtiZQS/y+7nFf41QcPqf6u/q2Dusp/EMRu8W7XB4c9Je0L9X4ZhHOxoB4TO0Lwc2FXSy3YxEbVbtUV1TWFO2PrIn6CPqREX5sOJRiIgpszpqcqpRXYZmXtFxvTqa6vFStwP1NdWbXlYPf4oHQ/UI6bxZ7LNt3rF7EoE9sR85kqRGbm0uS4OOUB1Qrp2o1jDMY17fawBX2aduNNxHk2acbhTIqJcuaUlApTnCyyPjZUpFXbqa7TFr+XEUm91GQ4Yx2ckd0olm681qp2ZtpRP2dTS2ODo5dzPaB6Tyba7SOxQr3peGRM2i9cT5xnk2YUPvqb1b8eClIMkDvU5OwnB5sAP4Y67kNpPtKAN8Si51SYTlpkzjhHHU0OQJQlHUZwHOqpunGAQw99SiRSdGJjBY6BcWNKu0Us1eWizM9iH8sfkl4v9pwXXZvnftVdsbEF03EuIiabFn9skKAG5Z3jooNR1WGxPhEWJbUrtWYObIlNe0XzCxYmxQ6JwzpCOMcA/h4OMV/MKb5R3S6WloBagnaija+R7hQzaq4AxukY4/vz99Oqb13bVJiOcxFdeK9npTs/5r9EbGMSF1BKzcfEnJLzQA/37lUdUe0Rs0VyIGxMmmIMY7dU1zOeugbNiJhRk0hdafVyLx4xIMI9UINRfLOTopCmzuiozkr9j7ujYoUvfSj6GcMOkvRZN6ZfpupcKSXyLjg/v+ntEltM/FbKrwmRxTL5yMIT7yEiWdrYxHtJTZudwgxC/YKDFAqFQqFQKBQKFwX/AaabIwF2U7VTAAAAAElFTkSuQmCC>