# Knowledge Base: Tworzenie narzędzia astrologicznego Placidusa.pdf

## Page 1

Projektowanie
 
Profesjonalnej
 
Aplikacji
 
Astrologicznej
 
w
 
Środowisku
 
Google
 
Antigravity:
 
Architektura,
 
Dane
 
Efemerydalne
 
i
 
Implementacja
 
Systemu
 
Placidusa
 
Wprowadzenie
 
do
 
Paradygmatu
 
Agentowego
 
w
 
Tworzeniu
 
Oprogramowania
 
Astrologicznego
 
Rozwój
 
zaawansowanego
 
oprogramowania
 
astrologicznego,
 
dorównującego
 
standardom
 
wyznaczanym
 
przez
 
wielkoskalowe
 
platformy
 
internetowe
 
takie
 
jak
 
astro.com
 
czy
 
zaawansowane
 
programy
 
desktopowe
 
pokroju
 
polskiej
 
aplikacji
 
Urania,
 
stanowi
 
wysoce
 
złożone
 
wyzwanie
 
inżynieryjne.
 
Wymaga
 
ono
 
nie
 
tylko
 
biegłości
 
w
 
projektowaniu
 
responsywnych
 
interfejsów
 
użytkownika,
 
ale
 
przede
 
wszystkim
 
rygorystycznej
 
implementacji
 
algorytmów
 
mechaniki
 
nieba,
 
precyzyjnego
 
zarządzania
 
czasem
 
i
 
geolokalizacją
 
oraz
 
głębokiej
 
optymalizacji
 
wielowątkowych
 
obliczeń
 
trygonometrycznych.
 
Tradycyjnie,
 
aplikacje
 
tego
 
typu
 
były
 
tworzone
 
i
 
udoskonalane
 
przez
 
zespoły
 
programistów
 
na
 
przestrzeni
 
miesięcy
 
lub
 
lat.
 
Jednakże
 
pojawienie
 
się
 
platformy
 
Google
 
Antigravity
 
gruntownie
 
zmienia
 
ten
 
proces,
 
wprowadzając
 
zintegrowany
 
paradygmat
 
programowania
 
zorientowanego
 
na
 
autonomiczne
 
agenty
 
sztucznej
 
inteligencji
 
(ang.
 
agent-first
 
paradigm
).
1
 
Google
 
Antigravity,
 
rozbudowane
 
zintegrowane
 
środowisko
 
programistyczne
 
(IDE)
 
oparte
 
na
 
fundamentach
 
i
 
architekturze
 
rozwidlenia
 
(fork)
 
Visual
 
Studio
 
Code
 
oraz
 
zorientowanego
 
na
 
AI
 
edytora
 
Windsurf,
 
pozwala
 
na
 
delegowanie
 
wysoce
 
złożonych
 
zadań
 
architektonicznych
 
i
 
implementacyjnych
 
do
 
autonomicznych
 
agentów.
 
Narzędzie
 
to,
 
zaprezentowane
 
18
 
listopada
 
2025
 
roku
 
wraz
 
z
 
premierą
 
modeli
 
z
 
rodziny
 
Gemini
 
3,
 
wykorzystuje
 
potężne
 
silniki
 
wnioskujące,
 
takie
 
jak
 
Gemini
 
3.1
 
Pro,
 
Anthropic
 
Claude
 
Sonnet
 
4.6,
 
Claude
 
Opus
 
4.6
 
oraz
 
otwartoźródłowe
 
modele
 
klasy
 
GPT-OSS-120B.
1
 
Środowisko
 
to
 
oferuje
 
innowacyjny
 
widok
 
"Manager
 
Surface",
 
swoiste
 
centrum
 
dowodzenia
 
(Mission
 
Control),
 
w
 
którym
 
agenty
 
działają
 
asynchronicznie,
 
analizując
 
kod,
 
planując
 
wielowarstwową
 
architekturę,
 
a
 
następnie
 
weryfikując
 
poprawność
 
działania
 
aplikacji
 
za
 
pomocą
 
tzw.
 
Artefaktów
 
(ang.
 
Artifacts
).
2
 
Podejście
 
to,
 
zastępujące
 
dawne
 
analizowanie
 
surowych
 
logów
 
namacalnymi
 
dostawami
 
kodu,
 
idealnie
 
wpisuje
 
się
 
w
 
rygorystyczne
 
wymagania
 
tworzenia
 
silnika
 
astrologicznego.
3
 
W
 
projekcie
 
tego
 
typu
 
poszczególne
 
domeny
 
–
 
takie
 
jak
 
iteracyjne
 
obliczenia
 
astronomiczne,
 
geokodowanie
 
współrzędnych,
 
transformacje
 
stref
 
czasowych
 
oraz
 
renderowanie
 
wektorowych
 
grafik
 
SVG
 
–
 
mogą
 
być
 
separowane
 
i
 
precyzyjnie
 
implementowane
 
przez
 
wyizolowane
 
przepływy
 
pracy
 

## Page 2

(ang.
 
workflows
).
5
 
Współczesne
 
projektowanie
 
aplikacji
 
przy
 
użyciu
 
AI
 
wymusza
 
odejście
 
od
 
traktowania
 
modelu
 
jako
 
prostego
 
chatbota
 
autouzupełniającego
 
kod
 
w
 
pasku
 
bocznym.
3
 
Google
 
Antigravity
 
traktuje
 
uczenie
 
jako
 
podstawowy
 
prymityw,
 
pozwalając
 
agentom
 
na
 
zapisywanie
 
użytecznego
 
kontekstu
 
w
 
dedykowanych
 
folderach
 
struktury
 
projektu.
3
 
Prawidłowe
 
zakodowanie
 
profesjonalnego
 
narzędzia
 
astrologicznego
 
opiera
 
się
 
w
 
głównej
 
mierze
 
na
 
skonfigurowaniu
 
tego
 
środowiska
 
–
 
dostarczeniu
 
agentowi
 
odpowiednich
 
reguł
 
(Rules)
 
i
 
umiejętności
 
(Skills)
 
zdefiniowanych
 
w
 
folderze
 
.agents.
8
 
Poprzez
 
narzucenie
 
ścisłych
 
ram
 
architektonicznych,
 
model
 
Gemini
 
3.1
 
Pro,
 
dysponujący
 
ogromnym
 
oknem
 
kontekstowym
 
i
 
zaawansowanymi
 
zdolnościami
 
rozumowania,
 
jest
 
w
 
stanie
 
samodzielnie
 
zbudować
 
platformę
 
SaaS
 
w
 
niezwykle
 
krótkim
 
czasie,
 
co
 
zostało
 
dowiedzione
 
w
 
studiach
 
przypadków
 
związanych
 
z
 
rynkiem
 
AI
 
SaaS
 
i
 
narzędziami
 
wibrującego
 
kodowania
 
(vibe-coding).
4
 
Niniejszy
 
raport
 
stanowi
 
dogłębne
 
i
 
wyczerpujące
 
kompendium
 
wiedzy
 
na
 
temat
 
budowy
 
od
 
podstaw
 
profesjonalnego
 
narzędzia
 
astrologicznego,
 
skupionego
 
z
 
pełną
 
ekskluzywnością
 
na
 
matematycznym
 
systemie
 
domów
 
Placidusa.
 
Analiza
 
obejmuje
 
szczegółowe
 
omówienie
 
referencyjnych
 
architektur
 
rynkowych,
 
mechanizmy
 
pozyskiwania
 
darmowych
 
i
 
certyfikowanych
 
przez
 
agencje
 
kosmiczne
 
danych
 
efemerydalnych,
 
integrację
 
zewnętrznych
 
systemów
 
geokodowania
 
oraz
 
wysoce
 
złożoną
 
inżynierię
 
promptów
 
dedykowanych
 
dla
 
platformy
 
Google
 
Antigravity.
 
Zastosowanie
 
środowiska
 
Antigravity
 
w
 
połączeniu
 
z
 
odpowiednio
 
zdefiniowanymi
 
zestawami
 
instrukcji
 
gwarantuje
 
skrócenie
 
czasu
 
tworzenia
 
oprogramowania
 
przy
 
jednoczesnym
 
zachowaniu
 
naukowej
 
i
 
astronomicznej
 
precyzji,
 
co
 
jest
 
krytyczne
 
dla
 
zbudowania
 
narzędzia
 
cieszącego
 
się
 
zaufaniem
 
profesjonalnych
 
astrologów.
 
Architektura
 
Referencyjna:
 
Analiza
 
Narzędzi
 
Klasy
 
Enterprise
 
(Astro.com
 
i
 
Urania)
 
Zrozumienie,
 
czym
 
jest
 
"profesjonalne
 
narzędzie
 
astrologiczne",
 
wymaga
 
dekonstrukcji
 
funkcji
 
oferowanych
 
przez
 
liderów
 
rynku.
 
Chociaż
 
celem
 
projektowym
 
jest
 
aplikacja
 
skupiona
 
wyłącznie
 
na
 
systemie
 
Placidusa,
 
jej
 
rdzeń
 
technologiczny
 
musi
 
posiadać
 
skalowalność
 
i
 
wydajność
 
zbliżoną
 
do
 
flagowych
 
produktów.
 
Szwajcarski
 
portal
 
astro.com
 
(Astrodienst)
 
oraz
 
polski
 
program
 
Urania
 
to
 
przykłady
 
systemów
 
klasy
 
enterprise
 
w
 
dziedzinie
 
astrologii.
11
 
Aplikacje
 
te
 
nie
 
ograniczają
 
się
 
do
 
generowania
 
prostych
 
interpretacji
 
słonecznych,
 
lecz
 
oferują
 
potężne
 
silniki
 
analityczne.
 
Program
 
Urania,
 
uznawany
 
za
 
standard
 
wśród
 
polskich
 
profesjonalistów,
 
obsługuje
 
wysoce
 
skomplikowane
 
techniki:
 
koncentryczne
 
wykresy
 
synastryczne
 
pozwalające
 
na
 
nałożenie
 
do
 
pięciu
 
kół
 
horoskopowych,
 
kompozyty
 
łączące
 
dane
 
do
 
25
 
wykresów
 
urodzeniowych,
 
zawiłe
 
listy
 
tranzytów,
 
progresji
 
i
 
dyrekcji
 
(tzw.
 
dialogi
 
TPD),
 
a
 
także
 
zaawansowaną
 
astrokartografię
 
i
 
cyklokartografię
 
uwzględniającą
 
planety
 
na
 
osiach
 
i
 
horyzoncie.
13
 
Profesjonalizm
 
tych
 
rozwiązań
 
objawia
 
się
 
w
 
ekstremalnej
 
dbałości
 
o
 
detale
 
renderowania
 
–
 
grafiki
 
wektorowe
 
i
 
rastrowe
 
(wykresy
 
z
 
precyzyjnie
 
naniesionymi
 
obiektami
 
transneptunowymi,
 
asteroidami
 
i
 
aspektariami)
 
