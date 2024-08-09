#!/usr/bin/bash

# HELPER FUNCTIONS
fail (){
	echo "$1, quitting..."
	exit 1
}

stage (){
	echo "** $1 ..."
}

# PROGRAM
if [ ! -d src ]; then
	fail "Wrong current dir $(pwd)"
fi

target="$1"

if [ -z "$target" ]; then
	fail "No target specified"
fi

stage "Copy manifest.json"
cd src || exit 1
cp "platform/$target/manifest.json" .

stage "Copy locales"
cp -r ../_locales .

stage "Load the extension with 'Load unpacked' \
in chrome://extensions with developer mode enabled"
