# Migration `20200603234442-create_user_email_history`

You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."user_email_history" (
"changedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,"email" text  NOT NULL ,"id" text  NOT NULL ,"userId" text   ,
    PRIMARY KEY ("id"))

ALTER TABLE "public"."user_email_history" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE SET NULL  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200603231715-create_teams_and_addresses..20200603234442-create_user_email_history
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
@@ -9,14 +9,15 @@
 model User {
   @@map(name: "users")
-  id        String    @default(uuid()) @id
-  email     String    @unique
-  name      String
-  password  String
-  teams     Team[]    @relation(references: [id])
-  addresses UserAddress[]
+  id               String             @default(uuid()) @id
+  email            String             @unique
+  name             String
+  password         String
+  teams            Team[]             @relation(references: [id])
+  addresses        UserAddress[]
+  UserEmailHistory UserEmailHistory[]
 }
 model UserAddress {
   @@map(name: "user_addresses")
@@ -37,8 +38,18 @@
   User           User?    @relation(fields: [userId], references: [id])
   userId         String?
 }
+model UserEmailHistory {
+  @@map(name: "user_email_history")
+
+  id        String   @default(uuid()) @id
+  email     String
+  changedAt DateTime @default(now())
+  User      User?    @relation(fields: [userId], references: [id])
+  userId    String?
+}
+
 model Team {
   @@map(name: "teams")
   id        String   @default(uuid()) @id
```