muszą
 
być
 
czytelne
 
i
 
skalowalne.
13
 

## Page 3

Podobnie
 
jak
 
Kerykeion,
 
nowoczesna
 
biblioteka
 
astrologiczna
 
napisana
 
w
 
języku
 
Python,
 
zaawansowane
 
aplikacje
 
polegają
 
na
 
precyzyjnym
 
wyliczaniu
 
położeń
 
planet
 
i
 
domów
 
w
 
celu
 
detekcji
 
aspektów
 
i
 
generowania
 
wykresów
 
SVG.
16
 
Budując
 
nowe
 
oprogramowanie
 
przy
 
użyciu
 
Google
 
Antigravity,
 
należy
 
poinstruować
 
agenta
 
AI,
 
aby
 
od
 
samego
 
początku
 
zaplanował
 
architekturę
 
danych
 
zdolną
 
do
 
obsługi
 
tak
 
ogromnych
 
wektorów
 
informacji.
 
Nawet
 
jeśli
 
w
 
pierwszej
 
wersji
 
(MVP)
 
udostępniony
 
zostanie
 
jedynie
 
wykres
 
urodzeniowy
 
w
 
systemie
 
Placidusa,
 
struktura
 
bazy
 
danych
 
(np.
 
dokumenty
 
JSONB
 
w
 
PostgreSQL)
 
oraz
 
bezstanowe
 
funkcje
 
brzegowe
 
(edge
 
functions)
 
obliczające
 
pozycje
 
zodiakalne
 
muszą
 
być
 
zoptymalizowane
 
pod
 
kątem
 
przyszłych
 
zapytań
 
o
 
tranzyty
 
i
 
zgodność
 
partnerską
 
(synastrię).
5
 
Tradycyjna
 
astrologia
 
operuje
 
wielowarstwowymi
 
systemami
 
–
 
od
 
godności
 
ptolemejskich,
 
przez
 
analizę
 
temperamentu,
 
po
 
systemy
 
domów
 
–
 
co
 
wymaga
 
oddzielenia
 
logiki
 
astronomicznej
 
od
 
interfejsu
 
graficznego.
5
 
Fundamenty
 
Matematyczne
 
i
 
Źródła
 
Danych:
 
Ekosystem
 
Swiss
 
Ephemeris
 
Podstawowym,
 
nienegocjowalnym
 
wymogiem
 
dla
 
każdej
 
profesjonalnej
 
aplikacji
 
astrologicznej
 
jest
 
oparcie
 
jej
 
o
 
bezbłędne
 
i
 
naukowo
 
zweryfikowane
 
dane
 
astronomiczne.
 
Autorskie
 
algorytmy,
 
wbudowane
 
w
 
kod
 
proste
 
wzory
 
trygonometryczne
 
czy
 
przybliżone
 
formuły
 
matematyczne
 
są
 
całkowicie
 
niewystarczające,
 
gdy
 
dla
 
astrologów
 
wymagana
 
jest
 
precyzja
 
co
 
do
 
sekundy
 
łuku.
 
Standardem
 
branżowym,
 
stanowiącym
 
silnik
 
obliczeniowy
 
dla
 
serwerów
 
astro.com,
 
bibliotek
 
Kerykeion,
 
a
 
także
 
aplikacji
 
takich
 
jak
 
Urania,
 
jest
 
biblioteka
 
Swiss
 
Ephemeris
 
opracowana
 
przez
 
Astrodienst.
5
 
Szwajcarskie
 
Efemerydy
 
stanowią
 
swoisty
 
mechanizm
 
zegarowy
 
ukryty
 
pod
 
maską
 
każdej
 
zaawansowanej
 
platformy
 
analizującej
 
niebo.
19
 
Kontrastowanie
 
Algorytmów:
 
Moshier
 
Ephemeris
 
a
 
Dane
 
JPL
 
Horizons
 
Z
 
punktu
 
widzenia
 
inżynierii
 
oprogramowania,
 
Swiss
 
Ephemeris
 
oferuje
 
dwa
 
główne
 
tryby
 
obliczeniowe.
 
Zdecydowana
 
większość
 
portów
 
i
 
pakietów
 
(np.
 
dla
 
Node.js,
 
Pythona
 
czy
 
WebAssembly)
 
posiada
 
wbudowany
 
kod
 
Moshier
 
Ephemeris.
11
 
Algorytm
 
Moshiera
 
jest
 
relatywnie
 
lekki
 
(zajmuje
 
około
 
250
 
KB
 
w
 
postaci
 
skompresowanej),
 
nie
 
wymaga
 
zewnętrznych
 
plików
 
na
 
serwerze
 
i
 
oferuje
 
dokładność
 
rzędu
 
1
 
sekundy
 
łuku
 
dla
 
przedziału
 
od
 
3000
 
lat
 
p.n.e.
 
do
 
3000
 
lat
 
n.e..
11
 
Dla
 
wielu
 
amatorskich
 
projektów
 
jest
 
to
 
wartość
 
wystarczająca.
 
Niemniej
 
jednak,
 
profesjonalne
 
zastosowania
 
wkraczające
 
w
 
obszar
 
precyzji
 
badawczej
 
wymagają
 
zastosowania
 
potężniejszych
 
danych,
 
bazujących
 
na
 
wysokoprecyzyjnych
 
efemerydach
 
udostępnianych
 
przez
 
NASA
 
Jet
 
Propulsion
 
Laboratory
 
(JPL)
 
za
 
pośrednictwem
 
systemu
 
Horizons.
22
 
Swiss
 
Ephemeris
 
pozwala
 
na
 
natywne
 
załadowanie
 
tych
 
zewnętrznych
 
plików,
 
które
 
precyzyjnie
 
kompensują
 
takie
 
anomalie
 
fizyczne
 
jak
 
perturbacje
 
grawitacyjne
 
pomiędzy
 
obiektami
 
w
 
Układzie
 
Słonecznym,
 
relatywistyczne
 
ugięcia
 
światła
 
w
 
pobliżu
 
mas
 
gwiazdowych
 
czy
 
nutację
 
i
 
precesję
 
osi
 
obrotu
 
Ziemi.
19
 
NASA
 
dystrybuuje
 
swoje
 
pliki
 
binarne
 
w
 
formacie
 
SPK
 
przy
 
użyciu
 
toolkitu
 
NAIF
 
SPICE,
 
jednak
 
Astrodienst
 
dla
 
wygody
 
programistów
 

## Page 4

kompiluje
 
je
 
do
 
dedykowanego
 
formatu
 
.se1.
11
 
 
Typ
 
Pliku
 
Danych
 
Przykładowy
 
Zakres
 
Czasowy
 
Nazwa
 
Pliku
 
.se1
 
Opis
 
Zawartości
 
i
 
Zastosowanie
 
Planetary
 
File
 
1800
 
AD
 
-
 
2399
 
AD
 
sepl_18.se1
 
Zawiera
 
fundamentalne
 
pozycje
 
głównych
 
planet
 
Układu
 
Słonecznego
 
z
 
precyzją
 
bezpośrednio
 
od
 
NASA
 
JPL.
 
Niezbędne
 
dla
 
rdzenia
 
horoskopu.
11
 
Moon
 
File
 
1800
 
AD
 
-
 
2399
 
AD
 
semo_18.se1
 
Z
 
uwagi
 
na
 
niezwykle
 
szybki
 
i
 
złożony
 
grawitacyjnie
 
ruch
 
Księżyca
 
wokół
 
Ziemi,
 
efemerydy
 
księżycowe
 
dystrybuowane
 
są
 
w
 
oddzielnych,
 
wysoce
 
gęstych
 
plikach
 
danych.
11
 
Main
 
Asteroid
 
File
 
Różne
 
przedziały
 
epokowe
 
seasm*.se1
 
Obejmuje
 
główne
 
planetoidy,
 
takie
 
jak
 
Ceres,
 
Pallas,
 
Juno,
 
Westa,
 
oraz
 
wybrane
 
obiekty
 
centaurowe,
 
często
 
wykorzystywane
 
w
 
zaawansowanych
 
odczytach.
23
 
Historical
 
Planetary
 
1200
 
AD
 
-
 
1799
 
AD
 
sepl_12.se1
 
Pliki
 
historyczne
 
używane
 
do
 

## Page 5

rektyfikacji
 
horoskopów
 
historycznych
 
postaci
 
i
 
analiz
 
mundalnych.
11
 
Pozyskiwanie
 
tych
 
certyfikowanych
 
danych
 
jest
 
w
 
pełni
 
darmowe
 
w
 
ramach
 
licencji
 
GNU
 
GPL
 
(lub
 
podwójnego
 
licencjonowania
 
oferowanego
 
przez
 
Astrodienst).
 
Oficjalne
 
repozytorium
 
udostępnia
 
kompletny
 
zbiór
 
plików
 
pod
 
publicznym
 
adresem
 
FTP:
 
ftp://ftp.astro.com/pub/swisseph/ephe/.
11
 
Architekt
 
projektujący
 
oprogramowanie
 
musi
 
jedynie
 
zdecydować,
 
jakie
 
przedziały
 
czasowe
 
będą
 
obsługiwane
 
przez
 
aplikację,
 
po
 
czym
 
załączyć
 
odpowiednie
 
moduły
 
.se1
 
do
 
katalogu
 
zasobów
 
projektu.
 
Architektura
 
WebAssembly
 
w
 
Implementacji
 
Swiss
 
Ephemeris
 
Tradycyjnie,
 
wykorzystanie
 
Swiss
 
Ephemeris
 
wiązało
 
się
 
z
 
koniecznością
 
kompilacji
 
natywnego
 
kodu
 
języka
 
C
 
za
 
pomocą
 
narzędzi
 
takich
 
jak
 
CMake,
 
co
 
prowadziło
 
do
 
problemów
 
ze
 
środowiskiem
 
uruchomieniowym,
 
powiązaniami
 
z
 
systemami
 
operacyjnymi
 
(DLL
 
na
 
Windows,
 
SO
 
na
 
Linuksie)
 
oraz
 
komplikacjami
 
podczas
 
wdrażania
 
usług
 
chmurowych.
19
 
Na
 
przykład,
 
port
 
dla
 
Pythona
 
(pyswisseph)
 
często
 
wymaga
 
manualnej
 
interwencji
 
kompilatora
 
w
 
zależności
 
od
 
tego,
 
czy
 
używana
 
jest
 
wersja
 
32-,
 
czy
 
64-bitowa.
24
 
Dla
 
współczesnych,
 
nowoczesnych
 
aplikacji
 
webowych
 
i
 
projektów
 
opartych
 
o
 
chmurę
 
publiczną
 
rozwiązaniem
 
rewolucjonizującym
 
wydajność
 
jest
 
technologia
 
WebAssembly
 
(WASM).
 
Agent
 
Antigravity
 
powinien
 
zostać
 
jednoznacznie
 
poinstruowany
 
