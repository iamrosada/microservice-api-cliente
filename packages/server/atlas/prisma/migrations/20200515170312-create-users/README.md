# Migration `20200515170312-create-users`

You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."users" (
"email" text  NOT NULL ,"id" text  NOT NULL ,"name" text  NOT NULL ,"password" text  NOT NULL ,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "users.email" ON "public"."users"("email")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200515170312-create-users
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id       String   @default(uuid()) @id
+  email    String   @unique
+  name     String
+  password String
+
+  @@map(name: "users")
+}
```


