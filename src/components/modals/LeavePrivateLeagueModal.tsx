import Modal from "./Modal";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import {
	selectIsLeavingPrivateLeague,
	selectShowLeavePrivateLeagueModal,
	setShowLeavePrivateLeagueModal,
} from "../../state/slices/privateLeague";
import { PrivateLeagueItem } from "../../types/types";
import Button from "../Buttons";
import { leavePrivateLeagueAPI } from "../../api/privateLeagueAPI";

const LeavePrivateLeagueModal = ({
	leagueDetails,
}: {
	leagueDetails: PrivateLeagueItem | null;
}) => {
	const dispatch = useAppDispatch();

	const showLeavePrivateLeagueModal = useAppSelector(
		selectShowLeavePrivateLeagueModal
	);

	const isLeavingLeague = useAppSelector(selectIsLeavingPrivateLeague);

	return (
		<Modal
			closeModal={() => {
				dispatch(setShowLeavePrivateLeagueModal(false));
			}}
			content={
				<section>
					<p className="text-[#5F6B7A] text-sm">
						You are about to leave{" "}
						<span className="font-semibold">{leagueDetails?.name}</span>. Are
						you really sure about this? This action cannot be undone.
					</p>
					<Button
						className="w-full mt-6"
						onClick={() =>
							dispatch(leavePrivateLeagueAPI({ leagueId: leagueDetails?.id }))
						}
						title="Leave League"
						loading={isLeavingLeague}
					/>
				</section>
			}
			isOpen={showLeavePrivateLeagueModal}
			title="Leave Private League"
		/>
	);
};

export default LeavePrivateLeagueModal;
