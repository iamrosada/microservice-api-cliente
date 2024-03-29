# Migration `20200603231715-create_teams_and_addresses`

You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."user_addresses" (
"city" text  NOT NULL ,"complement" text  NOT NULL ,"country" text  NOT NULL ,"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"foreignCountry" boolean  NOT NULL DEFAULT false,"id" text  NOT NULL ,"neighborhood" text  NOT NULL ,"number" text  NOT NULL ,"postalCode" text  NOT NULL ,"state" text  NOT NULL ,"streetName" text  NOT NULL ,"type" text  NOT NULL DEFAULT E'shipping',"updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"userId" text   ,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."teams" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"id" text  NOT NULL ,"title" text  NOT NULL ,"updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"))

CREATE TABLE "public"."_TeamToUser" (
"A" text  NOT NULL ,"B" text  NOT NULL )

CREATE UNIQUE INDEX "_TeamToUser_AB_unique" ON "public"."_TeamToUser"("A","B")

CREATE  INDEX "_TeamToUser_B_index" ON "public"."_TeamToUser"("B")

ALTER TABLE "public"."user_addresses" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE SET NULL  ON UPDATE CASCADE

ALTER TABLE "public"."_TeamToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."teams"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_TeamToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200515170312-create-users..20200603231715-create_teams_and_addresses
--- datamodel.dml
+++ datamodel.dml
@@ -1,17 +1,49 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model User {
-  id       String   @default(uuid()) @id
-  email    String   @unique
-  name     String
-  password String
+  @@map(name: "users")
-  @@map(name: "users")
-}
+  id        String    @default(uuid()) @id
+  email     String    @unique
+  name      String
+  password  String
+  teams     Team[]    @relation(references: [id])
+  addresses UserAddress[]
+}
+
+model UserAddress {
+  @@map(name: "user_addresses")
+
+  id             String   @default(uuid()) @id
+  country        String
+  foreignCountry Boolean  @default(false)
+  postalCode     String
+  streetName     String
+  number         String
+  complement     String
+  neighborhood   String
+  city           String
+  state          String
+  type           String   @default("shipping")
+  createdAt      DateTime @default(now())
+  updatedAt      DateTime @default(now())
+  User           User?    @relation(fields: [userId], references: [id])
+  userId         String?
+}
+
+model Team {
+  @@map(name: "teams")
+
+  id        String   @default(uuid()) @id
+  title     String
+  createdAt DateTime @default(now())
+  updatedAt DateTime @default(now())
+  users     User[]   @relation(references: [id])
+}
```


