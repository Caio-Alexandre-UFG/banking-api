# UFG - ESPECIALIZAÇÃO EM DESENVOLVIMENTO WEB E MOBILE – FULL STACK
 
## Project example - Nodejs with MongoDB

### Requirements/Knowledge and Technologies used
* NodeJs v.20  
   (Source: https://nodejs.org/)
* Express
   (Source: https://expressjs.com/)
* Prisma
   (Source: https://www.prisma.io/)
* Node com TypeScript
   (Source: https://nodejs.org/en/learn/getting-started/nodejs-with-typescript) 
* Ts-node-dev
   (Source: https://www.npmjs.com/package/ts-node-dev)
* Mongo Atlas
  (Source: https://www.mongodb.com/cloud/atlas/register?utm_content=rlsapostreg&utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_retarget-brand-postreg_gic-null_amers-all_ps-all_desktop_eng_lead&utm_term=&utm_medium=cpc_paid_search&utm_ad=&utm_ad_campaign_id=14412646452&adgroup=131761126052&cq_cmp=14412646452&gad_source=1&gclid=Cj0KCQjw8pKxBhD_ARIsAPrG45n5uONDTrtNnJEyrSgdry_f7NbtWODER_RY2Wp1E6T5Z9UrBPp2yrMaAvUoEALw_wcB)

### Start project
 ```bashh
$ npm init -y
 ```

### Install libraries
 ```bashh
$ npm install express
$ npm install prisma -D
$ npm install @prisma/client -D
$ npm install @types/express -D
$ npm install @types/node -D
$ npm install typescript -D
$ npm install ts-node-dev -D
 ```

 ### Start typescrit
 ```bashh
$ npx tsc --init
 ```

 ### Start prisma
 ```bashh
$ npx prisma init
 ```

### Genate prisma
 ```bashh
$ npx prisma generate
 ```

### Start prisma studio 
 ```bashh
$ npx prisma studio
 ```

### Application/resource:
* http://localhost:3000/checkingaccounts