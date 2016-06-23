#
	
# Colors
NO_COLOR		= \033[0m
TARGET_COLOR	= \033[32;01m
OK_COLOR		= \033[32;01m
ERROR_COLOR		= \033[31;01m
WARN_COLOR		= \033[33;01m
ACTION			= $(TARGET_COLOR)--> 
HELPTEXT 		= "$(ACTION)" `egrep "^\# target: $(1) " Makefile | sed "s/\# target: $(1)[ ]\+- / /g"` "$(NO_COLOR)"



# The fileset
JS_FILES 	= webroot/js/asteroids.js
JS_MINIFIED = $(JS_FILES:.js=.min.js)

LESS_FILES 		= css/asteroids.less
LESS_COMPILED 	= $(LESS_FILES:.less=.css)
LESS_MINIFIED 	= $(LESS_FILES:.less=.min.css)

HTML_FILES	= $(wildcard *.html)



#
# Tool to compile and minify less code
#
LESS_COMPILE			= lessc
LESS_COMPILE_OPTIONS 	= 

LESS_MINIFY				= $(LESS_COMPILE)
LESS_MINIFY_OPTIONS 	= --clean-css

LESS_LINT				= $(LESS_COMPILE)
LESS_LINT_OPTIONS 		= --lint



# Tool to compile, check and minimize javascript code
JS_CODESTYLE 			= jscs
JS_CODESTYLE_OPTIONS 	=

JS_LINT 				= jshint
JS_LINT_OPTIONS 		=

JS_MINIFY 			= uglifyjs
JS_MINIFY_OPTIONS 	= --mangle --compress --screw-ie8 --comments

JS_COMPILE 			= webpack
JS_COMPILE_OPTIONS 	= --config .webpack.config.js



#
# Tool to lint HTML code
#
HTML_LINT 			= htmlhint
HTML_LINT_OPTIONS 	= 



# target: help       - Displays help for this Makefile.
.PHONY:  help
help:
	@echo $(call HELPTEXT,$@)
	@echo "Usage:"
	@echo " make [target] ..."
	@echo "target:"
	@egrep "^# target:" Makefile | sed 's/# target: / /g'



# target: js-compile - Compile JavaScript.
PHONY: js-compile
js-compile: 
	@echo $(call HELPTEXT,$@)
	$(JS_COMPILE) $(JS_COMPILE_OPTIONS)




# ------------------------------------------------------------------------
#
# General and combined targets
#

# target: all - Default target, run tests and build
all: test build


# target: test - Do all tests
test: js-cs js-lint less-lint html-lint



# target: build - Do all build
build: less-compile less-minify js-minify



# target: clean - Removes generated files and directories.
clean:
	@echo "Target clean not implemented."
	#rm -f $(CSS_MINIFIED) $(JS_MINIFIED)



# ------------------------------------------------------------------------
#
# LESS
#

# target: less-compile - Compile LESS to CSS
less-compile: $(LESS_FILES) $(LESS_COMPILED)

%.css: %.less
	@echo "==> LESS compiling $<"
	$(LESS_COMPILE) $(LESS_COMPILE_OPTIONS) $< $@ 



# target: less-minify - Minify LESS files to min.css
less-minify: $(LESS_FILES) $(LESS_MINIFIED)

%.min.css: %.less
	@echo "==> LESS minifying $<"
	$(LESS_MINIFY) $(LESS_MINIFY_OPTIONS) $< $@



# target: less-lint - Lint LESS files
less-lint: $(LESS_FILES)
	@echo "==> LESS linting $<"
	$(LESS_LINT) $(LESS_LINT_OPTIONS) $<



# ------------------------------------------------------------------------
#
# JavaScript
#
.PHONY: js-cs js-lint 

# target: js-minify - Minify JavaScript files to min.js
js-minify: $(JS_FILES) $(JS_MINIFIED)

%.min.js: %.js
	@echo "==> Minifying $<"
	$(JS_MINIFY) $(JS_MINIFY_OPTIONS) --output $@ $<



# target: js-cs - Check codestyle in javascript files
js-cs:
	@for file in $(JS_FILES); do \
		echo "==> JavaScript codestyle $$file"; \
		$(JS_CODESTYLE) $(JS_CODESTYLE_OPTIONS) $$file; \
	done



# target: js-lint - Lint javascript files
js-lint:
	@for file in $(JS_FILES); do \
		echo "==> JavaScript lint $$file"; \
		$(JS_LINT) $(JS_LINT_OPTIONS) $$file; \
	done
	@echo



# ------------------------------------------------------------------------
#
# HTML
#
.PHONY:	html-lint

# target: html-lint - Lint HTML files
html-lint:
	@for file in $(HTML_FILES); do \
		echo -n "==> HTML linting $$file"; \
		$(HTML_LINT) $(HTML_LINT_OPTIONS) $$file | grep -v "Config loaded: "; \
	done