o
 
konieczności
 
użycia
 
ekosystemu
 
WASM.
 
Na
 
platformie
 
NPM
 
dostępnych
 
jest
 
kilka
 
potężnych,
 
otwartoźródłowych
 
bibliotek,
 
takich
 
jak
 
swisseph-wasm,
 
@swisseph/browser
 
czy
 
@fusionstrings/swisseph-wasi.
20
 
Pakiety
 
te
 
oferują:
 
●
 
Zerową
 
liczbę
 
zewnętrznych
 
zależności:
 
Całość
 
logiki
 
napisanej
 
w
 
języku
 
C/Rust
 
jest
 
zamknięta
 
w
 
bezpiecznym
 
module
 
WASM.
20
 
●
 
Wydajność
 
klasy
 
natywnej:
 
Obliczenia
 
trygonometryczne
 
przebiegają
 
znacznie
 
szybciej
 
niż
 
w
 
czystym
 
JavaScript,
 
z
 
mniejszym
 
zużyciem
 
pamięci
 
RAM,
 
co
 
zostało
 
zabezpieczone
 
poprzez
 
mechanizmy
 
FFI
 
w
 
kodzie
 
Rust.
25
 
●
 
Uniwersalność
 
środowiskową:
 
Kod
 
ten
 
można
 
uruchomić
 
na
 
serwerach
 
z
 
Node.js,
 
w
 
środowiskach
 
Deno
 
i
 
Bun,
 
na
 
skraju
 
sieci
 
(Cloudflare
 
Workers)
 
oraz
 
całkowicie
 
po
 
stronie
 
klienta,
 
bezpośrednio
 
w
 
przeglądarce.
20
 
W
 
tym
 
ostatnim
 
przypadku,
 
pliki
 
efemeryd
 
wysokiej
 
precyzji
 
(o
 
wadze
 
ok.
 
2MB)
 
pobierane
 
są
 
jednorazowo
 
przez
 
klienta
 
za
 
pośrednictwem
 
sieci
 
CDN,
 
eliminując
 
wąskie
 
gardła
 
i
 
koszty
 
po
 
stronie
 
serwera
 
aplikacji.
21
 
Pakiet
 
taki
 
jak
 
swisseph-wasm
 
gwarantuje
 
także
 
pełne
 
typowanie
 
dla
 
języka
 
TypeScript
 
(TSDoc),
 
co
 
wydatnie
 
ułatwia
 
proces
 
kompilacji
 
i
 
ogranicza
 
powstawanie
 
błędów
 
po
 
stronie
 
modelu
 
AI.
20
 

## Page 6

Matematyka
 
i
 
Ograniczenia
 
Systemu
 
Domów
 
Placidusa
 
Sercem
 
wygenerowanej
 
aplikacji
 
astrologicznej,
 
zgodnie
 
z
 
założeniami
 
projektowymi,
 
jest
 
wyłączna
 
implementacja
 
systemu
 
domów
 
Placidusa.
 
W
 
praktyce
 
astrologicznej
 
domy
 
są
 
mechanizmem
 
dzielącym
 
sferę
 
niebieską
 
–
 
horyzont
 
lokalny
 
użytkownika
 
–
 
na
 
dwanaście
 
sektorów
 
oznaczających
 
obszary
 
doświadczeń
 
życiowych.
 
Placidus
 
jest
 
najpopularniejszym,
 
domyślnym
 
systemem
 
podziału
 
przestrzeni
 
stosowanym
 
we
 
współczesnej
 
astrologii
 
zachodniej,
 
jednak
 
z
 
inżynieryjnego
 
punktu
 
widzenia
 
stanowi
 
jeden
 
z
 
najbardziej
 
wymagających
 
algorytmów.
28
 
Ewolucja
 
Historyczna
 
i
 
Podstawy
 
Geometryczne
 
Nazwa
 
systemu
 
pochodzi
 
od
 
nazwiska
 
renesansowego
 
mnicha
 
i
 
matematyka
 
Placidusa
 
de
 
Titis,
 
chociaż
 
same
 
matematyczne
 
podstawy
 
tego
 
algorytmu
 
były
 
znane
 
już
 
w
 
średniowieczu
 
i
 
opisywane
 
przez
 
wybitnego
 
uczonego
 
Abrahama
 
ibn
 
Ezrę.
28
 
Antonio
 
Magini,
 
współczesny
 
Galileuszowi,
 
posługiwał
 
się
 
tym
 
modelem,
 
lecz
 
to
 
Placidus
 
był
 
pierwszym,
 
który
 
opublikował
 
kompleksowy
 
zestaw
 
gotowych
 
tabel
 
domów,
 
umożliwiających
 
ówczesnym
 
ludziom
 
pracę
 
z
 
tym
 
rygorystycznym
 
systemem
 
bez
 
konieczności
 
każdorazowego
 
wyliczania
 
skomplikowanych
 
wzorów.
30
 
Złożoność
 
wynika
 
z
 
samej
 
definicji
 
systemu:
 
Placidus
 
nie
 
jest
 
podziałem
 
statycznej
 
przestrzeni.
 
Jest
 
to
 
metoda
 
zorientowana
 
na
 
czas.
28
 
Podczas
 
gdy
 
najprostsze
 
systemy,
 
jak
 
Porphyry
 
(rozpowszechniony
 
m.in.
 
w
 
systemach
 
wedyjskich
 
i
 
u
 
Alcabitiusa),
 
wymagają
 
jedynie
 
trysekcji
 
–
 
łatwego
 
podziału
 
łuków
 
między
 
głównymi
 
osiami
 
na
 
trzy
 
równe
 
części
 
matematyczne
 
–
 
Placidus
 
symuluje
 
dobowe
 
ruchy
 
planetarne.
29
 
Wymaga
 
on
 
obliczenia
 
precyzyjnego
 
czasu,
 
jaki
 
zajmuje
 
konkretnemu
 
stopniowi
 
zodiaku
 
przemieszczenie
 
się
 
od
 
wschodniego
 
horyzontu
 
w
 
górę,
 
aby
 
po
 
łuku
 
dojść
 
do
 
zenitu
 
(Medium
 
Coeli
 
-
 
MC).
31
 
Nierównomierna
 
dystrybucja
 
światła
 
dziennego
 
w
 
trakcie
 
roku
 
połączona
 
ze
 
sferyczną
 
krzywizną
 
Ziemi
 
prowadzi
 
do
 
wygenerowania
 
domów
 
o
 
skrajnie
 
różnych
 
rozmiarach
 
kątowych,
 
zjawiska,
 
które
 
w
 
sposób
 
ekstremalny
 
uwidacznia
 
się
 
w
 
okolicach
 
podbiegunowych.
31
 
System
 
ten
 
wymaga
 
zastosowania
 
sukcesywnych
 
aproksymacji
 
(równań
 
iteracyjnych)
 
w
 
celu
 
uzyskania
 
zbieżnego
 
wyniku.
30
 
Szybko
 
konvergujące
 
algorytmy
 
(np.
 
warianty
 
zaproponowane
 
przez
 
M.
 
Vijayaraghavulu)
 
iteracyjnie
 
podchodzą
 
do
 
wartości
 
Rektascensji
 
Medium
 
Coeli
 
(RAMC),
 
wymuszając
 
zapętlone
 
operacje
 
trygonometryczne.
32
 
Choć
 
dla
 
klasycznego
 
astrologa
 
proces
 
ten
 
był
 
"koszmarem"
 
i
 
zmuszał
 
do
 
stosowania
 
przedrukowywanych
 
tabel
 
z
 
interpolacją
 
(jak
 
publikacje
 
Dietera
 
Kocha
 
i
 
Aloisa
 
Treindla
 
dla
 
Astrodienst,
 
dedykowane
 
dla
 
konkretnych
 
szerokości
 
północnych),
 
dla
 
współczesnych
 
struktur
 
procesorów
 
i
 
portów
 
WASM
 
jest
 
to
 
obliczenie
 
wykonywane
 
w
 
setnych
 
częściach
 
milisekundy.
30
 
Programistyczne
 
Aspekty
 
Funkcji
 
Swiss
 
Ephemeris
 
i
 
Fallback
 
Handling
 

## Page 7

Komunikacja
 
z
 
modułem
 
Swiss
 
Ephemeris
 
(niezależnie
 
od
 
środowiska:
 
Node,
 
Python
 
czy
 
przeglądarka)
 
w
 
celu
 
obliczenia
 
wierzchołków
 
(cuspid)
 
systemu
 
Placidusa
 
wykorzystuje
 
wywołanie
 
dedykowanej
 
funkcji
 
swe_houses()
 
z
 
systemową
 
flagą
 
ustawioną
 
na
 
wartość
 
'p'.
34
 
Projektując
 
aplikację
 
przy
 
użyciu
 
Google
 
Antigravity,
 
należy
 
dostarczyć
 
agentowi
 
niezwykle
 
precyzyjne
 
wytyczne
 
odnośnie
 
parsowania
 
i
 
modelowania
 
struktury
 
danych
 
powracającej
 
z
 
tego
 
wywołania,
 
ponieważ
 
domyślne
 
zachowanie
 
biblioteki
 
napisanej
 
pierwotnie
 
w
 
języku
 
C
 
jest
 
nienaturalne
 
dla
 
ekosystemu
 
JavaScript/TypeScript:
 
1.
 
Struktura
 
tablicy
 
zodiakalnej:
 
Funkcja
 
zwraca
 
tablicę
 
trzynastoelementową
 
reprezentującą
 
bezwzględne
 
pozycje
 
stopni
 
w
 
zodiaku
 
(w
 
formacie
 
float
 
od
 
 
do
 
,
 
gdzie
 
 
oznacza
 
równe
 
zero
 
stopni
 
znaku
 
Barana,
 
a
 
 
zero
 
stopni
 
Byka).
35
 
2.
 
Pułapka
 
zerowego
 
indeksu:
 
Najpowszechniejszym
 
błędem
 
architektonicznym
 
jest
 
przypisanie
 
wskaźnika
 
Ascendentu
 
do
 
wartości
 
pod
 
indeksem
 
.
 
Biblioteka
 
celowo
 
utrzymuje
 
ten
 
indeks
 
pusty
 
(niezainicjalizowany,
 
wartość
 
$0.0$).
 
Obliczane
 
wierzchołki
 
od
 
pierwszego
 
do
 
dwunastego
 
domu
 
umieszczane
 
są
 
ściśle
 
w
 
indeksach
 
od
 
do
 
``.
35
 
Wartość
 
cusp
 
jest
 
równocześnie
 
Ascendentem,
 
a
 
wartość
 
cusp
 
ściśle
 
definiuje
 
pozycję
 
Medium
 
Coeli.
34
 
Model
 
językowy
 
w
 
Antigravity
 
musi
 
otrzymać
 
regułę
 
(Rule),
 
aby
 
automatycznie
 
odciąć
 
początkowy
 
indeks
 
