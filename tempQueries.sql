-- DROP TABLE IF EXISTS "TempCategories"; 
-- SELECT * INTO "TempCategories" FROM "Categories";
SET session_replication_role = 'replica';
DELETE FROM "Categories";
SET session_replication_role = 'origin';
INSERT INTO "Categories" SELECT * FROM "TempCategories";


-- DROP TABLE IF EXISTS "TempSummaries"; 
-- SELECT * INTO "TempSummaries" FROM "Summaries";
SET session_replication_role = 'replica';
DELETE FROM "Summaries";
SET session_replication_role = 'origin';
INSERT INTO "Summaries" SELECT * FROM "TempSummaries";