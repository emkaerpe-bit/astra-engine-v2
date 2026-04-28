# Knowledge Base: Tworzenie skryptów astrologicznych w Antigravity.pdf

## Page 1

Architektura
 
i
 
implementacja
 
precyzyjnych
 
skryptów
 
astrologicznych
 
w
 
środowisku
 
Google
 
Antigravity:
 
Przewodnik
 
inżynieryjny
 
Wprowadzenie
 
do
 
agentowej
 
inżynierii
 
systemów
 
astronomicznych
 
Krajobraz
 
zintegrowanych
 
środowisk
 
programistycznych
 
(IDE)
 
uległ
 
w
 
ostatnich
 
latach
 
fundamentalnej
 
transformacji,
 
odchodząc
 
od
 
tradycyjnych,
 
pasywnych
 
edytorów
 
tekstu
 
na
 
rzecz
 
proaktywnych
 
platform
 
opartych
 
na
 
sztucznej
 
inteligencji.
 
Przez
 
długi
 
czas
 
rynek
 
ten
 
był
 
zdominowany
 
przez
 
Visual
 
Studio
 
Code,
 
które
 
w
 
swoim
 
szczytowym
 
momencie
 
kontrolowało
 
ponad
 
54,1%
 
udziałów
 
w
 
rynku,
 
stanowiąc
 
domyślne
 
narzędzie
 
dla
 
73,6%
 
deweloperów
 
na
 
całym
 
świecie.
1
 
Sytuacja
 
uległa
 
drastycznej
 
zmianie
 
w
 
listopadzie
 
2025
 
roku,
 
kiedy
 
to
 
zadebiutowała
 
platforma
 
Google
 
Antigravity.
 
Środowisko
 
to
 
nie
 
jest
 
kolejnym
 
edytorem
 
z
 
wbudowanym
 
chatbotem,
 
lecz
 
systemem
 
zbudowanym
 
od
 
podstaw
 
w
 
paradygmacie
 
"agent-first",
 
w
 
którym
 
asystenci
 
AI
 
funkcjonują
 
jako
 
pełnoprawni
 
współpracownicy,
 
planujący,
 
wykonujący
 
i
 
testujący
 
kod
 
w
 
sposób
 
autonomiczny.
1
 
Zasilane
 
przez
 
natywny
 
model
 
Gemini
 
3
 
Pro
 
oraz
 
wspierające
 
alternatywne
 
modele,
 
takie
 
jak
 
Anthropic
 
Claude
 
4.5
 
Sonnet
 
i
 
Opus,
 
Antigravity
 
oferuje
 
możliwość
 
głębokiej
 
orkiestracji
 
procesów
 
wytwórczych
 
na
 
wielu
 
płaszczyznach
 
edytora,
 
terminala
 
i
 
zintegrowanej
 
przeglądarki.
1
 
Budowa
 
profesjonalnego
 
oprogramowania
 
astrologicznego,
 
które
 
zdolne
 
jest
 
do
 
rywalizacji
 
z
 
tak
 
uznanymi
 
platformami
 
jak
 
astro.com,
 
stanowi
 
jedno
 
z
 
najbardziej
 
wymagających
 
wyzwań
 
w
 
inżynierii
 
oprogramowania
 
wspomaganej
 
przez
 
sztuczną
 
inteligencję.
 
W
 
przeciwieństwie
 
do
 
standardowych
 
aplikacji
 
webowych
 
(CRUD),
 
systemy
 
astrologiczne
 
wymagają
 
absolutnej
 
rygorystyczności
 
matematycznej,
 
integracji
 
z
 
zaawansowanymi
 
bibliotekami
 
astronomicznymi
 
(efemerydami)
 
oraz
 
zdolności
 
do
 
bezbłędnej
 
translacji
 
wysoce
 
złożonych
 
zbiorów
 
danych
 
na
 
precyzyjne
 
interfejsy
 
wektorowe,
 
takie
 
jak
 
kosmogramy
 
w
 
formacie
 
SVG
 
(Scalable
 
Vector
 
Graphics).
4
 
Tradycyjne,
 
wielkie
 
modele
 
językowe
 
(LLM),
 
jeśli
 
zostaną
 
pozostawione
 
same
 
sobie,
 
padają
 
ofiarą
 
zjawiska
 
określanego
 
jako
 
"Model
 
Confusion"
 
–
 
tendencji
 
do
 
generowania
 
generycznych
 
horoskopów,
 
halucynowania
 
wzorów
 
astronomicznych
 
lub
 
dostarczania
 
sformatowanych
 
w
 
nieczytelny
 
sposób
 
danych
 
surowych
 
w
 
formacie
 
JSON.
5
 
Aby
 
temu
 
zapobiec,
 
Antigravity
 
dostarcza
 
zestaw
 
narzędzi
 
architektonicznych:
 
metodykę
 
Spec-Driven
 
Development
 
(SDD),
 
pliki
 
konfiguracyjne
 
określające
 
role
 
agentów
 
(AGENTS.md)
 
oraz
 
wysoce
 
wyspecjalizowane
 
pakiety
 
instrukcji
 
zwane
 
umiejętnościami
 
(SKILL.md).
6
 
Całość
 
tych
 
mechanizmów
 
tworzy
 
środowisko,
 
w
 
którym
 
deweloper
 
pełni
 
rolę
 
architekta
 
orkiestrującego
 

## Page 2

zachowania
 
maszyn,
 
a
 
nie
 
kodyfikatora.
 
Niniejszy
 
raport
 
dostarcza
 
wyczerpującej,
 
wielopoziomowej
 
analizy
 
procesu
 
budowy
 
precyzyjnego
 
silnika
 
astrologicznego
 
w
 
Antigravity,
 
począwszy
 
od
 
zarządzania
 
modelami,
 
poprzez
 
obliczenia
 
efemeryczne,
 
aż
 
po
 
dystrybucję
 
oprogramowania.
 
Fundamenty
 
metodologiczne
 
Spec-Driven
 
Development
 
(SDD)
 
dla
 
oprogramowania
 
wysokiej
 
precyzji
 
Początkowe
 
próby
 
tworzenia
 
złożonego
 
oprogramowania
 
przy
 
użyciu
 
sztucznej
 
inteligencji
 
często
 
opierały
 
się
 
na
 
intuicyjnym
 
kodowaniu
 
