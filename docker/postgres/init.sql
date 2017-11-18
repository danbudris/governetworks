CREATE USER docker;
CREATE DATABASE governet;
GRANT ALL PRIVILEGES ON DATABASE governet TO docker;

CREATE TABLE congress_person (
	    id VARCHAR(150),
	    role VARCHAR(150),
	    role_abbr VARCHAR(150),
	    api_uri VARCHAR(100),
	    first_name VARCHAR(120),
	    middle_name VARCHAR(120),
	    last_name VARCHAR(120),
	    date_of_birth VARCHAR(150),
	    party VARCHAR(1),
	    leadership_role VARCHAR(150),
	    twitter_account VARCHAR(150),
	    facebook_account VARCHAR(150),
	    youtube_account VARCHAR(150),
	    govtrack_id VARCHAR(150),
	    cspan_id VARCHAR(150),
	    votesmart_id VARCHAR(150),
	    icpsr_id VARCHAR(150),
	    crp_id VARCHAR(150),
	    google_entity_id VARCHAR(150),
	    url VARCHAR(100),
	    rss_url VARCHAR(100),
	    contact_form VARCHAR(100),
	    in_office VARCHAR(150),
	    dw_nominate VARCHAR(120),
	    ideal_point VARCHAR(120),
	    seniority VARCHAR(120),
	    next_election VARCHAR(120),
	    total_votes VARCHAR(120),
	    missed_votes VARCHAR(120),
	    total_present VARCHAR(120),
	    ocd_id VARCHAR(150),
	    office VARCHAR(1100),
	    phone VARCHAR(150),
	    fax VARCHAR(150),
	    state VARCHAR(150),
	    senate_class VARCHAR(110),
	    state_rank VARCHAR(150),
	    lis_id VARCHAR(150),
	    missed_votes_pct VARCHAR(120),
	    votes_with_party_pct VARCHAR(120)	    
);




OP TABLE public.committee;

