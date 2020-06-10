#!/bin/bash

rm -rf ./src/main/client/dist
yarn --cwd ./src/main/client build && mvn clean:clean && mvn compiler:compile && mvn war:war
rm -rf $CATALINA_HOME/webapps/image-gallery-js && rm $CATALINA_HOME/webapps/image-gallery-js.war
cp ./target/image-gallery-js.war $CATALINA_HOME/webapps/