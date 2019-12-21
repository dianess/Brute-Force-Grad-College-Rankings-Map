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