CREATE TABLE public.committee
(
	    "CMTE_ID" character varying(29)[] COLLATE pg_catalog."default",
	    "CMTE_NM" character varying(200)[] COLLATE pg_catalog."default",
	    "TRES_NM" character varying(90)[] COLLATE pg_catalog."default",
	    "CMTE_ST1" character varying(34)[] COLLATE pg_catalog."default",
	    "CMTE_ST2" character varying(34) COLLATE pg_catalog."default",
	    "CMTE_CITY" character varying(30)[] COLLATE pg_catalog."default",
	    "CMTE_ST" character varying(2)[] COLLATE pg_catalog."default",
	    "CMTE_ZIP" character varying(9)[] COLLATE pg_catalog."default",
	    "CMTE_DSGN" character varying(1)[] COLLATE pg_catalog."default",
	    "CMTE_TP" character varying(1)[] COLLATE pg_catalog."default",
	    "CMTE_PTY_AFFILIATION" character varying(3)[] COLLATE pg_catalog."default",
	    "CMTE_FILING_FREQ" character varying(1)[] COLLATE pg_catalog."default",
	    "ORG_TP" character varying(21)[] COLLATE pg_catalog."default",
	    "CONNECTED_ORG_NM" character varying(200)[] COLLATE pg_catalog."default",
	    "CAN_ID" character varying(9)[] COLLATE pg_catalog."default"
)
WITH (
	    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.committee
    OWNER to postgres;

COMMENT ON COLUMN public.committee."CMTE_ID"
    IS 'Committee Identification';

COMMENT ON COLUMN public.committee."CMTE_NM"
    IS 'Committee Name';

COMMENT ON COLUMN public.committee."TRES_NM"
    IS 'Treasurer''s Name';

COMMENT ON COLUMN public.committee."CMTE_ST1"
    IS 'Street One';

COMMENT ON COLUMN public.committee."CMTE_ST2"
    IS 'Street two';

COMMENT ON COLUMN public.committee."CMTE_CITY"
    IS 'City or Town';

COMMENT ON COLUMN public.committee."CMTE_ST"
    IS 'State';

COMMENT ON COLUMN public.committee."CMTE_ZIP"
    IS 'Zip Code';

COMMENT ON COLUMN public.committee."CMTE_DSGN"
    IS 'Committee Designation; 
A = Authorized by a candidate
B = Lobbyist/Registrant PAC
D = Leadership PAC
J = Joint fundraiser
P = Principal campaign committee of a candidate
U = Unauthorized';

COMMENT ON COLUMN public.committee."CMTE_TP"
    IS 'Committee Type
http://classic.fec.gov/finance/disclosure/metadata/CommitteeTypeCodes.shtml';

COMMENT ON COLUMN public.committee."CMTE_PTY_AFFILIATION"
    IS 'Committee Party;
http://classic.fec.gov/finance/disclosure/metadata/DataDictionaryPartyCodeDescriptions.shtml';

COMMENT ON COLUMN public.committee."CMTE_FILING_FREQ"
    IS 'Filing Frequency;
A = Administratively terminated
D = Debt
M = Monthly filer
Q = Quarterly filer
T = Terminated
W = Waived';

COMMENT ON COLUMN public.committee."ORG_TP"
    IS 'Interest Group Category;
C = Corporation
L = Labor organization
M = Membership organization
T = Trade association
V = Cooperative
W = Corporation without capital stock';

COMMENT ON COLUMN public.committee."CONNECTED_ORG_NM"
    IS 'Connected Organization''s Name';

COMMENT ON COLUMN public.committee."CAN_ID"
    IS 'Candidate Identification; 
When a committee has a committee type designation of H, S, or P the identification number of the candidate will be entered in this field';





OP TABLE public.candidate;

CREATE TABLE public.candidate
(
	    "CAND_ID" character varying(9) COLLATE pg_catalog."default" NOT NULL,
	    "CAND_NAME" character varying(200) COLLATE pg_catalog."default",
	    "CAND_PTY_AFFILIATION" character varying(3) COLLATE pg_catalog."default",
	    "CAND_ELECTION_YR" numeric(4,0),
	    "CAND_OFFICE_ST" character varying(2) COLLATE pg_catalog."default",
	    "CAND_OFFICE" character varying(1) COLLATE pg_catalog."default",
	    "CAND_OFFICE_DISTRICT" character varying(2) COLLATE pg_catalog."default",
	    "CAND_ICI" character varying(1) COLLATE pg_catalog."default",
	    "CAND_STATUS" character varying(1) COLLATE pg_catalog."default",
	    "CAND_PCC" character varying(9) COLLATE pg_catalog."default",
	    "CAND_ST1" character varying(34) COLLATE pg_catalog."default",
	    "CAND_ST2" character varying(34) COLLATE pg_catalog."default",
	    "CAND_CITY" character varying(30) COLLATE pg_catalog."default",
	    "CAND_ST" character varying(2) COLLATE pg_catalog."default",
	    "CAND_ZIP" character varying(9) COLLATE pg_catalog."default",
	    CONSTRAINT candidate_pkey PRIMARY KEY ("CAND_ID")
)
WITH (
	    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.candidate
    OWNER to postgres;

COMMENT ON COLUMN public.candidate."CAND_ID"
    IS 'A 9-character alpha-numeric code assigned to a candidate by the Federal Election Commission. The candidate ID for a specific candidate remains the same across election cycles as long as the candidate is running for the same office.
';

COMMENT ON COLUMN public.candidate."CAND_OFFICE_ST"
    IS 'House = state of race
President  = US
Senate = state of race';

COMMENT ON COLUMN public.candidate."CAND_OFFICE"
    IS 'H = House
P = President
S = Senate';

COMMENT ON COLUMN public.candidate."CAND_OFFICE_DISTRICT"
    IS 'Congressional district number.
Congressional At Large 00
Senate 00
Presidential 00';

COMMENT ON COLUMN public.candidate."CAND_ICI"
    IS 'Incumbant status;
C = Challenger
I = Incumbent
O = Open Seat is used to indicate an open seat.  Open seats are defined as seats where the incumbent never sought re-election.';

COMMENT ON COLUMN public.candidate."CAND_STATUS"
    IS 'Candidate Status
C = Challenger
I = Incumbent
O = Open Seat is used to indicate an open seat.  Open seats are defined as seats where the incumbent never sought re-election.';

COMMENT ON COLUMN public.candidate."CAND_PCC"
    IS 'Princiapl Campaign Committee;
The ID assigned by the Federal Election Commission to the candidate''s principal campaign committee for a given election cycle.';

COMMENT ON COLUMN public.candidate."CAND_ST1"
    IS 'Mailing Address';

COMMENT ON COLUMN public.candidate."CAND_ST2"
    IS 'Mailing Address Street 2';

COMMENT ON COLUMN public.candidate."CAND_CITY"
    IS 'Mailing Address -- City';

COMMENT ON COLUMN public.candidate."CAND_ST"
    IS 'State';

COMMENT ON COLUMN public.candidate."CAND_ZIP"
    IS 'Zip code';

CREATE TABLE individual_contributions ();

CREATE TABLE contributions_to_candidates ();

CREATE TABLE itemized_records ();
