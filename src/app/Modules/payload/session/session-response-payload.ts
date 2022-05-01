import {NivDifficulteEnum} from "../../../models/NivDifficulteEnum";
import {Formation} from "../../../models/Formation";
import {Formateur} from "../../../models/Formateur";
import {Candidat} from "../../../models/Candidat";

export class sessionResponsePayload {
  titreSession: string
  lieuSession: string
  descriptionSession: string
  dateDebSession: Date
  dateFinSession: Date
  photoSession: string
  planning: Record<string, string> = {};

  programme: string //pdf
  nivDifficulte: NivDifficulteEnum
  nbMaxCandidat: number
  formationSession: Formation;
  listeFormateurs: Array<Formateur>;
  listeCandidat: Array<Candidat>;
}