lub
 
przenieść
 
dane
 
do
 
naturalnego
 
obiektu
 
(mapy)
 
w
 
TypeScript.
 
 
Indeks
 
Tablicy
 
swe_houses()
 
Odniesienie
 
Zodiakalne
 
Opis
 
Architektoniczny
 
``
 
Błędne
 
/
 
0.0
 
Indeks
 
ignorowany.
 
Stanowi
 
najczęstszą
 
przyczynę
 
przesunięć
 
na
 
osi
 
wykresu.
35
 
``
 
Dom
 
1
 
Matematycznie
 
tożsamy
 
z
 
Ascendentem
 
(wschodni
 
horyzont).
34
 
``
 
Dom
 
4
 
Imum
 
Coeli
 
(IC),
 
dolna
 
kulminacja.
34
 
``
 
Dom
 
10
 
Medium
 
Coeli
 
(MC),
 
zenit.
34
 
Błąd
 
skrajnych
 
szerokości
 
geograficznych:
 
Krytycznym
 
ograniczeniem
 
geometrycznym,
 
przed
 
którym
 
inżynier
 
musi
 
zabezpieczyć
 
aplikację,
 
jest
 
załamywanie
 
się
 
matematyki
 
Placidusa
 
(i
 
zbliżonego
 
systemu
 
Kocha)
 
na
 
ekstremalnych
 
szerokościach
 
geograficznych.
19
 
Ponieważ
 
jest
 


## Page 8

to
 
podział
 
zorientowany
 
na
 
pory
 
wschodów
 
i
 
zachodów,
 
poza
 
strefami
 
podbiegunowymi
 
(za
 
kołami
 
Arktycznym
 
i
 
Antarktycznym,
 
tj.
 
szerokości
 
ponad
 
ok.
 
66°
 
N/S),
 
obiekty
 
niebiańskie
 
mogą
 
znajdować
 
się
 
w
 
strefie
 
dnia
 
polarnego
 
lub
 
nocy
 
polarnej,
 
uniemożliwiając
 
przecięcie
 
łuku
 
dziennego
 
z
 
lokalnym
 
horyzontem.
19
 
Jeśli
 
aplikacja
 
jest
 
rygorystycznie
 
zablokowana
 
wyłącznie
 
na
 
system
 
Placidusa,
 
inżynieria
 
błędu
 
(fallback
 
handling)
 
jest
 
absolutnie
 
krytyczna.
 
Oprogramowanie
 
musi
 
sprawdzać
 
szerokość
 
geograficzną
 
przed
 
próbą
 
wyliczeń
 
i
 
w
 
przypadku
 
błędu
 
zwrócić
 
do
 
klienta
 
przyjazny
 
dla
 
użytkownika
 
błąd
 
lokalizacji,
 
zamiast
 
doprowadzić
 
do
 
fatalnej
 
awarii
 
backendu
 
(tzw.
 
"crash").
 
Nawet
 
profesjonalne
 
systemy
 
uciekają
 
się
 
wtedy
 
do
 
automatycznego
 
renderowania
 
systemu
 
Porphyrego,
 
jednak
 
w
 
zamkniętej
 
architekturze
 
Placidusa
 
musimy
 
zablokować
 
tę
 
próbę
 
na
 
poziomie
 
walidacji
 
wejścia.
 
Geokodowanie
 
i
 
Precyzyjne
 
Zarządzanie
 
Czasem:
 
Podstawa
 
Astrologii
 
Każdy
 
proces
 
astronomiczny
 
w
 
aplikacji
 
jest
 
całkowicie
 
uzależniony
 
od
 
jakości
 
dostarczonych
 
punktów
 
wejściowych
 
(tzw.
 
Input
 
Data).
 
Podstawowym
 
wyzwaniem
 
przy
 
tworzeniu
 
oprogramowania
 
astrologicznego
 
–
 
na
 
które
 
często
 
nie
 
zwraca
 
się
 
uwagi
 
aż
 
do
 
momentu
 
uruchomienia
 
na
 
serwerach
 
produkcyjnych
 
–
 
jest
 
bezbłędna
 
transformacja
 
abstrakcyjnych
 
pojęć,
 
takich
 
jak
 
nazwa
 
miasta
 
i
 
godzina
 
podana
 
przez
 
użytkownika,
 
na
 
absolutne
 
koordynaty
 
przestrzenno-czasowe,
 
a
 
dokładniej
 
Datę
 
Juliańską
 
(Julian
 
Day)
 
oraz
 
współrzędne
 
geograficzne
 
w
 
radianach.
36
 
Moduły
 
API
 
dla
 
Geokodowania
 
(Alternatywy
 
Open
 
Source)
 
Aplikacje
 
o
 
małym
 
budżecie
 
deweloperskim
 
lub
 
będące
 
we
 
wczesnej
 
fazie
 
rozwoju
 
(np.
 
MVP)
 
muszą
 
unikać
 
monopolu
 
kosztownego
 
API
 
Google
 
Maps,
 
którego
 
miesięczne
 
koszty
 
mogą
 
lawinowo
 
rosnąć
 
w
 
przypadku
 
popularnych
 
usług.
37
 
Rozwijając
 
projekt
 
w
 
Antigravity,
 
nakazuje
 
się
 
modelowi
 
zintegrowanie
 
usług
 
z
 
hojnym
 
limitem
 
darmowych
 
zapytań,
 
które
 
zachowują
 
wysoki
 
poziom
 
pokrycia
 
dla
 
wszystkich
 
krajów
 
świata.
 
Analiza
 
rynku
 
(m.in.
 
dane
 
na
 
rok
 
2026)
 
wyłania
 
następujących
 
kandydatów:
 
 
Provider
 
API
 
Charakterystyka
 
Limitu
 
Darmowego
 
Główne
 
Zastosowanie
 
w
 
Architekturze
 
Geoapify
 
Skalowalna
 
darmowa
 
warstwa
 
bez
 
limitów
 
kartowych.
38
 
Oferuje
 
znakomite
 
walidowanie
 
miast
 
i
 
precyzyjne
 
odwrócone
 
(reverse)
 
oraz
 
bezpośrednie
 
(forward)
 
geokodowanie.
38
 

## Page 9

LocationIQ
 
Ekstremalnie
 
hojny
 
darmowy
 
przydział,
 
infrastruktura
 
oparta
 
na
 
OpenStreetMap.
39
 
Idealne
 
narzędzie
 
jako
 
zamiennik
 
Google
 
do
 
precyzyjnego
 
pozycjonowania
 
(rooftop
 
accuracy)
 
i
 
funkcji
 
autouzupełniania
 
wpisywanego
 
miasta.
39
 
Geocode.maps.co
 
25
 
000
 
darmowych
 
zapytań
 
(do
 
5
 
zapytań
 
na
 
sekundę).
40
 
Szybkie
 
żądania
 
zoptymalizowane
 
pod
 
kątem
 
opóźnień
 
(low
 
latency
 
API
 
endpoints),
 
formaty
 
JSON
 
i
 
JSONv2,
 
wymagana
 
tylko
 
szybka
 
rejestracja
 
pod
 
klucz
 
dostępu
 
(Bearer
 
Token).
40
 
Mapbox
 
Geocoding
 
100
 
000
 
bezpłatnych
 
wyszukiwań,
 
funkcja
 
wsadowa
 
(batch
 
API).
41
 
Idealne
 
dla
 
większych
 
systemów,
 
świetne
 
pokrycie
 
w
 
krajach
 
globalnego
 
południa,
 
ścisła
 
współpraca
 
z
 
mapami
 
z
 
poziomu
 
JS.
41
 
Uzyskanie
 
długości
 
(lon)
 
i
 
szerokości
 
(lat)
 
geograficznej
 
to
 
dopiero
 
pierwsza
 
płaszczyzna
 
lokalizacji.
 
Prawdziwym
 
"czarnym
 
koniem"
 
błędów
 
astrologicznych
 
jest
 
historyczny
 
czas
 
lokalny.
 
Kwestia
 
stref
 
czasowych,
 
ich
 
historycznych
 
zmian
 
oraz
 
okresów
 
obowiązywania
 
czasu
 
letniego
 
(DST
 
-
 
Daylight
 
Saving
 
Time)
 
na
 
przestrzeni
 
dekad
 
jest
 
tak
 
złożona,
 
że
 
tworzenie
 
własnych
 
słowników
 
mija
 
się
 
z
 
celem.
17
 
Optymalnym
 
rozwiązaniem
 
programistycznym
 
jest
 
integracja
 
darmowego
 
interfejsu
 
GeoNames
 
API
.
 
Przesyłając
 
do
 
GeoNames
 
zgeokodowane
 
parametry,
 
API
 
to
 
zwraca
 
nie
 
tylko
 
identyfikator
 
IANA
 
strefy
 
czasowej
 
(np.
 
Europe/Warsaw),
 
ale
 
weryfikuje
 
historyczne
 
anomalie,
 
podając
 
odpowiedni
 
ułamek
 
przesunięcia
 
dla
 
danego
 
dnia
 
urodzenia.
 
Licencjonowane
 
otwartoźródłowo
 
usługi
 
takie
 
jak
 
Astrologer
 
API
 
z
 
powodzeniem
 
integrują
 
GeoNames
 
do
 
automatycznego
 
uzupełniania
 
brakujących
 
pól
 
czasowych
 
użytkowników.
17
 
Logika
 
Konwersji
 
Czasu:
 
UTC,
 
Julian
 
Day
 
i
 
Rola
 
Delta
 
T
 
Posiadając
 
zweryfikowany
 
czas
 
lokalny
 
i
 
potwierdzone
 
historycznie
 
przesunięcie
 
strefowe,
 
agent
 
AI
 
musi
 
wygenerować
 
łańcuch
 
konwersji
 
do
 
Czasu
 
Uniwersalnego
 
(UTC).
 
Biblioteka
 
Swiss
 
Ephemeris
 
nie
 
operuje
 
na
 
standardowych
 
obiektach
 
daty
 
DateTime
 
z
 
języków
 
programowania
 
wyższego
 
rzędu.
 
Zamiast
 
tego,
 
silnik
 
wymaga
 
przekazania
 
Daty
 
Juliańskiej
 
(Julian
 
Day)
 
definiowanej
 
jako
 
ciągły
 
ułamek
 
dni
 
licząc
 
od
 
wczesnej
 
epoki
 
astronomicznej.
27
 
W
 
potoku
 
danych
 
(pipeline)
 
Antigravity
 
moduł
 
swe.utc_to_jd()
 
asymiluje
 
wartości
 
wejściowe
 

## Page 10

(year,
 
month,
 
day,
 
hour,
 
minute,
 
second)
 
i
 
generuje
 
dokładną
 
liczbę
 
zmiennoprzecinkową
 
Daty
 
Juliańskiej
 
(JD)
 
w
 
dwóch
 
formatach:
 
czasie
 
uniwersalnym
 
(UT)
 
