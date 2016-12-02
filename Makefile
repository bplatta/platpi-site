.PHONY: help build purge

major_version := 0
minor_version := 1
build_number := 0
version := $(major_version).$(minor_version).$(build_number)

help:
	@echo
	@echo "Platpi site makefile"
	@echo "usage: make [target] ..."
	@echo
	@egrep "^# target:" [Mm]akefile
	@echo

# target: build - Build an APP Docker image
build:
	@echo
	@echo "Compiling website..."
	@echo
	rm -rf ./public/*
	@echo
	hugo -v


# target: purge - Delete compiled site
purge:
	rm -rf ./public/*
