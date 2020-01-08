-- Table: public."TOP GRAD SCHOOLS"

-- DROP TABLE public."TOP GRAD SCHOOLS";

CREATE TABLE public."TOP GRAD SCHOOLS"
(
    "X" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "Y" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "OBJECTID" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "UNITID" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "INSTNM" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "STREET" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "CITY" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "STATE" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "ZIP" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "STFIP" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "CNTY" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "NMCNTY" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "LOCALE" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "LAT" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "LON" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "CBSA" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "NMCBSA" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "CBSATYPE" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "CSA" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "NMCSA" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "NECTA" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "NMNECTA" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "CD" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "SLDL" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "SLDU" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "SURVYEAR" character varying(255) COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public."TOP GRAD SCHOOLS"
    OWNER to postgres;
    
    
    
 --new table
 -- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/LX1YaP
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Created table here instead of in postgresql

CREATE TABLE "top_schools" (
    "X" NUMERIC   NOT NULL,
    "Y" NUMERIC   NOT NULL,
    "OBJECTID" INTEGER   NOT NULL,
    "UNITID" INTEGER   NOT NULL,
    "INSTNM" VARCHAR   NOT NULL,
    "STREET" VARCHAR   NOT NULL,
    "CITY" VARCHAR   NOT NULL,
    "STATE" VARCHAR   NOT NULL,
    "ZIP" VARCHAR   NOT NULL,
    "STFIP" INTEGER   NOT NULL,
    "CNTY" INTEGER   NOT NULL,
    "NMCNTY" INTEGER   NOT NULL,
    "LOCALE" INTEGER   NOT NULL,
    "LAT" NUMERIC   NOT NULL,
    "LON" NUMERIC   NOT NULL,
    "CBSA" VARCHAR   NOT NULL,
    "NMCBSA" VARCHAR   NOT NULL,
    "CBSATYPE" VARCHAR   NOT NULL,
    "CSA" VARCHAR   NOT NULL,
    "NMCSA" VARCHAR   NOT NULL,
    "NECTA" VARCHAR   NOT NULL,
    "NMNECTA" VARCHAR   NOT NULL,
    "CD" INTEGER   NOT NULL,
    "SLDL" INTEGER   NOT NULL,
    "SLDU" INTEGER   NOT NULL,
    "SURVYEAR" INTEGER   NOT NULL
);
    
--table #2 science rank
-- Table: public."ScienceRankData"

-- DROP TABLE public."ScienceRankData";

CREATE TABLE public."ScienceRankData"
(
    "CITY" character varying COLLATE pg_catalog."default" NOT NULL,
    "Degree" character varying COLLATE pg_catalog."default" NOT NULL,
    "INSTNM" character varying COLLATE pg_catalog."default" NOT NULL,
    "Rank" integer NOT NULL,
    firstcity character varying COLLATE pg_catalog."default" NOT NULL,
    "STATE" character varying COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public."ScienceRankData"
    OWNER to postgres;

--3rd table
-- Table: public.universityrankdata

-- DROP TABLE public.universityrankdata;

CREATE TABLE public.universityrankdata
(
    "CITY" character varying COLLATE pg_catalog."default" NOT NULL,
    "Degree" character varying COLLATE pg_catalog."default" NOT NULL,
    "INSTNM" character varying COLLATE pg_catalog."default" NOT NULL,
    "Rank" character varying COLLATE pg_catalog."default" NOT NULL,
    firstcity character varying COLLATE pg_catalog."default" NOT NULL,
    "STATE" character varying COLLATE pg_catalog."default" NOT NULL,
    "DROP" character varying COLLATE pg_catalog."default" NOT NULL,
    "S" character varying COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public.universityrankdata
    OWNER to postgres;
    
    
--latest gradschools table 1/7/20
-- Table: public.gradschools

-- DROP TABLE public.gradschools;

CREATE TABLE public.gradschools
(
    "INSTNM" character varying COLLATE pg_catalog."default" NOT NULL,
    "CITY" character varying COLLATE pg_catalog."default" NOT NULL,
    "STATE" character varying COLLATE pg_catalog."default" NOT NULL,
    "LAT" numeric NOT NULL,
    "LON" numeric NOT NULL,
    "X" numeric NOT NULL,
    "Y" numeric NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public.gradschools
    OWNER to postgres;
    
  --uni rank table 1/7/20
  
  -- Table: public.unirkt

-- DROP TABLE public.unirkt;

CREATE TABLE public.unirkt
(
    "INSTNM" character varying COLLATE pg_catalog."default" NOT NULL,
    "CITY" character varying COLLATE pg_catalog."default" NOT NULL,
    "Degree" character varying COLLATE pg_catalog."default" NOT NULL,
    "Rank" numeric NOT NULL,
    "STATE" character varying COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public.unirkt
    OWNER to postgres;
-- 1/7/20
-- Table: public.scirank

-- DROP TABLE public.scirank;

CREATE TABLE public.scirank
(
    "INSTNM" character varying COLLATE pg_catalog."default" NOT NULL,
    "Degree" character varying COLLATE pg_catalog."default" NOT NULL,
    "Rank" numeric NOT NULL,
    "CITY" character varying COLLATE pg_catalog."default" NOT NULL,
    "STATE" character varying COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public.scirank
    OWNER to postgres;

--joins we did to create the CSV's used to convert to geojson

SELECT g."INSTNM", g."X", g."Y", g."CITY", g."STATE", u."INSTNM", u."Degree", u."Rank"
FROM gradschools as g
RIGHT JOIN unirkt as u
ON u."INSTNM" = g."INSTNM";

SELECT g."INSTNM", g."X", g."Y", g."CITY", g."STATE", u."INSTNM", u."Degree", u."Rank"
FROM gradschools as g
RIGHT JOIN scirank as u
ON u."INSTNM" = g."INSTNM";
