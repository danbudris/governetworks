CREATE USER docker;
CREATE DATABASE governet;
GRANT ALL PRIVILEGES ON DATABASE governet TO docker;

CREATE TABLE congress_person (
	    id VARCHAR(50),
	    role VARCHAR(50),
	    role_abbr VARCHAR(50),
	    api_uri VARCHAR(100),
	    first_name VARCHAR(20),
	    middle_name VARCHAR(20),
	    last_name VARCHAR(20),
	    date_of_birth VARCHAR(50),
	    party VARCHAR(1),
	    leadership_role VARCHAR(50),
	    twitter_account VARCHAR(50),
	    facebook_account VARCHAR(50),
	    youtube_account VARCHAR(50),
	    govtrack_id VARCHAR(50),
	    cspan_id VARCHAR(50),
	    votesmart_id VARCHAR(50),
	    icpsr_id VARCHAR(50),
	    crp_id VARCHAR(50),
	    google_entity_id VARCHAR(50),
	    url VARCHAR(100),
	    rss_url VARCHAR(100),
	    contact_form VARCHAR(100),
	    in_office VARCHAR(50),
	    dw_nominate VARCHAR(20),
	    ideal_point VARCHAR(20),
	    seniority VARCHAR(20),
	    next_election VARCHAR(20),
	    total_votes VARCHAR(20),
	    missed_votes VARCHAR(20),
	    total_present VARCHAR(20),
	    ocd_id VARCHAR(50),
	    office VARCHAR(100),
	    phone VARCHAR(50),
	    fax VARCHAR(50),
	    state VARCHAR(50),
	    senate_class VARCHAR(10),
	    state_rank VARCHAR(50),
	    lis_id VARCHAR(50),
	    missed_votes_pct VARCHAR(20),
	    votes_with_party_pct VARCHAR(20)	    
);

CREATE TABLE committee ();

CREATE TABLE candidate ();

CREATE TABLE cmt_to_cand ();

CREATE TABLE individual_contributions ();

CREATE TABLE contributions_to_candidates ();

CREATE TABLE itemized_records ();
