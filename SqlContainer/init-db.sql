CREATE DATABASE CTF
GO

USE [CTF];

CREATE TABLE [dbo].[admins](
	[admin_id] [int] IDENTITY(1,1) NOT NULL,
	[first_name] [varchar](50) NOT NULL,
	[last_name] [varchar](50) NOT NULL,
	[login_name] [varchar](50) NOT NULL,
	[password] [varchar](max) NOT NULL,
	[create_date] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[admin_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[admins] ADD  CONSTRAINT [DF_admins_create_date]  DEFAULT (getdate()) FOR [create_date]
GO

CREATE TABLE [dbo].[teams](
	[team_id] [int] IDENTITY(1,1) NOT NULL,
	[team_name] [nvarchar](100) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[team_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

CREATE TABLE [dbo].[players](
	[player_id] [int] IDENTITY(1,1) NOT NULL,
	[team_id] [int] NULL,
	[player_name] [nvarchar](200) NULL,
	[player_email] [nvarchar](300) NULL,
	[active] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[player_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[players]  WITH CHECK ADD  CONSTRAINT [FK__players__team_id__0D7A0286] FOREIGN KEY([team_id])
REFERENCES [dbo].[teams] ([team_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[players] CHECK CONSTRAINT [FK__players__team_id__0D7A0286]
GO

CREATE TABLE [dbo].[event_details](
	[event_id] [int] IDENTITY(1,1) NOT NULL,
	[event_name] [nvarchar](100) NOT NULL,
	[start_date] [date] NULL,
	[start_time] [time](7) NULL,
	[end_date] [date] NULL,
	[end_time] [time](7) NULL,
	[exclusive_flag] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[event_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[questions](
	[question_id] [int] IDENTITY(1,1) NOT NULL,
	[question] [nvarchar](1000) NULL,
	[answer] [nvarchar](1000) NULL,
	[question_value] [int] NULL,
	[created_by] [int] NULL,
	[level] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[questions]  WITH CHECK ADD  CONSTRAINT [FK__questions__creat__46B27FE2] FOREIGN KEY([created_by])
REFERENCES [dbo].[admins] ([admin_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[questions] CHECK CONSTRAINT [FK__questions__creat__46B27FE2]
GO

CREATE TABLE [dbo].[event_questions](
	[event_id] [int] NOT NULL,
	[question_id] [int] NOT NULL,
	[question_value] [int] NULL,
	[solved_flag] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[event_id] ASC,
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[event_questions]  WITH CHECK ADD  CONSTRAINT [FK__event_que__event__4E53A1AA] FOREIGN KEY([event_id])
REFERENCES [dbo].[event_details] ([event_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[event_questions] CHECK CONSTRAINT [FK__event_que__event__4E53A1AA]
GO

ALTER TABLE [dbo].[event_questions]  WITH CHECK ADD  CONSTRAINT [FK__event_que__quest__4F47C5E3] FOREIGN KEY([question_id])
REFERENCES [dbo].[questions] ([question_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[event_questions] CHECK CONSTRAINT [FK__event_que__quest__4F47C5E3]
GO

CREATE TABLE [dbo].[event_scores](
	[event_id] [int] NOT NULL,
	[team_id] [int] NOT NULL,
	[current_score] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[event_id] ASC,
	[team_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[event_scores]  WITH CHECK ADD  CONSTRAINT [FK__event_sco__event__339FAB6E] FOREIGN KEY([event_id])
REFERENCES [dbo].[event_details] ([event_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[event_scores] CHECK CONSTRAINT [FK__event_sco__event__339FAB6E]
GO

ALTER TABLE [dbo].[event_scores]  WITH CHECK ADD  CONSTRAINT [FK__event_sco__team___3493CFA7] FOREIGN KEY([team_id])
REFERENCES [dbo].[teams] ([team_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[event_scores] CHECK CONSTRAINT [FK__event_sco__team___3493CFA7]
GO

CREATE TABLE [dbo].[hints](
	[hint_id] [int] NOT NULL,
	[question_id] [int] NOT NULL,
	[hint] [nvarchar](1000) NULL,
	[hint_value] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[hint_id] ASC,
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[hints]  WITH CHECK ADD  CONSTRAINT [FK__hints__question___540C7B00] FOREIGN KEY([question_id])
REFERENCES [dbo].[questions] ([question_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[hints] CHECK CONSTRAINT [FK__hints__question___540C7B00]
GO

CREATE TABLE [dbo].[hints_used](
	[event_id] [int] NOT NULL,
	[team_id] [int] NOT NULL,
	[question_id] [int] NOT NULL,
	[hint_id] [int] NOT NULL,
	[used] [smallint] NULL,
PRIMARY KEY CLUSTERED 
(
	[team_id] ASC,
	[question_id] ASC,
	[hint_id] ASC,
	[event_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[hints_used]  WITH CHECK ADD  CONSTRAINT [FK__hints_use__quest__7A3223E8] FOREIGN KEY([question_id])
REFERENCES [dbo].[questions] ([question_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[hints_used] CHECK CONSTRAINT [FK__hints_use__quest__7A3223E8]
GO

ALTER TABLE [dbo].[hints_used]  WITH CHECK ADD  CONSTRAINT [FK__hints_use__team___7B264821] FOREIGN KEY([team_id])
REFERENCES [dbo].[teams] ([team_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[hints_used] CHECK CONSTRAINT [FK__hints_use__team___7B264821]
GO

CREATE TABLE [dbo].[question_files](
	[file_id] [int] IDENTITY(1,1) NOT NULL,
	[question_id] [int] NULL,
	[file_name] [nvarchar](1000) NULL,
	[file_contents] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[file_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[question_files]  WITH CHECK ADD  CONSTRAINT [FK__question___quest__0880433F] FOREIGN KEY([question_id])
REFERENCES [dbo].[questions] ([question_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[question_files] CHECK CONSTRAINT [FK__question___quest__0880433F]
GO

CREATE TABLE [dbo].[questions_by_team](
	[event_id] [int] NOT NULL,
	[team_id] [int] NOT NULL,
	[question_id] [int] NOT NULL,
	[question_value] [int] NULL,
	[solved] [smallint] NULL
PRIMARY KEY CLUSTERED 
(
	[event_id] ASC,
	[team_id] ASC,
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

CREATE TABLE [dbo].[questions_solved](
	[team_id] [int] NOT NULL,
	[event_id] [int] NOT NULL,
	[question_id] [int] NOT NULL,
	[solved] [smallint] NULL,
	[attempts] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[team_id] ASC,
	[event_id] ASC,
	[question_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[questions_solved]  WITH CHECK ADD  CONSTRAINT [FK__questions__event__498EEC8D] FOREIGN KEY([event_id])
REFERENCES [dbo].[event_details] ([event_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[questions_solved] CHECK CONSTRAINT [FK__questions__event__498EEC8D]
GO

ALTER TABLE [dbo].[questions_solved]  WITH CHECK ADD  CONSTRAINT [FK__questions__quest__4A8310C6] FOREIGN KEY([question_id])
REFERENCES [dbo].[questions] ([question_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[questions_solved] CHECK CONSTRAINT [FK__questions__quest__4A8310C6]
GO

ALTER TABLE [dbo].[questions_solved]  WITH CHECK ADD  CONSTRAINT [FK__questions__team___4B7734FF] FOREIGN KEY([team_id])
REFERENCES [dbo].[teams] ([team_id])
ON UPDATE CASCADE
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[questions_solved] CHECK CONSTRAINT [FK__questions__team___4B7734FF]
GO


CREATE PROCEDURE [dbo].[CTF_CreateEventSp](
	@eventname nvarchar(100),
	@startdate date,
	@starttime time,
	@enddate date,
	@endtime time,
	@exclusive smallint)
AS

IF EXISTS (SELECT event_id FROM CTF.dbo.event_details WHERE event_name = @eventname)
BEGIN
	SELECT 0 as event_id
END
ELSE 
BEGIN
	INSERT INTO CTF.dbo.event_details (event_name, start_date, start_time, end_date, end_time, exclusive_flag)
	VALUES (@eventname, @startdate, @starttime, @enddate, @endtime, @exclusive)

	SELECT event_id FROM CTF.dbo.event_details WHERE event_name = @eventname
END
GO


CREATE PROCEDURE [dbo].[CTF_CreateFilesSp](
	@questionid int,
	@filename nvarchar(1000),
	@contents nvarchar(max))
AS

IF @filename <> ' '
BEGIN
	IF EXISTS (SELECT file_id FROM CTF.dbo.question_files WHERE question_id = @questionid)
	BEGIN
		SELECT 0 as success
	END
	ELSE
	BEGIN
		INSERT INTO CTF.dbo.question_files(question_id, file_name, file_contents)
		VALUES(@questionid, @filename, @contents)

		SELECT 1 as success
	END
END
ELSE
BEGIN
	SELECT 1 as success
END
GO

CREATE PROCEDURE [dbo].[CTF_CreateHintsSp](
	@questionid int,
	@hint nvarchar(1000),
	@hintvalue int,
	@hintid int)
AS

IF @hint <> ' '
BEGIN
	IF EXISTS (SELECT hint_id FROM CTF.dbo.hints WHERE question_id = @questionid AND hint = @hint)
	BEGIN
		SELECT 0 as success
	END
	ELSE
	BEGIN
		INSERT INTO CTF.dbo.hints (hint_id, question_id, hint, hint_value)
		VALUES(@hintid, @questionid, @hint, @hintvalue)

		SELECT 1 as success
	END
END
ELSE 
BEGIN
	SELECT 1 as success
END
GO

CREATE PROCEDURE [dbo].[CTF_CreateQuestionSp](
	@question nvarchar(1000),
	@answer nvarchar(1000),
	@question_value int,
	@created_by int,
	@level int)
AS

IF EXISTS (SELECT question_id FROM CTF.dbo.questions WHERE question = @question AND answer = @answer)
BEGIN
	SELECT 0 as question_id
END
ELSE
BEGIN
	INSERT INTO CTF.dbo.questions (question, answer, question_value, created_by, level)
	VALUES (@question, @answer, @question_value, @created_by, @level)

	SELECT question_id FROM CTF.dbo.questions WHERE question = @question AND answer = @answer
END
GO

CREATE PROCEDURE [dbo].[CTF_CreateTeamSp](
	@name nvarchar(100),
	@pwd nvarchar(1000)
) AS

IF NOT EXISTS (SELECT team_id FROM CTF.dbo.teams WHERE team_name = @name AND password = @pwd)
BEGIN
	INSERT INTO CTF.dbo.teams (team_name, password) 
	VALUES (@name, @pwd)

	SELECT team_id FROM CTF.dbo.teams WHERE team_name = @name AND password = @pwd
END
ELSE
BEGIN
	SELECT 0 as team_id 
END
GO

CREATE PROCEDURE [dbo].[CTF_DeleteEventQuestionSp](
	@eventid int,
	@questionid int)
AS

IF EXISTS (SELECT question_id FROM CTF.dbo.event_questions WHERE event_id = @eventid AND question_id = @questionid)
BEGIN
	DELETE FROM CTF.dbo.event_questions WHERE event_id = @eventid AND question_id = @questionid
	SELECT 1 as success
END
GO

CREATE PROCEDURE [dbo].[CTF_DeleteEventSp](
	@event_id int)
AS

DECLARE @success int = 0

IF EXISTS (SELECT event_id FROM CTF.dbo.event_details WHERE event_id = @event_id)
BEGIN
	DELETE FROM CTF.dbo.event_details 
	WHERE event_id = @event_id

	SET @success = 1
END

SELECT @success as success
GO

CREATE PROCEDURE [dbo].[CTF_DeleteQuestionSp](
	@question_id int)
AS

DECLARE @success int = 0

IF EXISTS (SELECT question FROM CTF.dbo.questions WHERE question_id = @question_id)
BEGIN
	DELETE FROM CTF.dbo.question_files
	WHERE question_id = @question_id

	DELETE FROM CTF.dbo.hints_used
	WHERE question_id = @question_id

	DELETE FROM CTF.dbo.hints
	WHERE question_id = @question_id
	
	DELETE FROM CTF.dbo.event_questions
	WHERE question_id = @question_id

	DELETE FROM CTF.dbo.questions_solved
	WHERE question_id = @question_id

	DELETE FROM CTF.dbo.questions 
	WHERE question_id = @question_id

	SET @success = 1
END

SELECT @success as success
GO

CREATE PROCEDURE [dbo].[CTF_DeleteTeamSp](
	@team_id int)
AS

DELETE FROM CTF.dbo.teams 
WHERE team_id = @team_id
GO

CREATE PROCEDURE [dbo].[CTF_GetCurrentEventSp]
AS

IF EXISTS (SELECT event_id FROM CTF.dbo.event_details WHERE start_time IS NULL)
BEGIN
	SELECT TOP 1 * FROM CTF.dbo.event_details WHERE start_time IS NULL
END
ELSE
BEGIN
	SELECT  TOP 1 *
	  FROM [CTF].[dbo].[event_details]
	  WHERE (DATEADD(day, DATEDIFF(day,'19000101',start_date), CAST(start_time AS DATETIME2(7)))) >= (SELECT CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'Eastern Standard Time' AS DATETIME))
	  OR (DATEADD(day, DATEDIFF(day,'19000101',end_date), CAST(end_time AS DATETIME2(7)))) >= (SELECT CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'Eastern Standard Time' AS DATETIME))
	  ORDER BY start_date
END
GO

CREATE PROCEDURE [dbo].[CTF_GetEventsSp]
AS

DECLARE @date date

SET @date = CAST(SYSDATETIMEOFFSET() AT TIME ZONE 'Eastern Standard Time' AS DATETIME)

SELECT event_id, event_name, start_date, start_time, end_date, end_time, exclusive_flag
FROM CTF.dbo.event_details
WHERE DATEPART(year, start_date) = DATEPART(year, @date)
GO

CREATE PROCEDURE [dbo].[CTF_GetHintSp](
	@event_id int,
	@team_id int,
	@question_id int
) AS

CREATE TABLE #tt_hints (
	question_id int,
	hint_id int,
	hint nvarchar(1000),
	value int,
	used smallint)

INSERT INTO #tt_hints
SELECT question_id, hint_id, hint, hint_value, 0
FROM CTF.dbo.hints
WHERE question_id = @question_id

DECLARE @hint int

DECLARE Crs CURSOR LOCAL STATIC FOR
SELECT hint_id FROM #tt_hints WHERE question_id = @question_id
OPEN Crs

FETCH NEXT FROM Crs INTO @hint

WHILE @@FETCH_STATUS = 0
BEGIN

	IF EXISTS (SELECT used FROM CTF.dbo.hints_used WHERE hint_id = @hint AND question_id = @question_id AND event_id = @event_id AND team_id = @team_id)
	BEGIN
		UPDATE #tt_hints
			SET used = 1
		WHERE hint_id = @hint
		AND question_id = @question_id
	END

	FETCH NEXT FROM Crs INTO @hint
END

SET @hint = NULL

SELECT TOP 1 @hint = hint_id FROM #tt_hints WHERE used = 0 ORDER BY hint_id ASC

IF @hint IS NOT NULL
BEGIN
	INSERT INTO CTF.dbo.hints_used (event_id, team_id, question_id, hint_id, used)
	VALUES (@event_id, @team_id, @question_id, @hint, 1)
END

DECLARE @newvalue int

IF NOT EXISTS (SELECT question_value FROM CTF.dbo.questions_by_team WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id)
BEGIN
	IF @hint IS NOT NULL
	BEGIN

		SET @newvalue = (SELECT question_value FROM CTF.dbo.event_questions WHERE event_id = @event_id AND question_id = @question_id)
			- (SELECT TOP 1 hint_value FROM CTF.dbo.hints WHERE question_id = @question_id AND hint_id = @hint)
	
		INSERT INTO CTF.dbo.questions_by_team (event_id, team_id, question_id, question_value, solved)
		VALUES (@event_id, @team_id, @question_id, @newvalue, 0)
	END
END
ELSE
BEGIN
	IF @hint IS NOT NULL
	BEGIN
		SET @newvalue = (SELECT question_value FROM CTF.dbo.questions_by_team WHERE event_id = @event_id AND question_id = @question_id)
			- (SELECT TOP 1 hint_value FROM CTF.dbo.hints WHERE question_id = @question_id AND hint_id = @hint)
	
		UPDATE CTF.dbo.questions_by_team
			SET question_value = @newvalue
		WHERE event_id = @event_id
		AND team_id = @team_id
		AND question_id = @question_id
	END	
END

SELECT * FROM #tt_hints

DROP TABLE #tt_hints
GO

CREATE PROCEDURE [dbo].[CTF_GetPlayersSp](
	@teamid int
) AS

SELECT player_name, player_email FROM CTF.dbo.players WHERE team_id = @teamid AND active = 1
GO

CREATE PROCEDURE [dbo].[CTF_GetQuestionsForEventSp] (
	@event_id int,
	@team_id int)
AS

SELECT questions.question_id, questions.question, 
	CASE WHEN question_files.file_name IS NULL THEN ''
		ELSE question_files.file_name END as filename, 
		question_files.file_contents as filepath,
		event_questions.question_value,
		questions_by_team.question_value as team_value,
		CASE WHEN questions.level IS NULL THEN 0 
		ELSE questions.level END as level,
		ISNULL(questions_solved.solved, 0) as teamsolved,
		event_questions.solved_flag as eventsolved
FROM CTF.dbo.event_questions 
JOIN CTF.dbo.questions ON event_questions.question_id = questions.question_id
LEFT OUTER JOIN CTF.dbo.question_files ON event_questions.question_id = question_files.question_id
LEFT OUTER JOIN CTF.dbo.questions_by_team 
	ON questions_by_team.event_id = event_questions.event_id 
	AND questions_by_team.question_id = event_questions.question_id
	AND questions_by_team.team_id = @team_id
LEFT OUTER JOIN CTF.dbo.questions_solved 
	ON event_questions.event_id = questions_solved.event_id
	AND questions.question_id = questions_solved.question_id
	AND questions_solved.team_id = @team_id
WHERE event_questions.event_id = @event_id
ORDER BY level, question_id
GO

CREATE PROCEDURE [dbo].[CTF_GetQuestionsSp]
AS

SELECT questions.question_id, 
		question, 
		answer, 
		question_value, 
		(SELECT hint FROM CTF.dbo.hints WHERE question_id = questions.question_id and hint_id = 1) as hint1,
		(SELECT hint_value FROM CTF.dbo.hints WHERE question_id = questions.question_id and hint_id = 1) as hint1value,
		(SELECT hint FROM CTF.dbo.hints WHERE question_id = questions.question_id and hint_id = 2) as hint2,
		(SELECT hint_value FROM CTF.dbo.hints WHERE question_id = questions.question_id and hint_id = 2) as hint2value,
		(SELECT hint FROM CTF.dbo.hints WHERE question_id = questions.question_id and hint_id = 3) as hint3,
		(SELECT hint_value FROM CTF.dbo.hints WHERE question_id = questions.question_id and hint_id = 3) as hint3value,
		(SELECT file_name FROM CTF.dbo.question_files WHERE question_id = questions.question_id) as file_name,
		CASE WHEN level IS NULL THEN 0 ELSE level END as level
FROM CTF.dbo.questions
GO

CREATE PROCEDURE [dbo].[CTF_GetScoresSp] (
	@eventid int
) AS

IF (SELECT COUNT(*) FROM CTF.dbo.event_scores WHERE event_id = @eventid) > 0
SELECT event_details.event_name,
		teams.team_id, 
		teams.team_name, 
		event_scores.current_score, 
		(SELECT COUNT(solved) FROM CTF.dbo.questions_solved (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
			WHERE team_id = teams.team_id AND event_id = @eventid AND solved = 1 AND questions.level = 1) as level1solved,
		(SELECT COUNT(questions.question_id) FROM CTF.dbo.event_questions (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON event_questions.question_id = questions.question_id
			WHERE event_id = @eventid and questions.level = 1) as level1total,
		(SELECT COUNT(solved) FROM CTF.dbo.questions_solved  (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
			WHERE team_id = teams.team_id AND event_id = @eventid AND solved = 1 AND questions.level = 2) as level2solved,
		(SELECT COUNT(questions.question_id) FROM CTF.dbo.event_questions (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON event_questions.question_id = questions.question_id
			WHERE event_id = @eventid and questions.level = 2) as level2total,
		(SELECT COUNT(solved) FROM CTF.dbo.questions_solved  (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
			WHERE team_id = teams.team_id AND event_id = @eventid AND solved = 1 AND questions.level = 3) as level3solved,
		(SELECT COUNT(questions.question_id) FROM CTF.dbo.event_questions (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON event_questions.question_id = questions.question_id
			WHERE event_id = @eventid and questions.level = 3) as level3total,
		(SELECT COUNT(solved) FROM CTF.dbo.questions_solved  (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
			WHERE team_id = teams.team_id AND event_id = @eventid AND solved = 1 AND questions.level = 4) as level4solved,
		(SELECT COUNT(questions.question_id) FROM CTF.dbo.event_questions (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON event_questions.question_id = questions.question_id
			WHERE event_id = @eventid and questions.level = 4) as level4total,
		(SELECT COUNT(solved) FROM CTF.dbo.questions_solved  (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
			WHERE team_id = teams.team_id AND event_id = @eventid AND solved = 1 AND questions.level = 5) as level5solved,
		(SELECT COUNT(questions.question_id) FROM CTF.dbo.event_questions (NOLOCK)
			JOIN CTF.dbo.questions (NOLOCK) ON event_questions.question_id = questions.question_id
			WHERE event_id = @eventid and questions.level = 5) as level5total,
		(SELECT SUM(attempts) FROM CTF.dbo.questions_solved (NOLOCK) WHERE team_id = teams.team_id AND event_id = @eventid) as attempts,
		(SELECT SUM(solved) FROM CTF.dbo.questions_solved (NOLOCK) WHERE team_id = teams.team_id AND event_id = @eventid) as solved
FROM CTF.dbo.event_scores
JOIN CTF.dbo.teams ON event_scores.team_id = teams.team_id
JOIN CTF.dbo.event_details ON event_scores.event_id = event_details.event_id
WHERE event_scores.event_id = @eventid
ORDER BY event_scores.current_score desc
ELSE
BEGIN
	SELECT event_name,
			NULL as team_name
	FROM CTF.dbo.event_details
	WHERE event_id = @eventid
END
GO

CREATE PROCEDURE [dbo].[CTF_UpdateAdminSp](
	@adminid int,
	@password varchar(max))
AS


UPDATE CTF.dbo.admins
	SET password = @password
WHERE admin_id = @adminid

SELECT 
	CASE WHEN (SELECT password FROM CTF.dbo.admins (NOLOCK) WHERE admin_id = @adminid) = @password THEN 1
	ELSE 0 END as success
GO

CREATE PROCEDURE [dbo].[CTF_UpdateEventQuestionSp](
	@event_id int,
	@question_id int,
	@newvalue int,
	@solved smallint)
AS

DECLARE @success int = 0

IF EXISTS (SELECT question_id FROM CTF.dbo.event_questions (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id)
BEGIN
	UPDATE CTF.dbo.event_questions
		SET question_value = @newvalue,
			solved_flag = @solved
	WHERE event_id = @event_id AND question_id = @question_id

	SET @success = 1
END
ELSE
BEGIN
	INSERT INTO CTF.dbo.event_questions (event_id, question_id, question_value, solved_flag)
	VALUES (@event_id, @question_id, @newvalue, 0)
	
	SET @success = 1
END

SELECT @success as success
GO

CREATE PROCEDURE [dbo].[CTF_UpdateEventScoresSp](
	@event_id int,
	@team_id int,
	@scoreadjust int)
AS

IF EXISTS (SELECT team_id FROM CTF.dbo.event_scores (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id)
BEGIN
	DECLARE @score int

	SELECT current_score = @score FROM CTF.dbo.event_scores (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id

	UPDATE CTF.dbo.event_scores
		SET current_score = @score + @scoreadjust
	WHERE event_id = @event_id AND team_id = @team_id
END
ELSE
BEGIN
	INSERT INTO CTF.dbo.eventevent_scores (event_id, team_id, current_score)
	VALUES (@event_id, @team_id, @scoreadjust)
END
GO

CREATE PROCEDURE [dbo].[CTF_UpdateEventSp](
	@event_id int,
	@eventname nvarchar(100),
	@startdate date,
	@starttime time,
	@enddate date,
	@endtime time,
	@exclusive smallint)
AS

DECLARE @success int = 0

IF EXISTS (SELECT event_name FROM CTF.dbo.event_details (NOLOCK) WHERE event_id = @event_id)
BEGIN

	IF @starttime = '00:00:00.000'
	BEGIN 
		SET @starttime = NULL
	END

	UPDATE CTF.dbo.event_details 
		SET event_name = @eventname, 
			start_date = @startdate, 
			start_time = @starttime, 
			end_date = @enddate, 
			end_time = @endtime, 
			exclusive_flag = @exclusive
	WHERE event_id = @event_id

	SET @success = 1
END

SELECT @success as success
GO

CREATE PROCEDURE [dbo].[CTF_UpdatePlayersSp](
	@teamid int,
	@player nvarchar(200),
	@active smallint,
	@email nvarchar(300)
) AS

IF EXISTS (SELECT player_email FROM CTF.dbo.players (NOLOCK) WHERE team_id = @teamid AND player_email = @email)
BEGIN
	UPDATE CTF.dbo.players
		SET active = @active
	WHERE team_id = @teamid AND player_email = @email

	SELECT player_id FROM CTF.dbo.players (NOLOCK) WHERE team_id = @teamid AND player_name = @player AND player_email = @email
END
ELSE
BEGIN
	INSERT INTO CTF.dbo.players (team_id, player_name, active, player_email)
	VALUES (@teamid, @player, 1, @email)

	SELECT player_id FROM CTF.dbo.players (NOLOCK) WHERE team_id = @teamid AND player_name = @player AND player_email = @email
END
GO

CREATE PROCEDURE [dbo].[CTF_UpdateQuestionSp](
	@question_id int,
	@question nvarchar(1000),
	@answer nvarchar(1000),
	@level int,
	@question_value int,
	@hint1 nvarchar(1000),
	@hint_value1 int,
	@hint2 nvarchar(1000),
	@hint_value2 int,
	@hint3 nvarchar(1000),
	@hint_value3 int)
AS

DECLARE @success int = 0

IF EXISTS (SELECT question FROM CTF.dbo.questions (NOLOCK) WHERE question_id = @question_id)
BEGIN
	UPDATE CTF.dbo.questions 
		SET question = @question, 
			answer = @answer, 
			question_value = @question_value,
			level = @level
	WHERE question_id = @question_id

	IF EXISTS (SELECT hint_id FROM CTF.dbo.hints (NOLOCK) WHERE question_id = @question_id AND hint_id = 1)
	BEGIN
		UPDATE CTF.dbo.hints
			SET hint = @hint1,
				hint_value = @hint_value1
		WHERE question_id = @question_id AND hint_id = 1
	END
	ELSE
	BEGIN
		IF @hint1 <> ''
		BEGIN
			INSERT INTO CTF.dbo.hints (hint_id, question_id, hint, hint_value)
			VALUES (1, @question_id, @hint1, @hint_value1)
		END
	END

	IF EXISTS (SELECT hint_id FROM CTF.dbo.hints (NOLOCK) WHERE question_id = @question_id AND hint_id = 2)
	BEGIN
		UPDATE CTF.dbo.hints
			SET hint = @hint2,
				hint_value = @hint_value2
		WHERE question_id = @question_id AND hint_id = 2
	END
	ELSE
	BEGIN
		IF @hint2 <> ''
		BEGIN
			INSERT INTO CTF.dbo.hints (hint_id, question_id, hint, hint_value)
			VALUES (2, @question_id, @hint2, @hint_value2)
		END
	END

	IF EXISTS (SELECT hint_id FROM CTF.dbo.hints (NOLOCK) WHERE question_id = @question_id AND hint_id = 3)
	BEGIN
		UPDATE CTF.dbo.hints
			SET hint = @hint3,
				hint_value = @hint_value3
		WHERE question_id = @question_id AND hint_id = 3
	END
	ELSE
	BEGIN
		IF @hint3 <> ''
		BEGIN
			INSERT INTO CTF.dbo.hints (hint_id, question_id, hint, hint_value)
			VALUES (3, @question_id, @hint3, @hint_value3)
		END
	END

	SET @success = 1
END

SELECT @success as success


GO

CREATE PROCEDURE [dbo].[CTF_VerifyAnswerSp](
	@event_id int,
	@team_id int,
	@question_id int,
	@teamanswer nvarchar(1000)
) AS

DECLARE @answer nvarchar(1000)

DECLARE @currentscore int,
		@value int

SELECT @answer = answer FROM CTF.dbo.questions (NOLOCK) WHERE question_id = @question_id

IF @answer = @teamanswer
BEGIN
	IF (SELECT exclusive_flag FROM CTF.dbo.event_details (NOLOCK) WHERE event_id = @event_id) = 1
	BEGIN
		IF (SELECT solved_flag FROM CTF.dbo.event_questions (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id) = 1
		BEGIN
			SELECT 3 as solved, 0 as value
		END
		ELSE
		BEGIN
			UPDATE CTF.dbo.event_questions SET solved_flag = 1 WHERE event_id = @event_id AND question_id = @question_id
			
			INSERT INTO CTF.dbo.questions_solved (team_id, event_id, question_id)
			VALUES (@team_id, @event_id, @question_id)

			IF EXISTS (SELECT team_id FROM CTF.dbo.event_scores (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id)
			BEGIN
				SELECT @currentscore = current_score FROM CTF.dbo.event_scores (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id

				IF EXISTS (SELECT question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id)
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id
				END
				ELSE
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.event_questions (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id
				END

				UPDATE CTF.dbo.event_scores
					SET current_score = @currentscore + @value
				WHERE event_id = @event_id AND team_id = @team_id

				SELECT 1 as solved, @value as value

				IF EXISTS (SELECT attempts FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id)
				BEGIN
					UPDATE CTF.dbo.questions_solved
						SET attempts = ((SELECT ISNULL(attempts, 0) FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id) + 1),
						solved = 1
					WHERE event_id = @event_id
					AND team_id = @team_id
					AND question_id = @question_id
				END
				ELSE
				BEGIN
					INSERT INTO CTF.dbo.questions_solved (event_id, question_id, team_id, solved, attempts)
					VALUES (@event_id, @question_id, @team_id, 1, 1)
				END
			END
			ELSE
			BEGIN
				IF EXISTS (SELECT question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id)
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id
				END
				ELSE
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.event_questions (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id
				END

				INSERT INTO CTF.dbo.event_scores (event_id, team_id, current_score)
				VALUES(@event_id, @team_id, @value)

				SELECT 1 as solved, @value

				IF EXISTS (SELECT attempts FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id)
				BEGIN
					UPDATE CTF.dbo.questions_solved
						SET attempts = ((SELECT ISNULL(attempts, 0) FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id) + 1),
						solved = 1
					WHERE event_id = @event_id
					AND team_id = @team_id
					AND question_id = @question_id
				END
				ELSE
				BEGIN
					INSERT INTO CTF.dbo.questions_solved (event_id, question_id, team_id, solved, attempts)
					VALUES (@event_id, @question_id, @team_id, 1, 1)
				END
			END
		END
	END
	ELSE
	BEGIN			
		IF EXISTS (SELECT team_id FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id)
		BEGIN
			SELECT 2 as solved, 0 as value
		END
		ELSE
		BEGIN
			INSERT INTO CTF.dbo.questions_solved (team_id, event_id, question_id)
			VALUES (@team_id, @event_id, @question_id)

			IF EXISTS (SELECT team_id FROM CTF.dbo.event_scores (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id)
			BEGIN
				SELECT @currentscore = current_score FROM CTF.dbo.event_scores (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id

				IF EXISTS (SELECT question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id)
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id
				END
				ELSE
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.event_questions (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id
				END

				UPDATE CTF.dbo.event_scores
					SET current_score = @currentscore + @value
				WHERE event_id = @event_id AND team_id = @team_id

				SELECT 1 as solved, @value as value

				IF EXISTS (SELECT attempts FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id)
				BEGIN
					UPDATE CTF.dbo.questions_solved
						SET attempts = ((SELECT ISNULL(attempts, 0) FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id) + 1),
						solved = 1
					WHERE event_id = @event_id
					AND team_id = @team_id
					AND question_id = @question_id
				END
				ELSE
				BEGIN
					INSERT INTO CTF.dbo.questions_solved (event_id, question_id, team_id, solved, attempts)
					VALUES (@event_id, @question_id, @team_id, 1, 1)
				END
			END
			ELSE
			BEGIN
				IF EXISTS (SELECT question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id)
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.questions_by_team (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id AND team_id = @team_id
				END
				ELSE
				BEGIN
					SELECT @value = question_value FROM CTF.dbo.event_questions (NOLOCK) WHERE event_id = @event_id AND question_id = @question_id
				END

				INSERT INTO CTF.dbo.event_scores (event_id, team_id, current_score)
				VALUES(@event_id, @team_id, @value)

				SELECT 1 as solved, @value as value

				IF EXISTS (SELECT attempts FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id)
				BEGIN
					UPDATE CTF.dbo.questions_solved
						SET attempts = ((SELECT ISNULL(attempts, 0) FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id) + 1),
						solved = 1
					WHERE event_id = @event_id
					AND team_id = @team_id
					AND question_id = @question_id
				END
				ELSE
				BEGIN
					INSERT INTO CTF.dbo.questions_solved (event_id, question_id, team_id, solved, attempts)
					VALUES (@event_id, @question_id, @team_id, 1, 1)
				END
			END
		END
	END
END
ELSE
BEGIN
	SELECT 0 as solved, 0 as value

	IF EXISTS (SELECT attempts FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id)
	BEGIN
		UPDATE CTF.dbo.questions_solved
			SET attempts = ((SELECT ISNULL(attempts, 0) FROM CTF.dbo.questions_solved (NOLOCK) WHERE event_id = @event_id AND team_id = @team_id AND question_id = @question_id) + 1),
			solved = 0
		WHERE event_id = @event_id
		AND team_id = @team_id
		AND question_id = @question_id
	END
	ELSE
	BEGIN
		INSERT INTO CTF.dbo.questions_solved (event_id, question_id, team_id, solved, attempts)
		VALUES (@event_id, @question_id, @team_id, 0, 1)
	END
END
GO

CREATE PROCEDURE [dbo].[CTF_VerifyLoginSp](
	@login_name nvarchar(100),
	@pass nvarchar(max)) AS

DECLARE @Password nvarchar(max),
		@ID int

SELECT @Password = password, @ID = admin_id FROM CTF.dbo.admins (NOLOCK) WHERE login_name = @login_name

IF LEN(@Password) = 0 AND LEN(@pass) = 0
BEGIN
	SELECT 3 as success, @ID as id
END
ELSE
BEGIN
	IF @Password IS NOT NULL
	BEGIN
		SELECT CASE WHEN @Password = @pass THEN 2 ELSE 0 END as success, @ID as id
	END
	ELSE 
	BEGIN
		SELECT @Password = password, @ID = team_id FROM CTF.dbo.teams (NOLOCK) WHERE team_name = @login_name
		IF @Password IS NOT NULL
		BEGIN
			SELECT CASE WHEN @Password = @pass THEN 1 ELSE 0 END as success, @ID as id
		END
		ELSE 
		BEGIN
			SELECT 0 as success, 0 as id
		END
	END
END
GO

CREATE PROCEDURE dbo.CTF_GetPrintData(
	@eventid int
) AS

IF EXISTS (SELECT event_id FROM CTF.dbo.event_details (NOLOCK) WHERE event_id = @eventid)
BEGIN
	SELECT 
		event_details.event_name,
		event_details.start_date,
		teams.team_name,
		players.player_name,
		players.player_email,
		event_scores.current_score
	FROM CTF.dbo.event_details (NOLOCK)
	JOIN CTF.dbo.event_scores (NOLOCK) ON event_details.event_id = event_scores.event_id
	JOIN CTF.dbo.teams (NOLOCK) ON teams.team_id = event_scores.team_id
	JOIN CTF.dbo.players (NOLOCK) ON players.team_id = teams.team_id
	WHERE event_details.event_id = @eventid
	ORDER BY event_scores.current_score desc
END
GO

CREATE PROCEDURE dbo.CTF_GetPlayerData(
	@playername nvarchar(1000)
) AS

DECLARE @Rank int



IF EXISTS (SELECT player_name FROM CTF.dbo.players (NOLOCK) WHERE player_name = @playername)
BEGIN
	SELECT DISTINCT
		event_details.event_name,
		event_details.start_date,
		teams.team_name,
		event_scores.current_score,
		(SELECT RowNumber FROM (SELECT event_id, team_id, ROW_NUMBER() OVER (ORDER BY current_score desc) AS RowNumber FROM CTF.dbo.event_scores) x WHERE x.event_id = event_scores.event_id AND x.team_id = teams.team_id) as rank
	FROM CTF.dbo.players (NOLOCK)
	JOIN CTF.dbo.teams (NOLOCK) ON players.team_id = teams.team_id
	LEFT OUTER JOIN CTF.dbo.event_scores (NOLOCK) ON event_scores.team_id = teams.team_id
	LEFT OUTER JOIN CTF.dbo.event_details (NOLOCK) ON event_details.event_id = event_scores.event_id
	WHERE players.player_name = @playername
	ORDER BY event_details.start_date desc
END
ELSE
BEGIN
	IF EXISTS (SELECT player_email FROM CTF.dbo.players (NOLOCK) WHERE player_email = @playername)
	BEGIN
		SELECT 
			event_details.event_name,
			event_details.start_date,
			teams.team_name,
			event_scores.current_score,
			(SELECT RowNumber FROM (SELECT event_id, team_id, ROW_NUMBER() OVER (ORDER BY current_score desc) AS RowNumber FROM CTF.dbo.event_scores) x WHERE x.event_id = event_scores.event_id AND x.team_id = teams.team_id) as rank
		FROM CTF.dbo.players (NOLOCK)
		JOIN CTF.dbo.teams (NOLOCK) ON players.team_id = teams.team_id
		LEFT OUTER JOIN CTF.dbo.event_scores (NOLOCK) ON event_scores.team_id = teams.team_id
		LEFT OUTER JOIN CTF.dbo.event_details (NOLOCK) ON event_details.event_id = event_scores.event_id
		WHERE players.player_email = @playername
		ORDER BY event_details.start_date desc
	END
END
GO

CREATE PROCEDURE dbo.CTF_LiveUpdates(
	@teamid int,
	@eventid int
) AS

--Question Value
--Questions Solved
--Questions Unsolvable (Exclusive event)
--Current Score
--level progression
--event end time

/*
	dbo.CTF_LiveUpdates 2, 1010
*/

IF (SELECT COUNT(question_id) FROM CTF.dbo.event_questions WHERE event_id = @eventid) > 0
BEGIN
	SELECT event_questions.question_id,
			event_questions.question_value,
			questions_by_team.question_value as team_value,
			ISNULL(questions_solved.solved,0) as solved,
			event_questions.solved_flag as exc_solved,
			teams.team_name,
			ISNULL(event_scores.current_score,0) as current_score,
			(SELECT COUNT(solved) FROM CTF.dbo.questions_solved (NOLOCK)
				JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
				WHERE team_id = @teamid AND event_id = @eventid AND solved = 1 AND questions.level = 1) as level1solved,
			(SELECT COUNT(solved) FROM CTF.dbo.questions_solved (NOLOCK)
				JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
				WHERE team_id = @teamid AND event_id = @eventid AND solved = 1 AND questions.level = 2) as level2solved,
			(SELECT COUNT(solved) FROM CTF.dbo.questions_solved (NOLOCK)
				JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
				WHERE team_id = @teamid AND event_id = @eventid AND solved = 1 AND questions.level = 3) as level3solved,
			(SELECT COUNT(solved) FROM CTF.dbo.questions_solved (NOLOCK)
				JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
				WHERE team_id = @teamid AND event_id = @eventid AND solved = 1 AND questions.level = 4) as level4solved,
			(SELECT COUNT(solved) FROM CTF.dbo.questions_solved (NOLOCK)
				JOIN CTF.dbo.questions (NOLOCK) ON questions_solved.question_id = questions.question_id 
				WHERE team_id = @teamid AND event_id = @eventid AND solved = 1 AND questions.level = 5) as level5solved,
			event_details.end_time,
			event_details.end_date,
			questions.level
	FROM CTF.dbo.event_questions
	LEFT OUTER JOIN CTF.dbo.event_scores ON event_questions.event_id = event_scores.event_id AND event_scores.team_id = @teamid
	LEFT OUTER JOIN CTF.dbo.questions_by_team ON event_questions.event_id = questions_by_team.event_id AND event_questions.question_id = questions_by_team.question_id
	LEFT OUTER JOIN CTF.dbo.questions_solved ON questions_solved.event_id = event_questions.event_id AND questions_solved.team_id = event_scores.team_id AND questions_solved.question_id = event_questions.question_id
	JOIN CTF.dbo.event_details ON event_questions.event_id = event_details.event_id
	JOIN CTF.dbo.questions ON event_questions.question_id = questions.question_id
	JOIN CTF.dbo.teams ON @teamid = teams.team_id
	WHERE event_questions.event_id = @eventid

	UNION
	SELECT 0, 0, NULL, 0, 0, team_name, ISNULL(current_score, 0), 0, 0, 0, 0, 0, NULL, NULL, 10
	FROM CTF.dbo.event_scores
	JOIN CTF.dbo.teams ON event_scores.team_id = teams.team_id
	ORDER BY questions.level, event_questions.question_id, current_score desc
END
ELSE
BEGIN
	SELECT NULL as question_id,
			event_details.end_time,
			event_details.end_date

	FROM CTF.dbo.event_details
	WHERE event_id = @eventid
END
GO

INSERT INTO CTF.dbo.admins (first_name, last_name, login_name, password)
--VALUES ('admin', 'admin', 'admin', '296050fe6032487459072431d9da77a7be5f53d6d7985bea005f238aa4ce4be0')
--GO
