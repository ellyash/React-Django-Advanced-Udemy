import { Button, TextField } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { placeBet, setResults } from "../../services/event-service";

import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { CssTextField } from "../layout/elements";
import { DateTime } from "luxon";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { NotificationManager } from "react-notifications";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import User from "../user/user";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../hooks/useAuth";
import { useFetchEvent } from "../../hooks/fetch-event";
import { useParams } from "react-router-dom";

export default function Event() {
	const classes = useStyles();
	const history = useHistory();

	const { authData } = useAuth();
	const { id } = useParams();
	const [data, loading, error] = useFetchEvent(authData.token, id);
	const [event, setEvent] = useState(null);
	const [evtTime, setEvtTime] = useState(null);
	const [isFuture, setIsFuture] = useState(null);
	const [timeDiff, setTimeDiff] = useState(null);
	const [score1, setScore1] = useState(null);
	const [score2, setScore2] = useState(null);

	useEffect(() => {
		setEvent(data);
		if (data?.time) {
			const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
			const eventTime = DateTime.fromFormat(data.time, format);
			setEvtTime(eventTime);
			const now = DateTime.now();
			setIsFuture(eventTime > now);
			setTimeDiff(eventTime.toRelative());
		}
		// eslint-disable-next-line
	}, [data]);

	const sendBet = async () => {
		const bet = await placeBet(authData.token, {
			score1,
			score2,
			event: event.id,
		});
		if (bet) {
			if (bet.new) {
				event.bets.push(bet.result);
			} else {
				const myBetIndex = event.bets.findIndex(
					(el) => el.user.id === bet.result.user.id
				);
				event.bets[myBetIndex] = bet.result;
			}
			NotificationManager.success(bet.message);
			setScore1("");
			setScore2("");
		}
	};

	const setScore = async () => {
		const eventData = await setResults(authData.token, {
			score1,
			score2,
			event: event.id,
		});
		if (eventData) {
			setEvent(eventData);
			NotificationManager.success("Score has been set");
			setScore1("");
			setScore2("");
		} else {
			NotificationManager.error("Scores could not be set");
		}
	};

	if (error) return <h1>Error occurred</h1>;
	if (loading) return <h1>Loading...</h1>;

	return (
		<React.Fragment>
			<Button
				size="small"
				variant="outlined"
				color="primary"
				className={classes.back}
				onClick={() => history.goBack()}
			>
				<KeyboardReturnIcon />
			</Button>
			<div className={classes.container}>
				{event && evtTime && (
					<div>
						<h2>
							{event.team1} <span className={classes.accent}>VS</span>{" "}
							{event.team2}
						</h2>
						{event.score1 >= 0 && event.score2 >= 0 && (
							<h2>
								{event.score1} : {event.score2}
							</h2>
						)}
						<p className={classes.dateTime}>
							<CalendarTodayIcon className={classes.dateIcon} />
							{evtTime.toSQLDate()}
							&nbsp; &nbsp;
							{/* 	</p>
						<p className={classes.dateTime}> */}
							<QueryBuilderIcon className={classes.dateIcon} />
							{evtTime.toFormat("HH:mm")}
						</p>
						{isFuture ? (
							<h2>Starts {timeDiff}</h2>
						) : (
							<h2>Finished {timeDiff}</h2>
						)}
						{event &&
							event.bets &&
							event.bets.map((bet) => {
								return (
									<React.Fragment>
										<hr />

										<h3>Your Bet</h3>
										<div key={bet.id} className={classes.bets}>
											<User user={bet.user} />{" "}
											<h2>
												{bet.score1} : {bet.score2}
											</h2>
											<h3>
												{bet.points === null ? 0 : bet.points} pts
											</h3>
										</div>
										{isFuture && (
											<div>
												{" "}
												<h3>
													Total number of bets: {event.count_bets}
												</h3>{" "}
											</div>
										)}
										<hr />
									</React.Fragment>
								);
							})}
						<br />
						{isFuture && !event.is_admin ? (
							<React.Fragment>
								<CssTextField
									label="Score 1"
									type="number"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
										min: "0",
										max: "100",
										step: "1",
										style: {
											textAlign: "center",
										},
									}}
									onChange={(e) => setScore1(e.target.value)}
									className={classes.numberField}
								/>
								<span className={classes.accent}>
									&nbsp;&nbsp;&nbsp;
								</span>
								<CssTextField
									label="Score 2"
									type="number"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
										min: "0",
										max: "100",
										step: "1",
										style: {
											textAlign: "center",
										},
									}}
									onChange={(e) => setScore2(e.target.value)}
									className={classes.numberField}
								/>{" "}
								<br />
								<br />
								<Button
									variant="contained"
									color="primary"
									onClick={() => sendBet()}
									disabled={!score1 || !score2}
								>
									Submit bet
								</Button>
							</React.Fragment>
						) : event.is_admin ? (
							<React.Fragment>
								<CssTextField
									label="Score 1"
									type="number"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
										min: "0",
										max: "100",
										step: "1",
										style: {
											textAlign: "center",
										},
									}}
									onChange={(e) => setScore1(e.target.value)}
									className={classes.numberField}
								/>
								<span className={classes.accent}>
									&nbsp;&nbsp;&nbsp;
								</span>
								<CssTextField
									label="Score 2"
									type="number"
									inputProps={{
										inputMode: "numeric",
										pattern: "[0-9]*",
										min: "0",
										max: "100",
										step: "1",
										style: {
											textAlign: "center",
										},
									}}
									onChange={(e) => setScore2(e.target.value)}
									className={classes.numberField}
								/>
								<br />
								<br />
								<Button
									variant="contained"
									color="primary"
									onClick={() => setScore()}
									disabled={!score1 || !score2}
								>
									Set score
								</Button>
							</React.Fragment>
						) : null}
					</div>
				)}
			</div>
		</React.Fragment>
	);
}
const useStyles = makeStyles((theme) => ({
	container: {
		textAlign: "center",
	},
	dateTime: {
		fontSize: "18px",

		margin: "0 5px",
	},
	dateIcon: {
		fontSize: "23px",
		color: theme.colors.mainAccentColor,
		marginRight: "5px",
	},
	bets: {
		display: "grid",
		gridTemplateColumns: "1fr 3fr 1fr",
		margin: "5px 0 0 0",
	},
	accent: {
		color: theme.palette.primary.main,
		fontSize: "20px",
	},
	numberField: {
		width: "120px",
		textAlign: "center",
	},
}));
