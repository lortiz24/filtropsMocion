/* import { addDoc, collection, CollectionReference, doc, DocumentData, Firestore, getDocs, onSnapshot, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { FirebaseDB } from '../config/firebase.config';
import { Participation, SaveParticipationOfUser } from '../types/checkIn.type';
import { Attendee } from '../types/atendee.type';
import { Experience } from '../types/experience.type';


export class CheckInService {
	experienceId: string = localStorage.getItem('experienceID') ?? 'i0own9qlUQ'; //toDo: Aquí coloca el id de la experiencia asignada
	participationCollection: CollectionReference<DocumentData, DocumentData>;
	experiences: Experience[] = [{
		id: 'i0own9qlUQ',
		name: 'FILTROS INTERACTIVOS R.A.', 
	},
	{
		id: 'KbCLd9hZ3r',
		name: 'IA MUSIC MAKER', 
	}, 
	 {
		id: 'cyhH5yUGs5',
		name: 'IMAGINARY AI', 
	}, 
	{
		id: 'HI0qLLtutT',
		name: 'SKECTCH AI', 
	}, 
	{
		id: 'Fjkyw8lfUy',
		name: 'VIDEO AI MAKER',
	},
	{
		id: 'jZ8JxL0Vue',
		name: 'ENGLISH INTERVIEWER AI',
	},
	];

	constructor(private readonly firebaseDB: Firestore) {
		this.participationCollection = collection(this.firebaseDB, event/colombia4.0/attendees);
	}

	setExperienceId(experienceId: string) {
		if (this.experiences.some((experience) => experience.id === experienceId)){ 
			localStorage.setItem('experienceID', experienceId);
			this.experienceId = experienceId
		}
	}

	getExperienceId() {
		return this.experienceId;
	}

	async getUserParticipation({ email }: { email: string }) {
		const q = query(this.participationCollection, where('email', '==', email), where('experienceId', '==', this.experienceId));

		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			const participation: Participation = {
				id: querySnapshot.docs[0].id,
				...(querySnapshot.docs[0].data() as Omit<Participation, 'id'>),
			};
			return participation as Participation;
		} else {
			return null;
		}
	}

	async saveUserParticipation({ names,email, points, newParticipation = false }: SaveParticipationOfUser) {
		const now = new Date();

		const checkInAt = Timestamp.fromDate(now);
		const updateAt = Timestamp.fromDate(now);


		const previousParticipation = await this.getUserParticipation({ email });

		if (previousParticipation) {
			const docId = previousParticipation.id;
			const userExperienceRef = doc(this.firebaseDB, event/colombia4.0/attendees, docId);

			const newPoints = points === undefined ? previousParticipation.points : points;

			const newParticipationDateList: Timestamp[] = [...previousParticipation.participationDateList];
			if (newParticipation) {
				newParticipationDateList.push(checkInAt);
			}

			await updateDoc(userExperienceRef, { points: newPoints, updateAt, participationDateList: newParticipationDateList });

			return docId;
		} else {
			const experience = this.getExperienceById({ experienceId: this.experienceId });
			if (!experience) return console.error('la experiencia no esta registrado');
			
			const newDoc: Omit<Participation, 'id'> = {
				participationDateList: [checkInAt],
				checkInAt,
				experienceId: this.experienceId,
				experienceName: experience.name,
				points: points === undefined ? 0 : points,
				email: email,
				names: names,
				updateAt,
			};
			const newDocRef = await addDoc(this.participationCollection, newDoc);
			return newDocRef.id;
		}
	}

	async getAttendeeByEmail({ email }: { email: string }): Promise<Attendee | null> {
		const q = query(this.participationCollection, where('email', '==', email));

		const querySnapshot = await getDocs(q);

		if (!querySnapshot.empty) {
			if (querySnapshot.docs.length > 1) throw new Error('email asignado a dos usuarios');

			const docId = querySnapshot.docs[0].id;
			const data = querySnapshot.docs[0].data() as Omit<Attendee, 'id'>;
			const attendee: Attendee = {
				id: docId,
				...data,
			};
			return attendee as Attendee;
		}
		return null;
	}
	// ---------------------------------------------------------------------------------------------------
	async getUsersParticipation() {
		const querySnapshot = await getDocs(this.participationCollection); // Obtener todos los documentos

		if (!querySnapshot.empty) {
			// Mapeamos todos los documentos a un array de objetos Participation
			const usersParticipation: Participation[] = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...(doc.data() as Omit<Participation, 'id'>),
			}));

			return usersParticipation;
		} else {
			return [];
		}
	}
	listeningUsersParticipation(onSetUsersParticipants: (data: Participation[]) => void) {
		return onSnapshot(
			this.participationCollection,
			(querySnapshot) => {
				if (!querySnapshot.empty) {
					// Mapeamos todos los documentos a un array de objetos Participation
					const usersParticipation: Participation[] = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...(doc.data() as Omit<Participation, 'id'>),
					}));
					onSetUsersParticipants(usersParticipation);
					// Aquí puedes manejar los datos actualizados, por ejemplo, guardarlos en el estado
				} else {
					onSetUsersParticipants([]);
					console.log('No hay participaciones');
				}
			},
			(error) => {
				console.error('Error al escuchar cambios en la participación:', error);
			}
		);
	}

	listeningParticipationByUser({ onSetUsersParticipants, email }: { email: string; onSetUsersParticipants: (data: Participation[]) => void }) {
		const filteredQuery = query(this.participationCollection, where('email', '==', email));

		return onSnapshot(
			filteredQuery,
			(querySnapshot) => {
				if (!querySnapshot.empty) {
					// Mapeamos todos los documentos a un array de objetos Participation
					const usersParticipation: Participation[] = querySnapshot.docs.map((doc) => ({
						id: doc.id,
						...(doc.data() as Omit<Participation, 'id'>),
					}));
					onSetUsersParticipants(usersParticipation);
					console.log('Participaciones actualizadas:', usersParticipation);
				} else {
					console.log('No hay participaciones');
					onSetUsersParticipants([]);
				}
			},
			(error) => {
				console.error('Error al escuchar cambios en la participación:', error);
			}
		);
	}

	async getAllAttendee() {
		const snapshot = await getDocs(this.participationCollection);
		const attendees: any[] = [];
		snapshot.forEach((doc) => {
			const attendee = {
				id: doc.id,
				...doc.data(),
			};
			attendees.push(attendee);
		});
		return attendees;
	}

	getAllExperience() {
		return this.experiences;
	}
	
	getExperienceById({ experienceId }: { experienceId: string }) {
		const experience = this.experiences.find((experience) => experience.id === experienceId) as Experience;
		return experience;
	}
}

export const checkInService = new CheckInService(FirebaseDB); */