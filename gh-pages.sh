#!/bin/bash

rm *\.html \
; dos2unix posts/* \
&& ~/RustApps/my_mdblog/target/release/mdblog build \
&& cp -r _build/* . \
&& cp posts/* . \
&& cp tags/* . \
&& ls | grep \.html | xargs -I {} sed -i 's!/static!static!g' {} \
&& ls | grep \.html | xargs -I {} sed -i 's!/posts\/!.\/!g' {} \
&& ls | grep \.html | xargs -I {} sed -i 's!/tags\/!.\/!g' {} \
&& ls | grep \.html | xargs -I {} sed -i 's!href="/!href="./!g' {} \

