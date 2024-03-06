import Countdown, { zeroPad } from "react-countdown";

// Random component
const Completionist = () => (
	<p className="-mt-1 text-[10px] font-light text-white"></p>
);

// Renderer callback with condition
const renderer = ({
	days,
	hours,
	minutes,
	seconds,
	completed,
}: {
	days: string | number;
	hours: string | number;
	minutes: string | number;
	seconds: string | number;
	completed: boolean;
}) => {
	if (completed) {
		// Render a complete state
		return <Completionist />;
	} else {
		// Render a countdown
		return (
			<div className="flex">
				<div>
					<p className="my-0 align-middle text-white text-xl">
						{zeroPad(days)} :
					</p>
					<p className="-mt-1 text-[#CED6DE] text-[10px] font-light">Days</p>
				</div>
				<div className="ml-1">
					<p className="my-0 align-middle text-white text-xl">
						{zeroPad(hours)} :
					</p>
					<p className="-mt-1 text-[#CED6DE] text-[10px] font-light">Hours</p>
				</div>
				<div className="ml-1">
					<p className="my-0 align-middle text-white text-xl">
						{zeroPad(minutes)} :
					</p>
					<p className="-mt-1 text-[#CED6DE] text-[10px] font-light">Mins</p>
				</div>
				<div className="ml-1">
					<p className="my-0 align-middle text-white text-xl">
						{zeroPad(seconds)}
					</p>
					<p className="-mt-1 text-[#CED6DE] text-[10px] font-light">Secs</p>
				</div>
			</div>
		);
	}
};

const CustomCountDown = ({ deadline }: { deadline: string | number }) => {
	return (
		<div className="h-10">
			<Countdown date={deadline} renderer={renderer} />.
		</div>
	);
};

export default CustomCountDown;
