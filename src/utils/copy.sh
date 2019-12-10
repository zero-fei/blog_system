#! /bin/sh
cd /Users/zenglongfei/node-study/blog_system/logs
cp access.log $(date +%Y-%m-%d).access.log
echo ""> access.log