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

CREATE TABLE committee ();

CREATE TABLE candidate ();

CREATE TABLE cmt_to_cand ();

CREATE TABLE individual_contributions ();

CREATE TABLE contributions_to_candidates ();

CREATE TABLE itemized_records ();