(tzw.
 
"vibe
 
coding"),
 
w
 
którym
 
deweloper
 
zlecał
 
modelowi
 
napisanie
 
poszczególnych
 
fragmentów
 
kodu
 
od
 
zera.
6
 
Taka
 
metoda,
 
choć
 
efektywna
 
dla
 
prostych
 
skryptów,
 
prowadzi
 
do
 
katastrofalnych
 
błędów
 
regresyjnych
 
w
 
systemach
 
obliczeniowych.
 
Antigravity
 
natywnie
 
wspiera
 
i
 
wymusza
 
stosowanie
 
paradygmatu
 
Spec-Driven
 
Development
 
(Rozwój
 
Oparty
 
na
 
Specyfikacji),
 
w
 
którym
 
kod
 
staje
 
się
 
jedynie
 
wtórnym
 
artefaktem
 
wobec
 
wyczerpującego
 
dokumentu
 
planistycznego.
4
 
W
 
metodyce
 
SDD
 
żadna
 
linijka
 
kodu
 
nie
 
zostaje
 
wygenerowana
 
bez
 
uprzedniego
 
utworzenia
 
i
 
zatwierdzenia
 
specyfikacji.
10
 
Dla
 
zaawansowanego
 
systemu
 
astrologicznego,
 
dokument
 
taki
 
jak
 
PROJECT_SPEC.md
 
potrafi
 
liczyć
 
ponad
 
2000
 
linii
 
i
 
zawierać
 
absolutnie
 
jednoznaczne
 
reguły.
4
 
Specyfikacja
 
ta
 
definiuje
 
każdy
 
wymóg
 
za
 
pomocą
 
unikalnych
 
identyfikatorów
 
(np.
 
RF-001,
 
RF-002),
 
określa
 
kontrakty
 
wejścia
 
i
 
wyjścia
 
dla
 
każdego
 
punktu
 
końcowego
 
API
 
(np.
 
payload
 
przyjmujący
 
współrzędne
 
w
 
formacie
 
dziesiętnym
 
i
 
strefę
 
czasową),
 
schematy
 
baz
 
danych
 
wraz
 
z
 
relacjami,
 
a
 
także
 
szczegółowe
 
zasady
 
walidacji
 
z
 
dokładnymi
 
ograniczeniami
 
wartości
 
granicznych.
4
 
Zaletą
 
tak
 
rygorystycznego
 
podejścia
 
jest
 
eliminacja
 
swobody
 
interpretacyjnej
 
modelu.
 
Gdy
 
agent
 
otrzymuje
 
tak
 
ustrukturyzowany
 
dokument,
 
implementuje
 
on
 
dokładnie
 
to,
 
co
 
zostało
 
zapisane,
 
redukując
 
potrzebę
 
poprawek
 
i
 
komunikacji
 
zwrotnej.
4
 
Architektura
 
SDD
 
w
 
Antigravity
 
zorganizowana
 
jest
 
wokół
 
ukrytego
 
katalogu
 
.agent/
 
w
 
głównym
 
katalogu
 
przestrzeni
 
roboczej,
 
który
 
dzieli
 
się
 
na
 
katalogi
 
skills/
 
(inteligencja
 
agenta
 
i
 
procedury),
 
workflows/
 
(orkiestracja
 
logicznych
 
kroków)
 
oraz
 
scripts/
 
(współdzielony
 
rdzeń
 
do
 
operacji
 
na
 
plikach
 
i
 
systemie
 
kontroli
 
wersji).
6
 
Przepływ
 
pracy
 
(Workflow)
 
w
 
Spec-Kit
 
jest
 
uruchamiany
 
za
 
pomocą
 
komend
 
z
 
ukośnikiem
 
(slash
 
commands)
 
z
 
poziomu
 
wbudowanego
 
interfejsu
 
czatu,
 
tworząc
 
rygorystyczny
 
rurociąg
 
dostarczania
 
oprogramowania
 
(SDLC
 
pipeline).
 
Proces
 
ten
 
składa
 
się
 
ze
 
ściśle
 
określonych
 
etapów
 
orkiestracji,
 
które
 
prowadzą
 
agenta
 
od
 
koncepcji
 
po
 
audyt
 
jakości.
 
 
Wywołanie
 
(Workflow)
 
Funkcja
 
i
 
zastosowanie
 
w
 
inżynierii
 
systemu
 
astrologicznego
 

## Page 3

/01-speckit.constitution
 
Definiuje
 
niepodważalne
 
zasady
 
projektu,
 
zapobiegając
 
halucynacjom
 
na
 
temat
 
stosu
 
technologicznego.
 
Wymusza
 
na
 
agencie
 
korzystanie
 
wyłącznie
 
z
 
zatwierdzonych
 
silników
 
efemerycznych
 
(np.
 
Swiss
 
Ephemeris).
6
 
/02-speckit.specify
 
Formułuje
 
dokument
 
spec.md,
 
określający
 
wyłącznie
 
zachowanie
 
produktu
 
(co
 
ma
 
zostać
 
zbudowane
 
i
 
dla
 
kogo),
 
bez
 
wnikania
 
w
 
architekturę
 
techniczną.
6
 
/03-speckit.clarify
 
Faza
 
analizy
 
krytycznej.
 
Redukuje
 
luki
 
logiczne
 
i
 
dwuznaczności
 
w
 
specyfikacji
 
jeszcze
 
przed
 
podjęciem
 
jakichkolwiek
 
decyzji
 
deweloperskich.
6
 
/04-speckit.plan
 
Generuje
 
plan.md.
 
Podejmuje
 
decyzje
 
architektoniczne,
 
np.
 
wybór
 
Pythona
 
3.13,
 
FastAPI,
 
PostgreSQL
 
oraz
 
Kerykeion
 
do
 
renderingu
 
grafiki
 
wektorowej.
6
 
/05-speckit.tasks
 
Rozkłada
 
techniczny
 
plan
 
wdrożenia
 
na
 
atomowe
 
zadania,
 
z
 
których
 
każde
 
musi
 
być
 
wykonalne
 
w
 
czasie
 
mniejszym
 
niż
 
15
 
minut
 
(lub
 
do
 
trzech
 
wywołań
 
narzędziowych
 
agenta).
6
 
/06-speckit.analyze
 
Weryfikuje
 
spójność
 
pomiędzy
 
plikiem
 
wymagań,
 
planem
 
technicznym
 
a
 
utworzoną
 
listą
 
zadań.
6
 
/07-speckit.implement
 
Główne
 
wykonanie
 
zadań
 
programistycznych.
 
Agent
 
przystępuje
 
do
 
budowy
 
skryptów
 
w
 
izolowanym
 
środowisku.
6
 
/08-speckit.checker
 
Odpowiada
 
na
 
pytanie:
 
"Czy
 
kod
 
jest
 
zgodny
 
z
 
konwencjami?".
 
Agreguje
 
statyczną
 
analizę
 
kodu,
 
linting
 
i
 
sprawdzanie
 
podatności
 
bezpieczeństwa.
6
 

## Page 4

/09-speckit.tester
 
Wykonuje
 
zestawy
 
testów
 
jednostkowych
 
i
 
integracyjnych,
 
mierząc
 
stopień
 
pokrycia
 
kodu
 
(test
 
coverage).
6
 
/10-speckit.reviewer
 
Przeprowadza
 
ocenę
 
jakościową
 
kodu,
 
analizując
 
wydajność,
 
logikę
 
biznesową
 
i
 
utrzymywalność.
6
 
/11-speckit.validate
 
Finałowy
 
audyt.
 
Porównuje
 
semantycznie
 
ostateczny
 
kod
 
z
 
oryginalnym
 
plikiem
 
spec.md,
 
potwierdzając,
 
że
 
zrealizowano
 
zamierzone
 
wymagania
 
biznesowe.
6
 
Tak
 
skonstruowany
 
potok,
 
wspierany
 
przez
 
polecenia
 
poboczne
 
jak
 
/util-speckit.diff
 
do
 
zarządzania
 
zmianami
 
w
 
specyfikacji,
 
oddziela
 
logikę
 
biznesową
 
od
 
fizycznej
 
implementacji.
6
 
Posiadanie
 
specyfikacji
 
służy
 
jako
 
swoisty
 
kontrakt
 
między
 
inżynierem
 
a
 
sztuczną
 
inteligencją;
 
w
 
przypadku
 
jakichkolwiek
 
rozbieżności,
 
to
 
dokument
 
jest
 
modyfikowany,
 
a
 
nie
 
sam
 
kod
 
źródłowy
 
skryptu.
4
 
Zarządzanie
 
wieloagentowymi
 
zespołami
 
poprzez
 
protokoły
 
AGENTS.md
 
Budowa
 
pełnego
 
ekosystemu
 
aplikacyjnego
 
klasy
 
astro.com
 
to
 
przedsięwzięcie
 
wymagające
 
pracy
 
interdyscyplinarnej.
 
Google
 
Antigravity
 
radzi
 
sobie
 
z
 
tym
 
poprzez
 
wsparcie
 
dla
 
natywnego
 
standardu
 
AGENTS.md
 
–
 
ustrukturyzowanego
 
dokumentu
 
w
 
głównym
 
katalogu
 
projektu,
 
pełniącego
 
funkcję
 
kierownika
 
zespołu
 
inżynieryjnego
 
i
 
"konstytucji"
 
dla
 
pracujących
 
agentów.
8
 
Plik
 
ten
 
izoluje
 
wiedzę
 
domenową
 
poszczególnych
 
asystentów
 
AI,
 
zapobiegając
 
przepełnieniu
 
okna
 
kontekstowego
 
i
 
krzyżowaniu
 
się
 
konwencji
 
z
 
różnych
 
dziedzin
 
programowania.
 
Podczas
 
gdy
 
plik
 
README.md
 
służy
 
ludzkim
 
programistom,
 
podając
 
instrukcje
 
instalacji
 
i
 
przegląd
 
projektu,
 
AGENTS.md
 
został
 
zaprojektowany
 
z
 
myślą
 
o
 
maszynach.
12
 
Co
 
więcej,
 
najnowsze
 
badania
 
nad
 
empirycznymi
 
odciskami
 
palców
 
zapytań
 
HTTP
 
(HTTP
 
request
 
fingerprints)
 
pokazują,
 
że
 
agenci
 
kodujący,
 
tacy
 
jak
 
Claude
 
Code,
 
Cursor,
 
OpenCode
 
czy
 
właśnie
 
Antigravity,
 
posiadają
 
unikalne
 
sygnatury
 
w
 
zakresie
 
strategii
 
pre-fetchingu
 
czy
 
ciągów
 
User-Agent.
13
 
AGENTS.md
 
służy
 
jako
 
otwarty,
 
wieloplatformowy
 
standard,
 
potrafiący
 
dostosować
 
środowisko
 
wykonawcze
 
dla
 
dowolnego
 
zgodnego
 
agenta,
 
definiując
 
dla
 
niego
 
m.in.
 
dostępy
 
do
 
dokumentacji
 
OpenAPI,
 
środowisk
 
testowych
 
DevNet,
 
czy
 
ścieżek
 
dostępu
 
do
 
baz
 
danych.
8
 
Z
 
punktu
 
widzenia
 
projektowania
 
architektury
 
platformy
 
astrologicznej,
 
plik
 
AGENTS.md
 
musi
 
definiować
 
kilka
 
wysokospecjalizowanych
 
person
 
(Specialized
 
Personas).
 
Zespół
 
ten
 
powinien
 
zostać
 
zorganizowany
 
zgodnie
 
z
 
konwencją
 
ról
 
systemowych,
 
posiadających
 
odrębne
 
kompetencje
 
i
 
jasno
 
zdefiniowane
 
ograniczenia.
 

## Page 5

 
Nazwa
 
Persony
 
(Agent
 
Role)
 
Kontekst
 
domenowy
 
i
 
zakres
 
obowiązków
 
Orchestrator
 
Nadzoruje
 
wieloagentową
 
koordynację,
 
deleguje
 
zadania
 
i
 
weryfikuje
 
spójność
 
architektoniczną
 
projektu
 
(np.
 
zgodność
 
API
 
między
 
poszczególnymi
 
modułami).
8
 
Backend-Specialist
 
Ekspert
 
w
 
dziedzinie
 
projektowania
 
API
 
(np.
 
FastAPI),
 
obsługi
 
baz
 
danych
 
(PostgreSQL
 
JSONB),
 
operacji
 
I/O
 
na
 
pamięci
 
podręcznej
 
(Redis)
 
oraz
 
integracji
 
silnika
 
Swiss
 
Ephemeris
 
w
 
Pythonie.
 
Koncentruje
 
się
 
na
 
bezpieczeństwie,
 
systemie
 
typowania
 
(Pydantic)
 
i
 
wydajności
 
wielowątkowej
 
(async/await).
4
 
Frontend-Specialist
 
Specjalista
 
ds.
 
interfejsów
 
użytkownika
 
(UI/UX)
 
i
 
wizualizacji.
 
Odpowiedzialny
 
za
 
renderowanie
 
wektorowe
 
(SVG),
 
obsługę
 
arkuszy
 
stylów
 
(Tailwind
 
CSS)
 
oraz
 
logikę
 
asynchroniczną
 
po
 
stronie
 
klienta
 
(React
 
18
 
z
 
TypeScript).
 
Optymalizuje
 
animacje,
 
pilnując
 
m.in.
 
by
 
obiekty
 
<svg>
 
były
 
renderowane
 
przez
 
akcelerację
 
sprzętową
 
przeglądarki.
4
 
Migration
 
Architect
 
Persona
 
odpowiedzialna
 
za
 
planowanie
 
migracji
 
danych,
 
analizę
 
ryzyka
 
i
 
zabezpieczanie
 
ciągłości
 
operacyjnej.
 
Projektuje
 
schematy
 
bazodanowe
 
wektorowe
 
(Qdrant)
 
pod
 
kątem
 
rozszerzeń
 
opartych
 
o
 
Retrieval-Augmented
 
Generation
 
(RAG).
4
 
Zastosowanie
 
tak
 
zorganizowanej
 
struktury
 
sprawia,
 
że
 
agent
 
wywołany
 
w
 
konkretnym
 
kontekście
 
"wie",
 
że
 
nie
 
powinien
 
modyfikować
 
stylów
 
CSS,
 
gdy
 
jego
 
zadaniem
 
jest
 
przeliczenie
 
tranzytów
 
planetarnych.
 
Dodatkowo,
 
w
 
systemie
 
Antigravity
 
istnieje
 
hierarchia
 
pierwszeństwa
 
plików
 
konfiguracyjnych.
 
Reguły
 
ogólne
 
i
 
wspólne
 
dla
 
całego
 
zespołu
 
przechowywane
 
są
 
w
 
AGENTS.md,
 
podczas
 
gdy
 
wytyczne
 
specyficzne
 
dla
 
zachowania
 
środowiska
 
Antigravity,
 
mogące
 
nadpisywać
 
zachowanie
 
domyślne
 
dla
 
innych
 
asystentów,
 
znajdują
 
się
 
w
 
pliku
 

## Page 6

GEMINI.md.
14
 
Inżynieria
 
wiedzy
 
poprzez
 
pakiety
 
instrukcji
 
SKILL.md
 
Zarządzanie
 
ogromną
 
złożonością
 
dziedziny,
 
jaką
 
jest
 
precyzyjna
 
astronomia
 
i
 
historia
 
koncepcji
 
astrologicznych,
 
przewyższa
 
pojemność
 
standardowych
 
instrukcji
 
systemowych.
 
W
 
ekosystemie
 
Antigravity,
 
statyczne
 
wytyczne
 
zostały
 
zastąpione
 
otwartym
 
standardem
 
Agent
 
Skills,
 
pozwalającym
 
na
 
dynamiczne
 
rozszerzanie
 
możliwości
 
modelu.
7
 
Zamiast
 
spalać
 
zasoby
 
w
 
postaci
 
tokenów
 
i
 
zmuszać
 
agenta
 
do
 
każdorazowego
 
czytania
 
pełnej
 
dokumentacji
 
biblioteki
 
podczas
 
sesji,
 
wiedza
 
domenowa
 
jest
 
kategoryzowana
 
do
 
pakietów
 
zdefiniowanych
 
w
 
plikach
 
SKILL.md.
16
 
Proces
 
korzystania
 
z
 
umiejętności
 
oparty
 
jest
 
o
 
wzorzec
 
nazywany
 
progresywnym
 
ujawnianiem
 
(progressive
 
disclosure).
6
 
Agent
 
podczas
 
startu
 
sesji
 
analizuje
 
jedynie
 
nazwy
 
i
 
zwięzłe
 
opisy
 
zgromadzonych
 
w
 
systemie
 
umiejętności,
 
by
 
następnie
 
pobrać
 
pełną
 
treść
 
i
 
dołączony
 
do
 
niej
 
wykonywalny
 
kod
 
(np.
 
skrypty
 
bash)
 
tylko
 
w
 
momencie,
 
gdy
 
zidentyfikuje
 
zadanie,
 
które
 
tej
 
wiedzy
 
wymaga.
17
 
Podejście
 
to
 
optymalizuje
 
czas
 
przetwarzania
 
logiki
 
i
 
radykalnie
 
zmniejsza
 
koszty
 
wywołań
 
API.
17
 
Umiejętności
 
w
 
Antigravity
 
podzielone
 
są
 
ze
 
względu
 
na
 
zasięg
 
(Scope).
6
 
Umiejętności
 
specyficzne
 
dla
 
danej
 
przestrzeni
 
roboczej,
 
idealne
 
do
 
konwencji
 
projektowych
 
i
 
procedur
 
wdrażania,
 
umieszczane
 
są
 
w
 
katalogu
 
<workspace-root>/.agents/skills/<nazwa-umiejetnosci>/SKILL.md.
 
Z
 
kolei
 
umiejętności
 
o
 
zasięgu
 
globalnym,
 
przeznaczone
 
dla
 
narzędzi
 
ogólnego
 
zastosowania
 
i
 
używane
 
we
 
wszystkich
 
projektach,
 
umieszczone
 
są
 
w
 
ścieżce
 
globalnej
 
systemu
 
operacyjnego
 
~/.gemini/antigravity/skills/<nazwa-umiejetnosci>/SKILL.md
 
(lub
 
równoważnych
 
folderach
 
narzędzi
 
takich
 
jak
 
Claude
 
Code
 
czy
 
Cursor).
6
 
Struktura
 
poprawnie
 
sformułowanego
 
pliku
 
SKILL.md
 
dla
 
złożonych
 
kalkulacji
 
efemerycznych
 
musi
 
ściśle
 
trzymać
 
się
 
ustalonego
 
schematu.
 
W
 
nagłówku
 
dokumentu
 
znajduje
 
się
 
frontmatter
 
w
 
formacie
 
YAML,
 
zawierający
 
meta-dane.
 
Jest
 
to
 
kluczowy
 
element,
 
ponieważ
 
na
 
jego
 
podstawie
 
główny
 
router
 
agenta
 
(tzw.
 
high-level
 
router)
 
dokonuje
 
semantycznego
 
wyszukiwania.
6
 
Oprócz
 
nazwy
 
(np.
 
name:
 
astropy-core),
 
wymaga
 
on
 
precyzyjnego
 
opisu
 
pisanego
 
w
 
osobie
 
trzeciej,
 
określającego
 
dokładnie,
 
z
 
jakimi
 
problemami
 
skrypt
 
sobie
 
radzi
 
(np.
 
"Wykonywanie
 
transformacji
 
między
 
systemami
 
współrzędnych
 
niebieskich
 
ICRS,
 
Galactic,
 
FK5
 
i
 
operowanie
 
na
 
jednostkach
 
fizycznych
 
z
 
użyciem
 
pakietu
 
astropy").
6
 
Zawartość
 
główna
 
Markdown
 
dzieli
 
się
 
na
 
sekcje
 
determinujące
 
zachowanie
 
modelu
 
6
:
 
1.
 
When
 
to
 
use
 
this
 
skill:
 
Wyszczególnienie
 
konkretnych
 
scenariuszy
 
(np.
 
konwersja
 
czasu
 
na
 
TAI,
 
UTC,
 
TT,
 
praca
 
z
 
plikami
 
FITS).
7
 
2.
 
How
 
to
 
use
 
it:
 
Bezkompromisowe
 
zasady
 
operacyjne.
 
To
 
tutaj
 
wprowadza
 
się
 
blokady
 
chroniące
 
przed
 
typowymi
 
błędami
 
modeli
 
matematycznych.
 
Na
 
przykład,
 
podczas
 
tworzenia
 
silnika
 
do
 
astrologii
 
wedyjskiej
 
agent
 
może
 
zostać
 
ostrzeżony,
 
że
 
podczas
 

## Page 7

procedury
 
odjęcia
 
wartości
 
precesji
 
punktu
 
równonocy
 
(Ayanamsa)
 
nie
 
wolno
 
odejmować
 
tej
 
wielkości
 
od
 
stopnia
 
Ascendentu.
22
 
Poprawny
 
wzorzec
 
nakazuje
 
subtrakcję
 
wyłącznie
 
z
 
pozycji
 
poszczególnych
 
planet
 
na
 
samym
 
końcu
 
procesu
 
obliczeniowego,
 
co
 
można
 
zaprezentować
 
wzorem:
 
ascSign
 
=
 
((ascendant
 
-
 
ayan)
 
/
 
30)
 
+
 
1.
22
 
Innym
 
przykładem
 
zasady
 
wbudowanej
 
w
 
plik
 
SKILL.md
 
jest
 
instrukcja
 
nakazująca
 
unikanie
 
traktowania
 
skryptów
 
pobocznych
 
jako
 
otwartego
 
kodu
 
do
 
odczytu,
 
promująca
 
traktowanie
 
ich
 
jako
 
"czarnych
 
skrzynek"
 
z
 
interfejsem
 
wiersza
 
poleceń
 
wywoływanym
 
z
 
parametrem
 
--help.
6
 
Środowisko
 
to
 
ewoluowało
 
do
 
tego
 
stopnia,
 
że
 
w
 
repozytoriach
 
typu
 
open-source,
 
takich
 
jak
 
antigravity-awesome-skills,
 
dostępne
 
są
 
już
 
setki
 
gotowych
 
pakietów
 
(np.
 
constant-time-analysis
 
do
 
detekcji
 
wycieków
 
kryptograficznych,
 
frontend-design
 
do
 
tworzenia
 
interfejsów
 
produkcyjnych,
 
a
 
nawet
 
umiejętności
 
pozwalające
 
na
 
używanie
 
interfejsów
 
komputerowych,
 
takie
 
jak
 
Anthropic's
 
Computer
 
Use
 
agents).
18
 
Wdrożenie
 
tych
 
gotowych
 
standardów
 
gwarantuje
 
agentowi
 
pełną
 
świadomość
 
możliwości
 
technicznych
 
oraz
 
bezbłędną
 
spójność
 
podczas
 
generowania
 
logiki
 
aplikacji.
 
Integracja
 
i
 
wybór
 
bibliotek
 
do
 
precyzyjnych
 
kalkulacji
 
astronomicznych
 
Osiągnięcie
 
precyzji
 
charakterystycznej
 
dla
 
systemów
 
pokroju
 
astro.com
 
nie
 
jest
 
możliwe
 
poprzez
 
poleganie
 
na
 
samodzielnie
 
napisanych
 
funkcjach
 
trygonometrycznych.
 
Mechanika
 
nieba
 
to
 
zagadnienie
 
uwzględniające
 
setki
 
perturbacji
 
grawitacyjnych,
 
wahania
 
w
 
ruchu
 
obrotowym
 
Ziemi
 
oraz
 
efekty
 
relatywistyczne,
 
które
 
znacznie
 
wykraczają
 
poza
 
kompetencje
 
agentów
 
LLM
 
generujących
 
wzory
 
matematyczne.
 
Z
 
tego
 
powodu
 
bezwzględnym
 
fundamentem
 
technicznym,
 
który
 
Antigravity
 
musi
 
zintegrować
 
w
 
generowanym
 
kodzie,
 
jest
 
szwajcarska
 
biblioteka
 
Swiss
 
Ephemeris
 
(SE).
25
 
Zbudowana
 
na
 
bazie
 
numerycznej
 
integracji
 
efemeryd
 
z
 
Jet
 
Propulsion
 
Laboratory
 
NASA
 
(wersja
 
DE431),
 
Swiss
 
Ephemeris
 
dostarcza
 
pozycje
 
ciał
 
niebieskich
 
z
 
dokładnością
 
do
 
ułamków
 
sekundy
 
łuku,
 
obejmując
 
niewiarygodnie
 
szeroki
 
zakres
 
historyczny
 
i
 
przyszły,
 
od
 
2
 
stycznia
 
13201
 
r.
 
p.n.e.
 
do
 
31
 
grudnia
 
17191
 
r.
 
n.e..
27
 
W
 
ekosystemie
 
Pythona
 
istnieje
 
kilka
 
wysokiej
 
klasy
 
rozszerzeń
 
(wrappers)
 
oraz
 
niezależnych
 
pakietów
 
ułatwiających
 
manipulację
 
tymi
 
danymi.
 
Opracowanie
 
prawidłowego
 
projektu
 
architektonicznego
 
przez
 
orkiestratora
 
Antigravity
 
polega
 
na
 
optymalnym
 
wyborze
 
biblioteki
 
względem
 
oczekiwanego
 
poziomu
 
abstrakcji.
 
 
Biblioteka
 
Pythona
 
Architektura
 
i
 
zakres
 
zastosowań
 
w
 
inżynierii
 
systemów
 
astrologicznych
 
pyswisseph
 
Rozszerzenie
 
C
 
(C-extension)
 
dla
 
oryginalnej
 
biblioteki
 
Swiss
 
Ephemeris.
 

## Page 8

Oferuje
 
surową
 
moc
 
obliczeniową
 
i
 
najwyższą
 
wydajność,
 
ale
 
wymaga
 
niskopoziomowego
 
zarządzania
 
pamięcią
 
(np.
 
wywoływania
 
procedury
 
zamykającej
 
swe.close())
 
oraz
 
precyzyjnego
 
deklarowania
 
flag
 
(np.
 
swe.FLG_SWIEPH,
 
swe.FLG_SIDEREAL).
 
Przeznaczona
 
dla
 
wysoce
 
zoptymalizowanych,
 
backendowych
 
potoków
 
asynchronicznych.
22
 
Kerykeion
 
Nowoczesna
 
biblioteka
 
abstrakcyjna
 
stanowiąca
 
nakładkę
 
na
 
obliczenia
 
efemeryczne.
34
 
Automatyzuje
 
pozycjonowanie
 
planet
 
i
 
domów,
 
implementuje
 
wykrywanie
 
aspektów
 
oraz,
 
co
 
najistotniejsze
 
z
 
punktu
 
widzenia
 
budowy
 
oprogramowania,
 
oferuje
 
wbudowane
 
mechanizmy
 
renderowania
 
kosmogramów
 
SVG.
 
Natywnie
 
integruje
 
się
 
z
 
systemami
 
AI
 
poprzez
 
moduł
 
Serializatora
 
Kontekstu
 
(AI
 
Context
 
Serializer),
 
optymalizując
 
wyjście
 
danych
 
dla
 
modeli
 
LLM.
33
 
Immanuel
 
Pakiet
 
napisany
 
z
 
myślą
 
o
 
środowiskach
 
Python
 
3.10+,
 
którego
 
mechanizmy
 
wewnętrzne,
 
obejmujące
 
oceny
 
godności
 
punktów
 
i
 
regresje
 
sekundowe,
 
były
 
celowo
 
modelowane
 
na
 
logice
 
stosowanej
 
przez
 
astro.com
 
i
 
Astro
 
Gold.
26
 
Posiada
 
wysoce
 
przydatny
 
komponent
 
serializatora
 
do
 
ustrukturyzowanych
 
plików
 
JSON
 
oraz
 
natywne
 
wsparcie
 
wielojęzyczności
 
(en_US,
 
pt_BR,
 
es_ES,
 
de_DE)
 
bezpośrednio
 
w
 
rdzeniu,
 
redukując
 
potrzebę
 
zewnętrznej
 
internacjonalizacji.
26
 
Stellium
 
Oferuje
 
obiektowe,
 
kompozycyjne
 
API
 
zbudowane
 
wokół
 
wzorca
 
projektowego
 
Builder
 
(np.
 
ChartBuilder.from_details(...)).
30
 
Zaprojektowana
 
pod
 
Pythona
 
3.11+,
 
natywnie
 
implementuje
 
zaawansowany
 
system
 
cache'owania
 
poprawiający
 

## Page 9

wydajność
 
oraz
 
pozwala
 
na
 
"leniwe
 
ewaluowanie"
 
(lazy
 
evaluation)
 
operacji.
 
Doskonale
 
nadaje
 
się
 
do
 
tworzenia
 
wtyczek
 
za
 
pomocą
 
opcjonalnych
 
pakietów
 
(np.
 
stellium[analysis]
 
do
 
obsługi
 
dataframes
 
biblioteki
 
pandas).
30
 
OpenAstro2
 
Biblioteka
 
kładąca
 
szczególny
 
nacisk
 
na
 
wielość
 
rozwiązań
 
architektonicznych:
 
wspiera
 
systemy
 
rzadziej
 
stosowane
 
(ponad
 
15
 
systemów
 
podziału
 
domów,
 
w
 
tym
 
Morinus,
 
Topocentric,
 
Campanus),
 
mapy
 
geograficzne
 
(Local
 
Space
 
Maps)
 
oraz
 
analizę
 
wpływu
 
gwiazd
 
stałych
 
(Fixed
 
Stars)
 
w
 
oparciu
 
o
 
prawdziwe
 
(True
 
Geocentric)
 
układy
 
topocentryczne.
35
 
Specjalistyczne:
 
Flatlib
 
/
 
pyjhora
 
Pakiety
 
dedykowane
 
konkretnym
 
gałęziom
 
historycznym.
 
Flatlib
 
operuje
 
w
 
paradygmacie
 
astrologii
 
tradycyjnej
 
(analiza
 
temperamentu
 
i
 
średniowieczne
 
reguły
 
godności),
 
podczas
 
gdy
 
pyjhora
 
dostarcza
 
mechanizmy
 
wyłączne
 
dla
 
astrologii
 
wedyjskiej
 
(Panchang,
 
obliczanie
 
systemów
 
Dasa).
4
 
Skrypt
 
inicjalizujący
 
pracę
 
agentów
 
w
 
Antigravity
 
powinien
 
instruować
 
środowisko
 
(na
 
etapie
 
definicji
 
plan.md)
 
do
 
wykorzystania
 
wysokopoziomowych
 
parserów
 
w
 
architekturach,
 
które
 
priorytetyzują
 
czytelność
 
bazy
 
kodu,
 
oraz
 
niskopoziomowego
 
pyswisseph
 
tam,
 
gdzie
 
budowany
 
jest
 
silnik
 
przetwarzający
 
dane
 
milionów
 
zdarzeń
 
jednocześnie.
 
Wymaga
 
to
 
odpowiedniego
 
osadzenia
 
komend
 
w
 
pamięci
 
agenta,
 
nakazujących
 
m.in.
 
ustawianie
 
parametrów
 
trybów
 
współrzędnych
 
za
 
pomocą
 
zdefiniowanych
 
makr,
 
takich
 
jak
 
swe.set_topo(lat,
 
lon,
 
0)
 
dla
 
pomiarów
 
topocentrycznych.
22
 
Przetwarzanie
 
zbiorów
 
wejściowych
 
i
 
normalizacja
 
ustrukturyzowanych
 
danych
 
astronomicznych
 
Rozwój
 
tak
 
rygorystycznego
 
systemu
 
musi
 
skupiać
 
się
 
na
 
wyeliminowaniu
 
błędów
 
na
 
wejściu
 
(GIGO
 
-
 
Garbage
 
In,
 
Garbage
 
Out).
 
Przed
 
uruchomieniem
 
jakiegokolwiek
 
modelu
 
astronomicznego,
 
dane
 
dotyczące
 
czasu
 
i
 
przestrzeni
 
muszą
 
podlegać
 
absolutnej
 
normalizacji.
 
Dla
 
systemu
 
astrologicznego
 
oznacza
 
to
 
poprawną
 
konwersję
 
czasów
 
lokalnych
 
użytkowników
 
na
 
standard
 
UTC,
 
aby
 
uwzględnić
 
strefy
 
czasowe,
 
historie
 
zmian
 
czasu
 
letniego
 
(DST)
 
i
 

## Page 10

odchylenia
 
lokalne
 
przed
 
erą
 
standaryzacji
 
czasu.
 
Zadanie
 
to
 
jest
 
delegowane
 
agentowi
 
Backend-Specialist.
 
Wygenerowany
 
przez
 
niego
 
kod
 
wykorzystuje
 
zaawansowane
 
pakiety
 
ekosystemu
 
Node.js,
 
takie
 
jak
 
Moment.js
 
lub
 
zoptymalizowane
 
pod
 
kątem
 
wielkości
 
moduły
 
date-fns-tz,
 
lub
 
analogicznie
 
obiekty
 
strefowe
 
(tz-aware
 
datetimes)
 
za
 
pomocą
 
modułu
 
zoneinfo
 
w
 
architekturze
 
Pythona.
25
 
Sam
 
potok
 
przetwarzania
 
i
 
mapowania
 
danych
 
pobranych
 
z
 
Swiss
 
Ephemeris
 
dzieli
 
się
 
na
 
kilka
 
kluczowych
 
faz
 
operacyjnych:
 
1.
 
Dystrybucja
 
i
 
Formatowanie
 
Wyników:
 
Po
 
uzyskaniu
 
z
 
pyswisseph
 
surowej
 
długości
 
ekliptycznej
 
planety
 
(
),
 
agent
 
aplikuje
 
translację
 
algebraiczną,
 
najczęściej
 
według
 
wzoru:
 
,
 
przypisując
 
każdej
 
planecie
 
odpowiedni
 
znak
 
zodiaku
 
w
 
ujęciu
 
trzydziestostopniowym.
31
 
Wyodrębnione
 
parametry,
 
takie
 
jak
 
retrogradacja
 
(kierunek
 
ruchu
 
wstecznego)
 
oraz
 
przynależność
 
do
 
domów,
 
pakowane
 
są
 
do
 
obiektów
 
JSON.
25
 
2.
 
Kalkulacja
 
Odniesień
 
Krzyżowych
 
(Aspektów):
 
Program
 
musi
 
utworzyć
 
macierz
 
porównującą
 
każdą
 
pozycję
 
kątową
 
w
 
układzie
 
ze
 
wszystkimi
 
pozostałymi
 
punktami
 
w
 
celu
 
detekcji
 
specyficznych
 
struktur
 
kątowych
 
(trygony,
 
kwadratury,
 
opozycje,
 
koniunkcje).
 
Biblioteki
 
pokroju
 
Kerykeion
 
czy
 
Natal
 
dokonują
 
tych
 
operacji
 
natywnie
 
(Aspect
 
pair
 
counts,
 
composite
 
chart
 
aspects,
 
cross
 
reference
 
tables),
 
stosując
 
w
 
pełni
 
programowalne
 
zakresy
 
tolerancji
 
błędów,
 
określane
 
w
 
branży
 
jako
 
orby
 
(Orbs).
25
 
3.
 
Ocena
 
Półjakościowa:
 
Silniki
 
wyposażone
 
w
 
integrację
 
z
 
zasadami
 
helenistycznymi
 
(jak
 
wspomniany
 
pakiet
 
Flatlib
 
lub
 
autorskie
 
wdrożenia
 
za
 
pomocą
 
Qdrant
 
vector
 
database)
 
analizują
 
temperament
 
oraz
 
tzw.
 
godności
 
podstawowe
 
i
 
przypadkowe
 
(Essential
 
dignities
 
scoring)
 
oparte
 
o
 
system
 
rzymskiego
 
uczonego
 
Ptolemeusza
 
lub
 
greckiego
 
Vettiusa
 
Valensa,
 
klasyfikując
 
dane
 
do
 
słowników
 
i
 
zapisując
 
do
 
wydajnej
 
bazy
 
danych
 
(np.
 
PostgreSQL
 
16
 
wykorzystującej
 
obiekty
 
JSONB
 
dla
 
wysokiej
 
elastyczności).
4
 
Bezpieczna
 
transmisja
 
tych
 
struktur
 
z
 
backendu
 
do
 
mechanizmów
 
wizualizacyjnych
 
wymaga
 
asynchronicznego
 
API
 
(np.
 
FastAPI
 
w
 
architekturze
 
Pythona).
 
Aby
 
zapobiec
 
awariom
 
wynikającym
 
z
 
nieoczekiwanego
 
kształtu
 
danych,
 
cała
 
wymiana
 
w
 
projekcie
 
nadzorowana
 
jest
 
poprzez
 
warstwę
 
walidacyjną
 
zbudowaną
 
w
 
oparciu
 
o
 
bibliotekę
 
Pydantic,
 
podczas
 
gdy
 
asynchroniczne
 
odświeżanie
 
efemeryd
 
w
 
tle
 
zarządza
 
tandem
 
Redis
 
i
 
Celery.
4
 
Skutkuje
 
to
 
spójną,
 
niezawodną
 
warstwą
 
logiczną
 
gotową
 
do
 
ekspozycji
 
interfejsom
 
graficznym.
 
Generowanie
 
obiektów
 
wektorowych
 
i
 
ich
 
sprzętowa
 
optymalizacja
 
(SVG
 
Artifacts)
 
Ostatnim
 
ogniwem
 
w
 
łańcuchu
 
renderowania
 
wyników,
 
świadczącym
 
o
 
dojrzałości
 
oprogramowania,
 
jest
 
kreacja
 
estetycznego
 
kosmogramu
 
przypominającego
 
te
 
generowane
 
przez
 
serwery
 
astro.com.
 
Tutaj
 
ujawnia
 
się
 
ogromna
 
przewaga
 
stosowania
 
grafiki
 
wektorowej
 
(Scalable
 
Vector
 
Graphics).
 
Format
 
SVG,
 
będący
 
w
 
istocie
 
dokumentem
 
opartym
 
na
 
formacie
 


## Page 11

wymiany
 
XML,
 
jest
 
niczym
 
innym
 
jak
 
ustrukturyzowanym
 
ciągiem
 
tekstu
 
definiującym
 
kształty,
 
współrzędne,
 
grubość
 
linii
 
i
 
kolory
 
obiektów
 
geometrycznych.
38
 
Z
 
racji
 
tego,
 
że
 
LLM
 
to
 
modele
 
analizujące
 
wyłącznie
 
tekst
 
i
 
tokeny,
 
posiadają
 
one
 
natywną
 
łatwość
 
w
 
strukturyzowaniu
 
skomplikowanych
 
ciągów
 
SVG,
 
co
 
jest
 
całkowicie
 
niemożliwe
 
dla
 
natywnego
 
generowania
 
stratnej
 
i
 
binarnej
 
grafiki
 
rastrowej
 
(jak
 
pliki
 
JPEG,
 
charakteryzujące
 
się
 
ponadto
 
artefaktami
 
kompresji).
38
 
Za
 
pomocą
 
bibliotek
 
takich
 
jak
 
Kerykeion
 
czy
 
Natal,
 
kod
 
backendowy
 
transponuje
 
wielowymiarowe
 
macierze
 
astronomiczne
 
na
 
dwuwymiarową
 
przestrzeń
 
euklidesową.
34
 
Proces
 
tworzenia
 
obiektu
 
graficznego
 
polega
 
na
 
budowie
 
współśrodkowych
 
pierścieni:
 
●
 
Zewnętrzny
 
okrąg
 
podlega
 
równej
 
dywizji
 
30-stopniowej
 
dla
 
osadzenia
 
12
 
symboli
 
znaków
 
zodiaku,
 
pozycjonowanych
 
z
 
precyzyjną
 
separacją
 
za
 
pomocą
 
algorytmów
 
trygonometrycznych.
37
 
●
 
Przestrzeń
 
środkowa
 
renderuje
 
asymetryczne
 
wierzchołki
 
(cusps)
 
zdefiniowane
 
przez
 
obliczenia
 
położeń
 
poszczególnych
 
systemów
 
domów,
 
uwarunkowane
 
czasowo.
22
 
●
 
Ciała
 
niebieskie
 
na
 
okręgu
 
najniższym
 
integrują
 
zaawansowane
 
algorytmy
 
antykolizyjne,
 
które
 
rozpoznają
 
zagęszczenia
 
punktów
 
o
 
bardzo
 
zbliżonej
 
długości
 
ekliptycznej
 
(stellia).
 
Algorytmy
 
te
 
modyfikują
 
atrybuty
 
koordynat
 
graficznych
 
obiektów
 
w
 
taki
 
sposób,
 
aby
 
odseparować
 
fizyczne
 
symbole
 
i
 
graficznie
 
powiązać
 
je
 
subtelną
 
linią
 
do
 
ich
 
prawdziwego
 
źródła
 
–
 
zapobiegając
 
defektom
 
nachodzących
 
się
 
wizualnie
 
elementów
 
(overdraw)
 
i
 
minimalizując
 
nakłady
 
renderingu.
40
 
●
 
Centrum
 
okręgu
 
wykorzystywane
 
jest
 
do
 
graficznego
 
mapowania
 
relacji
 
krzyżowych
 
aspektów,
 
kreśląc
 
wielobarwne
 
linie
 
pomiędzy
 
planetami.
34
 
Optymalizacja
 
procesorowa
 
oraz
 
mitygowanie
 
podatności
 
bezpieczeństwa
 
w
 
przeglądarkach
 
W
 
zaawansowanych
 
aplikacjach
 
webowych
 
kosmogramy
 
nie
 
są
 
w
 
pełni
 
statyczne.
 
Użytkownik
 
najeżdżając
 
kursorem
 
wyzwala
 
zdarzenia
 
uwypuklające
 
poszczególne
 
obiekty
 
i
 
ścieżki.
 
Zespoły
 
agentów
 
Antigravity
 
muszą
 
stosować
 
restrykcyjne
 
wytyczne
 
dotyczące
 
manipulacji
 
formatem
 
SVG
 
za
 
pomocą
 
kaskadowych
 
arkuszy
 
stylów
 
(CSS).
 
Wiedza
 
ta
 
importowana
 
do
 
SKILL.md
 
(pochodząca
 
m.in.
 
z
 
dobrych
 
praktyk
 
udostępnionych
 
przez
 
inżynierów
 
Vercel)
 
jasno
 
określa,
 
że
 
znaczna
 
liczba
 
przeglądarek
 
internetowych
 
nie
 
potrafi
 
wykorzystać
 
akceleracji
 
sprzętowej
 
procesora
 
graficznego
 
(GPU)
 
w
 
momencie
 
aplikowania
 
animacji
 
czy
 
przekształceń
 
przestrzennych
 
bezpośrednio
 
do
 
samego
 
tagu
 
<svg>.
15
 
Zastosowanie
 
bezwzględnej
 
zasady
 
w
 
kodzie
 
wygenerowanym
 
przez
 
AI
 
nakazuje
 
otoczyć
 
wyeksportowany
 
kosmogram
 
elementem
 
kontenerowym.
 
Animacje
 
(np.
 
kół
 
obrotu,
 
operatory
 
przejścia,
 
przezroczystości,
 
czy
 
rotacji
 
oparte
 
o
 
mechanizm
 
transform)
 
są
 
definiowane
 
wyłącznie
 
w
 
znaczniku
 
okalającym
 
środowisko
 
(np.
 
<div
 
className="animate-spin">),
 
wymuszając
 
przerzucenie
 
procesu
 
kalkulacji
 
efektów
 
wizualnych
 
na
 
dedykowane
 
rdzenie
 
karty
 
graficznej,
 
upewniając
 
się,
 
że
 
animacje
 
charakteryzują
 
się
 
płynnością
 
rzędu
 
celowanych
 
60
 

## Page 12

klatek
 
na
 
sekundę
 
(16ms
 
czas
 
renderowania
 
jednej
 
klatki)
 
i
 
szanują
 
zasoby
 
pamięci
 
sprzętu
 
oraz
 
ograniczenia
 
użycia
 
baterii
 
w
 
urządzeniach
 
mobilnych.
15
 
Co
 
niezwykle
 
istotne
 
w
 
środowiskach
 
renderujących
 
lokalne
 
grafiki
 
SVG
 
osadzające
 
ewentualne
 
odwołania
 
i
 
style
 
–
 
wygenerowane
 
kody
 
frontendu
 
muszą
 
bezwzględnie
 
brać
 
pod
 
uwagę
 
bezpieczeństwo
 
osadzania
 
wewnątrz
 
natywnych
 
binariów.
 
Eksploatacja
 
ataku
 
poprzez
 
podstawienie
 
bibliotek
 
DLL
 
(DLL
 
Hijacking),
 
wynikająca
 
z
 
nieostrożnego
 
zdefiniowania
 
ścieżek
 
dostępu
 
funkcji
 
ładujących
 
LoadLibrary(),
 
jest
 
ułatwiona
 
przez
 
zjawisko
 
lokalnego
 
renderowania
 
SVG
 
zawierającego
 
złośliwy
 
kod
 
w
 
izolowanych
 
kontenerach
 
bez
 
użycia
 
odwołań
 
sieciowych.
42
 
Prawidłowo
 
zaprojektowany
 
agent
 
ds.
 
bezpieczeństwa
 
(np.
 
przy
 
użyciu
 
poleceń
 
z
 
workflow
 
@speckit.checker
 
i
 
środowiska
 
analiz
 
podatności
 
constant-time-analysis)
 
wstrzyknie
 
odpowiednie
 
flagi
 
weryfikacyjne
 
w
 
C++
 
(takie
 
jak
 
LOAD_LIBRARY_SEARCH_SYSTEM32
 
albo
 
narzucając
 
restrykcyjne
 
mechanizmy
 
anty-wyciekowe
 
zapobiegające
 
m.in.
 
wstrzyknięciom
 
szkodliwych
 
arkuszy
 
wektorowych
 
typu
 
HTML
 
injection)
 
do
 
silników
 
wykonawczych.
24
 
Antigravity
 
i
 
asynchroniczne
 
zarządzanie
 
cyklem
 
życia
 
artefaktu
 
systemowego
 
Ewolucja
 
systemów
 
sztucznej
 
inteligencji
 
doprowadziła
 
do
 
punktu,
 
w
 
którym
 
człowiek
 
przestał
 
być
 
korektorem
 
każdej
 
wygenerowanej
 
linijki
 
tekstu,
 
a
 
stał
 
się
 
obserwatorem
 
wytworów
 
(Artefaktów)
 
będących
 
świadectwem
 
myślenia
 
maszyny.
 
Antigravity
 
definiuje
 
Artefakty
 
jako
 
bogate
 
środowisko
 
plików
 
markdown,
 
widoków
 
zmian
 
formatowania,
 
obrazów
 
rastrowych
 
oraz,
 
co
 
jest
 
przełomowe,
 
nagrań
 
i
 
przeglądarkowych
 
interakcji
 
nawigacyjnych
 
po
 
DOM,
 
umożliwiających
 
autonomiczną
 
kontrolę
 
działań.
43
 
Interfejs
 
Antigravity
 
rozszczepia
 
paradygmat
 
edytora
 
na
 
dwie
 
domeny
 
przestrzenne:
 
Agent
 
Manager
 
(pulpit
 
dowodzenia
 
i
 
zarządzania
 
asynchronicznymi,
 
działającymi
 
równolegle
 
w
 
tle
 
instancjami
 
inteligencji)
 
oraz
 
natywny,
 
zmodyfikowany
 
Edytor
 
(zasilany
 
klasycznymi
 
mechanizmami
 
auto-uzupełniania
 
kodu
 
typu
 
Tab
 
oraz
 
komendami
 
w
 
linii
 
-
 
Inline
 
Command).
1
 
Artefakty
 
materializują
 
się
 
najczęściej
 
w
 
fazie
 
planistycznej
 
na
 
obu
 
tych
 
widokach.
43
 
Zamiast
 
przekopywać
 
się
 
przez
 
ściany
 
logów,
 
aby
 
stwierdzić,
 
czy
 
biblioteka
 
Kerykeion
 
poprawnie
 
skonfigurowała
 
macierze
 
astronomiczne,
 
inżynier
 
otrzymuje
 
bezpośrednio
 
na
 
ekranie
 
namacalny
 
wynikowy
 
Artefakt
 
graficzny.
47
 
Jeśli
 
kosmogram
 
SVG
 
wyświetlany
 
na
 
ekranie
 
wbudowanej
 
w
 
IDE
 
zintegrowanej
 
przeglądarki
 
Chrome
 
z
 
renderowaniem
 
obiektowym
 
nie
 
pasuje
 
do
 
standardów
 
estetycznych
 
lub
 
założeń
 
zawartych
 
w
 
dokumentach
 
(np.
 
elementy
 
nachodzą
 
na
 
siebie,
 
wierzchołki
 
nie
 
są
 
symetryczne),
 
użytkownik
 
posiada
 
dostęp
 
do
 
interfejsu
 
komentarzy,
 
gdzie
 
nanosi
 
poprawki
 
i
 
zostawia
 
natywną
 
opinię
 
wizualną
 
w
 
sposób
 
identyczny,
 
jak
 
zostawia
 
się
 
opinie
 
na
 
współdzielonych
 
dokumentach
 
korporacyjnych
 
(Feedback
 
loop).
43
 
Zdolności
 
asynchroniczne
 
agentów
 
włączają
 
te
 
uwagi
 
do
 
głównego
 
nurtu
 
operacji
 
bez
 
załamania
 
struktury
 
projektu
 
wykonawczego.
47
 
Kolejną
 
potężną
 
zdolnością
 
systemu
 
w
 
architekturze
 
"Agentic"
 
opartej
 
na
 
silniku
 
przeglądarkowym
 
Chrome
 
jest
 
głębokie
 
badanie
 
stanu
 
funkcjonalności,
 
dalece
 
wybiegające
 

## Page 13

poza
 
standardowe
 
mechanizmy
 
parsowania
 
kaskadowego
 
HTML.
 
Autonomiczna
 
instancja
 
potrafi
 
sfabrykować
 
i
 
opublikować
 
testowy
 
zbiór,
 
nawigować
 
bezpośrednio
 
po
 
fizycznym
 
i
 
graficznie
 
wyrenderowanym
 
interfejsie
 
testowanej
 
usługi,
 
emulować
 
kliknięcia
 
oraz
 
zachowanie
 
kursora
 
myszy
 
przy
 
wprowadzaniu
 
testowych
 
danych,
 
co
 
skutkuje
 
zbudowaniem
 
wyczerpującego
 
raportu
 
QA
 
wzbogaconego
 
w
 
zrzuty
 
ekranu
 
dla
 
każdego
 
kroku
 
(visual
 
outputs
 
i
 
user
 
journey
 
walkthrough),
 
dając
 
programiście
 
całkowitą
 
pewność
 
wykonania
 
instrukcji.
3
 
Antigravity
 
wykorzystuje
 
zarządzanie
 
takimi
 
procedurami
 
poprzez
 
koncepcję
 
ciągłego
 
uaktualniania
 
bazy
 
zgromadzonej
 
wiedzy
 
(knowledge
 
base),
 
w
 
której
 
zapisane
 
są
 
prawidłowo
 
sformatowane
 
logi
 
i
 
poprawne
 
diagramy
 
relacyjne
 
wywnioskowane
 
na
 
podstawie
 
uprzednich
 
projektów
 
i
 
rozwiązanych
 
błędów.
46
 
Dystrybucja
 
i
 
budowanie
 
wyizolowanych
 
środowisk
 
klienckich
 
z
 
GUI
 
Stworzenie
 
potężnego
 
kodu
 
skryptowego
 
i
 
potwierdzenie
 
go
 
wizualnie
 
za
 
pomocą
 
asynchronicznych
 
agentów
 
Antigravity
 
to
 
element
 
fazy
 
rozwoju
 
(Development).
 
Finałem
 
projektu
 
oprogramowania
 
użyteczności
 
komercyjnej
 
(często
 
pozycjonowanego
 
jako
 
lokalne
 
oprogramowanie
 
desktopowe,
 
SaaS
 
bądź
 
samodzielna
 
aplikacja)
 
jest
 
zbudowanie
 
ostatecznego
 
pliku
 
binarnego.
 
Antigravity
 
umożliwia
 
integrację
 
rozwiązań
 
z
 
obszaru
 
bibliotek
 
interfejsów
 
(Graphical
 
User
 
Interface),
 
takich
 
jak
 
bardzo
 
popularny
 
w
 
Pythonie
 
pakiet
 
CustomTkinter
 
dla
 
zapewnienia
 
nowoczesnego
 
wizualnie,
 
minimalistycznego
 
interfejsu.
5
 
Zmagania
 
związane
 
ze
 
wstępną
 
obsługą
 
modeli,
 
nieumiejętnością
 
LLM
 
w
 
formatowaniu
 
wyników
 
i
 
ogólnie
 
pojętą
 
optymalizacją
 
zachowań
 
zostały
 
rozwiązane
 
poprzez
 
wymuszenie
 
w
 
promptach
 
i
 
w
 
systemie
 
reguł
 
operacyjnych
 
tak
 
zwanego
 
mechanizmu
 
Łańcucha
 
Myślenia
 
(Chain
 
of
 
Thought
 
-
 
CoT).
5
 
Iteracyjne
 
nakazywanie
 
agentowi
 
przestrzegania
 
twardego
 
standardu
 
ewaluacyjnego
 
przed
 
przystąpieniem
 
do
 
kodu,
 
takie
 
jak
 
rygorystyczne
 
sprawdzenie
 
integralności
 
i
 
poprawności
 
wejścia
 
parametrów
 
(czas,
 
data,
 
miejsce
 
-
 
"CHECK"),
 
analiza
 
wielkich
 
cykli
 
czasowych
 
(np.
 
Mahadasha
 
z
 
astrologii
 
wedyjskiej
 
-
 
"ANALYZE"),
 
identyfikacja
 
dolegliwości
 
losu
 
(Doshas
 
-
 
"IDENTIFY"),
 
oraz
 
ostateczne
 
zapewnienie
 
środków
 
korygujących
 
(Upaya
 
-
 
"PROVIDE")
 
blokuje
 
ewentualne
 
luki
 
systemowe.
5
 
Próba
 
kontynuacji
 
z
 
brakującymi,
 
niedokładnymi
 
informacjami
 
wywołuje
 
procedurę
 
bezpieczeństwa,
 
w
 
której
 
aplikacja
 
przerywa
 
ciąg
 
logiczny
 
i
 
żąda
 
uzupełnienia
 
pustych
 
i
 
niemożliwych
 
do
 
sparsowania
 
parametrów
 
efemerycznych
 
na
 
etapie
 
wejściowym
 
GUI.
 
Zamknięcie
 
skomplikowanej
 
logiki
 
w
 
samodzielnej,
 
dystrybuowalnej
 
aplikacji
 
wykonywalnej
 
(standalone
 
app)
 
zdejmuje
 
z
 
ostatecznego
 
konsumenta
 
konieczność
 
instalacji
 
interpretera
 
środowiska
 
Python
 
oraz
 
ręcznej
 
konfiguracji
 
bibliotek
 
takich
 
jak
 
pyswisseph
 
i
 
Kerykeion.
 
Agenci
 
potrafią
 
za
 
pomocą
 
terminala
 
środowiska
 
zainicjalizować
 
bezbłędnie
 
konfiguracje
 
i
 
parametry
 
kompilatora
 
kodu
 
PyInstaller.
5
 
Zastosowanie
 
w
 
orkiestracji
 
precyzyjnych
 
zmiennych
 
flag
 
systemowych
 
–
 
m.in.
 
--noconsole
 
ukrywającej
 
powłokę
 
operacyjną
 
wiersza
 
poleceń
 
dla
 
użytkownika
 
okienkowego,
 
--onefile
 
grupującej
 
logikę
 
operacyjną
 
systemu,
 
wirtualne
 
biblioteki
 
oraz
 
powiązane
 
pliki
 
zintegrowane
 
w
 
jedną
 
spakowaną
 
strukturę
 
binarną
 
.exe,
 
oraz
 
parametru
 

## Page 14

eksportowego
 
nakazującego
 
absolutne
 
ujęcie
 
motywów
 
strukturalnych
 
(palety
 
kolorów,
 
akcesoryjne
 
definicje
 
zmiennych
 
plików
 
obiektów)
 
w
 
komendzie
 
--collect-all
 
customtkinter
 
–
 
zwieńcza
 
trud
 
zrobotyzowanego
 
procesu
 
w
 
bezobsługową
 
paczkę
 
natywną.
5
 
Konkluzja
 
i
 
ostateczny
 
kierunek
 
inżynierii
 
agentowej
 
w
 
mechanice
 
precyzyjnej
 
Ewolucyjne
 
odseparowanie
 
procesu
 
wymyślania
 
założeń
 
od
 
zrobotyzowanego
 
fizycznego
 
kodowania
 
wyzwoliło
 
ogromny
 
potencjał
 
architektoniczny
 
w
 
środowiskach
 
takich
 
jak
 
Google
 
Antigravity.
 
Kodyfikacja
 
astronomiczna
 
na
 
poziomie
 
dorównującym
 
standardom
 
usług
 
i
 
platform
 
webowych
 
wielkiej
 
skali
 
nie
 
stanowi
 
już
 
zadania
 
ograniczonego
 
dla
 
ekspertów
 
znających
 
zawiłości
 
wektorów
 
stanu
 
planetarnego,
 
efemeryd
 
i
 
zjawisk
 
precesji
 
czasowej.
 
Narzucenie
 
żelaznej
 
metodologii
 
zarządzania
 
projektem
 
opartej
 
o
 
Specyfikacje
 
(SDD),
 
stworzenie
 
podziału
 
ról
 
agentów
 
(poprzez
 
wdrożenie
 
do
 
projektu
 
rygoru
 
w
 
pliku
 
AGENTS.md)
 
oraz
 
umiejscowienie
 
logiki
 
specjalistycznej
 
jako
 
czarnych
 
skrzynek
 
rozszerzających
 
modele
 
asystentów
 
(SKILL.md)
 
izoluje
 
człowieka
 
od
 
chaotyczności
 
logiki
 
wektorowej,
 
zmuszając
 
maszyny
 
do
 
deterministycznej
 
poprawności
 
kalkulacji.
 
Integracja
 
środowisk
 
przeglądarkowych
 
do
 
bezpośredniego
 
manipulowania
 
artefaktami
 
wizualnymi
 
generowanymi
 
w
 
formacie
 
HTML,
 
oraz
 
wektorami
 
z
 
natywnym
 
wymuszeniem
 
sprzętowej
 
akceleracji
 
renderingu
 
i
 
asynchronicznym
 
modelem
 
dostarczania
 
obniża
 
koszty
 
technologiczne.
 
Budowa
 
kompletnego,
 
opartego
 
na
 
zaawansowanym
 
asynchronicznym
 
backendzie
 
w
 
środowisku
 
Pythona
 
połączonego
 
z
 
elastycznymi
 
bazami
 
relacyjnymi
 
PostgreSQL
 
silnika
 
analitycznego
 
generującego
 
kosmogramy
 
na
 
silniku
 
Swiss
 
Ephemeris
 
potwierdza
 
przewagę
 
systemów
 
Antigravity
 
i
 
agentów
 
o
 
wysokich
 
możliwościach
 
poznawczych
 
nad
 
pasywną
 
produkcją
 
tradycyjnego
 
kodu
 
skryptowego.
 
Cytowane
 
prace
 
1.
 
Google
 
Antigravity:
 
The
 
IDE
 
That's
 
Redefining
 
Developer
 
Experience
 
|
 
by
 
Shabana
 
Khanam,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://medium.com/@shabanakhanum/google-antigravity-the-ide-thats-redefining
-developer-experience-46b92d445232
 
2.
 
A
 
new
 
era
 
of
 
intelligence
 
with
 
Gemini
 
3
 
-
 
Google
 
Blog,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://blog.google/products-and-platforms/products/gemini/gemini-3/
 
3.
 
Getting
 
started
 
with
 
Spec
 
Driven
 
Development
 
in
 
Antigravity
 
-
 
Google
 
Codelabs,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://codelabs.developers.google.com/codelabs/getting-started-with-spec-driven
-development-in-antigravity
 
4.
 
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
 
https://medium.com/swlh/how-i-built-a-entire-astrology-echosystem-50193b930a2
1
 
5.
 
From
 
“Hallucinations”
 
to
 
“Horoscopes”:
 
Building
 
a
 
Standalone
 
...,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://medium.com/@tatankavenkat_19803/from-hallucinations-to-horoscopes-bu

## Page 15

ilding-a-standalone-astrology-ai-55e6f59e2196
 
6.
 
compnew2006/Spec-Kit-Antigravity-Skills:
 
An
 
Agentic
 
Skill
 
...
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/compnew2006/Spec-Kit-Antigravity-Skills
 
7.
 
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
 
https://antigravity .google/docs/skills
 
8.
 
CongDon1207/AGENTS.md
 
-
 
Antigravity
 
Kit
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/CongDon1207/AGENTS.md
 
9.
 
Built
 
a
 
super
 
simple
 
astrology
 
tool
 
using
 
Gemini
 
3
 
Pro
 
+
 
Antigravity
 
:
 
r/vibecoding
 
-
 
Reddit,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www .reddit.com/r/vibecoding/comments/1r010c6/built_a_super_simple_astr 
ology_tool_using_gemini/
 
10.
 
Spec-Driven
 
ADK
 
Agent
 
Development
 
with
 
Antigravity
 
and
 
Spec-kit
 
-
 
Codelabs,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://codelabs.developers.google.com/sdd-adk-antigravity
 
11.
 
Build
 
Autonomous
 
Developer
 
Pipelines
 
using
 
agents.md
 
and
 
skills.md
 
in
 
Antigravity ,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://codelabs.developers.google.com/autonomous-ai-developer-pipelines-antigr
avity
 
12.
 
Antigravity
 
|
 
My
 
Big
 
Data
 
World,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://weidongzhou.wordpress.com/category/ai/antigravity/
 
13.
 
Developer
 
Experience
 
with
 
AI
 
Coding
 
Agents:
 
HTTP
 
Behavioral
 
Signatures
 
in
 
Documentation
 
Portals
 
-
 
arXiv ,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://arxiv .org/html/2604.02544v1
 
14.
 
Guide
 
with
 
AGENTS.md
 
&
 
Examples
 
(2026)
 
-
 
Antigravity
 
Rules,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity .codes/blog/user-rules
 
15.
 
Animate
 
SVG
 
Wrapper
 
Instead
 
of
 
SVG
 
Element
 
-
 
Agent
 
Skill
 
for
 
Claude
 
Code,
 
Cursor
 
&
 
Antigravity ,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity .codes/agent-skills/rendering/rendering-animate-svg-wrapper
 
16.
 
Skills
 
Made
 
Easy
 
with
 
Google
 
Antigravity
 
and
 
Gemini
 
CLI
 
|
 
by
 
Karl
 
Weinmeister
 
|
 
Google
 
Cloud
 
-
 
Community
 
|
 
Feb,
 
2026,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://medium.com/google-cloud/skills-made-easy-with-google-antigravity-and-ge
mini-cli-5435139b0af8
 
17.
 
Antigravity:
 
Build
 
Your
 
First
 
AI
 
Agent
 
Skill
 
-
 
YouTube,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www .youtube.com/watch?v=gRAndTHbHW o&vl=en
 
18.
 
10
 
Must-Have
 
Skills
 
for
 
Claude
 
(and
 
Any
 
Coding
 
Agent)
 
in
 
2026
 
-
 
Medium,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://medium.com/@unicodeveloper/10-must-have-skills-for-claude-and-any-cod
ing-agent-in-2026-b5451b013051
 
19.
 
Skills.md
 
vs
 
Agents.md:
 
which
 
one
 
should
 
you
 
use?
 
#Shorts
 
-
 
YouTube,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www .youtube.com/shorts/4rT9FK7It7M
 
20.
 
Tutorial
 
:
 
Getting
 
Started
 
with
 
Google
 
Antigravity
 
|
 
by
 
Romin
 
Irani
 
-
 
Medium,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://medium.com/google-cloud/tutorial-getting-started-with-google-antigravity-b
5cc74c103c2
 
21.
 
antigravity-awesome-skills/skills/astropy/SKILL.md
 
at
 
main
 
-
 
GitHub,
 
otwierano:
 

## Page 16

kwietnia
 
22,
 
2026,
 
https://github.com/sickn33/antigravity-awesome-skills/blob/main/skills/astropy/SKI
LL.md
 
22.
 
Vedic
 
Ascendant/Planets
 
and
 
SwissEph
 
Python
 
-
 
Groups.io,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://groups.io/g/swisseph/topic/vedic_ascendant_planets_and/2749591 1
 
23.
 
Antigravity
 
Awesome
 
Skills:
 
1431+
 
Agentic
 
Skills
 
for
 
Claude
 
Code,
 
Gemini
 
CLI,
 
Cursor ,
 
Copilot
 
&
 
More
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/sickn33/antigravity-awesome-skills
 
24.
 
antigravity-awesome-skills/CA TALOG.md
 
at
 
main
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/sickn33/antigravity-awesome-skills/blob/main/CA TALOG.md
 
25.
 
How
 
to
 
Integrate
 
Planetary
 
Data
 
into
 
Your
 
Astrology
 
App
 
-
 
DEV
 
Community ,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://dev .to/kamal_deeppareek_f5bb5d8/how-to-integrate-planetary-data-into-yo 
ur-astrology-app-2cgo
 
26.
 
theriftlab/immanuel-python:
 
Quickly
 
produce
 
both
 
human-readable
 
and
 
JSON-formatted
 
astrology
 
chart
 
data
 
based
 
on
 
the
 
Swiss
 
Ephemeris
 
and
 
astro.com.
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/theriftlab/immanuel-python
 
27.
 
astrorigin/pyswisseph:
 
Python
 
extension
 
to
 
the
 
Swiss
 
Ephemeris
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/astrorigin/pyswisseph
 
28.
 
Programming
 
interface
 
to
 
the
 
Swiss
 
Ephemeris
 
-
 
Accurate
 
Predict,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
http://accupredict.in/sweph/doc/swephprg.htm
 
29.
 
astroahava/astro-sweph:
 
High
 
precision
 
Swiss
 
Ephemeris
 
WebAssembly
 
library
 
for
 
professional
 
astrological
 
calculations.
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/astroahava/astro-sweph
 
30.
 
katelouie/stellium:
 
A
 
modern
 
Python
 
library
 
for
 
astrological
 
chart
 
calculation,
 
visualization,
 
reporting
 
and
 
data
 
analysis.
 
Built
 
on
 
the
 
Swiss
 
Ephemeris
 
for
 
astronomical
 
accuracy .
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/katelouie/stellium
 
31.
 
python
 
pyswisseph
 
calculate
 
planets
 
rashi
 
or
 
zodiac
 
signs
 
-
 
GitHub
 
Gist,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://gist.github.com/EH30/6133342b67827e14add07a37b5cfb941
 
32.
 
Calculating
 
House
 
Cusps
 
-
 
Swisseph
 
-
 
Groups.io,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://groups.io/g/swisseph/topic/calculating_house_cusps/27494337
 
33.
 
Astrology
 
·
 
pypi
 
packages
 
-
 
Socket,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://socket.dev/search?e=pypi&q=Astrology
 
34.
 
kerykeion
 
-
 
PyPI,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://pypi.org/project/kerykeion/
 
35.
 
Astrology
 
library
 
OpenAstro2
 
-
 
GitHub,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://github.com/dimmastro/openastro2
 
36.
 
Need
 
a
 
little
 
Guidance
 
for
 
astrology-based
 
python
 
script
 
-
 
Reddit,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www .reddit.com/r/astrology/comments/7kg04z/need_a_little_guidance_for_ 
astrologybased_python/
 

## Page 17

37.
 
natal
 
-
 
PyPI,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://pypi.org/project/natal/
 
38.
 
"Pretty
 
vector
 
graphics
 
-
 
Playing
 
with
 
SVG
 
in
 
Python"
 
-
 
Amanda
 
J
 
Hogan
 
(PyCon
 
AU
 
2019),
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www .youtube.com/watch?v=Y -hQn4KQA70
 
39.
 
Show
 
HN:
 
Turn
 
raw
 
HTML
 
into
 
production-ready
 
images
 
for
 
free
 
|
 
Hacker
 
News,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://news.ycombinator .com/item?id=46371743
 
40.
 
Antigravity
 
Rules
 
&
 
Custom
 
Instructions
 
|
 
ESLint,
 
TypeScript,
 
Python
 
Prompts,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity .codes/rules
 
41.
 
Animating
 
SVGs
 
with
 
Python
 
Scripts
 
-
 
fabian
 
writes.,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://capnfabs.net/posts/svg-animations-python-script/
 
42.
 
Google
 
AI
 
Studio.
 
Best
 
For
 
Quickly
 
building
 
and…
 
|
 
by
 
Balki
 
Maharaj
 
|
 
Medium,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://medium.com/@nexusphere/google-ai-studio-4373b5aaab77
 
43.
 
Artifacts
 
-
 
Google
 
Antigravity
 
Documentation,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity .google/docs/artifacts
 
44.
 
Google
 
Antigravity
 
Documentation,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity .google/docs/home
 
45.
 
The
 
Google
 
Antigravity
 
website,
 
rebuilt
 
with
 
Modern
 
CSS
 
-
 
Bram.us,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www .bram.us/2025/12/02/google-antigravity-modern-css/
 
46.
 
Google
 
Antigravity
 
Product,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity .google/product
 
47.
 
Build
 
with
 
Google
 
Antigravity ,
 
our
 
new
 
agentic
 
development
 
platform,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-d
evelopment-platform/
 
48.
 
5
 
Useful
 
Things
 
to
 
Do
 
with
 
Google's
 
Antigravity
 
Besides
 
Coding
 
...,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://www .kdnuggets.com/5-useful-things-to-do-with-googles-antigravity-besides 
-coding
 
49.
 
Introducing
 
Google
 
Antigravity ,
 
a
 
New
 
Era
 
in
 
AI-Assisted
 
Software
 
Development,
 
otwierano:
 
kwietnia
 
22,
 
2026,
 
https://antigravity .google/blog/introducing-google-antigravity
 