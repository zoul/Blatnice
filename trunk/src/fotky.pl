#!/usr/bin/perl

use strict;
use warnings;

while (my $line = <DATA>) {
	chomp $line;
	my ($id, $caption) = split(/:/, $line);
	print<<"cut"
	<div class="fotka">
		<a href="fotky/$id.jpg">
			<img src="nahledy/$id.jpg" alt="$caption">
		</a>
		<p>$caption</p>
	</div>
cut
}

__DATA__
hlavni-budova:Hlavní budova
veranda:Veranda
chata:Velká chata
chatka:Malá chata
chatky:Malé chatky v horní řadě
coufalka:„Coufalka“
zachod:Nové záchody
horni-hriste-1:Horní hřiště
horni-hriste-2:Horní hřiště shora
gol:Horní hřiště v akci
horni-hriste-3:Horní hřiště v plné šířce
lod:Loď a rybník volně k mání
molo-1:Molo směrem z horního hřiště
molo-2:Molo II
ohniste:Ohniště
spodni-hriste:Spodní hřiště
prijem:Nohejbal na spodním hřišti
tenis:Tenis na spodním hřišti
zadni-hriste:Zadní hřiště
rybnik-1:Rybník I
rybnik-2:Rybník s plachetnicí
rybnik-3:Rybník III
voda:Rybník v akci
hrib:Takové tu běžně rostou
snek:Vodní živočich z jiného rybníka
vodnik:V přilehlých lesích se najde leccos
vazka:Vážka
kanoe:Jedna z dvou kánoí v akci
