.PHONY: all clean check init upload

CP		= rsync -rC
FOTKY	= $(wildcard fotky/*jpg)
NAHLEDY	= $(patsubst fotky/%.jpg, build/nahledy/%.jpg, $(FOTKY))

all: init $(NAHLEDY)
	$(CP) fotky build
	$(CP) src/*.css src/index.html src/*.js src/img build
	vlnka `find build -name '*.html'`
	try svn info | grep "Last Changed" > build/REVISION

build/nahledy/%.jpg: fotky/%.jpg
	@echo Dělám náhled: $<
	@cp $< $@
	@mogrify -format jpg -thumbnail x150 $@

check: all
	find build/ -name '*.html' -exec xmllint --noout --valid {} \;
	linkcheck `find build/ -name '*.html'`

upload: all
	@echo 
	@echo "*** Na nic nesahej, po ničem nepátrej a nic nepřepínej,"
	@echo "*** upload funguje automaticky. Na výzvě pro heslo se to"
	@echo "*** na chvilku zarazí, ale to je normální; nic nezadávej."
	@echo 
	@rsync-wrapper "HLw3Rv5K" rsync -pvtrl \
		build/ blatnice_eu@www.blatnice.eu:blatnice.eu

clean:
	rm -rf build/

init:
	mkdir -p build/nahledy
