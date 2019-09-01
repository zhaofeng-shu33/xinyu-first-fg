#!/bin/bash
# wget http://gosspublic.alicdn.com/ossutil/1.5.2/ossutil64
# chmod 755 ossutil64
ossutil -u -i LTAIhGvOLG5VLaqh -k $AccessKeySecret -e http://oss-cn-shenzhen.aliyuncs.com cp -r build/ oss://yiqiaifa/
