#!/bin/bash

# Requires autosub
#
# pip install git+https://github.com/BingLingGroup/autosub.git@dev ffmpeg-normalize langcodes

autosub -i $1 -sapi gcsv1 -S en -F vtt -skey $2