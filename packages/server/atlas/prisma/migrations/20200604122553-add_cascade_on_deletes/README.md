# Migration `20200604122553-add_cascade_on_deletes`


You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."user_addresses" DROP CONSTRAINT IF EXiSTS "user_addresses_userId_fkey",
DROP COLUMN "userId",
ADD COLUMN "userId" text  NOT NULL ;

ALTER TABLE "public"."user_email_history" DROP CONSTRAINT IF EXiSTS "user_email_history_userId_fkey",
DROP COLUMN "userId",
ADD COLUMN "userId" text  NOT NULL ;

ALTER TABLE "public"."user_addresses" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."user_email_history" ADD FOREIGN KEY ("userId")REFERENCES "public"."users"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200603234442-create_user_email_history..20200604122553-add_cascade_on_deletesn
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
@@ -34,20 +34,20 @@
   state          String
   type           String   @default("shipping")
   createdAt      DateTime @default(now())
   updatedAt      DateTime @default(now())
-  User           User?    @relation(fields: [userId], references: [id])
-  userId         String?
+  User           User     @relation(fields: [userId], references: [id])
+  userId         String
 }
 model UserEmailHistory {
   @@map(name: "user_email_history")
   id        String   @default(uuid()) @id
   email     String
   changedAt DateTime @default(now())
-  User      User?    @relation(fields: [userId], references: [id])
-  userId    String?
+  User      User     @relation(fields: [userId], references: [id])
+  userId    String
 }
 model Team {
   @@map(name: "teams")
```


