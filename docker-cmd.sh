#!/bin/bash

npx prisma db push
npx prisma generate
npm run build
npx prisma db seed
npm run start