oraz
 
czasie
 
efemerydalnym
 
(ET),
 
co
 
ma
 
fundamentalne
 
znaczenie
 
dla
 
funkcji
 
swe_calc_ut.
35
 
Dodatkowo,
 
profesjonalny
 
silnik
 
musi
 
integrować
 
zrozumienie
 
konceptu
 
Delta
 
T
 
(
)
.
 
Parametr
 
ten
 
kompensuje
 
rosnącą
 
rozbieżność
 
pomiędzy
 
równomiernym
 
czasem
 
atomowym
 
wyliczanym
 
teoretycznie
 
przez
 
fizyków,
 
a
 
nieuchronnie
 
zwalniającym
 
ruchem
 
obrotowym
 
Ziemi.
19
 
Choć
 
współcześnie
 
wynosi
 
to
 
kilkadziesiąt
 
sekund,
 
dla
 
algorytmów
 
historycznych
 
(np.
 
powrotów
 
do
 
minionych
 
wieków)
 
różnica
 
zniekształciłaby
 
układ
 
rzutowania
 
na
 
siatkę
 
sferyczną
 
Placidusa,
 
przesuwając
 
momenty
 
wznoszenia
 
wierzchołków.
34
 
Moduł
 
Swiss
 
Ephemeris
 
radzi
 
sobie
 
z
 
tym
 
dynamicznie,
 
jeśli
 
zostanie
 
odpowiednio
 
zainicjowany
 
poprawnie
 
skonstruowanym
 
wywołaniem
 
jdUT.
 
Inżynieria
 
Przestrzeni
 
Roboczej
 
w
 
Google
 
Antigravity:
 
Reguły
 
i
 
Umiejętności
 
Wyposażeni
 
w
 
wiedzę
 
teoretyczną
 
o
 
mechanice
 
nieba
 
i
 
optymalnych
 
rozwiązaniach
 
infrastrukturalnych,
 
możemy
 
przejść
 
do
 
wdrożenia
 
ich
 
za
 
pomocą
 
Google
 
Antigravity.
 
Platforma
 
ta
 
odróżnia
 
się
 
od
 
tradycyjnych,
 
asystujących
 
AI
 
tym,
 
że
 
nie
 
polega
 
na
 
jednostkowym
 
wklejaniu
 
kodów
 
do
 
głównego
 
okna,
 
lecz
 
na
 
narzucaniu
 
kontekstu
 
za
 
pomocą
 
ukrytej
 
struktury
 
zarządzającej
 
w
 
obrębie
 
folderu
 
projektu.
2
 
Opublikowana
 
w
 
listopadzie
 
2025
 
architektura
 
zdefiniowała
 
system
 
kaskadowych
 
poleceń
 
dla
 
sztucznej
 
inteligencji,
 
pozwalając
 
na
 
orkiestrację
 
skomplikowanego
 
projektu
 
w
 
kontrolowanych
 
fazach.
1
 
Ekosystem
 
Antigravity
 
wymaga
 
precyzyjnej
 
struktury
 
katalogów.
 
Historycznie,
 
ustawienia
 
zachowywane
 
były
 
w
 
systemowym
 
folderze
 
.agent,
 
co
 
wciąż
 
jest
 
utrzymywane
 
jako
 
kompatybilność
 
wsteczna,
 
ale
 
zgodnie
 
z
 
obowiązującym
 
standardem
 
nowej
 
wersji
 
1.19.5,
 
cała
 
hierarchia
 
inteligencji
 
powinna
 
znajdować
 
się
 
w
 
klastrze
 
liczby
 
mnogiej
 
.agents/.
8
 
Znajdują
 
się
 
w
 
nim
 
trzy
 
fundamentalne
 
podkatalogi:
 
1.
 
.agents/rules/
 
(Reguły
 
Obszaru
 
Roboczego):
 
Foldery
 
zawierające
 
luźne,
 
pisane
 
w
 
języku
 
naturalnym
 
dokumenty
 
Markdown
 
określające
 
sztywne
 
ograniczenia
 
technologiczne
 
i
 
reguły
 
zachowania
 
modelu
 
dla
 
danego
 
ujęcia
 
środowiskowego
 
(Global
 
Rules
 
lub
 
Workspace
 
Rules).
6
 
Możemy
 
narzucić
 
agentowi
 
użycie
 
konkretnej
 
architektury
 
frontendowej.
 
Opierając
 
się
 
na
 
najwydajniejszych,
 
współczesnych
 
standardach
 
deweloperskich
 
oznaczających
 
minimalizację
 
JavaScriptu,
 
nakazujemy
 
AI
 
stosować
 
framework
 
Astro
 
(niezwiązany
 
z
 
domeną
 
astrologiczną,
 
a
 
jedynie
 
noszący
 
podobną
 
nazwę).
 
Astro
 
faworyzuje
 
model
 
"Architektury
 
Wysp"
 
(Islands
 
Architecture),
 
gdzie
 
obciążająca
 
grafika
 
oparta
 
o
 
biblioteki
 
React/Vue
 
renderuje
 
się
 
z
 
pominięciem
 
blokady
 
wątku,
 
przy
 
wykorzystaniu
 
dyrektyw
 
takich
 
jak
 
client:only="react"
 
dla
 
eliminacji
 
problemów
 
z
 
dostępem
 
interfejsów
 
do
 
zmiennej
 
globalnej
 
self
 
(krytyczne
 
podczas
 
ładowania
 
modułów
 
WebAssembly
 
szwajcarskich
 
efemeryd
 
i
 
rendererów
 
SVG).
43
 
2.
 
.agents/skills/
 
(Umiejętności
 
Rozszerzające):
 
Jest
 
to
 
struktura
 
dodająca
 
do
 
instancji
 


## Page 11

modelu
 
bazę
 
dedykowanej,
 
specjalistycznej
 
wiedzy
 
dziedzinowej,
 
której
 
sam
 
model
 
LLM
 
może
 
poprawnie
 
nie
 
znać.
9
 
Umiejętność
 
to
 
folder
 
np.
 
.agents/skills/astronomy/
 
zawierający
 
wymagany
 
techniczny
 
plik
 
SKILL.md.
 
Plik
 
ten
 
posiada
 
specjalny
 
wstęp
 
w
 
formacie
 
YAML
 
(frontmatter)
 
określający
 
opis
 
i
 
nazwę
 
umiejętności,
 
po
 
którym
 
następuje
 
lista
 
dobrych
 
praktyk
 
instruktażowych
 
(np.
 
nakaz
 
zignorowania
 
indeksu
 
zerowego
 
w
 
tablicy
 
wyników
 
domów
 
Placidusa
 
czy
 
poprawnego
 
konwertowania
 
radianów
 
za
 
pomocą
 
wbudowanych
 
klas
 
matematycznych
 
pythona/javascriptu).
9
 
Agent
 
po
 
uruchomieniu
 
rozpoznaje
 
odpowiedni
 
kontekst
 
z
 
pliku
 
YAML
 
i,
 
jeśli
 
zadanie
 
dotyczy
 
trygonometrii
 
horoskopu,
 
ładuje
 
zawartość
 
tego
 
dokumentu
 
do
 
swojego
 
rozumowania
 
(context
 
window).
9
 
3.
 
.agents/workflows/
 
(Przepływy
 
Pracy):
 
Są
 
to
 
potężne,
 
sekwencyjne
 
plany
 
działania,
 
skodyfikowane
 
w
 
plikach
 
markdown
 
o
 
maksymalnej
 
wielkości
 
do
 
12
 
000
 
znaków.
6
 
Pozwalają
 
użytkownikowi
 
na
 
wciśnięcie
 
pojedynczego
 
polecenia,
 
na
 
przykład
 
/workflow-build-astrology-engine,
 
który
 
w
 
łańcuchu
 
kroków
 
wymusza
 
wywołanie
 
innych
 
zdefiniowanych
 
sub-workflow,
 
zmuszając
 
wirtualny
 
mózg
 
narzędzia
 
do
 
metodycznej
 
analizy
 
architektury,
 
planowania
 
interfejsów,
 
renderowania
 
obiektów
 
w
 
trybie
 
"Planning
 
Mode"
 
(gdzie
 
analizuje
 
cały
 
rzut
 
kodu),
 
a
 
następnie
 
wchodzenia
 
w
 
"Fast
 
Mode",
 
gdzie
 
nanosi
 
optymalne
 
mikropoprawki
 
bezpośrednio
 
w
 
pliku.
3
 
Weryfikacja
 
tak
 
generowanego
 
rozwiązania
 
opiera
 
się
 
o
 
panel
 
Artefaktów
 
(Artifacts)
 
w
 
interfejsie
 
Mission
 
Control,
 
gdzie
 
Antigravity
 
na
 
bieżąco
 
zwraca
 
odizolowane
 
komponenty
 
ustrukturyzowane
 
(np.
 
dokumentację
 
JSON
 
wykreowanego
 
horoskopu)
 
zamiast
 
wymuszać
 
na
 
inżynierze
 
przetrząsanie
 
terminalowych
 
strumieni
 
logów.
2
 
Zestaw
 
Zaawansowanych
 
Promptów
 
Implementacyjnych
 
dla
 
Antigravity
 
Mając
 
świadomość
 
wielowymiarowości
 
mechaniki
 
Placidusa,
 
potęgi
 
frameworku
 
Astro
 
na
 
frontendzie
 
oraz
 
modułowej,
 
agentowej
 
logiki
 
środowiska
 
Antigravity,
 
inżynier
 
może
 
stworzyć
 
bezbłędny
 
potok
 
generacyjny.
 
Sukces
 
całego
 
procesu
 
programowania
 
leży
 
w
 
rygorystycznym
 
przygotowaniu
 
inżynierii
 
wejścia
 
(Prompt
 
Engineering),
 
nakazującej
 
modelom
 
(Gemini
 
3.1
 
Pro
 
/
 
Claude
 
3.5
 
Sonnet)
 
precyzyjne
 
odtwarzanie
 
wymogów
 
dziedzinowych.
 
Poniżej
 
przedstawiono
 
zbiór
 
niezwykle
 
szczegółowych
 
i
 
uporządkowanych
 
logicznie
 
instrukcji.
 
Należy
 
je
 
wprowadzać
 
sekwencyjnie
 
w
 
formie
 
dedykowanych
 
zadań
 
w
 
panelu
 
rozmowy
 
agenta
 
lub
 
zapisać
 
w
 
repozytorium
 
jako
 
kolejne
 
kroki
 
w
 
plikach
 
katalogu
 
.agents/workflows/.
 
Krok
 
1:
 
Architektura
 
Fundamentu
 
i
 
Definicje
 
Reguł
 
Środowiska
 
(Workspace
 
Rules)
 
Treść
 
Promptu
 
do
 
Antigravity:
 
"Zainicjuj
 
tryb
 
asynchronicznego
 
planowania
 
'Planning
 
Mode'.
 
Twoim
 
