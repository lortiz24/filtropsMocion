import { Timestamp } from 'firebase/firestore';

export type SaveParticipationOfUser = Pick<Participation, 'email'| 'names'> & { newParticipation?: boolean; points?: number };

export type Participation = {
	id: string;
	experienceId: string;
	experienceName: string;
	userCode?: string;
	points: number;
	checkInAt: Timestamp;
	participationDateList: Timestamp[];
	email: string;
	names: string;
	updateAt: Timestamp;
};