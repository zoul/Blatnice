PATH := share/bin:${PATH}
FOTKY = $(wildcard fotky/*jpg)
NAHLEDY = $(patsubst fotky/%.jpg, build/nahledy/%.jpg, $(FOTKY))
CP = rsync -rC

all: init $(NAHLEDY)
	ln -sf ../fotky build/
	$(CP) src/*.css src/index.html src/*.js src/img build
	vlnka `find build -name '*.html'`

build/nahledy/%.jpg: fotky/%.jpg
	@echo Dělám náhled: $<
	@cp $< $@
	@mogrify -format jpg -thumbnail x150 $@

upload: all
	@echo 
	@echo "*** Na nic nesahej, po ničem nepátrej a nic nepřepínej,"
	@echo "*** upload funguje automaticky. Na výzvě pro heslo se to"
	@echo "*** na chvilku zarazí, ale to je normální; nic nezadávej."
	@echo 
	rsync -pvtrlL --cvs-exclude --delete build/ nemesis:sites/blatnice.eu

clean:
	rm -rf build/

init:
	mkdir -p build/nahledy
