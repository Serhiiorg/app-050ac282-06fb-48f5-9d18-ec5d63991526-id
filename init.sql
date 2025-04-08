
        CREATE TABLE users
        (
          ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
          value jsonb NOT NULL,
          PRIMARY KEY(ID)
        );
    

        CREATE TABLE interviews
        (
          ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
          value jsonb NOT NULL,
          PRIMARY KEY(ID)
        );
    

        CREATE TABLE questions
        (
          ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
          value jsonb NOT NULL,
          PRIMARY KEY(ID)
        );
    

        CREATE TABLE responses
        (
          ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
          value jsonb NOT NULL,
          PRIMARY KEY(ID)
        );
    

        CREATE TABLE candidates
        (
          ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
          value jsonb NOT NULL,
          PRIMARY KEY(ID)
        );
    