głównym
 
wektorem
 
działania
 
jest
 
zbudowanie
 
wysoce
 
profesjonalnej,
 
zamkniętej
 
aplikacji
 
z
 

## Page 12

obszaru
 
astrologii,
 
której
 
zadaniem
 
analitycznym
 
jest
 
generowanie
 
precyzyjnych
 
układów
 
ciał
 
niebieskich
 
z
 
rygorystycznym
 
naciskiem
 
na
 
zamknięcie
 
całości
 
architektury
 
wokół
 
podziału
 
zodiaku
 
w
 
systemie
 
domów
 
Placidusa.
 
Twoim
 
pierwszym
 
zadaniem
 
architektonicznym
 
jest
 
wygenerowanie
 
i
 
ustabilizowanie
 
struktury
 
środowiska
 
katalogowego:
 
1.
 
Zainicjuj
 
nowy
 
projekt
 
webowy
 
wykorzystując
 
najnowszy
 
framework
 
Astro
 
(npm
 
create
 
astro@latest),
 
upewniając
 
się,
 
że
 
ustawiony
 
jest
 
w
 
trybie
 
rygorystycznego
 
kompilowania
 
TypeScriptu
 
(Strict
 
Mode).
 
2.
 
Dodaj
 
integrację
 
biblioteki
 
klienckiej
 
React,
 
by
 
umożliwić
 
renderowanie
 
interaktywnych
 
komponentów
 
wykresu.
 
3.
 
Wykreuj
 
ścieżkę
 
konfiguracyjną
 
systemu
 
upewniając
 
się,
 
że
 
pracujemy
 
w
 
domyślnym
 
standardzie
 
pluralnym:
 
Utwórz
 
katalog
 
.agents/rules/
 
i
 
wygeneruj
 
plik
 
frontend-astro.md.
 
W
 
dokumencie
 
tym
 
sformułuj
 
rygorystyczną
 
dyrektywę
 
dla
 
samego
 
siebie:
 
'Bezwzględnie
 
respektuj
 
architekturę
 
wysp
 
Astro
 
(Islands
 
Architecture).
 
Ponieważ
 
planowane
 
są
 
pakiety
 
W ebAssembly
 
i
 
renderery
 
grafiki,
 
wszelkie
 
komponenty
 
korzystające
 
z
 
drzewa
 
DOM
 
lub
 
obiektu
 
globalnego
 
okna
 
(self/window)
 
muszą
 
używać
 
dyrektywy
 
hydracyjnej
 
client:only=\"react\",
 
co
 
w
 
pełni
 
odizoluje
 
je
 
od
 
błędów
 
SSR
 
(Server-Side
 
Rendering).'
.
 
Zbuduj
 
podstawową
 
strukturę,
 
w
 
tym
 
foldery
 
src/services,
 
src/lib,
 
i
 
src/components,
 
a
 
wyniki
 
swojej
 
operacji
 
potwierdź
 
w
 
postaci
 
raportu
 
wygenerowanego
 
do
 
modułu
 
Artifacts."
 
Krok
 
2:
 
Kodowanie
 
Bazy
 
W iedzy
 
dla
 
Modułu
 
Efemerydalnego
 
(Agent
 
Skills)
 
Treść
 
Promptu
 
do
 
Antigravity:
 
"Skup
 
się
 
na
 
silniku
 
matematycznym
 
narzędzia.
 
Zbudujemy
 
wiedzę
 
dla
 
sztucznej
 
inteligencji,
 
którą
 
przechowasz
 
w
 
postaci
 
konkretnej
 
Umiejętności.
 
1.
 
Skonfiguruj
 
folder
 
rozszerzający
 
na
 
ścieżce
 
.agents/skills/swiss-ephemeris-master/
 
i
 
powołaj
 
do
 
życia
 
plik
 
SKILL.md
 
wraz
 
z
 
wymaganym
 
nagłówkiem
 
frontmatter
 
YAML,
 
definiując
 
pole
 
name:
 
swiss-ephemeris-master.
 
2.
 
W
 
treści
 
umiejętności
 
opisz,
 
że
 
głównym
 
wektorem
 
analizy
 
grawitacyjnej
 
ciał
 
jest
 
pakiet
 
obsługujący
 
model
 
WebAssembly
 
(zainstaluj
 
do
 
projektu
 
swisseph-wasm
 
lub
 
@swisseph/browser).
 
Zapisz
 
wyraźnie
 
dyrektywę
 
architektoniczną
 
mówiącą,
 
że
 
w
 
celu
 
zachowania
 
maksymalnej
 
profesjonalnej
 
dokładności
 
klasy
 
JPL,
 
nie
 
wolno
 
ci
 
opierać
 
się
 
wyłącznie
 
na
 
wbudowanym
 
kompresorze
 
Moshier.
 
Agent
 
ma
 
napisać
 
potok
 
wczytywania
 
(fetchowanie
 
z
 
lokalnego
 
środowiska
 
lub
 
CDN)
 
plików
 
w
 
formacie
 
.se1
 
na
 
podstawie
 
czasu
 
–
 
niezbędne
 
będą
 
zasoby
 
typu
 
sepl_18.se1
 
(planety
 
główne)
 
i
 
semo_18.se1
 

## Page 13

(pozycje
 
Księżyca).
 
3.
 
W
 
oparciu
 
o
 
tak
 
zainstalowaną
 
wiedzę,
 
napisz
 
singleton
 
matematyczny
 
w
 
pliku
 
src/lib/AstrologyEngine.ts.
 
Moduł
 
ten
 
ma
 
asynchronicznie
 
inicjować
 
pakiet
 
WASM,
 
podpinać
 
poprawne
 
ścieżki
 
zasobów
 
.se1
 
pod
 
zmienne
 
referencyjne
 
oraz
 
udostępniać
 
eksportowaną
 
funkcję
 
przyjmującą
 
Datę
 
Juliańską
 
(Julian
 
Day
 
-
 
JD)
 
na
 
wejściu.
 
Po
 
wdrożeniu
 
poprawnie
 
zainicjowanej
 
biblioteki
 
WASM,
 
wypuść
 
krótkie
 
potwierdzenie
 
gotowości
 
logiki."
 
Krok
 
3:
 
Geolokalizacja
 
i
 
Chronologia
 
–
 
Moduł
 
Zależności
 
Czasowych
 
Treść
 
Promptu
 
do
 
Antigravity:
 
"Kolejny
 
wymóg
 
implementacyjny
 
obejmuje
 
przetwarzanie
 
lokalizacji
 
na
 
wektory
 
układów
 
współrzędnych
 
i
 
absolutnego
 
czasu.
 
Przejdź
 
do
 
folderu
 
src/services/
 
i
 
utwórz
 
moduł
 
zorientowany
 
obiektowo
 
GeoTimeService.ts.
 
Usługa
 
ta
 
ma
 
pobierać
 
na
 
wejściu
 
format
 
ludzki
 
–
 
nazwę
 
miejscowości
 
oraz
 
datę
 
i
 
czas
 
podaną
 
przez
 
klienta.
 
●
 
Przeprowadź
 
logiczną
 
integrację
 
publicznego
 
interfejsu
 
Geoapify
 
lub
 
LocationIQ
 
(pozostaw
 
klucze
 
uwierzytelniające
 
w
 
bezpiecznym
 
pliku
 
.env)
 
do
 
wykonania
 
forward
 
geocodingu,
 
pozyskując
 
współrzędne
 
lat
 
oraz
 
lon.
 
Pamiętaj,
 
aby
 
skonwertować
 
je
 
do
 
radianów
 
dla
 
modułów
 
wewnętrznych,
 
zachowując
 
zrzuty
 
oryginalnych
 
stopni.
 
●
 
Wdroż
 
obsługę
 
serwisu
 
GeoNames
 
API,
 
by
 
dla
 
wylosowanych
 
współrzędnych
 
geograficznych
 
i
 
podanej
 
daty
 
wyciągnąć
 
historyczny
 
strefowy
 
ofset
 
czasowy
 
(timezone
 
ID)
 
z
 
wliczeniem
 
okresu
 
korekcyjnego
 
Daylight
 
Saving
 
Time
 
(DST).
 
●
 
Skonstruuj
 
przejrzystą
 
warstwę
 
adaptera,
 
która
 
mapuje
 
obliczony
 
czas
 
na
 
UTC,
 
a
 
następnie
 
odwołuje
 
się
 
do
 
modułu
 
Swiss
 
Ephemeris
 
(AstrologyEngine),
 
wykorzystując
 
wbudowaną
 
funkcję
 
biblioteki
 
z
 
grupy
 
swe_utc_to_jd,
 
by
 
precyzyjnie
 
przeliczyć
 
wszystkie
 
parametry
 
daty
 
na
 
sformatowany,
 
wysokiej
 
dokładności
 
float
 
Daty
 
Juliańskiej
 
(uwzględniając
 
różnice
 
czasu
 
uniwersalnego
 
a
 
efemerydalnego
 
bazujące
 
na
 
wyliczonym
 
parametrze
 
Delta
 
T).
 
Wynik
 
wyprowadź
 
jako
 
walidator
 
testów
 
w
 
nowym
 
panelu
 
Artifacts,
 
symulując
 
np.
 
czas
 
letni
 
na
 
terytorium
 
Warszawy."
 
Krok
 
4:
 
Wdrożenie
 
Matematyki
 
Systemu
 
Domów
 
Placidusa
 
z
 
Obsługą
 
Błędów
 
To
 
najostrzejszy
 
punkt
 
inżynieryjny,
 
wymagający
 
ominięcia
 
krytycznego,
 
historycznego
 
problemu
 
tablicy
 
C
 
w
 
nowym
 
kodzie.
 
Treść
 
Promptu
 
do
 
Antigravity:
 
"W
 
pliku
 
systemowym
 
AstrologyEngine.ts
 
stwórz
 
krytyczną
 
funkcję
 
logiki
 

## Page 14

domenowej:
 
calculatePlacidusHouses(jdUT:
 
number,
 
lat:
 
number,
 
lon:
 
number).
 
Funkcja
 
wyznacza
 
kąty
 
w
 
systemie
 
Placidusa.
 
Aby
 
odnieść
 
inżynieryjny
 
sukces,
 
zachowaj
 
nad
 
wyraz
 
rygorystyczne
 
wytyczne:
 
1.
 
Wywołaj
 
właściwą
 
metodę
 
biblioteki
 
WASM
 
do
 
generowania
 
domów
 
(najczęściej
 
przypisaną
 
pod
 
interfejs
 
typu
 
swe_houses)
 
i
 
wstrzyknij
 
argument
 
trybu
 
działania
 
systemu,
 
ustawiając
 
flagę
 
równą
 
wartości
 
znakowej
 
'p',
 
jednoznacznie
 
definiując
 
architekturę
 
Placidusa.
 
2.
 
Krytyczna
 
pułapka
 
projektowa:
 
Interfejs
 
