import { CastsType } from "./Casts";

export type CrewType = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string | null;
  popularity: number;
  profile_path: string | null;
  credit_id: string | null;
  department: string;
  job: string;
};

export type CreditsType = {
  cast: CastsType;
  crew: Array<CrewType>;
};

export default function Credits({ credits }: { credits: CreditsType }) {
  return <></>;
}
