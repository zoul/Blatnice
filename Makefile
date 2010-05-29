FOTKY = $(wildcard fotky/*jpg)
NAHLEDY = $(patsubst fotky/%.jpg, build/nahledy/%.jpg, $(FOTKY))
CP = rsync -rC

all: init $(NAHLEDY)
	ln -sf ../fotky build/
	$(CP) src/*.css src/index.html src/*.js src/img build

build/nahledy/%.jpg: fotky/%.jpg
	@echo Dělám náhled: $<
	@cp $< $@
	@mogrify -format jpg -thumbnail x150 $@

upload: all
	rsync -pvtrlL --cvs-exclude --delete build/ brewers:sites/blatnice.eu

clean:
	rm -rf build/

init:
	mkdir -p build/nahledy
