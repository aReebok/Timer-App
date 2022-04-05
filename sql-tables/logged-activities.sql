DROP TABLE IF EXISTS activitylog;

CREATE TABLE activitylog(
    aid             SMALLSERIAL PRIMARY KEY,
    mid             VARCHAR NOT NULL,
    date            VARCHAR NOT NULL,
    duration           int NOT NULL,

    title           VARCHAR NOT NULL,
    descrip         VARCHAR NOT NULL,
    tag             VARCHAR NOT NULL
);