API,
 
wynikający
 
z
 
natury
 
kodu
 
C,
 
oddaje
 
13-elementową
 
tablicę
 
danych
 
ułamkowych
 
dla
 
12
 
domów.
 
Oczekuję,
 
że
 
twój
 
kod
 
świadomie
 
zignoruje
 
wartość
 
zawartą
 
pod
 
pierwszym
 
wskaźnikiem
 
referencyjnym
 
(tj.
 
indeks
 
``).
 
Musisz
 
zmapować
 
obiekty
 
z
 
wynikowej
 
dziedziny
 
tak,
 
by
 
domy
 
1-12
 
idealnie
 
przyporządkowały
 
się
 
wartościom
 
z
 
indeksów
 
tablicy
 
1-12,
 
jawnie
 
deklarując
 
zmienną
 
pierwszego
 
domu
 
jako
 
definicję
 
Ascendentu,
 
a
 
dziesiątego
 
jako
 
obiektywne
 
Medium
 
Coeli.
 
3.
 
Kod
 
ułamkowy
 
zwracany
 
przez
 
środowisko,
 
np.
 
,
 
reprezentuje
 
absolutny
 
stopień
 
w
 
zodiaku
 
trzystusześćdziesięciostopniowym.
 
Oprogramuj
 
funkcję
 
uogólniającą
 
(parser),
 
która
 
zmieni
 
format
 
absolutny
 
na
 
czytelną
 
dla
 
człowieka
 
reprezentację
 
struktury
 
znak/stopień/minuta
 
(np.
 
 
stopnia
 
Strzelca).
 
4.
 
Ponieważ
 
silnik
 
Placidusa
 
z
 
racji
 
matematyki
 
łuków
 
dziennych
 
zapada
 
się
 
(generuje
 
wartości
 
nieoznaczone)
 
na
 
strefach
 
dalekiej
 
Północy
 
i
 
Południa,
 
wybuduj
 
rygorystyczny
 
fallback
 
handling
 
i
 
procedurę
 
Error-Catch.
 
Funkcja
 
ma
 
dokonywać
 
wczesnego
 
wyjścia
 
(early
 
return)
 
lub
 
blokować
 
żądanie,
 
gdy
 
pożądana
 
szerokość
 
geograficzna
 
przekroczy
 
margines
 
bezpiecznego
 
podziału
 
nieba
 
powyżej
 
kół
 
podbiegunowych
 
(około
 
 
stopni).
 
Wygeneruj
 
poprawnie
 
sformatowany
 
log
 
JSON
 
wyników
 
do
 
bocznego
 
okna
 
interfejsu
 
powiadamiając
 
mnie
 
o
 
gotowości."
 
Krok
 
5:
 
Kalkulacja
 
Ciał
 
Niebieskich
 
i
 
Konstrukcja
 
Aspektarium
 
Treść
 
Promptu
 
do
 
Antigravity:
 
"Pozostań
 
w
 
sercu
 
logiki
 
domenowej
 
w
 
klasie
 
AstrologyEngine.ts.
 
Rozszerz
 
model
 
o
 
funkcję
 
kompozytową
 
calculatePlanetsAndAspects(jdUT:
 
number,
 
placidusHousesArray:
 
any).
 
Twoje
 
środowisko
 
z
 
wykorzystaniem
 
wbudowanej
 
metody
 
klasy
 
swe_calc_ut()
 
podda
 
pętli
 
poszukiwań
 
najważniejsze
 
ciała
 
sfery:
 
Słońce,
 
Księżyc,
 
Merkurego,
 
Wenus,
 
Marsa,
 
Jowisza,
 
Saturna,
 
Urana,
 
Neptuna
 
i
 
Plutona.
 
Wyciągaj
 
stałe
 
biblioteki
 
dla
 
identyfikatorów
 
astronomicznych.
 


## Page 15

W
 
obiekcie
 
wyjściowym
 
(Response
 
Model)
 
dla
 
każdej
 
wylosowanej
 
planety
 
zawrzyj:
 
●
 
Bezwzględną
 
pozycję
 
od
 
zera
 
w
 
stopniu
 
ułamkowym.
 
●
 
Przyporządkowany
 
jej
 
naturalny
 
sektor
 
domu
 
(dokonując
 
binarnego
 
przeszukania
 
wcześniej
 
wyliczonej
 
siatki
 
Placidusa,
 
by
 
przypisać
 
jej
 
konkretne
 
środowisko,
 
od
 
1
 
do
 
12).
 
●
 
Prędkość
 
radialną
 
przemieszczania,
 
tak
 
byś
 
jawnie
 
oznaczył
 
status
 
'Retrograde',
 
jeśli
 
prędkość
 
będzie
 
mniejsza
 
niż
 
 
stopni
 
na
 
dobę.
 
Na
 
zakończenie
 
napisz
 
lekką
 
procedurę
 
detekcyjną
 
Aspektów
 
–
 
matematycznych
 
relacji
 
kątowych.
 
Jeśli
 
delty
 
odległości
 
między
 
dowolnymi
 
dwiema
 
planetami
 
oscylują
 
wokół
 
klasycznych
 
figur
 
Ptolemejskich
 
(koniunkcja,
 
opozycja,
 
trygon,
 
sekstyl,
 
kwadratura)
 
przy
 
zachowaniu
 
rozsądnego
 
orba
 
błędu,
 
zachowaj
 
je
 
w
 
połączonej
 
bazie
 
par."
 
Krok
 
6:
 
Generacja
 
Grafiki
 
Wektorowej
 
we
 
Frameworku
 
Astro
 
(UI)
 
Ostatni
 
krok
 
przenosi
 
nas
 
do
 
potęgi
 
wygenerowania
 
płaskiego,
 
estetycznego
 
koła
 
astronomicznego
 
wzorowanego
 
na
 
platformach
 
klasy
 
premium
 
(jak
 
komponenty
 
wykresów
 
Uranii
 
czy
 
wizualne
 
rendery
 
biblioteki
 
Kerykeion).
 
Treść
 
Promptu
 
do
 
Antigravity:
 
"Wychodzimy
 
z
 
backendu
 
do
 
frontendu.
 
Utwórz
 
plik
 
src/components/ChartWheel.tsx
 
i
 
wskaż
 
agentowi
 
tryb
 
tworzenia
 
interfejsów
 
klienckich
 
React.
 
Nasz
 
potok
 
nie
 
wykorzystuje
 
powolnych
 
bibliotek
 
jak
 
Chart.js,
 
ponieważ
 
w
 
środowisku
 
domów
 
nierównych
 
wprowadzają
 
one
 
niepotrzebną
 
ułomność
 
strukturalną.
 
Twój
 
moduł
 
ma
 
polegać
 
całkowicie
 
na
 
natywnym
 
renderowaniu
 
bezstratnej
 
mapy
 
graficznej
 
za
 
pomocą
 
rygorystycznie
 
skonstruowanych
 
znaczników
 
i
 
ścieżek
 
matematycznych
 
SVG.
 
Oczekiwany
 
przepływ
 
projektowy
 
na
 
obiekcie
 
płóciennym
 
(Canvas/SVG):
 
1.
 
Wygeneruj
 
siatkę
 
koncentrycznych
 
kół
 
oddzielających
 
przestrzeń
 
kosmogramu.
 
2.
 
Rozrysuj
 
asymetryczne
 
granice
 
dwunastu
 
domów
 
jako
 
wektory
 
ze
 
środka
 
płótna
 
na
 
zewnątrz,
 
polegając
 
w
 
pełni
 
na
 
dokładnych
 
liczbach
 
stopni
 
wyciągniętych
 
ze
 
struktury
 
danych
 
modułu
 
Placidusa
 
z
 
poprzednich
 
implementacji.
 
3.
 
Bez
 
wyjątków
 
przypnij
 
wierzchołek
 
pierwszego
 
domu
 
(Ascendent)
 
matematycznie
 
sztywno
 
na
 
dziewiątej
 
godzinie
 
geometrycznego
 
płótna
 
roboczego
 
(położenie
 
z
 
lewej
 
strony,
 
oś
 
horyzontalna
 
symulująca
 
wschodni
 
pas
 
podłoża),
 
obracając
 
następnie
 
rotację
 
całego
 
wygenerowanego
 
pierścienia
 
domów
 
stosownie
 
do
 
obróconej
 
osi
 
świata.
 


## Page 16

4.
 
Narzuć
 
i
 
wydrukuj
 
pozycje
 
naniesionych
 
znaków
 
tekstowych
 
(glifów/symboli
 
ustandaryzowanych
 
unicodów)
 
dla
 
wszystkich
 
obliczonych
 
wewnątrz
 
zodiaku
 
głównych
 
ciał
 
w
 
odpowiednich
 
polach
 
obszarowych
 
z
 
uwzględnieniem
 
warstwy
 
detekcji
 
kolizji
 
(anti-overlapping),
 
co
 
odróżnia
 
profesjonalistów
 
od
 
prostych,
 
stłoczonych
 
programów.
 
Opublikuj
 
rezultat
 
osadzając
 
znacznik
 
renderera
 
na
 
stronie
 
głównej
 
Astro,
 
nakazując
 
odłączenie
 
SSR
 
by
 
uchronić
 
silnik
 
rysujący
 
SVG
 
klienta."
 
Wnioski
 
i
 
Architektura
 
Przyszłościowa
 
Zrealizowanie
 
tak
 
kompleksowego
 
systemu,
 
zaledwie
 
w
 
oparciu
 
o
 
zestawienie
 
autonomicznego
 
inżyniera
 
AI
 
pod
 
postacią
 
platformy
 
Google
 
Antigravity,
 
dowodzi
 
gigantycznego
 
przełomu
 
operacyjnego.
 
Narzędzia
 
z
 
generacji
 
Gemini
 
3
 
i
 
modele
 
Claude
 
pozycjonują
 
środowisko
 
IDE
 
z
 
roli
 
asystenta
 
do
 
roli
 
w
 
pełni
 
funkcyjnego
 
głównego
 
architekta
 
przestrzeni
 
cyfrowej.
1
 
Gwarantem
 
komercyjnego
 
sukcesu
 
jest
 
poprawne,
 
drobiazgowe
 
dostarczenie
 
reguł
 
i
 
ukierunkowanych
 
instrukcji
 
w
 
folderach
 
zarządzających
 
.agents.
8
 
Agent
 
AI
 
wyposażony
 
w
 
pełny
 
dostęp
 
do
 
wyśrubowanej
 
w
 
milisekundach
 
precyzji
 
obliczeń
 
NASA/JPL
 
zaopatrzonych
 
dzięki
 
nakładkom
 
bibliotek
 
Swiss
 
Ephemeris
 
(swisseph-wasm)
 
eliminuje
 
największą
 
historyczną
 
bolączkę
 
oprogramowania
 
dziedzinowego.
11
 
Świadomość
 
istnienia
 
takich
 
barier
 
jak
 
puste
 
