[![CircleCI](https://circleci.com/gh/just-paja/radio-drama-queen.svg?style=shield)](https://circleci.com/gh/just-paja/radio-drama-queen)
[![Code Climate](https://codeclimate.com/github/just-paja/radio-drama-queen/badges/gpa.svg)](https://codeclimate.com/github/just-paja/radio-drama-queen)
[![Test Coverage](https://codeclimate.com/github/just-paja/radio-drama-queen/badges/coverage.svg)](https://codeclimate.com/github/just-paja/radio-drama-queen/coverage)
[![Issue Count](https://codeclimate.com/github/just-paja/radio-drama-queen/badges/issue_count.svg)](https://codeclimate.com/github/just-paja/radio-drama-queen)
[![dependencies Status](https://david-dm.org/just-paja/radio-drama-queen/status.svg)](https://david-dm.org/just-paja/radio-drama-queen)
[![devDependencies Status](https://david-dm.org/just-paja/radio-drama-queen/dev-status.svg)](https://david-dm.org/just-paja/radio-drama-queen?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/just-paja/radio-drama-queen/badge.svg)](https://snyk.io/test/github/just-paja/radio-drama-queen)

# radio-drama-queen

This application acts as a sound library and soundboard. It's original purpose is to give theatre/radio improvisers ability to quickly select and play sounds that fit in their story.

Developers, go to [Contributing guide]('./CONTRIBUTING.md')

## Features

### Sound modules

RDQ expects you to define a sound library first. The library is composed of modules, each module contains a list of sounds described by tags.

### Sound library

The library is used to browse available sounds and search for them via name or tags. User creates sound boards from the library.

### Sound boards

User takes sounds from the library and puts them onto named sound boards. Sounds are groupped in named categories. Categories can be created manually, or simply by clicking tag name when browsing the sound library. Sounds can be dragged among the categories in the library.

### Sound categories

Each category has controls for volume, loop, sound exclusivity and a stop button. A sound can be only in one category.

### Sound storage

You define where the sounds are stored. For the moment, only remotely stored libaries are supported as it is convenient for other team members who can download the library without sharing large zipfiles.
