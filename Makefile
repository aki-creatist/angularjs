DEFAULT=""
DEV1=""
PROD=""
STAGE=""

ifeq ($(NODE_ENV),dev1)
  JS=$(DEV1)
endif
ifeq ($(NODE_ENV),stage)
  JS=$(STAGE)
endif
ifeq ($(NODE_ENV),prod)
  JS=$(PROD)
endif
ifeq ($(JS),)
  JS=$(DEFAULT)
endif

install: convert
	npm install
	npm update
	bower install --force-latest --config.interactive=false
	./node_modules/gulp/bin/gulp.js build

create-config: convert
	./node_modules/gulp/bin/gulp.js ngconfig

serve: convert
	./node_modules/gulp/bin/gulp.js serve

test: convert
	./node_modules/gulp/bin/gulp.js test

convert:
	cat src/index.html | sed -e "s@<script src=\".*\"><\/script>@<script src=\"$(JS)\"><\/script>@" > src/index.html.mod
	mv src/index.html.mod src/index.html