pozycje
 
indeksów
 
matematycznych
 
przy
 
wywoływaniu
 
złożonej
 
tablicy
 
wierzchołków
 
(swe_houses)
 
oraz
 
blokady
 
algorytmu
 
Placidusa
 
wokół
 
biegunów
 
(rozwiązywane
 
bezpiecznym
 
early-return)
 
pozwala
 
zrealizować
 
platformę
 
niewrażliwą
 
na
 
powtarzalne
 
awarie
 
serwerów.
19
 
Przedstawiony,
 
skrupulatnie
 
skonstruowany
 
szlak
 
inżynieryjny
 
zamyka
 
proces
 
geokodowania
 
czasoprzestrzeni
 
bez
 
wymogów
 
inwestowania
 
w
 
drogie,
 
scentralizowane
 
API
 
gigantów,
 
gwarantując
 
otwartość
 
i
 
odporność
 
w
 
pełni
 
darmowych
 
licencji.
38
 
Tak
 
zaprojektowana
 
fundacja
 
stanowi
 
stabilny
 
trzon,
 
do
 
którego
 
w
 
kolejnych
 
zwinnych
 
iteracjach
 
łatwo
 
można
 
dobudować
 
logikę
 
powrotów
 
solarnych,
 
tabel
 
sygnifikatorów
 
ptolemejskich,
 
a
 
ostatecznie
 
całe
 
pakiety
 
zaawansowanych
 
porównań
 
kompatybilności.
 
Cytowane
 
prace
 
1.
 
Google
 
Antigravity
 
-
 
Wikipedia,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://en.wikipedia.org/wiki/Google_Antigravity
 
2.
 
Getting
 
Started
 
with
 
Google
 
Antigravity
 
-
 
Codelabs,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://codelabs.developers.google.com/getting-started-google-antigravity
 
3.
 
Build
 
with
 
Google
 
Antigravity,
 
our
 
new
 
agentic
 
development
 
platform,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://developers.googleblog.com/build-with-google-antigravity-our-new-agen 
tic-development-platform/
 
4.
 
AI
 
SaaS
 
App
 
Builder
 
Workflow
 
Using
 
Antigravity
 
and
 
Gemini
 
3.1
 
Pro
 
-
 
Reddit,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.reddit.com/r/AISEOInsider/comments/1rkss94/ai_saas_app_builder_w 
orkflow_using_antigravity/
 

## Page 17

5.
 
How
 
I
 
built
 
a
 
entire
 
Astrology
 
echosystem
 
|
 
by
 
Luis
 
Meazzini
 
-
 
Medium,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://medium.com/swlh/how-i-built-a-entire-astrology-echosystem-50193b93 
0a21
 
6.
 
Google
 
Antigravity
 
Documentation,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity.google/docs/rules-workflows
 
7.
 
Built
 
an
 
entire
 
Astrology
 
app
 
with
 
my
 
AI
 
agent
 
"Antigravity".
 
The
 
vibe
 
was
 
immaculate.
 
:
 
r/vibecoding
 
-
 
Reddit,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.reddit.com/r/vibecoding/comments/1pul12i/built_an_entire_astrology 
_app_with_my_ai_agent/
 
8.
 
New
 
folder
 
for
 
RULES?
 
-
 
Google
 
Antigravity,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://discuss.ai.google.dev/t/new-folder-for-rules/126165
 
9.
 
Agent
 
Skills
 
-
 
Google
 
Antigravity
 
Documentation,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity.google/docs/skills
 
10.
 
Google
 
Antigravity,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity.google/
 
11.
 
Ephemeris
 
Data
 
Files
 
-
 
Saravali,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://saravali.github.io/astrology/calc_ephemfiles.html
 
12.
 
Urania:
 
specyfikacja
 
-
 
Astrologia.pl,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
http://www.astrologia.pl/urania/specyf_grid.htm
 
13.
 
Astrology
 
Software
 
Urania
 
-
 
Astrologia.pl,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
http://www.astrologia.pl/urania-en.html
 
14.
 
Urania:
 
Astrology
 
Chart
 
Samples
 
-
 
Astrologia.pl,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
http://www.astrologia.pl/urania/astrology-charts.html
 
15.
 
Urania
 
Version
 
History
 
-
 
astrology
 
software,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
http://www.astrology.com.pl/urania/version-history.html
 
16.
 
kerykeion
 
-
 
PyPI,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://pypi.org/project/kerykeion/
 
17.
 
GitHub
 
-
 
g-battaglia/Astrologer-API:
 
High-precision
 
Astrology
 
REST
 
API
 
powered
 
by
 
the
 
Kerykeion
 
engine.
 
Delivers
 
professional-grade
 
natal
 
SVG
 
charts,
 
ephemerides,
 
and
 
celestial
 
positions.,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/g-battaglia/Astrologer-API
 
18.
 
swiss
 
ephemeris
 
free
 
download
 
-
 
SourceForge,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://sourceforge.net/directory/?q=swiss%20ephemeris
 
19.
 
Swiss
 
Ephemeris
 
Explained
 
for
 
Developers:
 
The
 
Engine
 
Behind
 
Astrology
 
Software,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://roxyapi.com/blogs/swiss-ephemeris-explained-developers
 
20.
 
@fusionstrings/swisseph-wasi
 
-
 
npm,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.npmjs.com/package/@fusionstrings/swisseph-wasi
 
21.
 
@swisseph/browser
 
-
 
npm,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.npmjs.com/package/@swisseph/browser
 
22.
 
Download
 
Ephemerides
 
-
 
JPL
 
Solar
 
System
 
Dynamics,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://ssd.jpl.nasa.gov/ephem.html
 
23.
 
pyswisseph/docs/ephemerides/planetary_and_lunar/three_ephemerides/swiss_ep
hemeris.rst
 
at
 
master
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/astrorigin/pyswisseph/blob/master/docs/ephemerides/planetar 
y_and_lunar/three_ephemerides/swiss_ephemeris.rst
 

## Page 18

24.
 
How
 
to
 
build
 
and
 
use
 
pyswisseph
 
python
 
package
 
on
 
windows
 
-
 
GitHub
 
Gist,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://gist.github.com/ifmihai/9fae789ef1ed2fcbedc5ace7cb1d3797
 
25.
 
swisseph-wasm
 
-
 
crates.io:
 
Rust
 
Package
 
Registry,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://crates.io/crates/swisseph-wasm
 
26.
 
prolaxu/swisseph-wasm:
 
A
 
high-precision
 
JavaScript
 
wrapper
 
for
 
the
 
Swiss
 
Ephemeris
 
WebAssembly
 
module,
 
providing
 
professional-grade
 
astronomical
 
calculations
 
for
 
astrology,
 
astronomy,
 
and
 
related
 
applications.
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/prolaxu/swiss-wasm
 
27.
 
ephemeris
 
-
 
npm
 
search,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.npmjs.com/search?q=ephemeris
 
28.
 
House
 
Systems:
 
How
 
does
 
astrology
 
work?
 
-
 
Co
 
–
 
Star,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.costarastrology.com/how-does-astrology-work/house-systems
 
29.
 
House
 
Systems
 
-
 
Saravali,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://saravali.github.io/astrology/housesystems.html
 
30.
 
How
 
are
 
new
 
house
 
systems
 
created,
 
mathematically
 
speaking?
 
-
 
Reddit,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.reddit.com/r/Advancedastrology/comments/1r60ybr/how_are_new_h 
ouse_systems_created_mathematically/
 
31.
 
Astrology
 
House
 
Systems:
 
Placidus,
 
Topocentric,
 
Whole
 
Sign,
 
&
 
Equal
 
House
 
Explained,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.mixplaces.com/astrology-house-systems-explained
 
32.
 
Placidus
 
House
 
Cusp
 
Calculation
 
Guide
 
|
 
PDF
 
|
 
Trigonometric
 
Functions
 
|
 
Trigonometry
 
-
 
Scribd,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.scribd.com/document/70479439/The-Placidus-House-Division-Form 
ulas-for-Astrology
 
33.
 
Swiss
 
Ephemeris
 
Placidus
 
Table
 
|
 
PDF
 
-
 
Scribd,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.scribd.com/document/545632622/Placidus-Table-of-Houses-NORTH 
-LATITUDE
 
34.
 
Placidus
 
House
 
Calculation
 
-
 
Swisseph
 
-
 
Groups.io,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://groups.io/g/swisseph/topic/placidus_house_calculation/91265713
 
35.
 
placidus
 
house
 
calculations
 
:
 
r/astrology
 
-
 
Reddit,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.reddit.com/r/astrology/comments/drsb2j/placidus_house_calculation 
s/
 
36.
 
The
 
Ascendant
 
using
 
Python3
 
and
 
PySwissEph
 
-
 
Tech
 
Shinobi,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.techshinobi.com/ascendant-using-python3-and-pyswisseph/
 
37.
 
The
 
best
 
free
 
geocoding
 
APIs
 
available:
 
Ultimate
 
list
 
-
 
Ambee,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.getambee.com/blogs/best-free-geocoding-apis
 
38.
 
Geoapify
 
Location
 
Platform:
 
Maps,
 
Geocoding,
 
Routing,
 
and
 
APIs,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.geoapify.com/
 
39.
 
7
 
Google
 
Maps
 
API
 
Alternatives
 
for
 
2026,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.wpgmaps.com/7-google-maps-api-alternatives-for-2026/
 
40.
 
Free
 
Geocoding
 
API
 
-
 
Geocode
 
Addresses
 
&
 
Coordinates,
 
otwierano:
 
kwietnia
 
22,
 

## Page 19

2026,
 
https://geocode.maps.co/
 
41.
 
Best
 
Batch
 
Geocoding
 
Tools
 
in
 
2026
 
(Free
 
&
 
Paid)
 
-
 
CSV2GEO,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://csv2geo.com/blog/best-batch-geocoding-tools
 
42.
 
Why
 
is
 
there
 
an
 
inconsistency
 
between
 
the
 
.agent
 
and
 
.agents
 
folders?
 
:
 
r/google_antigravity,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.reddit.com/r/google_antigravity/comments/1rf4599/why_is_there_an_ 
inconsistency_between_the_agent/
 
43.
 
Astro
 
Static
 
Site
 
Generation
 
|
 
Antigravity
 
Rules,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity.codes/rules/frontend-frameworks/astro-static-site-generation
 
44.
 
Astro,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://astro.build/
 
45.
 
Looking
 
for
 
chart
 
library
 
suggestions
 
:
 
r/astrojs
 
-
 
Reddit,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.reddit.com/r/astrojs/comments/1g21hop/looking_for_chart_library_su 
ggestions/
 
46.
 
Ultra-gravity
 
(New
 
Antigravity
 
Setup):
 
THIS
 
IS
 
FREAKING
 
CRAZY
 
FREE
 
AI
 
CODER!,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www.youtube.com/watch?v=vVTB3SbvEvM
 