import styled from "styled-components";

export const Input = styled.input`
	border: 1px solid #dbdfe6;
	border-radius: 4px;
	padding: 10px 16px;
	color: var(--primary-black);
	background: #f5f6f8;
	font-size: 14px;

	&:focus,
	&:focus-visible,
	&_no-border:focus,
	&_no-border:focus-visible,
	&:focus-visible,
	&:focus {
		outline-color: var(--predictbeta-blue);
	}

	&::placeholder {
		color: var(--neutral-ash);
	}

	&:disabled {
		background: #f5f6f8;
		color: var(--primary-black);

		&:hover {
			cursor: not-allowed;
		}
	}

	&.invalid {
		border-color: var(--alert-red);
		background: #d52a2a40;
		color: #eb1536;

		&::placeholder {
			color: #eb1536;
		}
	}

	&.correct {
		background: #e2f4eb;
		color: #55b486;
		border-color: #55b486;
	}
`;

export const InputPlaceholder = styled.div`
	border: 1px solid #dbdfe6;
	border-radius: 4px;
	padding: 10px 16px;
	color: var(--primary-black);
	background: #f5f6f8;
	font-size: 14px;
`;
