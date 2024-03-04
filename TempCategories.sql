/*
 Navicat Premium Data Transfer

 Source Server         : Localhost PSQL
 Source Server Type    : PostgreSQL
 Source Server Version : 160002 (160002)
 Source Host           : localhost:5432
 Source Catalog        : gue-star
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160002 (160002)
 File Encoding         : 65001

 Date: 04/03/2024 20:33:23
*/


-- ----------------------------
-- Table structure for TempCategories
-- ----------------------------
DROP TABLE IF EXISTS "public"."TempCategories";
CREATE TABLE "public"."TempCategories" (
  "id" int4,
  "Country" varchar(255) COLLATE "pg_catalog"."default",
  "ISO3" varchar(255) COLLATE "pg_catalog"."default",
  "UNICEF_Region" varchar(255) COLLATE "pg_catalog"."default",
  "Sex" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6),
  "updatedAt" timestamptz(6)
)
;

-- ----------------------------
-- Records of TempCategories
-- ----------------------------
INSERT INTO "public"."TempCategories" VALUES (1, 'Algeria', 'DZA', 'MENA', 'Female', '2024-03-03 22:21:49.764659+07', '2024-03-03 22:21:49.764659+07');
INSERT INTO "public"."TempCategories" VALUES (2, 'Argentina', 'ARG', 'LAC', 'Female', '2024-03-03 22:21:49.773395+07', '2024-03-03 22:21:49.773395+07');
INSERT INTO "public"."TempCategories" VALUES (3, 'Bangladesh', 'BGD', 'SA', 'Female', '2024-03-03 22:21:49.774248+07', '2024-03-03 22:21:49.774248+07');
INSERT INTO "public"."TempCategories" VALUES (4, 'Central African Republic', 'CAF', 'WCA', 'Female', '2024-03-03 22:21:49.775094+07', '2024-03-03 22:21:49.775094+07');
INSERT INTO "public"."TempCategories" VALUES (5, 'Central African Republic', 'CAF', 'WCA', 'Male', '2024-03-03 22:21:49.775938+07', '2024-03-03 22:21:49.775938+07');
INSERT INTO "public"."TempCategories" VALUES (6, 'Chad', 'TCD', 'WCA', 'Female', '2024-03-03 22:21:49.776846+07', '2024-03-03 22:21:49.776846+07');
INSERT INTO "public"."TempCategories" VALUES (7, 'Chad', 'TCD', 'WCA', 'Male', '2024-03-03 22:21:49.777964+07', '2024-03-03 22:21:49.777964+07');
INSERT INTO "public"."TempCategories" VALUES (8, 'Congo DR', 'COD', 'WCA', 'Female', '2024-03-03 22:21:49.77868+07', '2024-03-03 22:21:49.77868+07');
INSERT INTO "public"."TempCategories" VALUES (9, 'Congo DR', 'COD', 'WCA', 'Male', '2024-03-03 22:21:49.779332+07', '2024-03-03 22:21:49.779332+07');
INSERT INTO "public"."TempCategories" VALUES (10, 'Cuba', 'CUB', 'LAC', 'Female', '2024-03-03 22:21:49.779917+07', '2024-03-03 22:21:49.779917+07');
INSERT INTO "public"."TempCategories" VALUES (11, 'Cuba', 'CUB', 'LAC', 'Male', '2024-03-03 22:21:49.780586+07', '2024-03-03 22:21:49.780586+07');
INSERT INTO "public"."TempCategories" VALUES (12, 'Gambia', 'GMB', 'WCA', 'Female', '2024-03-03 22:21:49.781257+07', '2024-03-03 22:21:49.781257+07');
INSERT INTO "public"."TempCategories" VALUES (13, 'Gambia', 'GMB', 'WCA', 'Male', '2024-03-03 22:21:49.781925+07', '2024-03-03 22:21:49.781925+07');
INSERT INTO "public"."TempCategories" VALUES (14, 'Ghana', 'GHA', 'WCA', 'Female', '2024-03-03 22:21:49.783102+07', '2024-03-03 22:21:49.783102+07');
INSERT INTO "public"."TempCategories" VALUES (15, 'Guinea Bissau', 'GNB', 'WCA', 'Female', '2024-03-03 22:21:49.78382+07', '2024-03-03 22:21:49.78382+07');
INSERT INTO "public"."TempCategories" VALUES (16, 'Guinea Bissau', 'GNB', 'WCA', 'Male', '2024-03-03 22:21:49.784546+07', '2024-03-03 22:21:49.784546+07');
INSERT INTO "public"."TempCategories" VALUES (17, 'Iraq', 'IRQ', 'MENA', 'Female', '2024-03-03 22:21:49.785194+07', '2024-03-03 22:21:49.785194+07');
INSERT INTO "public"."TempCategories" VALUES (18, 'Kiribati', 'KIR', 'EAP', 'Female', '2024-03-03 22:21:49.785948+07', '2024-03-03 22:21:49.785948+07');
INSERT INTO "public"."TempCategories" VALUES (19, 'Kiribati', 'KIR', 'EAP', 'Male', '2024-03-03 22:21:49.786733+07', '2024-03-03 22:21:49.786733+07');
INSERT INTO "public"."TempCategories" VALUES (20, 'Lao PDR', 'LAO', 'EAP', 'Female', '2024-03-03 22:21:49.787292+07', '2024-03-03 22:21:49.787292+07');
INSERT INTO "public"."TempCategories" VALUES (21, 'Lesotho', 'LSO', 'ESA', 'Female', '2024-03-03 22:21:49.788013+07', '2024-03-03 22:21:49.788013+07');
INSERT INTO "public"."TempCategories" VALUES (22, 'Madagascar', 'MDG', 'ESA', 'Female', '2024-03-03 22:21:49.788792+07', '2024-03-03 22:21:49.788792+07');
INSERT INTO "public"."TempCategories" VALUES (23, 'Madagascar', 'MDG', 'ESA', 'Male', '2024-03-03 22:21:49.789513+07', '2024-03-03 22:21:49.789513+07');
INSERT INTO "public"."TempCategories" VALUES (24, 'Malawi', 'MWI', 'ESA', 'Female', '2024-03-03 22:21:49.790152+07', '2024-03-03 22:21:49.790152+07');
INSERT INTO "public"."TempCategories" VALUES (25, 'Malawi', 'MWI', 'ESA', 'Male', '2024-03-03 22:21:49.790786+07', '2024-03-03 22:21:49.790786+07');
INSERT INTO "public"."TempCategories" VALUES (26, 'Mongolia', 'MNG', 'EAP', 'Female', '2024-03-03 22:21:49.79136+07', '2024-03-03 22:21:49.79136+07');
INSERT INTO "public"."TempCategories" VALUES (27, 'Nepal', 'NPL', 'SA', 'Female', '2024-03-03 22:21:49.791968+07', '2024-03-03 22:21:49.791968+07');
INSERT INTO "public"."TempCategories" VALUES (28, 'Nepal', 'NPL', 'SA', 'Male', '2024-03-03 22:21:49.792656+07', '2024-03-03 22:21:49.792656+07');
INSERT INTO "public"."TempCategories" VALUES (29, 'Pakistan (Azad Jammu and Kashmir)', 'PAK', 'SA', 'Female', '2024-03-03 22:21:49.793298+07', '2024-03-03 22:21:49.793298+07');
INSERT INTO "public"."TempCategories" VALUES (30, 'Pakistan (Azad Jammu and Kashmir)', 'PAK', 'SA', 'Male', '2024-03-03 22:21:49.793953+07', '2024-03-03 22:21:49.793953+07');
INSERT INTO "public"."TempCategories" VALUES (31, 'Pakistan (Khyber Pakhtunkhwa)', 'PAK', 'SA', 'Female', '2024-03-03 22:21:49.794628+07', '2024-03-03 22:21:49.794628+07');
INSERT INTO "public"."TempCategories" VALUES (32, 'Pakistan (Khyber Pakhtunkhwa)', 'PAK', 'SA', 'Male', '2024-03-03 22:21:49.795329+07', '2024-03-03 22:21:49.795329+07');
INSERT INTO "public"."TempCategories" VALUES (33, 'Pakistan (Punjab)', 'PAK', 'SA', 'Female', '2024-03-03 22:21:49.796205+07', '2024-03-03 22:21:49.796205+07');
INSERT INTO "public"."TempCategories" VALUES (34, 'Pakistan (Punjab)', 'PAK', 'SA', 'Male', '2024-03-03 22:21:49.79689+07', '2024-03-03 22:21:49.79689+07');
INSERT INTO "public"."TempCategories" VALUES (35, 'Pakistan (Sindh)', 'PAK', 'SA', 'Female', '2024-03-03 22:21:49.797433+07', '2024-03-03 22:21:49.797433+07');
INSERT INTO "public"."TempCategories" VALUES (36, 'Pakistan (Sindh)', 'PAK', 'SA', 'Male', '2024-03-03 22:21:49.798254+07', '2024-03-03 22:21:49.798254+07');
INSERT INTO "public"."TempCategories" VALUES (37, 'Samoa', 'WSM', 'EAP', 'Female', '2024-03-03 22:21:49.798865+07', '2024-03-03 22:21:49.798865+07');
INSERT INTO "public"."TempCategories" VALUES (38, 'Samoa', 'WSM', 'EAP', 'Male', '2024-03-03 22:21:49.799432+07', '2024-03-03 22:21:49.799432+07');
INSERT INTO "public"."TempCategories" VALUES (39, 'Sao Tome and Principe', 'STP', 'WCA', 'Female', '2024-03-03 22:21:49.800122+07', '2024-03-03 22:21:49.800122+07');
INSERT INTO "public"."TempCategories" VALUES (40, 'Sierra Leone', 'SLE', 'WCA', 'Female', '2024-03-03 22:21:49.800769+07', '2024-03-03 22:21:49.800769+07');
INSERT INTO "public"."TempCategories" VALUES (41, 'State of Palestine', 'PSE', 'MENA', 'Female', '2024-03-03 22:21:49.801692+07', '2024-03-03 22:21:49.801692+07');
INSERT INTO "public"."TempCategories" VALUES (42, 'Suriname', 'SUR', 'LAC', 'Female', '2024-03-03 22:21:49.802357+07', '2024-03-03 22:21:49.802357+07');
INSERT INTO "public"."TempCategories" VALUES (43, 'Suriname', 'SUR', 'LAC', 'Male', '2024-03-03 22:21:49.803088+07', '2024-03-03 22:21:49.803088+07');
INSERT INTO "public"."TempCategories" VALUES (44, 'Togo', 'TGO', 'WCA', 'Female', '2024-03-03 22:21:49.80369+07', '2024-03-03 22:21:49.80369+07');
INSERT INTO "public"."TempCategories" VALUES (45, 'Tonga', 'TON', 'EAP', 'Female', '2024-03-03 22:21:49.804257+07', '2024-03-03 22:21:49.804257+07');
INSERT INTO "public"."TempCategories" VALUES (46, 'Tonga', 'TON', 'EAP', 'Male', '2024-03-03 22:21:49.80522+07', '2024-03-03 22:21:49.80522+07');
INSERT INTO "public"."TempCategories" VALUES (47, 'Tunisia', 'TUN', 'MENA', 'Female', '2024-03-03 22:21:49.806098+07', '2024-03-03 22:21:49.806098+07');
INSERT INTO "public"."TempCategories" VALUES (48, 'Tunisia', 'TUN', 'MENA', 'Male', '2024-03-03 22:21:49.806863+07', '2024-03-03 22:21:49.806863+07');
INSERT INTO "public"."TempCategories" VALUES (49, 'Turkmenistan', 'TKM', 'EECA', 'Female', '2024-03-03 22:21:49.807507+07', '2024-03-03 22:21:49.807507+07');
INSERT INTO "public"."TempCategories" VALUES (50, 'Turks and Caicos Islands', 'TCA', 'EC', 'Female', '2024-03-03 22:21:49.808169+07', '2024-03-03 22:21:49.808169+07');
INSERT INTO "public"."TempCategories" VALUES (51, 'Turks and Caicos Islands', 'TCA', 'EC', 'Male', '2024-03-03 22:21:49.808993+07', '2024-03-03 22:21:49.808993+07');
INSERT INTO "public"."TempCategories" VALUES (52, 'Tuvalu', 'TUV', 'EAP', 'Female', '2024-03-03 22:21:49.810108+07', '2024-03-03 22:21:49.810108+07');
INSERT INTO "public"."TempCategories" VALUES (53, 'Tuvalu', 'TUV', 'EAP', 'Male', '2024-03-03 22:21:49.810917+07', '2024-03-03 22:21:49.810917+07');
INSERT INTO "public"."TempCategories" VALUES (54, 'Viet Nam', 'VNM', 'EAP', 'Female', '2024-03-03 22:21:49.811691+07', '2024-03-03 22:21:49.811691+07');
INSERT INTO "public"."TempCategories" VALUES (55, 'Viet Nam', 'VNM', 'EAP', 'Male', '2024-03-03 22:21:49.812456+07', '2024-03-03 22:21:49.812456+07');
INSERT INTO "public"."TempCategories" VALUES (56, 'Zimbabwe', 'ZWE', 'ESA', 'Female', '2024-03-03 22:21:49.813735+07', '2024-03-03 22:21:49.813735+07');
INSERT INTO "public"."TempCategories" VALUES (57, 'Zimbabwe', 'ZWE', 'ESA', 'Male', '2024-03-03 22:21:49.815028+07', '2024-03-03 22:21:49.815028+07');
