#!/usr/bin/env sh
URL="$(now --public)";
now alias set "$URL" alienrides.com
now alias set "$URL" www.alienrides.com
now alias set "$URL" alien-rides.now.sh
now remove alien-rides --yes --safe
