#!/bin/bash

rm -rf ./src/main/client/dist
yarn --cwd ./src/main/client build && mvn clean:clean && mvn compiler:compile && mvn war:war && sudo rm -rf $CATALINA_HOME/webapps/image-gallery-js && sudo rm -f $CATALINA_HOME/webapps/image-gallery-js.war && sudo cp ./target/image-gallery-js.war $CATALINA_HOME/webapps/