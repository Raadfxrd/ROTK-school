# Technische documentatie Joas

### Rooms

KarasValeForestRoom:

In KarasValeForestRoom staan standaard acties zoals examine navigate en talk to. Ook staat er een use item actie. Als de speler deze actie uitvoert op het KaraWhistleItem wordt de image van de room vervangen met een nieuwe image. Deze image wordt daarna de default image van de room. Na een interactie met KaraCharacter wordt een knop Volo's village beschikbaar, dit is een navigate acite.

KarasValeTownSquareRoom:

De speler komt aan in de room vanaf Wolburg, eerst zijn er alleen de knoppen wolburg en go north beschikbaar als navigatie.
Als de speler go north klikt wordt de boolean "wentNorth" op true gezet en worden meer knoppen beschikbaar gezet. Als de speler in de kamer met het aurelius character praat en de juiste dialoog volgt komen er opties voor navigatie naar het westen vrij. Als de speler na het bezoeken van volos Village terug komt in kara's vale en beide helften van het medaillon bezit wat in de kamers volosvillageroom en KarasValeForestRoom verdient kunnen worden, komt er een knop voor navigatie naar de lowlands beschikbaar.

### Items

KVForestItem:

Een klein item waar een examine actie op kan worden uitgevoerd met als doel om wat ruimte in de kamer op te vullen.

KVFallenTreeItem:

Een zelfde geval als KVForestItem

KaraWhistleItem:

Een item dat aan de speler wordt gegeven door het Aurelius character. Met dit item kan de speler Kara tevoorschijn brengen als ze in de juiste plek erop fluiten. Als de speler een useItem actie op de fluit uitvoert wordt er gekeken of de speler in de juiste room staat, zo ja wordt de boolean "SummonedKara" naar true gezet. Dan wordt er nog een keer gekeken of de speler in de juiste room is en of boolean "summonedKara" true is zo ja, wordt er een nieuwe image met Kara gereturned.

### Characters

Aurelius:

Aurelius is een character met meerdere talk opties. Hij zet de boolean knowsOfKara naar true als het juiste dialoog pad gevolgd wordt. Dit zorgt ervoor dat er een navigate optie naar het westen verschijnt zodat de speler doorkan met het spel.

### Actions

UseItemAction:

UseItemAction volgt de standaard procedure van acties, er zit een handle functie in zodat gameobjects de actie kunnen implementeren. De actie kan ook als knop worden neergezet waarop "use item" staat.

NavigateAction:

NavigateAction gebruikt geen handle functie omdat het een actie is die niet op gameobjects uitgevoerd wordt. In plaats daarvan is de actie gemaakt om knoppen aan te kunnen maken die de naam van de bestemming kunnen hebben.
